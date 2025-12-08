/**
 * Type Definitions for Latitude MCP Documentation System
 *
 * Defines all types for the 50+ documentation topics covering:
 * - PromptL syntax
 * - Configuration
 * - Tools
 * - Techniques
 * - Recipes
 * - Guides
 */

// ============================================================================
// TOPIC CATEGORIES
// ============================================================================

/**
 * Categories for organizing documentation topics
 */
export type TopicCategory =
	| 'core-syntax' // Basic PromptL syntax
	| 'configuration' // Config options
	| 'messages' // Message types
	| 'tools' // Tool definitions
	| 'techniques' // Prompting techniques
	| 'recipes' // Use case patterns
	| 'guides' // Best practices
	| 'providers'; // Provider-specific

// ============================================================================
// DIFFICULTY LEVELS
// ============================================================================

/**
 * Difficulty levels for filtering and learning paths
 */
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

// ============================================================================
// DOCUMENTATION TOPICS (50+ topics)
// ============================================================================

/**
 * All available documentation topic slugs
 */
export type DocsTopic =
	// Core Syntax (12 topics)
	| 'overview'
	| 'structure'
	| 'variables'
	| 'conditionals'
	| 'loops'
	| 'references'
	| 'tools'
	| 'chains'
	| 'agents'
	| 'techniques'
	| 'agent-patterns'
	| 'mocking'
	// Configuration (8 topics)
	| 'config-basics'
	| 'config-generation'
	| 'config-json-output'
	| 'config-advanced'
	| 'providers-openai'
	| 'providers-anthropic'
	| 'providers-google'
	| 'providers-azure'
	// Messages (2 topics)
	| 'messages-roles'
	| 'messages-multimodal'
	// Tools (4 topics)
	| 'tools-builtin'
	| 'tools-custom'
	| 'tools-schema'
	| 'tools-orchestration'
	// Techniques (12 topics)
	| 'technique-role'
	| 'technique-few-shot'
	| 'technique-cot'
	| 'technique-tot'
	| 'technique-react'
	| 'technique-self-consistency'
	| 'technique-constitutional'
	| 'technique-socratic'
	| 'technique-meta'
	| 'technique-iterative'
	| 'technique-step-back'
	| 'technique-rag'
	// Recipes (8 topics)
	| 'recipe-classification'
	| 'recipe-extraction'
	| 'recipe-generation'
	| 'recipe-chatbot'
	| 'recipe-rag'
	| 'recipe-analysis'
	| 'recipe-moderation'
	| 'recipe-support'
	// Guides (6 topics)
	| 'conversation-history'
	| 'guide-debugging'
	| 'guide-safety'
	| 'guide-performance'
	| 'guide-testing'
	| 'guide-versioning';

// ============================================================================
// TOPIC METADATA
// ============================================================================

/**
 * Metadata for a documentation topic
 * Used for semantic search and navigation
 */
export interface TopicMeta {
	/** Human-readable title */
	title: string;

	/** 1-2 sentence description */
	description: string;

	/** Category for grouping */
	category: TopicCategory;

	/** Difficulty level */
	difficulty: DifficultyLevel;

	/** Search keywords (for matching) */
	keywords: string[];

	/** Trigger phrases - when user says X, suggest this topic */
	useWhen: string[];

	/** Prerequisites - topics to read first */
	prerequisites?: DocsTopic[];

	/** Related topics for cross-reference */
	relatedTopics?: DocsTopic[];
}

// ============================================================================
// SEARCH RESULT
// ============================================================================

/**
 * Result from documentation search
 */
export interface SearchResult {
	topic: DocsTopic;
	meta: TopicMeta;
	score: number;
}

// ============================================================================
// DOCUMENTATION CONTENT
// ============================================================================

/**
 * Full documentation entry with content
 */
export interface DocumentationEntry {
	topic: DocsTopic;
	meta: TopicMeta;
	content: string;
}
