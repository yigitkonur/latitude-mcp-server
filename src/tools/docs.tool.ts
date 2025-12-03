import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { Logger } from '../utils/logger.util.js';
import {
	HelpInputSchema,
	GetDocsInputSchema,
	DOCS_TOPIC_METADATA,
	type DocsTopic,
} from '../types/docs.types.js';
import { HELP_CONTENT, DOCS_MAP } from '../docs/promptl.docs.js';

const toolLogger = Logger.forContext('tools/docs.tool.ts');

// ============================================================================
// Tool Descriptions
// ============================================================================

const HELP_DESC = `# Latitude MCP Server - Complete Orientation

**CALL THIS FIRST** if you're new to this server or Latitude.so.

## What is Latitude?
Latitude.so is a prompt management platform. You write prompts in **PromptL** (a templating language), store them in projects, version them, and execute them via API. This MCP server lets you do ALL of that programmatically.

## What is PromptL?
PromptL is like Markdown + Jinja for AI prompts. It has:
- YAML config header (provider, model, temperature)
- Message tags (<system>, <user>, <assistant>)
- Variables: {{ name }}
- Logic: {{ if }}, {{ for }}
- Tools, chains, agents, and more

## What This Tool Returns
1. **JSON metadata**: 19 tools organized by category, 38 doc topics, suggested next actions
2. **Markdown guide**: Full server documentation with examples

## When to Use This
- ✅ You've never used this server before
- ✅ You need to see all available tools
- ✅ You're not sure what's possible
- ✅ You want the quick start workflow

## After Calling This
→ Call \`latitude_find_docs\` with your goal to discover relevant topics
→ Or call \`latitude_get_docs\` with a specific topic to learn the syntax
→ Then use \`latitude_list_projects\` to see your Latitude projects`;

const GET_DOCS_DESC = `# Learn PromptL Syntax - Deep Documentation

**PURPOSE:** Get comprehensive documentation for a specific PromptL topic. Each topic includes syntax, examples, best practices, and next steps.

## When to Use This Tool
- ✅ You know WHICH topic you need (use \`latitude_find_docs\` if unsure)
- ✅ You're writing a prompt and need syntax reference
- ✅ You got an error and need to understand correct usage
- ✅ You want to learn a specific technique (CoT, few-shot, RAG, etc.)

## Available Topics (38)

### Core Syntax - Learn the Language
| Topic | Use When... |
|-------|-------------|
| \`overview\` | You're completely new to PromptL |
| \`structure\` | You need to understand prompt format (config + messages) |
| \`variables\` | You want dynamic content with {{ }} |
| \`conditionals\` | You need if/else logic in prompts |
| \`loops\` | You need to iterate (few-shot examples, lists) |
| \`references\` | You want to include/chain other prompts |
| \`tools\` | You want the AI to call functions |
| \`chains\` | You need multi-step reasoning with <step> |
| \`agents\` | You want multiple AI agents collaborating |
| \`techniques\` | Overview of prompting techniques |
| \`agent-patterns\` | Advanced multi-agent orchestration |

### Configuration - Control the AI
| Topic | Use When... |
|-------|-------------|
| \`config-basics\` | You need to set provider/model |
| \`config-generation\` | You want to tune temperature, maxTokens |
| \`config-json-output\` | You need structured JSON responses |
| \`config-advanced\` | You need maxSteps, retries, seed |
| \`providers-openai\` | You're using GPT-4/GPT-3.5 |
| \`providers-anthropic\` | You're using Claude |
| \`providers-google\` | You're using Gemini |

### Messages - Structure Conversations
| Topic | Use When... |
|-------|-------------|
| \`messages-roles\` | You need system/user/assistant messages |
| \`messages-multimodal\` | You're sending images or files |

### Tools - Function Calling
| Topic | Use When... |
|-------|-------------|
| \`tools-builtin\` | You want latitude/search, /code, /extract |
| \`tools-custom\` | You're defining your own tools |
| \`tools-schema\` | You need complex JSON Schema for tools |

### Techniques - Prompting Patterns
| Topic | Use When... |
|-------|-------------|
| \`technique-role\` | You want expert personas |
| \`technique-few-shot\` | You're providing examples |
| \`technique-cot\` | You need step-by-step reasoning |
| \`technique-tot\` | You want branching/evaluating approaches |

### Recipes - Complete Solutions
| Topic | Use When... |
|-------|-------------|
| \`recipe-classification\` | You're classifying text (sentiment, intent) |
| \`recipe-extraction\` | You're extracting structured data |
| \`recipe-generation\` | You're generating content |
| \`recipe-chatbot\` | You're building a conversational bot |
| \`recipe-rag\` | You're doing retrieval-augmented generation |

### Guides - Best Practices
| Topic | Use When... |
|-------|-------------|
| \`conversation-history\` | You need multi-turn context |
| \`guide-debugging\` | Something isn't working |
| \`guide-safety\` | You need guardrails |
| \`guide-performance\` | You're optimizing tokens/cost |
| \`guide-testing\` | You're testing prompts |
| \`guide-versioning\` | You're managing draft/live versions |

## What You Get Back
1. **JSON metadata**: Title, description, related topics, suggested tools, next actions
2. **Markdown documentation**: Full syntax guide with code examples

## Recommended Flow
\`\`\`
1. latitude_get_docs({ topic: "structure" })  → Understand basic format
2. latitude_get_docs({ topic: "variables" })  → Learn {{ }} syntax
3. Write your prompt
4. latitude_push_prompt                        → Push to Latitude
5. latitude_run_prompt                         → Test it
\`\`\``;

const FIND_DOCS_DESC = `# Discover Relevant Documentation - Semantic Search

**PURPOSE:** Don't know which topic to read? Describe what you're trying to do in plain language, and this tool finds the most relevant documentation topics.

## How It Works
The tool scores each of the 38 documentation topics against your query by checking:
1. **Title match** - Does the topic title contain your keywords?
2. **Description match** - Does the description relate to your goal?
3. **Trigger phrases** - Each topic has "useWhen" triggers (e.g., "json output", "chatbot", "error")
4. **Topic name** - Does the topic slug match?

Results are ranked by relevance score, highest first.

## When to Use This Tool
- ✅ You're not sure which documentation topic to read
- ✅ You have a goal but don't know the PromptL terminology
- ✅ You're troubleshooting and need guidance
- ✅ You want to discover related topics

## Query Examples

| Your Query | Top Results |
|------------|-------------|
| "extract JSON from text" | config-json-output, recipe-extraction |
| "build a chatbot with memory" | recipe-chatbot, conversation-history |
| "my conditional isn't working" | guide-debugging, conditionals |
| "use Claude instead of GPT" | providers-anthropic, config-basics |
| "step by step reasoning" | technique-cot, chains |
| "classify sentiment" | recipe-classification, config-json-output |
| "include images in prompt" | messages-multimodal |
| "reuse prompts" | references |
| "too random output" | config-generation, guide-debugging |
| "multiple AI agents" | agents, agent-patterns |

## What You Get Back
\`\`\`json
{
  "query": "your query",
  "matchedTopics": [
    {
      "topic": "topic-name",
      "title": "Human Title",
      "description": "What this topic covers",
      "relevanceScore": 24,
      "getDocsCommand": "latitude_get_docs({ topic: \\"topic-name\\" })"
    }
  ],
  "suggestion": "Start with: latitude_get_docs({ topic: \\"best-match\\" })"
}
\`\`\`

## Recommended Flow
\`\`\`
1. latitude_find_docs({ query: "your goal" })  → Discover topics
2. latitude_get_docs({ topic: "top-result" })  → Read documentation
3. Write your prompt using the syntax learned
4. latitude_push_prompt                         → Push to Latitude
5. latitude_run_prompt                          → Test it
\`\`\`

## Tips
- **Be specific**: "extract email and phone from text" > "extract data"
- **Describe the problem**: "output is too random" > "temperature"
- **Use natural language**: No need for technical terms`;

// ============================================================================
// Find Docs Input Schema
// ============================================================================

const FindDocsInputSchema = z.object({
	query: z
		.string()
		.describe(
			'Describe what you want to accomplish in plain language. Examples: "build a chatbot with memory", "extract JSON from text", "my conditional isnt working", "use Claude instead of GPT", "step by step reasoning", "classify sentiment". Be specific about your goal - the tool matches against 38 documentation topics.',
		),
	maxResults: z
		.number()
		.optional()
		.default(5)
		.describe(
			'How many topics to return (1-10). Default: 5. Use fewer for focused results, more for broader exploration.',
		),
});

// ============================================================================
// Tool Handlers
// ============================================================================

/**
 * Handle latitude_help tool call
 * Returns comprehensive server overview
 */
async function handleHelp() {
	const methodLogger = toolLogger.forMethod('handleHelp');
	methodLogger.debug('Help requested');

	return {
		content: [
			{
				type: 'text' as const,
				text: JSON.stringify(
					{
						server: 'Latitude MCP Server',
						totalTools: 19,
						docTools: 3,
						latitudeTools: 16,
						documentationTopics: {
							total: Object.keys(DOCS_TOPIC_METADATA).length,
							categories: {
								syntax: [
									'overview',
									'structure',
									'variables',
									'conditionals',
									'loops',
									'references',
									'tools',
									'chains',
									'agents',
									'techniques',
									'agent-patterns',
								],
								config: [
									'config-basics',
									'config-generation',
									'config-json-output',
									'config-advanced',
									'providers-openai',
									'providers-anthropic',
									'providers-google',
								],
								messages: [
									'messages-roles',
									'messages-multimodal',
								],
								toolsDocs: [
									'tools-builtin',
									'tools-custom',
									'tools-schema',
								],
								techniques: [
									'technique-role',
									'technique-few-shot',
									'technique-cot',
									'technique-tot',
								],
								recipes: [
									'recipe-classification',
									'recipe-extraction',
									'recipe-generation',
									'recipe-chatbot',
									'recipe-rag',
								],
								guides: [
									'conversation-history',
									'guide-debugging',
									'guide-safety',
									'guide-performance',
									'guide-testing',
									'guide-versioning',
								],
							},
						},
						suggestedNextActions: [
							'latitude_find_docs({ query: "your goal" })',
							'latitude_get_docs({ topic: "overview" })',
							'latitude_get_docs({ topic: "config-basics" })',
							'latitude_list_projects',
						],
					},
					null,
					2,
				),
				mimeType: 'application/json',
			},
			{
				type: 'text' as const,
				text: HELP_CONTENT,
			},
		],
	};
}

/**
 * Handle latitude_get_docs tool call
 * Returns documentation for the specified topic
 */
async function handleGetDocs(args: Record<string, unknown>) {
	const methodLogger = toolLogger.forMethod('handleGetDocs');
	const topic = args.topic as DocsTopic;

	methodLogger.debug('Documentation requested', { topic });

	const content = DOCS_MAP[topic];
	const metadata = DOCS_TOPIC_METADATA[topic];

	if (!content) {
		return {
			content: [
				{
					type: 'text' as const,
					text: `Error: Unknown topic "${topic}". Available topics: ${Object.keys(DOCS_MAP).join(', ')}`,
				},
			],
		};
	}

	return {
		content: [
			{
				type: 'text' as const,
				text: JSON.stringify(
					{
						topic,
						title: metadata.title,
						description: metadata.description,
						relatedTopics: metadata.relatedTopics,
						suggestedTools: metadata.suggestedTools,
						nextActions: [
							...metadata.relatedTopics.map(
								(t) => `latitude_get_docs({ topic: "${t}" })`,
							),
							...metadata.suggestedTools.map((t) => t),
						],
					},
					null,
					2,
				),
				mimeType: 'application/json',
			},
			{
				type: 'text' as const,
				text: content,
			},
		],
	};
}

/**
 * Handle latitude_find_docs tool call
 * Searches for relevant documentation topics based on query
 */
async function handleFindDocs(args: Record<string, unknown>) {
	const methodLogger = toolLogger.forMethod('handleFindDocs');
	const query = (args.query as string).toLowerCase();
	const maxResults = (args.maxResults as number) || 5;

	methodLogger.debug('Finding docs for query', { query, maxResults });

	// Score each topic based on query match
	const scored = Object.entries(DOCS_TOPIC_METADATA).map(([topic, meta]) => {
		let score = 0;
		const queryWords = query.split(/\s+/);

		// Check title match
		if (meta.title.toLowerCase().includes(query)) score += 10;

		// Check description match
		if (meta.description.toLowerCase().includes(query)) score += 5;

		// Check useWhen triggers
		for (const trigger of meta.useWhen) {
			if (query.includes(trigger.toLowerCase())) score += 8;
			for (const word of queryWords) {
				if (trigger.toLowerCase().includes(word)) score += 3;
			}
		}

		// Check topic name
		if (topic.includes(query)) score += 6;
		for (const word of queryWords) {
			if (topic.includes(word)) score += 2;
		}

		return { topic: topic as DocsTopic, meta, score };
	});

	// Sort by score and take top results
	const results = scored
		.filter((s) => s.score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, maxResults);

	if (results.length === 0) {
		return {
			content: [
				{
					type: 'text' as const,
					text: `No matching topics found for "${query}". Try a different description or use \`latitude_help\` to see all topics.`,
				},
			],
		};
	}

	return {
		content: [
			{
				type: 'text' as const,
				text: JSON.stringify(
					{
						query,
						matchedTopics: results.map((r) => ({
							topic: r.topic,
							title: r.meta.title,
							description: r.meta.description,
							relevanceScore: r.score,
							getDocsCommand: `latitude_get_docs({ topic: "${r.topic}" })`,
						})),
						suggestion: `Start with: latitude_get_docs({ topic: "${results[0].topic}" })`,
					},
					null,
					2,
				),
				mimeType: 'application/json',
			},
		],
	};
}

// ============================================================================
// Tool Registration
// ============================================================================

/**
 * Register documentation tools with the MCP server
 *
 * @param server The MCP server instance
 */
function registerTools(server: McpServer) {
	const registerLogger = toolLogger.forMethod('registerTools');
	registerLogger.debug('Registering documentation tools...');

	// Help tool
	server.registerTool(
		'latitude_help',
		{
			title: 'Latitude Server Help',
			description: HELP_DESC,
			inputSchema: HelpInputSchema,
		},
		handleHelp,
	);

	// Get documentation tool
	server.registerTool(
		'latitude_get_docs',
		{
			title: 'Get PromptL Documentation',
			description: GET_DOCS_DESC,
			inputSchema: GetDocsInputSchema,
		},
		handleGetDocs,
	);

	// Find documentation tool (semantic search)
	server.registerTool(
		'latitude_find_docs',
		{
			title: 'Find Relevant Documentation',
			description: FIND_DOCS_DESC,
			inputSchema: FindDocsInputSchema,
		},
		handleFindDocs,
	);

	registerLogger.debug('Successfully registered 3 documentation tools');
}

export default { registerTools };
