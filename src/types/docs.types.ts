import { z } from 'zod';

/**
 * Documentation Types and Zod Schemas
 *
 * Defines schemas for the documentation tools:
 * - latitude_help: Server overview and capabilities
 * - latitude_get_docs: PromptL documentation by topic
 */

// ============================================================================
// Documentation Topic Enum
// ============================================================================

/**
 * Available documentation topics for PromptL
 * Organized by category prefix:
 * - (no prefix): Core syntax topics
 * - config-*: Configuration options
 * - tools-*: Tool-related docs
 * - technique-*: Prompting techniques
 * - recipe-*: Task-oriented templates
 * - guide-*: Best practices & debugging
 */
export const DocsTopicEnum = z.enum([
	// Core syntax (original topics)
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
	// Phase 1 - Tier 1 topics
	'config-json-output',
	'config-generation',
	'tools-builtin',
	'technique-role',
	'recipe-classification',
	'recipe-extraction',
	'conversation-history',
	'guide-debugging',
	// Phase 2 - Tier 2 topics
	'config-basics',
	'config-advanced',
	'messages-roles',
	'messages-multimodal',
	'tools-custom',
	'tools-schema',
	'technique-few-shot',
	'technique-cot',
	'technique-tot',
	'recipe-generation',
	'recipe-chatbot',
	'guide-safety',
	'guide-performance',
	// Phase 3 - Tier 3 topics
	'recipe-rag',
	'agent-patterns',
	'guide-testing',
	'guide-versioning',
	'providers-openai',
	'providers-anthropic',
	'providers-google',
]);

export type DocsTopic = z.infer<typeof DocsTopicEnum>;

// ============================================================================
// Topic Categories
// ============================================================================

export type DocsCategory =
	| 'syntax'
	| 'config'
	| 'tools'
	| 'technique'
	| 'recipe'
	| 'guide';
export type DocsDifficulty = 'beginner' | 'intermediate' | 'advanced';

// ============================================================================
// Tool Input Schemas
// ============================================================================

/**
 * Input schema for latitude_help tool
 * No parameters required - returns full server overview
 */
export const HelpInputSchema = z.object({});

/**
 * Input schema for latitude_get_docs tool
 * Takes a topic enum to return specific documentation
 */
export const GetDocsInputSchema = z.object({
	topic: DocsTopicEnum.describe(`Which PromptL topic to learn. If unsure, use latitude_find_docs first.

**QUICK DECISION GUIDE:**
- New to PromptL? → "overview" then "structure"
- Need dynamic content? → "variables"
- Need if/else logic? → "conditionals"
- Need to loop/iterate? → "loops"
- Need JSON output? → "config-json-output"
- Need step-by-step AI reasoning? → "technique-cot"
- Building a chatbot? → "recipe-chatbot"
- Extracting data? → "recipe-extraction"
- Something broken? → "guide-debugging"

**ALL 38 TOPICS:**

Core Syntax (11): overview, structure, variables, conditionals, loops, references, tools, chains, agents, techniques, agent-patterns

Configuration (7): config-basics, config-generation, config-json-output, config-advanced, providers-openai, providers-anthropic, providers-google

Messages (2): messages-roles, messages-multimodal

Tools (4): tools-builtin, tools-custom, tools-schema

Techniques (4): technique-role, technique-few-shot, technique-cot, technique-tot

Recipes (5): recipe-classification, recipe-extraction, recipe-generation, recipe-chatbot, recipe-rag

Guides (6): conversation-history, guide-debugging, guide-safety, guide-performance, guide-testing, guide-versioning`),
});

// ============================================================================
// Enhanced Metadata Structure
// ============================================================================

/**
 * Enhanced topic metadata with discovery features
 */
export interface DocsTopicMetadata {
	title: string;
	description: string;
	category: DocsCategory;
	difficulty: DocsDifficulty;
	/** Trigger phrases for agent discovery - when to use this topic */
	useWhen: string[];
	/** Topics to read first */
	prerequisites: DocsTopic[];
	relatedTopics: DocsTopic[];
	suggestedTools: string[];
	/** Approximate token count for context window management */
	estimatedTokens: number;
}

// ============================================================================
// Response Types
// ============================================================================

/**
 * All available documentation topics with enhanced metadata
 */
export const DOCS_TOPIC_METADATA: Record<DocsTopic, DocsTopicMetadata> = {
	// ============================================================================
	// CORE SYNTAX TOPICS (Original)
	// ============================================================================
	overview: {
		title: 'PromptL Overview',
		description: 'Introduction to PromptL and Latitude prompt management',
		category: 'syntax',
		difficulty: 'beginner',
		useWhen: [
			'getting started',
			'new to promptl',
			'what is promptl',
			'introduction',
		],
		prerequisites: [],
		relatedTopics: ['structure', 'variables'],
		suggestedTools: ['latitude_list_projects', 'latitude_create_project'],
		estimatedTokens: 800,
	},
	structure: {
		title: 'Prompt Structure',
		description:
			'Config section (YAML) and Messages (system, user, assistant)',
		category: 'syntax',
		difficulty: 'beginner',
		useWhen: [
			'create prompt',
			'prompt format',
			'yaml config',
			'message types',
		],
		prerequisites: ['overview'],
		relatedTopics: ['overview', 'variables', 'conditionals'],
		suggestedTools: ['latitude_push_prompt', 'latitude_get_prompt'],
		estimatedTokens: 1200,
	},
	variables: {
		title: 'Variables & Expressions',
		description:
			'Dynamic content with {{ }} syntax, assignments, and defaults',
		category: 'syntax',
		difficulty: 'beginner',
		useWhen: [
			'dynamic content',
			'variables',
			'interpolation',
			'expressions',
			'defaults',
		],
		prerequisites: ['structure'],
		relatedTopics: ['conditionals', 'loops'],
		suggestedTools: ['latitude_push_prompt', 'latitude_run_prompt'],
		estimatedTokens: 1000,
	},
	conditionals: {
		title: 'Conditional Statements',
		description: 'if/else/endif logic for dynamic prompt content',
		category: 'syntax',
		difficulty: 'intermediate',
		useWhen: ['if else', 'conditional', 'dynamic logic', 'branching'],
		prerequisites: ['variables'],
		relatedTopics: ['variables', 'loops'],
		suggestedTools: ['latitude_push_prompt', 'latitude_run_prompt'],
		estimatedTokens: 1100,
	},
	loops: {
		title: 'Loops & Iteration',
		description: 'for/each iteration over arrays for few-shot examples',
		category: 'syntax',
		difficulty: 'intermediate',
		useWhen: ['loop', 'iterate', 'array', 'few-shot examples', 'repeat'],
		prerequisites: ['variables'],
		relatedTopics: ['variables', 'conditionals', 'techniques'],
		suggestedTools: ['latitude_push_prompt', 'latitude_run_prompt'],
		estimatedTokens: 900,
	},
	references: {
		title: 'Prompt References',
		description: 'Include and chain prompts with <prompt> tag',
		category: 'syntax',
		difficulty: 'intermediate',
		useWhen: [
			'include prompt',
			'reuse prompt',
			'modular',
			'prompt composition',
		],
		prerequisites: ['structure'],
		relatedTopics: ['chains', 'agents'],
		suggestedTools: ['latitude_list_prompts', 'latitude_push_prompt'],
		estimatedTokens: 800,
	},
	tools: {
		title: 'Tool Use & Function Calling',
		description: 'Enable AI to call external functions with JSON Schema',
		category: 'tools',
		difficulty: 'intermediate',
		useWhen: ['function calling', 'tool use', 'external api', 'actions'],
		prerequisites: ['structure'],
		relatedTopics: ['structure', 'agents', 'tools-builtin'],
		suggestedTools: ['latitude_push_prompt', 'latitude_run_prompt'],
		estimatedTokens: 1300,
	},
	chains: {
		title: 'Chains & Multi-Step',
		description: 'Sequential reasoning with <step> tags',
		category: 'syntax',
		difficulty: 'advanced',
		useWhen: [
			'multi-step',
			'chain',
			'sequential',
			'pipeline',
			'step by step',
		],
		prerequisites: ['structure', 'variables'],
		relatedTopics: ['references', 'agents', 'techniques'],
		suggestedTools: ['latitude_push_prompt', 'latitude_run_prompt'],
		estimatedTokens: 1200,
	},
	agents: {
		title: 'Multi-Agent Systems',
		description: 'Orchestrate multiple AI agents for complex tasks',
		category: 'syntax',
		difficulty: 'advanced',
		useWhen: [
			'multi-agent',
			'agent',
			'orchestration',
			'collaboration',
			'team',
		],
		prerequisites: ['chains', 'references'],
		relatedTopics: ['chains', 'tools', 'references'],
		suggestedTools: ['latitude_push_prompt', 'latitude_run_prompt'],
		estimatedTokens: 1400,
	},
	techniques: {
		title: 'Prompting Techniques',
		description:
			'Few-shot, Chain-of-Thought, Tree-of-Thoughts, Role prompting',
		category: 'technique',
		difficulty: 'intermediate',
		useWhen: [
			'few-shot',
			'chain of thought',
			'cot',
			'tot',
			'role prompting',
			'techniques',
		],
		prerequisites: ['loops', 'chains'],
		relatedTopics: ['loops', 'chains', 'agents'],
		suggestedTools: ['latitude_push_prompt', 'latitude_run_prompt'],
		estimatedTokens: 1600,
	},

	// ============================================================================
	// PHASE 1 - TIER 1 TOPICS (NEW)
	// ============================================================================

	'config-json-output': {
		title: 'Enforcing JSON Output',
		description: 'Schema definition for structured JSON responses',
		category: 'config',
		difficulty: 'intermediate',
		useWhen: [
			'json output',
			'structured output',
			'schema',
			'parse response',
			'extract data',
			'enforce format',
			'json schema',
		],
		prerequisites: ['structure'],
		relatedTopics: ['recipe-extraction', 'tools'],
		suggestedTools: ['latitude_push_prompt', 'latitude_run_prompt'],
		estimatedTokens: 1100,
	},
	'config-generation': {
		title: 'Generation Parameters',
		description:
			'temperature, topP, topK, maxTokens, penalties for output control',
		category: 'config',
		difficulty: 'intermediate',
		useWhen: [
			'temperature',
			'too random',
			'too deterministic',
			'response length',
			'creativity',
			'sampling',
			'penalties',
		],
		prerequisites: ['structure'],
		relatedTopics: ['structure', 'guide-debugging'],
		suggestedTools: ['latitude_push_prompt', 'latitude_run_prompt'],
		estimatedTokens: 900,
	},
	'tools-builtin': {
		title: 'Built-in Latitude Tools',
		description:
			'latitude/search, latitude/code, latitude/extract - powerful pre-built tools',
		category: 'tools',
		difficulty: 'beginner',
		useWhen: [
			'web search',
			'search internet',
			'execute code',
			'extract data',
			'built-in tools',
			'latitude tools',
		],
		prerequisites: ['tools'],
		relatedTopics: ['tools', 'recipe-extraction'],
		suggestedTools: ['latitude_push_prompt', 'latitude_run_prompt'],
		estimatedTokens: 1000,
	},
	'technique-role': {
		title: 'Role Prompting',
		description:
			'Expert roles, dynamic roles, constrained roles, character personas',
		category: 'technique',
		difficulty: 'intermediate',
		useWhen: [
			'role',
			'persona',
			'act as',
			'expert',
			'character',
			'perspective',
			'specialist',
		],
		prerequisites: ['structure'],
		relatedTopics: ['techniques', 'agents'],
		suggestedTools: ['latitude_push_prompt', 'latitude_run_prompt'],
		estimatedTokens: 1400,
	},
	'recipe-classification': {
		title: 'Classification Patterns',
		description:
			'Sentiment, intent, category classification with few-shot examples',
		category: 'recipe',
		difficulty: 'intermediate',
		useWhen: [
			'classify',
			'sentiment',
			'intent',
			'categorize',
			'label',
			'classification',
		],
		prerequisites: ['loops', 'variables'],
		relatedTopics: ['loops', 'techniques', 'config-json-output'],
		suggestedTools: ['latitude_push_prompt', 'latitude_run_prompt'],
		estimatedTokens: 1200,
	},
	'recipe-extraction': {
		title: 'Data Extraction Patterns',
		description: 'Entity extraction, structured data parsing from text',
		category: 'recipe',
		difficulty: 'intermediate',
		useWhen: [
			'extract',
			'parse',
			'entity',
			'structured data',
			'pull information',
			'ner',
		],
		prerequisites: ['config-json-output'],
		relatedTopics: ['config-json-output', 'tools-builtin'],
		suggestedTools: ['latitude_push_prompt', 'latitude_run_prompt'],
		estimatedTokens: 1300,
	},
	'conversation-history': {
		title: 'Conversation History & Context',
		description:
			'Building context, message injection, multi-turn conversations',
		category: 'guide',
		difficulty: 'intermediate',
		useWhen: [
			'chatbot',
			'conversation',
			'history',
			'context',
			'multi-turn',
			'memory',
			'remember',
		],
		prerequisites: ['structure', 'loops'],
		relatedTopics: ['structure', 'loops', 'agents'],
		suggestedTools: ['latitude_chat', 'latitude_get_conversation'],
		estimatedTokens: 1100,
	},
	'guide-debugging': {
		title: 'Debugging & Troubleshooting',
		description:
			'Common errors, debugging techniques, fixing prompt issues',
		category: 'guide',
		difficulty: 'beginner',
		useWhen: [
			'error',
			'not working',
			'debug',
			'fix',
			'troubleshoot',
			'problem',
			'issue',
			'broken',
		],
		prerequisites: [],
		relatedTopics: ['variables', 'conditionals', 'config-generation'],
		suggestedTools: ['latitude_get_prompt', 'latitude_run_prompt'],
		estimatedTokens: 1000,
	},

	// ============================================================================
	// PHASE 2 - TIER 2 TOPICS
	// ============================================================================

	'config-basics': {
		title: 'Configuration Basics',
		description: 'Provider, model, and essential config settings',
		category: 'config',
		difficulty: 'beginner',
		useWhen: [
			'provider',
			'model',
			'basic config',
			'setup',
			'getting started',
		],
		prerequisites: ['overview'],
		relatedTopics: ['structure', 'config-generation'],
		suggestedTools: ['latitude_push_prompt', 'latitude_get_prompt'],
		estimatedTokens: 800,
	},
	'config-advanced': {
		title: 'Advanced Configuration',
		description: 'maxSteps, maxRetries, headers, seed, stopSequences',
		category: 'config',
		difficulty: 'advanced',
		useWhen: [
			'maxSteps',
			'retries',
			'headers',
			'seed',
			'stop sequences',
			'advanced',
		],
		prerequisites: ['config-basics', 'config-generation'],
		relatedTopics: ['chains', 'agents'],
		suggestedTools: ['latitude_push_prompt', 'latitude_run_prompt'],
		estimatedTokens: 900,
	},
	'messages-roles': {
		title: 'Message Roles',
		description: 'System, user, assistant, tool message types',
		category: 'syntax',
		difficulty: 'beginner',
		useWhen: [
			'system message',
			'user message',
			'assistant',
			'message types',
			'roles',
		],
		prerequisites: ['structure'],
		relatedTopics: ['structure', 'conversation-history'],
		suggestedTools: ['latitude_push_prompt', 'latitude_run_prompt'],
		estimatedTokens: 900,
	},
	'messages-multimodal': {
		title: 'Multimodal Messages',
		description: 'Images, files, and rich content in messages',
		category: 'syntax',
		difficulty: 'intermediate',
		useWhen: [
			'image',
			'file',
			'multimodal',
			'vision',
			'picture',
			'attachment',
		],
		prerequisites: ['messages-roles'],
		relatedTopics: ['structure', 'config-basics'],
		suggestedTools: ['latitude_push_prompt', 'latitude_run_prompt'],
		estimatedTokens: 1000,
	},
	'tools-custom': {
		title: 'Custom Tool Definition',
		description: 'Define custom tools with JSON Schema parameters',
		category: 'tools',
		difficulty: 'intermediate',
		useWhen: [
			'custom tool',
			'define tool',
			'create function',
			'function calling',
		],
		prerequisites: ['tools'],
		relatedTopics: ['tools', 'tools-schema', 'agents'],
		suggestedTools: ['latitude_push_prompt', 'latitude_run_prompt'],
		estimatedTokens: 1200,
	},
	'tools-schema': {
		title: 'Tool Schema Deep Dive',
		description:
			'JSON Schema for tool parameters - types, constraints, nesting',
		category: 'tools',
		difficulty: 'advanced',
		useWhen: ['json schema', 'tool parameters', 'nested', 'complex schema'],
		prerequisites: ['tools-custom'],
		relatedTopics: ['tools-custom', 'config-json-output'],
		suggestedTools: ['latitude_push_prompt', 'latitude_run_prompt'],
		estimatedTokens: 1100,
	},
	'technique-few-shot': {
		title: 'Few-Shot Learning',
		description: 'Static and dynamic examples for in-context learning',
		category: 'technique',
		difficulty: 'intermediate',
		useWhen: [
			'few-shot',
			'examples',
			'in-context learning',
			'demonstrations',
		],
		prerequisites: ['loops'],
		relatedTopics: ['loops', 'techniques', 'recipe-classification'],
		suggestedTools: ['latitude_push_prompt', 'latitude_run_prompt'],
		estimatedTokens: 1100,
	},
	'technique-cot': {
		title: 'Chain-of-Thought',
		description: 'Step-by-step reasoning for complex problems',
		category: 'technique',
		difficulty: 'intermediate',
		useWhen: [
			'chain of thought',
			'cot',
			'reasoning',
			'step by step',
			'think',
		],
		prerequisites: ['chains'],
		relatedTopics: ['chains', 'techniques', 'technique-tot'],
		suggestedTools: ['latitude_push_prompt', 'latitude_run_prompt'],
		estimatedTokens: 1000,
	},
	'technique-tot': {
		title: 'Tree-of-Thoughts',
		description: 'Explore multiple reasoning paths and evaluate',
		category: 'technique',
		difficulty: 'advanced',
		useWhen: [
			'tree of thoughts',
			'tot',
			'branching',
			'multiple paths',
			'evaluate',
		],
		prerequisites: ['technique-cot', 'agents'],
		relatedTopics: ['technique-cot', 'agents', 'chains'],
		suggestedTools: ['latitude_push_prompt', 'latitude_run_prompt'],
		estimatedTokens: 1300,
	},
	'recipe-generation': {
		title: 'Content Generation',
		description: 'Writing, summarization, and content creation patterns',
		category: 'recipe',
		difficulty: 'intermediate',
		useWhen: [
			'generate',
			'write',
			'create content',
			'summarize',
			'article',
		],
		prerequisites: ['structure', 'technique-role'],
		relatedTopics: ['technique-role', 'chains'],
		suggestedTools: ['latitude_push_prompt', 'latitude_run_prompt'],
		estimatedTokens: 1200,
	},
	'recipe-chatbot': {
		title: 'Chatbot Patterns',
		description: 'Conversational AI, persona, memory management',
		category: 'recipe',
		difficulty: 'intermediate',
		useWhen: ['chatbot', 'conversational', 'dialogue', 'chat assistant'],
		prerequisites: ['conversation-history', 'technique-role'],
		relatedTopics: ['conversation-history', 'technique-role', 'agents'],
		suggestedTools: ['latitude_chat', 'latitude_run_prompt'],
		estimatedTokens: 1200,
	},
	'guide-safety': {
		title: 'Safety & Guardrails',
		description:
			'Content filtering, guardrails, harmful content prevention',
		category: 'guide',
		difficulty: 'intermediate',
		useWhen: ['safety', 'guardrails', 'filter', 'moderation', 'harmful'],
		prerequisites: ['structure'],
		relatedTopics: ['technique-role', 'guide-debugging'],
		suggestedTools: ['latitude_push_prompt', 'latitude_run_prompt'],
		estimatedTokens: 900,
	},
	'guide-performance': {
		title: 'Performance Optimization',
		description: 'Token optimization, caching, response efficiency',
		category: 'guide',
		difficulty: 'advanced',
		useWhen: [
			'performance',
			'optimize',
			'tokens',
			'caching',
			'cost',
			'efficiency',
		],
		prerequisites: ['config-generation'],
		relatedTopics: ['config-generation', 'config-advanced'],
		suggestedTools: ['latitude_run_prompt', 'latitude_get_prompt'],
		estimatedTokens: 1000,
	},
	'recipe-rag': {
		title: 'RAG Patterns',
		description:
			'Retrieval Augmented Generation for knowledge-grounded responses',
		category: 'recipe',
		difficulty: 'advanced',
		useWhen: [
			'rag',
			'retrieval',
			'knowledge base',
			'context injection',
			'documents',
		],
		prerequisites: ['conversation-history', 'tools-builtin'],
		relatedTopics: [
			'conversation-history',
			'tools-builtin',
			'recipe-chatbot',
		],
		suggestedTools: ['latitude_push_prompt', 'latitude_run_prompt'],
		estimatedTokens: 1200,
	},
	'agent-patterns': {
		title: 'Agent Collaboration Patterns',
		description: 'Multi-agent workflows, handoffs, orchestration patterns',
		category: 'syntax',
		difficulty: 'advanced',
		useWhen: [
			'agent patterns',
			'collaboration',
			'handoff',
			'workflow',
			'orchestration',
		],
		prerequisites: ['agents', 'chains'],
		relatedTopics: ['agents', 'chains', 'technique-tot'],
		suggestedTools: ['latitude_push_prompt', 'latitude_run_prompt'],
		estimatedTokens: 1300,
	},
	'guide-testing': {
		title: 'Testing Prompts',
		description: 'Testing strategies, playground usage, prompt evaluation',
		category: 'guide',
		difficulty: 'intermediate',
		useWhen: ['test', 'evaluate', 'playground', 'validate', 'quality'],
		prerequisites: ['structure'],
		relatedTopics: ['guide-debugging', 'guide-versioning'],
		suggestedTools: ['latitude_run_prompt', 'latitude_create_log'],
		estimatedTokens: 900,
	},
	'guide-versioning': {
		title: 'Version Management',
		description:
			'Draft vs live, version workflow, publishing best practices',
		category: 'guide',
		difficulty: 'intermediate',
		useWhen: ['version', 'draft', 'live', 'publish', 'workflow'],
		prerequisites: ['overview'],
		relatedTopics: ['guide-testing'],
		suggestedTools: [
			'latitude_create_version',
			'latitude_list_versions',
			'latitude_push_prompt',
		],
		estimatedTokens: 800,
	},
	'providers-openai': {
		title: 'OpenAI Provider',
		description: 'GPT-4, GPT-3.5 features, capabilities, best practices',
		category: 'config',
		difficulty: 'intermediate',
		useWhen: ['openai', 'gpt-4', 'gpt-3.5', 'chatgpt'],
		prerequisites: ['config-basics'],
		relatedTopics: ['config-basics', 'config-generation'],
		suggestedTools: ['latitude_push_prompt', 'latitude_run_prompt'],
		estimatedTokens: 900,
	},
	'providers-anthropic': {
		title: 'Anthropic Provider',
		description: 'Claude features, capabilities, best practices',
		category: 'config',
		difficulty: 'intermediate',
		useWhen: ['anthropic', 'claude', 'claude-3'],
		prerequisites: ['config-basics'],
		relatedTopics: ['config-basics', 'config-generation'],
		suggestedTools: ['latitude_push_prompt', 'latitude_run_prompt'],
		estimatedTokens: 900,
	},
	'providers-google': {
		title: 'Google Provider',
		description: 'Gemini features, capabilities, best practices',
		category: 'config',
		difficulty: 'intermediate',
		useWhen: ['google', 'gemini', 'bard'],
		prerequisites: ['config-basics'],
		relatedTopics: ['config-basics', 'config-generation'],
		suggestedTools: ['latitude_push_prompt', 'latitude_run_prompt'],
		estimatedTokens: 900,
	},
};
