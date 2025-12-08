/**
 * Latitude MCP Server Documentation System
 *
 * Comprehensive documentation for all PromptL syntax features.
 * 50+ topics organized by category with semantic search.
 *
 * Architecture:
 * - types.ts: Type definitions
 * - metadata.ts: Topic metadata for search
 * - help.ts: Server overview and quick start
 * - core-syntax.ts: Core PromptL syntax (12 topics)
 * - phase1.ts: Tier 1 topics (8 topics)
 * - phase2.ts: Tier 2 topics (13 topics)
 * - phase3.ts: Tier 3 topics (6 topics)
 */

import type { DocsTopic } from './types.js';
import { TOPICS } from './metadata.js';
import { HELP_CONTENT } from './help.js';
import {
	DOCS_OVERVIEW,
	DOCS_STRUCTURE,
	DOCS_VARIABLES,
	DOCS_CONDITIONALS,
	DOCS_LOOPS,
	DOCS_REFERENCES,
	DOCS_TOOLS,
	DOCS_CHAINS,
	DOCS_AGENTS,
	DOCS_TECHNIQUES,
	DOCS_AGENT_PATTERNS,
	DOCS_MOCKING,
} from './core-syntax.js';
import {
	DOCS_CONFIG_JSON_OUTPUT,
	DOCS_CONFIG_GENERATION,
	DOCS_TOOLS_BUILTIN,
	DOCS_TECHNIQUE_ROLE,
	DOCS_RECIPE_CLASSIFICATION,
	DOCS_RECIPE_EXTRACTION,
	DOCS_CONVERSATION_HISTORY,
	DOCS_GUIDE_DEBUGGING,
} from './phase1.js';
import {
	DOCS_CONFIG_BASICS,
	DOCS_CONFIG_ADVANCED,
	DOCS_MESSAGES_ROLES,
	DOCS_MESSAGES_MULTIMODAL,
	DOCS_TOOLS_CUSTOM,
	DOCS_TOOLS_SCHEMA,
	DOCS_TECHNIQUE_FEW_SHOT,
	DOCS_TECHNIQUE_COT,
	DOCS_TECHNIQUE_TOT,
	DOCS_RECIPE_GENERATION,
	DOCS_RECIPE_CHATBOT,
	DOCS_GUIDE_SAFETY,
	DOCS_GUIDE_PERFORMANCE,
} from './phase2.js';
import {
	DOCS_RECIPE_RAG,
	DOCS_GUIDE_TESTING,
	DOCS_GUIDE_VERSIONING,
	DOCS_PROVIDERS_OPENAI,
	DOCS_PROVIDERS_ANTHROPIC,
	DOCS_PROVIDERS_GOOGLE,
} from './phase3.js';
import {
	DOCS_TECHNIQUE_REACT,
	DOCS_TECHNIQUE_SELF_CONSISTENCY,
	DOCS_TECHNIQUE_CONSTITUTIONAL,
	DOCS_TECHNIQUE_SOCRATIC,
	DOCS_TECHNIQUE_META,
	DOCS_TECHNIQUE_ITERATIVE,
	DOCS_TECHNIQUE_STEP_BACK,
	DOCS_TECHNIQUE_RAG,
} from './techniques.js';
import {
	DOCS_RECIPE_ANALYSIS,
	DOCS_RECIPE_MODERATION,
	DOCS_RECIPE_SUPPORT,
	DOCS_TOOLS_ORCHESTRATION,
	DOCS_PROVIDERS_AZURE,
} from './recipes.js';

// ============================================================================
// DOCS MAP - Topic to Content Mapping (All 52 topics implemented)
// ============================================================================

export const DOCS_MAP: Record<DocsTopic, string> = {
	// Core syntax (12)
	overview: DOCS_OVERVIEW,
	structure: DOCS_STRUCTURE,
	variables: DOCS_VARIABLES,
	conditionals: DOCS_CONDITIONALS,
	loops: DOCS_LOOPS,
	references: DOCS_REFERENCES,
	tools: DOCS_TOOLS,
	chains: DOCS_CHAINS,
	agents: DOCS_AGENTS,
	techniques: DOCS_TECHNIQUES,
	'agent-patterns': DOCS_AGENT_PATTERNS,
	mocking: DOCS_MOCKING,
	// Configuration (8)
	'config-basics': DOCS_CONFIG_BASICS,
	'config-generation': DOCS_CONFIG_GENERATION,
	'config-json-output': DOCS_CONFIG_JSON_OUTPUT,
	'config-advanced': DOCS_CONFIG_ADVANCED,
	'providers-openai': DOCS_PROVIDERS_OPENAI,
	'providers-anthropic': DOCS_PROVIDERS_ANTHROPIC,
	'providers-google': DOCS_PROVIDERS_GOOGLE,
	'providers-azure': DOCS_PROVIDERS_AZURE,
	// Messages (2)
	'messages-roles': DOCS_MESSAGES_ROLES,
	'messages-multimodal': DOCS_MESSAGES_MULTIMODAL,
	// Tools (4)
	'tools-builtin': DOCS_TOOLS_BUILTIN,
	'tools-custom': DOCS_TOOLS_CUSTOM,
	'tools-schema': DOCS_TOOLS_SCHEMA,
	'tools-orchestration': DOCS_TOOLS_ORCHESTRATION,
	// Techniques (12)
	'technique-role': DOCS_TECHNIQUE_ROLE,
	'technique-few-shot': DOCS_TECHNIQUE_FEW_SHOT,
	'technique-cot': DOCS_TECHNIQUE_COT,
	'technique-tot': DOCS_TECHNIQUE_TOT,
	'technique-react': DOCS_TECHNIQUE_REACT,
	'technique-self-consistency': DOCS_TECHNIQUE_SELF_CONSISTENCY,
	'technique-constitutional': DOCS_TECHNIQUE_CONSTITUTIONAL,
	'technique-socratic': DOCS_TECHNIQUE_SOCRATIC,
	'technique-meta': DOCS_TECHNIQUE_META,
	'technique-iterative': DOCS_TECHNIQUE_ITERATIVE,
	'technique-step-back': DOCS_TECHNIQUE_STEP_BACK,
	'technique-rag': DOCS_TECHNIQUE_RAG,
	// Recipes (8)
	'recipe-classification': DOCS_RECIPE_CLASSIFICATION,
	'recipe-extraction': DOCS_RECIPE_EXTRACTION,
	'recipe-generation': DOCS_RECIPE_GENERATION,
	'recipe-chatbot': DOCS_RECIPE_CHATBOT,
	'recipe-rag': DOCS_RECIPE_RAG,
	'recipe-analysis': DOCS_RECIPE_ANALYSIS,
	'recipe-moderation': DOCS_RECIPE_MODERATION,
	'recipe-support': DOCS_RECIPE_SUPPORT,
	// Guides (6)
	'conversation-history': DOCS_CONVERSATION_HISTORY,
	'guide-debugging': DOCS_GUIDE_DEBUGGING,
	'guide-safety': DOCS_GUIDE_SAFETY,
	'guide-performance': DOCS_GUIDE_PERFORMANCE,
	'guide-testing': DOCS_GUIDE_TESTING,
	'guide-versioning': DOCS_GUIDE_VERSIONING,
};

// ============================================================================
// PUBLIC API
// ============================================================================

/**
 * Get help content (server overview)
 */
export function getHelp(): string {
	return HELP_CONTENT;
}

/**
 * Get documentation for a specific topic
 */
export function getDocs(topic: string): string {
	const normalizedTopic = topic.toLowerCase().trim();

	// Check exact match
	if (DOCS_MAP[normalizedTopic as DocsTopic]) {
		return DOCS_MAP[normalizedTopic as DocsTopic];
	}

	// Check aliases
	const aliases: Record<string, DocsTopic> = {
		json: 'config-json-output',
		schema: 'config-json-output',
		'json output': 'config-json-output',
		temp: 'config-generation',
		temperature: 'config-generation',
		tokens: 'config-generation',
		'max_tokens': 'config-generation',
		debug: 'guide-debugging',
		errors: 'guide-debugging',
		troubleshoot: 'guide-debugging',
		if: 'conditionals',
		else: 'conditionals',
		for: 'loops',
		each: 'loops',
		iterate: 'loops',
		variable: 'variables',
		'{{ }}': 'variables',
		chain: 'chains',
		step: 'chains',
		'multi-step': 'chains',
		agent: 'agents',
		'multi-agent': 'agents',
		tool: 'tools',
		function: 'tools',
		'function calling': 'tools',
		gpt: 'providers-openai',
		'gpt-5': 'providers-openai',
		'gpt-5-1': 'providers-openai',
		'gpt-5-mini': 'providers-openai',
		openai: 'providers-openai',
		claude: 'providers-anthropic',
		'claude-4': 'providers-anthropic',
		'claude-4-5': 'providers-anthropic',
		anthropic: 'providers-anthropic',
		gemini: 'providers-google',
		'gemini-3': 'providers-google',
		'gemini-2-5': 'providers-google',
		google: 'providers-google',
		'few shot': 'technique-few-shot',
		examples: 'technique-few-shot',
		cot: 'technique-cot',
		'chain of thought': 'technique-cot',
		tot: 'technique-tot',
		'tree of thoughts': 'technique-tot',
		role: 'technique-role',
		persona: 'technique-role',
		classify: 'recipe-classification',
		sentiment: 'recipe-classification',
		extract: 'recipe-extraction',
		parse: 'recipe-extraction',
		generate: 'recipe-generation',
		write: 'recipe-generation',
		chatbot: 'recipe-chatbot',
		chat: 'recipe-chatbot',
		conversation: 'recipe-chatbot',
		rag: 'recipe-rag',
		retrieval: 'recipe-rag',
		history: 'conversation-history',
		'multi-turn': 'conversation-history',
		safety: 'guide-safety',
		guardrails: 'guide-safety',
		performance: 'guide-performance',
		optimize: 'guide-performance',
		test: 'guide-testing',
		testing: 'guide-testing',
		version: 'guide-versioning',
		versions: 'guide-versioning',
	};

	if (aliases[normalizedTopic]) {
		return DOCS_MAP[aliases[normalizedTopic]];
	}

	// Not found
	const availableTopics = Object.keys(DOCS_MAP).join(', ');
	return `## Topic Not Found: "${topic}"\n\nAvailable topics: ${availableTopics}\n\nUse docs({ action: "find", query: "..." }) to search.`;
}

/**
 * Find documentation topics by query (semantic search)
 */
export function findDocs(query: string, maxResults: number = 5): string {
	const normalizedQuery = query.toLowerCase();
	const queryWords = normalizedQuery.split(/\s+/);

	// Score each topic
	const scored = Object.entries(TOPICS).map(([topic, meta]) => {
		let score = 0;

		// useWhen triggers (highest priority)
		for (const trigger of meta.useWhen) {
			if (normalizedQuery.includes(trigger.toLowerCase())) score += 12;
		}

		// Title match
		if (meta.title.toLowerCase().includes(normalizedQuery)) score += 10;

		// Description match
		if (meta.description.toLowerCase().includes(normalizedQuery)) score += 5;

		// Keyword matches
		for (const keyword of meta.keywords) {
			if (normalizedQuery.includes(keyword)) score += 8;
			for (const word of queryWords) {
				if (keyword.includes(word)) score += 3;
			}
		}

		// Topic name match
		for (const word of queryWords) {
			if (topic.includes(word)) score += 4;
		}

		// Category match
		if (normalizedQuery.includes(meta.category)) score += 3;

		return { topic, meta, score };
	});

	// Sort by score and take top results
	const results = scored
		.filter((s) => s.score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, maxResults);

	if (results.length === 0) {
		return `## No Results for "${query}"\n\nTry different keywords or use docs({ action: "help" }) to see all topics.`;
	}

	let md = `## Documentation Search: "${query}"\n\n`;
	md += `Found ${results.length} relevant topic(s):\n\n`;

	for (const r of results) {
		md += `### ${r.meta.title}\n`;
		md += `${r.meta.description}\n\n`;
		md += `-> docs({ action: "get", topic: "${r.topic}" })\n\n`;
	}

	return md;
}

/**
 * Get all available topic names
 */
export function getTopicNames(): string[] {
	return Object.keys(DOCS_MAP);
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
	getHelp,
	getDocs,
	findDocs,
	getTopicNames,
	DOCS_MAP,
	TOPICS,
};
