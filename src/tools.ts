/**
 * MCP Tools for Latitude
 *
 * 8 Tools:
 * - list_prompts   : List all prompt names in LIVE
 * - get_prompt     : Get full prompt content by name
 * - run_prompt     : Execute a prompt with parameters
 * - push_prompts   : Replace ALL LIVE prompts (creates branch → merge)
 * - append_prompts : Add prompts to LIVE (creates branch → merge)
 * - pull_prompts   : Download LIVE prompts to local ./prompts/*.promptl
 * - replace_prompt : Replace/create a single prompt
 * - docs           : Documentation (help, get topic, find query)
 */

import { z } from 'zod';
import {
	existsSync,
	mkdirSync,
	writeFileSync,
	readdirSync,
	unlinkSync,
} from 'fs';
import { join, resolve } from 'path';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Logger } from './utils/logger.util.js';
import {
	LatitudeApiError,
	getProjectId,
	getPromptNames,
	listDocuments,
	getDocument,
	runDocument,
	deployToLive,
} from './api.js';
import { getHelp, getDocs, findDocs } from './docs.js';
import type { DocumentChange } from './types.js';

// ============================================================================
// Types & Helpers
// ============================================================================

type ToolResult = {
	content: Array<{ type: 'text'; text: string }>;
	isError?: boolean;
};

const logger = Logger.forContext('tools.ts');

let cachedPromptNames: string[] = [];
let cacheLastUpdated: Date | null = null;

async function refreshPromptCache(): Promise<void> {
	try {
		cachedPromptNames = await getPromptNames();
		cacheLastUpdated = new Date();
		logger.debug(`Cache updated: ${cachedPromptNames.length} prompts`);
	} catch (error) {
		logger.warn('Cache refresh failed', error);
	}
}

async function getCachedPromptNames(): Promise<string[]> {
	const CACHE_TTL_MS = 60000;
	const now = new Date();

	if (!cacheLastUpdated || now.getTime() - cacheLastUpdated.getTime() > CACHE_TTL_MS) {
		await refreshPromptCache();
	}

	return cachedPromptNames;
}

function formatSuccess(title: string, content: string): ToolResult {
	return {
		content: [
			{
				type: 'text' as const,
				text: `## ${title}\n\n${content}`,
			},
		],
	};
}

function formatError(error: unknown): ToolResult {
	if (error instanceof LatitudeApiError) {
		return {
			content: [
				{
					type: 'text' as const,
					text: error.toMarkdown(),
				},
			],
			isError: true,
		};
	}

	const message = error instanceof Error ? error.message : String(error);
	return {
		content: [
			{
				type: 'text' as const,
				text: `## Error\n\n${message}`,
			},
		],
		isError: true,
	};
}

function getPromptsDir(): string {
	return resolve(process.cwd(), 'prompts');
}

const ListPromptsSchema = z.object({});

async function handleListPrompts(): Promise<ToolResult> {
	try {
		const docs = await listDocuments('live');
		const names = docs.map((d: { path: string }) => d.path);

		// Update cache
		cachedPromptNames = names;
		cacheLastUpdated = new Date();

		if (names.length === 0) {
			return formatSuccess('No Prompts Found', 'The project has no prompts yet.');
		}

		const list = names.map((n: string) => `- \`${n}\``).join('\n');
		return formatSuccess(
			`Found ${names.length} Prompt(s)`,
			`**Project ID:** \`${getProjectId()}\`\n\n${list}`
		);
	} catch (error) {
		return formatError(error);
	}
}

const GetPromptSchema = z.object({
	name: z.string().describe('Prompt name/path to retrieve'),
});

async function handleGetPrompt(args: { name: string }): Promise<ToolResult> {
	try {
		const doc = await getDocument(args.name, 'live');

		let content = `**Name:** \`${doc.path}\`\n\n`;
		content += `**Version:** \`${doc.versionUuid}\`\n\n`;
		content += `### Content\n\n\`\`\`promptl\n${doc.content}\n\`\`\``;

		return formatSuccess(`Prompt: ${doc.path}`, content);
	} catch (error) {
		return formatError(error);
	}
}

const RunPromptSchema = z.object({
	name: z.string().describe('Prompt name/path to execute'),
	parameters: z
		.record(z.string(), z.unknown())
		.optional()
		.describe('Parameters to pass to the prompt'),
});

async function handleRunPrompt(args: {
	name: string;
	parameters?: Record<string, unknown>;
}): Promise<ToolResult> {
	try {
		const result = await runDocument(args.name, args.parameters || {});

		let content = `**Prompt:** \`${args.name}\`\n\n`;

		if (args.parameters && Object.keys(args.parameters).length > 0) {
			content += `**Parameters:**\n\`\`\`json\n${JSON.stringify(args.parameters, null, 2)}\n\`\`\`\n\n`;
		}

		content += `### Response\n\n${result.response?.text || JSON.stringify(result, null, 2)}`;

		if (result.response?.usage) {
			content += `\n\n**Tokens:** ${result.response.usage.totalTokens} total`;
		}

		if (result.uuid) {
			content += `\n\n**Conversation ID:** \`${result.uuid}\``;
		}

		return formatSuccess('Prompt Executed', content);
	} catch (error) {
		return formatError(error);
	}
}

const PushPromptsSchema = z.object({
	prompts: z
		.array(
			z.object({
				name: z.string().describe('Prompt name (without .promptl extension)'),
				content: z.string().describe('Full prompt content'),
			})
		)
		.describe('Prompts to push (replaces ALL existing prompts in LIVE)'),
});

async function handlePushPrompts(args: {
	prompts: Array<{ name: string; content: string }>;
}): Promise<ToolResult> {
	try {
		if (args.prompts.length === 0) {
			return formatError(new Error('No prompts provided'));
		}

		// Get existing prompts to delete
		const existingDocs = await listDocuments('live');
		const existingNames = existingDocs.map((d: { path: string }) => d.path);

		// Build changes: delete existing + add new
		const changes: DocumentChange[] = [];

		// Delete all existing
		for (const name of existingNames) {
			changes.push({
				path: name,
				content: '',
				status: 'deleted',
			});
		}

		// Add all new
		for (const prompt of args.prompts) {
			changes.push({
				path: prompt.name,
				content: prompt.content,
				status: 'added',
			});
		}

		// Deploy to LIVE
		const { version } = await deployToLive(changes, 'push-prompts');

		// Refresh cache
		await refreshPromptCache();

		let content = `**Deleted:** ${existingNames.length} prompt(s)\n`;
		content += `**Added:** ${args.prompts.length} prompt(s)\n`;
		content += `**Version:** \`${version.uuid}\`\n\n`;
		content += `### Deployed Prompts\n\n`;
		content += args.prompts.map((p) => `- \`${p.name}\``).join('\n');

		return formatSuccess('Prompts Pushed to LIVE', content);
	} catch (error) {
		return formatError(error);
	}
}

const AppendPromptsSchema = z.object({
	prompts: z
		.array(
			z.object({
				name: z.string().describe('Prompt name'),
				content: z.string().describe('Prompt content'),
			})
		)
		.describe('Prompts to append'),
	overwrite: z
		.boolean()
		.optional()
		.default(false)
		.describe('If true, overwrite existing prompts with same name'),
});

async function handleAppendPrompts(args: {
	prompts: Array<{ name: string; content: string }>;
	overwrite?: boolean;
}): Promise<ToolResult> {
	try {
		if (args.prompts.length === 0) {
			return formatError(new Error('No prompts provided'));
		}

		// Get existing prompts
		const existingDocs = await listDocuments('live');
		const existingNames = new Set(existingDocs.map((d: { path: string }) => d.path));

		// Build changes
		const changes: DocumentChange[] = [];
		const added: string[] = [];
		const updated: string[] = [];
		const skipped: string[] = [];

		for (const prompt of args.prompts) {
			const exists = existingNames.has(prompt.name);

			if (exists && !args.overwrite) {
				skipped.push(prompt.name);
				continue;
			}

			changes.push({
				path: prompt.name,
				content: prompt.content,
				status: exists ? 'modified' : 'added',
			});

			if (exists) {
				updated.push(prompt.name);
			} else {
				added.push(prompt.name);
			}
		}

		if (changes.length === 0) {
			return formatSuccess(
				'No Changes Made',
				`All ${skipped.length} prompt(s) already exist. Use \`overwrite: true\` to replace.`
			);
		}

		// Deploy to LIVE
		const { version } = await deployToLive(changes, 'append-prompts');

		// Refresh cache
		await refreshPromptCache();

		let content = '';
		if (added.length > 0) {
			content += `**Added:** ${added.length}\n`;
			content += added.map((n) => `  - \`${n}\``).join('\n') + '\n\n';
		}
		if (updated.length > 0) {
			content += `**Updated:** ${updated.length}\n`;
			content += updated.map((n) => `  - \`${n}\``).join('\n') + '\n\n';
		}
		if (skipped.length > 0) {
			content += `**Skipped:** ${skipped.length} (already exist)\n`;
		}
		content += `\n**Version:** \`${version.uuid}\``;

		return formatSuccess('Prompts Appended to LIVE', content);
	} catch (error) {
		return formatError(error);
	}
}

const PullPromptsSchema = z.object({
	outputDir: z
		.string()
		.optional()
		.describe('Output directory (default: ./prompts)'),
});

async function handlePullPrompts(args: {
	outputDir?: string;
}): Promise<ToolResult> {
	try {
		const outputDir = args.outputDir ? resolve(args.outputDir) : getPromptsDir();

		// Create directory if it doesn't exist
		if (!existsSync(outputDir)) {
			mkdirSync(outputDir, { recursive: true });
		}

		// Delete existing .promptl files
		const existingFiles = readdirSync(outputDir).filter((f) => f.endsWith('.promptl'));
		for (const file of existingFiles) {
			unlinkSync(join(outputDir, file));
		}

		// Get all prompts from LIVE
		const docs = await listDocuments('live');

		if (docs.length === 0) {
			return formatSuccess('No Prompts to Pull', 'The project has no prompts.');
		}

		// Fetch full content and write files
		const written: string[] = [];
		for (const doc of docs) {
			const fullDoc = await getDocument(doc.path, 'live');
			const filename = `${doc.path.replace(/\//g, '_')}.promptl`;
			const filepath = join(outputDir, filename);

			writeFileSync(filepath, fullDoc.content, 'utf-8');
			written.push(filename);
		}

		let content = `**Directory:** \`${outputDir}\`\n`;
		content += `**Deleted:** ${existingFiles.length} existing file(s)\n`;
		content += `**Written:** ${written.length} file(s)\n\n`;
		content += `### Files\n\n`;
		content += written.map((f) => `- \`${f}\``).join('\n');

		return formatSuccess('Prompts Pulled from LIVE', content);
	} catch (error) {
		return formatError(error);
	}
}

async function getReplacePromptDescription(): Promise<string> {
	const names = await getCachedPromptNames();
	const nameList =
		names.length > 0
			? `\n\n**Available prompts:** ${names.map((n) => `\`${n}\``).join(', ')}`
			: '';
	return `Replace a single prompt in LIVE.${nameList}`;
}

const ReplacePromptSchema = z.object({
	name: z.string().describe('Prompt name to replace'),
	content: z.string().describe('New prompt content'),
});

async function handleReplacePrompt(args: {
	name: string;
	content: string;
}): Promise<ToolResult> {
	try {
		// Check if prompt exists
		const existingDocs = await listDocuments('live');
		const exists = existingDocs.some((d: { path: string }) => d.path === args.name);

		const changes: DocumentChange[] = [
			{
				path: args.name,
				content: args.content,
				status: exists ? 'modified' : 'added',
			},
		];

		// Deploy to LIVE
		const { version } = await deployToLive(changes, `replace-${args.name}`);

		// Refresh cache
		await refreshPromptCache();

		const action = exists ? 'Replaced' : 'Created';
		let content = `**Prompt:** \`${args.name}\`\n`;
		content += `**Action:** ${action}\n`;
		content += `**Version:** \`${version.uuid}\`\n\n`;
		content += `### Content Preview\n\n\`\`\`promptl\n${args.content.substring(0, 500)}${args.content.length > 500 ? '...' : ''}\n\`\`\``;

		return formatSuccess(`Prompt ${action}`, content);
	} catch (error) {
		return formatError(error);
	}
}

const DocsSchema = z.object({
	action: z
		.enum(['help', 'get', 'find'])
		.describe('Action: help (overview), get (specific topic), find (search)'),
	topic: z
		.string()
		.optional()
		.describe('Topic name (for action: get)'),
	query: z
		.string()
		.optional()
		.describe('Search query (for action: find)'),
});

async function handleDocs(args: {
	action: 'help' | 'get' | 'find';
	topic?: string;
	query?: string;
}): Promise<ToolResult> {
	let content: string;

	switch (args.action) {
		case 'help':
			content = getHelp();
			break;

		case 'get':
			if (!args.topic) {
				return formatError(new Error('Topic is required for action: get'));
			}
			content = getDocs(args.topic);
			break;

		case 'find':
			if (!args.query) {
				return formatError(new Error('Query is required for action: find'));
			}
			content = findDocs(args.query);
			break;

		default:
			content = getHelp();
	}

	return {
		content: [{ type: 'text', text: content }],
	};
}

export async function registerTools(server: McpServer): Promise<void> {
	logger.info('Registering MCP tools...');

	await refreshPromptCache();

	server.registerTool(
		'list_prompts',
		{
			title: 'List Prompts',
			description: 'List all prompt names in LIVE version',
			inputSchema: ListPromptsSchema,
		},
		handleListPrompts
	);

	server.registerTool(
		'get_prompt',
		{
			title: 'Get Prompt',
			description: 'Get full prompt content by name',
			inputSchema: GetPromptSchema,
		},
		handleGetPrompt as (args: Record<string, unknown>) => Promise<ToolResult>
	);

	server.registerTool(
		'run_prompt',
		{
			title: 'Run Prompt',
			description: 'Execute a prompt with parameters',
			inputSchema: RunPromptSchema,
		},
		handleRunPrompt as (args: Record<string, unknown>) => Promise<ToolResult>
	);

	server.registerTool(
		'push_prompts',
		{
			title: 'Push Prompts',
			description:
				'Replace ALL prompts in LIVE with the given prompts. Creates branch → pushes → publishes automatically.',
			inputSchema: PushPromptsSchema,
		},
		handlePushPrompts as (args: Record<string, unknown>) => Promise<ToolResult>
	);

	server.registerTool(
		'append_prompts',
		{
			title: 'Append Prompts',
			description:
				'Add prompts to LIVE without removing existing ones. Use overwrite=true to replace prompts with same name.',
			inputSchema: AppendPromptsSchema,
		},
		handleAppendPrompts as (args: Record<string, unknown>) => Promise<ToolResult>
	);

	server.registerTool(
		'pull_prompts',
		{
			title: 'Pull Prompts',
			description:
				'Download all prompts from LIVE to local ./prompts/*.promptl files',
			inputSchema: PullPromptsSchema,
		},
		handlePullPrompts as (args: Record<string, unknown>) => Promise<ToolResult>
	);

	const replaceDesc = await getReplacePromptDescription();
	server.registerTool(
		'replace_prompt',
		{
			title: 'Replace Prompt',
			description: replaceDesc,
			inputSchema: ReplacePromptSchema,
		},
		handleReplacePrompt as (args: Record<string, unknown>) => Promise<ToolResult>
	);

	server.registerTool(
		'docs',
		{
			title: 'Documentation',
			description:
				'Get documentation. Actions: help (overview), get (topic), find (search)',
			inputSchema: DocsSchema,
		},
		handleDocs as (args: Record<string, unknown>) => Promise<ToolResult>
	);

	logger.info('Registered 8 MCP tools');
}
