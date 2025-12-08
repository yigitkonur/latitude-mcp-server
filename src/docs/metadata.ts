/**
 * Topic Metadata for Semantic Search
 *
 * Contains search metadata for all 50+ documentation topics.
 * Used by findDocs() to score and rank search results.
 */

import type { DocsTopic, TopicMeta } from './types.js';

// ============================================================================
// TOPICS METADATA
// ============================================================================

export const TOPICS: Record<DocsTopic, TopicMeta> = {
	// ==========================================================================
	// CORE SYNTAX (12 topics)
	// ==========================================================================

	overview: {
		title: 'PromptL Overview',
		description:
			'Introduction to PromptL - the templating language for AI prompts. Learn the basics and when to use it.',
		category: 'core-syntax',
		difficulty: 'beginner',
		keywords: ['introduction', 'basics', 'getting started', 'what is', 'promptl'],
		useWhen: ['new to promptl', 'getting started', 'what is promptl', 'introduction'],
		relatedTopics: ['structure', 'variables'],
	},

	structure: {
		title: 'Prompt Structure',
		description:
			'Learn the two-part structure of PromptL prompts: YAML config section and messages section.',
		category: 'core-syntax',
		difficulty: 'beginner',
		keywords: ['structure', 'format', 'config', 'messages', 'yaml', 'layout'],
		useWhen: ['prompt format', 'how to structure', 'basic format', 'config section'],
		prerequisites: ['overview'],
		relatedTopics: ['config-basics', 'messages-roles'],
	},

	variables: {
		title: 'Variables & Expressions',
		description:
			'Define, interpolate, and transform variables using {{ }}. Includes defaults, expressions, and built-in $now.',
		category: 'core-syntax',
		difficulty: 'beginner',
		keywords: [
			'variables',
			'interpolation',
			'expression',
			'parameter',
			'input',
			'default',
			'$now',
		],
		useWhen: ['dynamic content', 'variables', '{{ }}', 'parameters', 'input values'],
		prerequisites: ['structure'],
		relatedTopics: ['conditionals', 'loops'],
	},

	conditionals: {
		title: 'Conditionals',
		description:
			'Use if/else/elseif logic to create dynamic prompts that adapt based on conditions.',
		category: 'core-syntax',
		difficulty: 'intermediate',
		keywords: ['if', 'else', 'elseif', 'conditional', 'logic', 'branch'],
		useWhen: ['if statement', 'conditional logic', 'branching', 'if else'],
		prerequisites: ['variables'],
		relatedTopics: ['loops', 'variables'],
	},

	loops: {
		title: 'Loops & Iteration',
		description:
			'Iterate over arrays with for/endfor. Access index, first, last for dynamic few-shot examples.',
		category: 'core-syntax',
		difficulty: 'intermediate',
		keywords: ['for', 'loop', 'iterate', 'array', 'each', 'index', 'first', 'last'],
		useWhen: ['iterate', 'loop through', 'for each', 'array', 'list of examples'],
		prerequisites: ['variables'],
		relatedTopics: ['technique-few-shot', 'conditionals'],
	},

	references: {
		title: 'References & Snippets',
		description:
			'Include and reuse prompts with <ref> tag. Create modular, maintainable prompt libraries.',
		category: 'core-syntax',
		difficulty: 'intermediate',
		keywords: ['reference', 'include', 'snippet', 'reuse', 'modular', 'import'],
		useWhen: ['reuse prompt', 'include snippet', 'modular prompts', 'import'],
		prerequisites: ['structure'],
		relatedTopics: ['agents'],
	},

	tools: {
		title: 'Tools Overview',
		description:
			'Enable AI models to call external functions. Define tools in config with JSON Schema parameters.',
		category: 'core-syntax',
		difficulty: 'intermediate',
		keywords: ['tool', 'function', 'calling', 'external', 'api'],
		useWhen: ['function calling', 'tools', 'external api', 'ai call function'],
		prerequisites: ['structure', 'config-basics'],
		relatedTopics: ['tools-builtin', 'tools-custom', 'agents'],
	},

	chains: {
		title: 'Chains & Steps',
		description:
			'Create multi-step prompts with <step> tag. Store responses, use isolated steps, parse JSON.',
		category: 'core-syntax',
		difficulty: 'advanced',
		keywords: ['chain', 'step', 'multi-step', 'workflow', 'sequence', 'as', 'isolated'],
		useWhen: ['multi-step', 'chain', 'step by step', 'workflow', 'sequence'],
		prerequisites: ['structure', 'variables'],
		relatedTopics: ['agents', 'technique-cot'],
	},

	agents: {
		title: 'Agents',
		description:
			'Create autonomous AI agents with type:agent. Agents loop, use tools, and reason until goal is achieved.',
		category: 'core-syntax',
		difficulty: 'advanced',
		keywords: ['agent', 'autonomous', 'loop', 'reasoning', 'goal', 'subagent'],
		useWhen: ['agent', 'autonomous', 'multi-step reasoning', 'tool loop'],
		prerequisites: ['tools', 'chains'],
		relatedTopics: ['agent-patterns', 'tools-builtin'],
	},

	techniques: {
		title: 'Prompting Techniques Overview',
		description:
			'Overview of all prompting techniques: role, few-shot, CoT, ToT, RAG, and more.',
		category: 'core-syntax',
		difficulty: 'intermediate',
		keywords: ['technique', 'pattern', 'method', 'approach', 'prompting'],
		useWhen: ['prompting techniques', 'best approach', 'which technique'],
		relatedTopics: ['technique-role', 'technique-cot', 'technique-few-shot'],
	},

	'agent-patterns': {
		title: 'Agent Patterns',
		description:
			'Advanced agent patterns: orchestrator-workers, evaluator-optimizer, prompt chaining.',
		category: 'core-syntax',
		difficulty: 'advanced',
		keywords: ['orchestrator', 'worker', 'evaluator', 'optimizer', 'pattern'],
		useWhen: ['agent pattern', 'orchestrator', 'multi-agent', 'complex agent'],
		prerequisites: ['agents'],
		relatedTopics: ['agents', 'chains'],
	},

	mocking: {
		title: 'Mocking Responses',
		description:
			'Mock AI responses for testing and development. Test prompts without API calls.',
		category: 'core-syntax',
		difficulty: 'intermediate',
		keywords: ['mock', 'test', 'fake', 'simulate', 'development'],
		useWhen: ['testing', 'mock response', 'without api', 'development'],
		relatedTopics: ['guide-testing'],
	},

	// ==========================================================================
	// CONFIGURATION (8 topics)
	// ==========================================================================

	'config-basics': {
		title: 'Configuration Basics',
		description:
			'Set provider and model in YAML config. Supported providers: OpenAI, Anthropic, Google.',
		category: 'configuration',
		difficulty: 'beginner',
		keywords: ['provider', 'model', 'config', 'yaml', 'setup'],
		useWhen: ['set model', 'which provider', 'configure prompt', 'basic config'],
		prerequisites: ['structure'],
		relatedTopics: ['config-generation', 'providers-openai'],
	},

	'config-generation': {
		title: 'Generation Parameters',
		description:
			'Control AI output: temperature, top_p, max_tokens, penalties, stop sequences.',
		category: 'configuration',
		difficulty: 'intermediate',
		keywords: [
			'temperature',
			'top_p',
			'max_tokens',
			'penalty',
			'stop',
			'creativity',
			'randomness',
		],
		useWhen: [
			'temperature',
			'max_tokens',
			'too random',
			'more creative',
			'deterministic',
		],
		prerequisites: ['config-basics'],
		relatedTopics: ['guide-performance'],
	},

	'config-json-output': {
		title: 'JSON Output Schema',
		description:
			'Force structured JSON responses with schema. Define objects, arrays, enums, required fields.',
		category: 'configuration',
		difficulty: 'intermediate',
		keywords: ['json', 'schema', 'structured', 'output', 'object', 'array'],
		useWhen: ['json output', 'structured response', 'schema', 'extract data'],
		prerequisites: ['config-basics'],
		relatedTopics: ['recipe-extraction', 'tools-schema'],
	},

	'config-advanced': {
		title: 'Advanced Configuration',
		description:
			'Advanced settings: maxSteps for agents/chains, maxRetries, seed for reproducibility, cache.',
		category: 'configuration',
		difficulty: 'advanced',
		keywords: ['maxSteps', 'retries', 'seed', 'cache', 'reproducible'],
		useWhen: ['max steps', 'retry', 'reproducible', 'caching', 'seed'],
		prerequisites: ['config-basics', 'chains'],
		relatedTopics: ['agents', 'guide-performance'],
	},

	'providers-openai': {
		title: 'OpenAI Provider',
		description: 'Use GPT-5 models with OpenAI. Model selection and features.',
		category: 'providers',
		difficulty: 'beginner',
		keywords: ['openai', 'gpt', 'gpt-5', 'gpt-5-1', 'gpt-5-mini'],
		useWhen: ['openai', 'gpt-5', 'gpt model', 'chatgpt'],
		prerequisites: ['config-basics'],
		relatedTopics: ['providers-anthropic', 'providers-google'],
	},

	'providers-anthropic': {
		title: 'Anthropic Provider',
		description:
			'Use Claude 4.5 models with Anthropic. Model selection and features.',
		category: 'providers',
		difficulty: 'beginner',
		keywords: ['anthropic', 'claude', 'opus', 'sonnet', 'haiku', 'claude-4-5'],
		useWhen: ['claude', 'anthropic', 'claude-4', 'opus', 'sonnet'],
		prerequisites: ['config-basics'],
		relatedTopics: ['providers-openai', 'providers-google'],
	},

	'providers-google': {
		title: 'Google Provider',
		description: 'Use Gemini 2.5 and 3 models with Google. Model selection and features.',
		category: 'providers',
		difficulty: 'beginner',
		keywords: ['google', 'gemini', 'gemini-3-pro', 'gemini-2-5-flash'],
		useWhen: ['gemini', 'google', 'gemini-pro'],
		prerequisites: ['config-basics'],
		relatedTopics: ['providers-openai', 'providers-anthropic'],
	},

	'providers-azure': {
		title: 'Azure OpenAI Provider',
		description: 'Use Azure-hosted OpenAI models. Deployment and endpoint configuration.',
		category: 'providers',
		difficulty: 'intermediate',
		keywords: ['azure', 'azure openai', 'deployment', 'endpoint'],
		useWhen: ['azure', 'azure openai', 'enterprise'],
		prerequisites: ['config-basics', 'providers-openai'],
		relatedTopics: ['providers-openai'],
	},

	// ==========================================================================
	// MESSAGES (2 topics)
	// ==========================================================================

	'messages-roles': {
		title: 'Message Roles',
		description:
			'Define system, user, assistant, tool messages. Use <system>, <user>, <assistant>, <tool> tags.',
		category: 'messages',
		difficulty: 'beginner',
		keywords: ['system', 'user', 'assistant', 'tool', 'role', 'message'],
		useWhen: ['system message', 'user message', 'message roles', 'conversation'],
		prerequisites: ['structure'],
		relatedTopics: ['messages-multimodal', 'recipe-chatbot'],
	},

	'messages-multimodal': {
		title: 'Multimodal Messages',
		description:
			'Send images and files in prompts. Use <content-image>, <content-file> for vision models.',
		category: 'messages',
		difficulty: 'intermediate',
		keywords: ['image', 'file', 'multimodal', 'vision', 'picture', 'pdf'],
		useWhen: ['image', 'file', 'picture', 'vision', 'multimodal'],
		prerequisites: ['messages-roles'],
		relatedTopics: ['messages-roles'],
	},

	// ==========================================================================
	// TOOLS (4 topics)
	// ==========================================================================

	'tools-builtin': {
		title: 'Latitude Built-in Tools',
		description:
			'Use latitude/search, latitude/code, latitude/extract. Web search, code execution, content extraction.',
		category: 'tools',
		difficulty: 'intermediate',
		keywords: ['latitude', 'search', 'code', 'extract', 'builtin', 'web'],
		useWhen: ['search web', 'run code', 'extract content', 'builtin tools'],
		prerequisites: ['tools'],
		relatedTopics: ['tools-custom', 'agents'],
	},

	'tools-custom': {
		title: 'Custom Tools',
		description:
			'Define your own tools with description and JSON Schema parameters. Connect to any API.',
		category: 'tools',
		difficulty: 'intermediate',
		keywords: ['custom', 'define', 'api', 'function', 'own tool'],
		useWhen: ['custom tool', 'my api', 'define function', 'connect api'],
		prerequisites: ['tools'],
		relatedTopics: ['tools-schema', 'tools-builtin'],
	},

	'tools-schema': {
		title: 'Tool JSON Schema',
		description:
			'Define tool parameters with JSON Schema. Types, properties, required, enum, arrays.',
		category: 'tools',
		difficulty: 'intermediate',
		keywords: ['schema', 'json schema', 'parameters', 'type', 'properties'],
		useWhen: ['tool parameters', 'json schema', 'complex parameters'],
		prerequisites: ['tools-custom'],
		relatedTopics: ['config-json-output'],
	},

	'tools-orchestration': {
		title: 'Tool Orchestration',
		description:
			'Coordinate multiple tools in agents. Chaining tool calls, error handling, fallbacks.',
		category: 'tools',
		difficulty: 'advanced',
		keywords: ['orchestration', 'multiple tools', 'chain', 'coordinate'],
		useWhen: ['multiple tools', 'orchestrate', 'tool chain'],
		prerequisites: ['tools-custom', 'agents'],
		relatedTopics: ['agent-patterns'],
	},

	// ==========================================================================
	// TECHNIQUES (12 topics)
	// ==========================================================================

	'technique-role': {
		title: 'Role Prompting',
		description:
			'Assign expert personas to AI. "You are a senior software engineer..." improves domain responses.',
		category: 'techniques',
		difficulty: 'beginner',
		keywords: ['role', 'persona', 'expert', 'character', 'act as'],
		useWhen: ['persona', 'act as', 'expert role', 'you are a'],
		relatedTopics: ['messages-roles', 'technique-few-shot'],
	},

	'technique-few-shot': {
		title: 'Few-Shot Learning',
		description:
			'Provide examples to guide AI behavior. Show input/output pairs to teach desired format.',
		category: 'techniques',
		difficulty: 'intermediate',
		keywords: ['few-shot', 'examples', 'demonstrate', 'show', 'sample'],
		useWhen: ['examples', 'few-shot', 'show samples', 'demonstrate'],
		prerequisites: ['loops'],
		relatedTopics: ['loops', 'technique-role'],
	},

	'technique-cot': {
		title: 'Chain of Thought (CoT)',
		description:
			'Guide AI through step-by-step reasoning. "Let\'s think step by step" for complex problems.',
		category: 'techniques',
		difficulty: 'intermediate',
		keywords: ['chain of thought', 'cot', 'step by step', 'reasoning', 'think'],
		useWhen: ['step by step', 'reasoning', 'chain of thought', 'complex problem'],
		relatedTopics: ['chains', 'technique-tot'],
	},

	'technique-tot': {
		title: 'Tree of Thoughts (ToT)',
		description:
			'Explore multiple reasoning paths. Generate, evaluate, and select best approach.',
		category: 'techniques',
		difficulty: 'advanced',
		keywords: ['tree of thoughts', 'tot', 'branches', 'multiple paths', 'evaluate'],
		useWhen: ['multiple approaches', 'tree of thoughts', 'explore options'],
		prerequisites: ['technique-cot'],
		relatedTopics: ['technique-cot', 'agent-patterns'],
	},

	'technique-react': {
		title: 'ReAct (Reasoning + Acting)',
		description:
			'Combine reasoning with tool actions. Think → Act → Observe → Repeat pattern.',
		category: 'techniques',
		difficulty: 'advanced',
		keywords: ['react', 'reasoning', 'acting', 'observe', 'think act'],
		useWhen: ['react pattern', 'reasoning and acting', 'think then act'],
		prerequisites: ['tools', 'technique-cot'],
		relatedTopics: ['agents', 'technique-cot'],
	},

	'technique-self-consistency': {
		title: 'Self-Consistency',
		description:
			'Generate multiple responses and select most consistent. Improves accuracy on reasoning tasks.',
		category: 'techniques',
		difficulty: 'advanced',
		keywords: ['self-consistency', 'multiple', 'vote', 'consensus', 'majority'],
		useWhen: ['self consistency', 'multiple answers', 'vote', 'consensus'],
		prerequisites: ['technique-cot'],
		relatedTopics: ['technique-cot', 'agent-patterns'],
	},

	'technique-constitutional': {
		title: 'Constitutional AI',
		description:
			'Define principles AI must follow. Self-critique against rules for safer outputs.',
		category: 'techniques',
		difficulty: 'advanced',
		keywords: ['constitutional', 'principles', 'rules', 'critique', 'safe'],
		useWhen: ['principles', 'rules', 'constitutional', 'safe ai'],
		relatedTopics: ['guide-safety', 'technique-iterative'],
	},

	'technique-socratic': {
		title: 'Socratic Questioning',
		description:
			'Guide through questions rather than direct answers. Promotes deeper understanding.',
		category: 'techniques',
		difficulty: 'intermediate',
		keywords: ['socratic', 'questions', 'teaching', 'guide', 'inquiry'],
		useWhen: ['socratic', 'questions', 'teaching', 'guide thinking'],
		relatedTopics: ['technique-cot'],
	},

	'technique-meta': {
		title: 'Meta-Prompting',
		description:
			'AI generates or improves prompts. Use AI to optimize your prompting strategy.',
		category: 'techniques',
		difficulty: 'advanced',
		keywords: ['meta', 'generate prompt', 'improve prompt', 'optimize'],
		useWhen: ['meta prompting', 'generate prompt', 'improve prompt'],
		relatedTopics: ['technique-iterative'],
	},

	'technique-iterative': {
		title: 'Iterative Refinement',
		description:
			'Improve output through multiple passes. Generate → Critique → Refine loop.',
		category: 'techniques',
		difficulty: 'intermediate',
		keywords: ['iterative', 'refine', 'improve', 'critique', 'revise'],
		useWhen: ['refine', 'improve output', 'iterative', 'revise'],
		relatedTopics: ['chains', 'technique-constitutional'],
	},

	'technique-step-back': {
		title: 'Step-Back Prompting',
		description:
			'Ask high-level question first, then specific. Abstracts problem for better reasoning.',
		category: 'techniques',
		difficulty: 'intermediate',
		keywords: ['step back', 'abstract', 'high level', 'general first'],
		useWhen: ['step back', 'abstract', 'high level first'],
		relatedTopics: ['technique-cot'],
	},

	'technique-rag': {
		title: 'RAG Technique',
		description:
			'Retrieval-Augmented Generation. Search for context, then generate grounded response.',
		category: 'techniques',
		difficulty: 'intermediate',
		keywords: ['rag', 'retrieval', 'augmented', 'search', 'context'],
		useWhen: ['rag', 'retrieval', 'search context', 'grounded'],
		relatedTopics: ['recipe-rag', 'tools-builtin'],
	},

	// ==========================================================================
	// RECIPES (8 topics)
	// ==========================================================================

	'recipe-classification': {
		title: 'Classification Recipe',
		description:
			'Classify text into categories. Sentiment analysis, intent detection, topic classification.',
		category: 'recipes',
		difficulty: 'intermediate',
		keywords: ['classify', 'sentiment', 'intent', 'category', 'label'],
		useWhen: ['classify', 'sentiment', 'intent detection', 'categorize'],
		prerequisites: ['config-json-output'],
		relatedTopics: ['recipe-extraction', 'technique-few-shot'],
	},

	'recipe-extraction': {
		title: 'Data Extraction Recipe',
		description:
			'Extract structured data from text. Parse entities, dates, amounts with JSON schema.',
		category: 'recipes',
		difficulty: 'intermediate',
		keywords: ['extract', 'parse', 'entity', 'structured', 'data'],
		useWhen: ['extract data', 'parse text', 'get entities', 'structured output'],
		prerequisites: ['config-json-output'],
		relatedTopics: ['recipe-classification', 'tools-builtin'],
	},

	'recipe-generation': {
		title: 'Content Generation Recipe',
		description:
			'Generate articles, emails, code. Use role prompting and temperature for creativity.',
		category: 'recipes',
		difficulty: 'beginner',
		keywords: ['generate', 'write', 'create', 'content', 'article', 'email'],
		useWhen: ['generate content', 'write article', 'create email', 'draft'],
		relatedTopics: ['technique-role', 'config-generation'],
	},

	'recipe-chatbot': {
		title: 'Chatbot Recipe',
		description:
			'Build conversational AI. Handle history, maintain context, natural multi-turn dialogue.',
		category: 'recipes',
		difficulty: 'intermediate',
		keywords: ['chatbot', 'conversation', 'dialogue', 'multi-turn', 'chat'],
		useWhen: ['chatbot', 'conversation', 'chat', 'dialogue'],
		prerequisites: ['messages-roles', 'loops'],
		relatedTopics: ['conversation-history', 'messages-roles'],
	},

	'recipe-rag': {
		title: 'RAG Recipe',
		description:
			'Full RAG implementation. Search with latitude/search, then generate grounded answer.',
		category: 'recipes',
		difficulty: 'intermediate',
		keywords: ['rag', 'retrieval', 'search', 'grounded', 'knowledge'],
		useWhen: ['rag implementation', 'search and answer', 'knowledge base'],
		prerequisites: ['tools-builtin', 'chains'],
		relatedTopics: ['technique-rag', 'tools-builtin'],
	},

	'recipe-analysis': {
		title: 'Analysis Recipe',
		description:
			'Multi-step analysis workflow. Gather data, analyze, synthesize conclusions.',
		category: 'recipes',
		difficulty: 'advanced',
		keywords: ['analysis', 'analyze', 'synthesize', 'report', 'insights'],
		useWhen: ['analyze data', 'generate report', 'insights'],
		prerequisites: ['chains'],
		relatedTopics: ['chains', 'technique-cot'],
	},

	'recipe-moderation': {
		title: 'Content Moderation Recipe',
		description:
			'Detect harmful content. Flag inappropriate text, images, or requests.',
		category: 'recipes',
		difficulty: 'intermediate',
		keywords: ['moderation', 'filter', 'harmful', 'inappropriate', 'safety'],
		useWhen: ['moderate content', 'filter harmful', 'content safety'],
		relatedTopics: ['guide-safety', 'recipe-classification'],
	},

	'recipe-support': {
		title: 'Customer Support Recipe',
		description:
			'AI customer support agent. Handle inquiries, escalate when needed, maintain tone.',
		category: 'recipes',
		difficulty: 'intermediate',
		keywords: ['support', 'customer', 'help', 'inquiry', 'service'],
		useWhen: ['customer support', 'help desk', 'service agent'],
		prerequisites: ['agents', 'recipe-chatbot'],
		relatedTopics: ['agents', 'recipe-chatbot'],
	},

	// ==========================================================================
	// GUIDES (6 topics)
	// ==========================================================================

	'conversation-history': {
		title: 'Conversation History',
		description:
			'Handle multi-turn context. Pass history array, manage context window, summarize.',
		category: 'guides',
		difficulty: 'intermediate',
		keywords: ['history', 'context', 'multi-turn', 'conversation', 'memory'],
		useWhen: ['conversation history', 'multi-turn', 'context', 'memory'],
		prerequisites: ['messages-roles', 'loops'],
		relatedTopics: ['recipe-chatbot'],
	},

	'guide-debugging': {
		title: 'Debugging Prompts',
		description:
			'Debug common issues. YAML validation, variable scope, unexpected outputs.',
		category: 'guides',
		difficulty: 'intermediate',
		keywords: ['debug', 'error', 'fix', 'troubleshoot', 'issue', 'problem'],
		useWhen: ['debug', 'error', 'not working', 'fix', 'troubleshoot'],
		relatedTopics: ['guide-testing'],
	},

	'guide-safety': {
		title: 'Safety & Guardrails',
		description:
			'Implement safety measures. Content filtering, jailbreak prevention, ethical guidelines.',
		category: 'guides',
		difficulty: 'intermediate',
		keywords: ['safety', 'guardrails', 'filter', 'jailbreak', 'ethical'],
		useWhen: ['safety', 'guardrails', 'prevent jailbreak', 'ethical'],
		relatedTopics: ['recipe-moderation', 'technique-constitutional'],
	},

	'guide-performance': {
		title: 'Performance Optimization',
		description:
			'Optimize tokens, cost, latency. Model selection, caching, prompt compression.',
		category: 'guides',
		difficulty: 'intermediate',
		keywords: ['performance', 'optimize', 'cost', 'tokens', 'speed', 'latency'],
		useWhen: ['optimize', 'reduce cost', 'faster', 'performance'],
		relatedTopics: ['config-generation', 'config-advanced'],
	},

	'guide-testing': {
		title: 'Testing Prompts',
		description:
			'Test prompts systematically. Unit tests, edge cases, regression testing.',
		category: 'guides',
		difficulty: 'intermediate',
		keywords: ['test', 'testing', 'unit test', 'edge case', 'regression'],
		useWhen: ['test', 'testing', 'verify', 'regression'],
		relatedTopics: ['guide-debugging', 'mocking'],
	},

	'guide-versioning': {
		title: 'Version Control',
		description:
			'Manage prompt versions. Draft/live workflow, publishing, rollback.',
		category: 'guides',
		difficulty: 'intermediate',
		keywords: ['version', 'draft', 'live', 'publish', 'rollback'],
		useWhen: ['version', 'draft', 'publish', 'rollback'],
		relatedTopics: ['guide-testing'],
	},
};
