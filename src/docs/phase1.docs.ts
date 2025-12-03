/**
 * Phase 1 - Tier 1 Documentation Topics
 *
 * New granular documentation for:
 * - config-json-output
 * - config-generation
 * - tools-builtin
 * - technique-role
 * - recipe-classification
 * - recipe-extraction
 * - conversation-history
 * - guide-debugging
 */

// ============================================================================
// CONFIG-JSON-OUTPUT
// ============================================================================

export const DOCS_CONFIG_JSON_OUTPUT = `# Enforcing JSON Output

> Guarantee structured responses with JSON Schema

## Overview

Use the \\\`schema\\\` config to force the model to return valid JSON.

\\\`\\\`\\\`yaml
---
provider: OpenAI
model: gpt-4o
schema:
  type: object
  properties:
    sentiment:
      type: string
      enum: [positive, negative, neutral]
    confidence:
      type: number
  required: [sentiment, confidence]
---
Analyze: {{ text }}
\\\`\\\`\\\`

## Data Types

| Type | Example | Use Case |
|------|---------|----------|
| \\\`string\\\` | \\\`"hello"\\\` | Text |
| \\\`number\\\` | \\\`0.95\\\` | Scores |
| \\\`integer\\\` | \\\`42\\\` | Counts |
| \\\`boolean\\\` | \\\`true\\\` | Flags |
| \\\`array\\\` | \\\`["a"]\\\` | Lists |
| \\\`object\\\` | \\\`{...}\\\` | Nested |

## Constraints

| Constraint | Description |
|------------|-------------|
| \\\`enum\\\` | Limit to values |
| \\\`minimum/maximum\\\` | Number range |
| \\\`minLength/maxLength\\\` | String length |
| \\\`minItems/maxItems\\\` | Array size |

## Tips

- Always add \\\`required\\\` - prevents missing fields
- Use \\\`enum\\\` for categories
- Keep schemas focused - smaller = reliable

## Next Steps

- \\\`latitude_get_docs({ topic: "recipe-extraction" })\\\`
- \\\`latitude_get_docs({ topic: "tools-builtin" })\\\`
`;

// ============================================================================
// CONFIG-GENERATION
// ============================================================================

export const DOCS_CONFIG_GENERATION = `# Generation Parameters

> Control randomness, length, and quality

## temperature

Controls randomness. Lower = focused, higher = creative.

| Value | Use Case |
|-------|----------|
| \\\`0\\\` | Factual (enables caching) |
| \\\`0.2-0.4\\\` | Code, analysis |
| \\\`0.5-0.7\\\` | Balanced |
| \\\`0.8-1.0\\\` | Creative |

## maxTokens

Maximum response length (~4 chars/token).

## topP

Nucleus sampling. Use temperature OR topP, not both.

## Penalties

- \\\`presencePenalty\\\`: Avoid repeating topics
- \\\`frequencyPenalty\\\`: Avoid repeating words

## Common Configs

- **Factual:** temperature: 0, maxTokens: 500
- **Creative:** temperature: 0.9, maxTokens: 2000
- **Code:** temperature: 0.2, maxTokens: 1000

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Too random | Lower temperature |
| Too boring | Raise temperature |
| Too long | Set maxTokens |
| Repetitive | Add frequencyPenalty |

## Next Steps

- \\\`latitude_get_docs({ topic: "guide-debugging" })\\\`
`;

// ============================================================================
// TOOLS-BUILTIN
// ============================================================================

export const DOCS_TOOLS_BUILTIN = `# Built-in Latitude Tools

> Pre-built: search, code, extract

## Overview

| Tool | Capability |
|------|------------|
| \\\`latitude/search\\\` | Web search |
| \\\`latitude/code\\\` | Execute code |
| \\\`latitude/extract\\\` | Extract data |

## latitude/search

\\\`\\\`\\\`yaml
tools:
  - latitude/search
\\\`\\\`\\\`

**Use for:** Real-time info, fact verification, research.

## latitude/code

\\\`\\\`\\\`yaml
tools:
  - latitude/code
\\\`\\\`\\\`

**Use for:** Math, data transformations, algorithms.

## latitude/extract

\\\`\\\`\\\`yaml
tools:
  - latitude/extract
\\\`\\\`\\\`

**Use for:** Entity extraction, data parsing.

## Combining Tools

\\\`\\\`\\\`yaml
tools:
  - latitude/search
  - latitude/code
  - latitude/extract
\\\`\\\`\\\`

## Next Steps

- \\\`latitude_get_docs({ topic: "tools" })\\\`
- \\\`latitude_get_docs({ topic: "recipe-extraction" })\\\`
`;

// ============================================================================
// TECHNIQUE-ROLE
// ============================================================================

export const DOCS_TECHNIQUE_ROLE = `# Role Prompting

> Assign personas for specialized responses

## Overview

Role prompting assigns a persona to improve response quality.

\\\`\\\`\\\`
You are a senior financial advisor with 20 years of experience.
Specialization: retirement planning.
Style: professional yet approachable.
\\\`\\\`\\\`

## Role Template

\\\`\\\`\\\`
You are a [ROLE] with [EXPERIENCE].

**Expertise:** [skills]
**Style:** [tone]
**Constraints:** [limitations]
\\\`\\\`\\\`

## Dynamic Roles

\\\`\\\`\\\`
{{ if domain == "legal" }}
You are a senior attorney in {{ specialty }}.
{{ else if domain == "medical" }}
You are a physician in {{ specialty }}.
{{ endif }}
\\\`\\\`\\\`

## Constrained Roles

\\\`\\\`\\\`
You are a customer service rep.

**You MUST:** Be polite, reference policies.
**You MUST NOT:** Make promises, share internal info.
\\\`\\\`\\\`

## Best Practices

| Do | Don't |
|----|-------|
| Define specific expertise | Generic "expert" |
| Set communication style | Let tone vary |
| Add constraints | Allow unrestricted |

## Next Steps

- \\\`latitude_get_docs({ topic: "agents" })\\\`
- \\\`latitude_get_docs({ topic: "techniques" })\\\`
`;

// ============================================================================
// RECIPE-CLASSIFICATION
// ============================================================================

export const DOCS_RECIPE_CLASSIFICATION = `# Classification Patterns

> Sentiment, intent, category classification

## Few-Shot Classification

\\\`\\\`\\\`yaml
schema:
  type: object
  properties:
    label:
      type: string
      enum: [positive, negative, neutral]
  required: [label]
\\\`\\\`\\\`

\\\`\\\`\\\`
Text: "I love this!" → positive
Text: "Terrible." → negative
Text: "{{ input }}" →
\\\`\\\`\\\`

## Dynamic Examples

\\\`\\\`\\\`
{{ for ex in examples }}
Text: {{ ex.text }}
Label: {{ ex.label }}
{{ endfor }}
Text: {{ input }}
Label:
\\\`\\\`\\\`

## Intent Classification

\\\`\\\`\\\`yaml
schema:
  type: object
  properties:
    intent:
      type: string
      enum: [order_status, return, complaint, other]
    urgency:
      type: string
      enum: [low, medium, high]
\\\`\\\`\\\`

## Tips

- Use 3-5 examples per class
- Balance examples across categories
- Use JSON schema for reliable output
- Include "other" for edge cases

## Next Steps

- \\\`latitude_get_docs({ topic: "config-json-output" })\\\`
- \\\`latitude_get_docs({ topic: "loops" })\\\`
`;

// ============================================================================
// RECIPE-EXTRACTION
// ============================================================================

export const DOCS_RECIPE_EXTRACTION = `# Data Extraction Patterns

> Entity extraction, structured data parsing

## Basic Extraction

\\\`\\\`\\\`yaml
schema:
  type: object
  properties:
    name: { type: string }
    email: { type: string }
    phone: { type: string }
\\\`\\\`\\\`

## Named Entity Recognition

\\\`\\\`\\\`yaml
schema:
  type: object
  properties:
    people:
      type: array
      items: { type: string }
    organizations:
      type: array
      items: { type: string }
    locations:
      type: array
      items: { type: string }
\\\`\\\`\\\`

## Financial Extraction

\\\`\\\`\\\`yaml
schema:
  type: object
  properties:
    company: { type: string }
    revenue: { type: string }
    profit: { type: string }
\\\`\\\`\\\`

## Tips

- Use specific schemas for accuracy
- Handle missing fields gracefully
- Test with varied inputs

## Next Steps

- \\\`latitude_get_docs({ topic: "config-json-output" })\\\`
- \\\`latitude_get_docs({ topic: "tools-builtin" })\\\`
`;

// ============================================================================
// CONVERSATION-HISTORY
// ============================================================================

export const DOCS_CONVERSATION_HISTORY = `# Conversation History

> Multi-turn conversations, context management

## Basic History Injection

\\\`\\\`\\\`
{{ for msg in history }}
<{{ msg.role }}>
{{ msg.content }}
</{{ msg.role }}>
{{ endfor }}

<user>{{ new_message }}</user>
\\\`\\\`\\\`

## With System Context

\\\`\\\`\\\`
<system>
You are a helpful assistant for {{ company }}.
</system>

{{ for msg in history }}
<{{ msg.role }}>{{ msg.content }}</{{ msg.role }}>
{{ endfor }}

<user>{{ input }}</user>
\\\`\\\`\\\`

## Summarized History

For long conversations:

\\\`\\\`\\\`
<system>
Summary: {{ summary }}
</system>

{{ for msg in recent_messages }}
<{{ msg.role }}>{{ msg.content }}</{{ msg.role }}>
{{ endfor }}
\\\`\\\`\\\`

## Using latitude_chat

1. \\\`latitude_run_prompt\\\` → get conversationUuid
2. \\\`latitude_chat({ conversationUuid, message })\\\` → continue
3. \\\`latitude_get_conversation\\\` → retrieve history

## Token Management

| Length | Strategy |
|--------|----------|
| < 10 msgs | Include all |
| 10-30 msgs | Last 10 + summary |
| 30+ msgs | Summary + last 5 |

## Next Steps

- \\\`latitude_chat\\\`
- \\\`latitude_get_docs({ topic: "loops" })\\\`
`;

// ============================================================================
// GUIDE-DEBUGGING
// ============================================================================

export const DOCS_GUIDE_DEBUGGING = `# Debugging & Troubleshooting

> Common errors and fixes

## Variables Not Rendering

**Symptom:** {{ variable }} appears literally

| Cause | Fix |
|-------|-----|
| Typo | Check spelling |
| Not passed | Provide parameter |
| Wrong syntax | Use {{ }} |

**Debug:** {{ variable || "NOT_PROVIDED" }}

## Conditionals Not Working

Wrong - Missing endif:
\\\`\\\`\\\`
{{ if condition }}
  content
\\\`\\\`\\\`

Correct:
\\\`\\\`\\\`
{{ if condition }}
  content
{{ endif }}
\\\`\\\`\\\`

Wrong - Missing quotes:
\\\`\\\`\\\`
{{ if role == admin }}
\\\`\\\`\\\`

Correct:
\\\`\\\`\\\`
{{ if role == "admin" }}
\\\`\\\`\\\`

## Loops Not Iterating

| Cause | Fix |
|-------|-----|
| Empty array | Check array has items |
| Wrong name | Verify spelling |

## Model Behavior Issues

| Problem | Solution |
|---------|----------|
| Ignores instructions | Move to beginning |
| Wrong format | Use JSON schema |
| Too verbose | Add length instruction |
| Too creative | Lower temperature |
| Repetitive | Add frequencyPenalty |

## Debugging Checklist

- Variables spelled correctly?
- All if have endif?
- All for have endfor?
- Strings quoted in comparisons?
- YAML indentation correct?
- Parameters provided?

## Next Steps

- \\\`latitude_get_docs({ topic: "variables" })\\\`
- \\\`latitude_get_docs({ topic: "conditionals" })\\\`
`;
