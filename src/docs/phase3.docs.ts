/**
 * Phase 3 - Tier 3 Documentation Topics
 *
 * 7 specialized topics:
 * - recipe-rag
 * - agent-patterns
 * - guide-testing
 * - guide-versioning
 * - providers-openai
 * - providers-anthropic
 * - providers-google
 */

export const DOCS_RECIPE_RAG = `# RAG Patterns

> Retrieval Augmented Generation

## Overview

RAG combines retrieval with generation for knowledge-grounded responses.

## Basic RAG Pattern

\\\`\\\`\\\`
<system>
You are a helpful assistant. Use the following context to answer questions.
If the context doesn't contain the answer, say so.

Context:
{{ context }}
</system>

<user>{{ question }}</user>
\\\`\\\`\\\`

## With Built-in Search

\\\`\\\`\\\`yaml
tools:
  - latitude/search
\\\`\\\`\\\`

\\\`\\\`\\\`
Search for relevant information about {{ topic }} and answer the question.

Question: {{ question }}
\\\`\\\`\\\`

## Document Chunks

\\\`\\\`\\\`
<system>
Answer based on these documents:

{{ for doc in documents }}
[Document {{ loop.index }}]
{{ doc.content }}
---
{{ endfor }}
</system>

<user>{{ question }}</user>
\\\`\\\`\\\`

## Tips

- Keep context focused
- Cite sources when possible
- Handle missing information gracefully

## Next Steps

- \\\`latitude_get_docs({ topic: "tools-builtin" })\\\`
- \\\`latitude_get_docs({ topic: "conversation-history" })\\\`
`;

export const DOCS_AGENT_PATTERNS = `# Agent Collaboration Patterns

> Multi-agent workflows and orchestration

## Overview

Complex tasks benefit from specialized agents working together.

## Orchestrator Pattern

\\\`\\\`\\\`yaml
type: agent
agents:
  - agents/planner
  - agents/executor
  - agents/reviewer
\\\`\\\`\\\`

\\\`\\\`\\\`
Coordinate to complete: {{ task }}

1. Planner creates the plan
2. Executor implements each step
3. Reviewer validates results
\\\`\\\`\\\`

## Specialist Pattern

\\\`\\\`\\\`yaml
type: agent
agents:
  - agents/researcher
  - agents/writer
  - agents/editor
\\\`\\\`\\\`

## Debate Pattern

\\\`\\\`\\\`yaml
agents:
  - agents/proponent
  - agents/opponent
  - agents/judge
\\\`\\\`\\\`

## Handoff Patterns

Sequential: A → B → C
Parallel: A + B → C
Conditional: if X then A else B

## Best Practices

| Practice | Description |
|----------|-------------|
| Clear roles | Each agent specialized |
| Defined interfaces | What each passes |
| Error handling | When agents fail |

## Next Steps

- \\\`latitude_get_docs({ topic: "agents" })\\\`
- \\\`latitude_get_docs({ topic: "chains" })\\\`
`;

export const DOCS_GUIDE_TESTING = `# Testing Prompts

> Validate and evaluate prompts

## Testing Strategies

1. **Manual testing**: Run with sample inputs
2. **Edge case testing**: Unusual inputs
3. **Regression testing**: After changes
4. **A/B testing**: Compare versions

## Test Workflow

\\\`\\\`\\\`
1. Create draft version
2. Push prompt
3. Run with test inputs
4. Evaluate outputs
5. Iterate or publish
\\\`\\\`\\\`

## Test Cases

| Test Type | Example |
|-----------|---------|
| Happy path | Normal expected input |
| Edge case | Empty, very long, special chars |
| Error case | Invalid format, missing data |
| Boundary | Min/max values |

## Evaluation Criteria

- Accuracy: Is output correct?
- Consistency: Same input → similar output
- Format: Follows schema?
- Safety: No harmful content?

## Using Logs

\\\`\\\`\\\`
latitude_run_prompt → get response
latitude_create_log → record for analysis
\\\`\\\`\\\`

## Next Steps

- \\\`latitude_get_docs({ topic: "guide-versioning" })\\\`
- \\\`latitude_get_docs({ topic: "guide-debugging" })\\\`
`;

export const DOCS_GUIDE_VERSIONING = `# Version Management

> Draft vs live workflows

## Version Types

| Type | Description |
|------|-------------|
| Draft | Work in progress, not deployed |
| Live | Production version |

## Workflow

\\\`\\\`\\\`
1. latitude_create_version → new draft
2. latitude_push_prompt → add/update prompts
3. Test thoroughly
4. Publish to live
\\\`\\\`\\\`

## Best Practices

- Always test in draft first
- Use descriptive version names
- Document changes
- Keep backups of working versions

## Managing Versions

\\\`\\\`\\\`
latitude_list_versions → see all versions
latitude_get_prompt → inspect specific prompt
\\\`\\\`\\\`

## Rollback Strategy

If issues in live:
1. Create new draft from previous good version
2. Fix issues
3. Test
4. Publish

## Next Steps

- \\\`latitude_get_docs({ topic: "guide-testing" })\\\`
- \\\`latitude_list_versions\\\`
`;

export const DOCS_PROVIDERS_OPENAI = `# OpenAI Provider

> GPT-4 and GPT-3.5 specifics

## Models

| Model | Best For |
|-------|----------|
| gpt-4o | Complex tasks, multimodal |
| gpt-4o-mini | Fast, cost-effective |
| gpt-3.5-turbo | Simple tasks, high volume |

## Configuration

\\\`\\\`\\\`yaml
---
provider: OpenAI
model: gpt-4o
temperature: 0.7
---
\\\`\\\`\\\`

## Features

- Function calling (tools)
- JSON mode
- Vision (images)
- Streaming

## JSON Mode

\\\`\\\`\\\`yaml
---
provider: OpenAI
model: gpt-4o
schema:
  type: object
  properties:
    answer:
      type: string
---
\\\`\\\`\\\`

## Best Practices

- Use gpt-4o for quality
- Use gpt-4o-mini for speed/cost
- Temperature 0 for factual
- Include clear system prompts

## Next Steps

- \\\`latitude_get_docs({ topic: "config-basics" })\\\`
- \\\`latitude_get_docs({ topic: "config-generation" })\\\`
`;

export const DOCS_PROVIDERS_ANTHROPIC = `# Anthropic Provider

> Claude specifics

## Models

| Model | Best For |
|-------|----------|
| claude-3-opus | Most capable |
| claude-3-sonnet | Balanced |
| claude-3-haiku | Fast, efficient |

## Configuration

\\\`\\\`\\\`yaml
---
provider: Anthropic
model: claude-3-sonnet
temperature: 0.7
---
\\\`\\\`\\\`

## Features

- Long context (200k tokens)
- Vision (images)
- Function calling
- Constitutional AI

## Strengths

- Following instructions precisely
- Long document analysis
- Nuanced reasoning
- Safety-focused

## Best Practices

- Use system prompts for behavior
- Leverage long context for RAG
- Clear, structured instructions
- Use for complex analysis

## Next Steps

- \\\`latitude_get_docs({ topic: "config-basics" })\\\`
- \\\`latitude_get_docs({ topic: "recipe-rag" })\\\`
`;

export const DOCS_PROVIDERS_GOOGLE = `# Google Provider

> Gemini specifics

## Models

| Model | Best For |
|-------|----------|
| gemini-pro | General purpose |
| gemini-ultra | Most capable |
| gemini-flash | Fast responses |

## Configuration

\\\`\\\`\\\`yaml
---
provider: Google
model: gemini-pro
temperature: 0.7
---
\\\`\\\`\\\`

## Features

- Multimodal (text, images, video)
- Long context
- Function calling
- Grounding with Google Search

## Strengths

- Multimodal understanding
- Google Search integration
- Efficient processing
- Wide language support

## Best Practices

- Use for multimodal tasks
- Leverage search grounding
- Clear structured prompts

## Next Steps

- \\\`latitude_get_docs({ topic: "config-basics" })\\\`
- \\\`latitude_get_docs({ topic: "messages-multimodal" })\\\`
`;
