/**
 * Phase 2 - Tier 2 Documentation Topics
 *
 * 13 new documentation topics:
 * - config-basics, config-advanced
 * - messages-roles, messages-multimodal
 * - tools-custom, tools-schema
 * - technique-few-shot, technique-cot, technique-tot
 * - recipe-generation, recipe-chatbot
 * - guide-safety, guide-performance
 */

export const DOCS_CONFIG_BASICS = `# Configuration Basics

> Provider, model, and essential settings

## Overview

Every prompt starts with a config section in YAML format.

\\\`\\\`\\\`yaml
---
provider: OpenAI
model: gpt-4o
---
Your prompt here...
\\\`\\\`\\\`

## Required Settings

| Setting | Description | Examples |
|---------|-------------|----------|
| \\\`provider\\\` | AI provider | OpenAI, Anthropic, Google |
| \\\`model\\\` | Model ID | gpt-4o, claude-3-opus, gemini-pro |

## Common Providers

| Provider | Popular Models |
|----------|---------------|
| OpenAI | gpt-4o, gpt-4o-mini, gpt-3.5-turbo |
| Anthropic | claude-3-opus, claude-3-sonnet |
| Google | gemini-pro, gemini-ultra |

## Next Steps

- \\\`latitude_get_docs({ topic: "config-generation" })\\\`
- \\\`latitude_get_docs({ topic: "structure" })\\\`
`;

export const DOCS_CONFIG_ADVANCED = `# Advanced Configuration

> maxSteps, retries, headers, and more

## Advanced Settings

| Setting | Description | Default |
|---------|-------------|---------|
| \\\`maxSteps\\\` | Max chain/agent steps | 20 |
| \\\`maxRetries\\\` | Retry failed calls | 2 |
| \\\`seed\\\` | Reproducible outputs | - |
| \\\`stopSequences\\\` | Stop at strings | - |
| \\\`headers\\\` | Custom HTTP headers | - |

## maxSteps

Limit steps for chains and agents:

\\\`\\\`\\\`yaml
---
maxSteps: 50
---
\\\`\\\`\\\`

## stopSequences

Stop generation at specific strings:

\\\`\\\`\\\`yaml
---
stopSequences:
  - "END"
  - "---"
---
\\\`\\\`\\\`

## seed

For reproducible outputs:

\\\`\\\`\\\`yaml
---
seed: 42
temperature: 0
---
\\\`\\\`\\\`

## Next Steps

- \\\`latitude_get_docs({ topic: "chains" })\\\`
- \\\`latitude_get_docs({ topic: "agents" })\\\`
`;

export const DOCS_MESSAGES_ROLES = `# Message Roles

> System, user, assistant, tool messages

## Overview

Messages define the conversation. Each has a role.

## System Message

Text without tags is system message:

\\\`\\\`\\\`
You are a helpful assistant.
\\\`\\\`\\\`

Or explicit:

\\\`\\\`\\\`
<system>
You are a helpful assistant.
</system>
\\\`\\\`\\\`

## User Message

\\\`\\\`\\\`
<user>
What's the weather?
</user>
\\\`\\\`\\\`

## Assistant Message

\\\`\\\`\\\`
<assistant>
I'd be happy to help!
</assistant>
\\\`\\\`\\\`

## Tool Message

\\\`\\\`\\\`
<tool id="call_123" name="get_weather">
{"temperature": 72}
</tool>
\\\`\\\`\\\`

## Message Order

Messages form a conversation flow:

1. System (sets behavior)
2. User/Assistant (conversation)
3. Tool (function results)

## Next Steps

- \\\`latitude_get_docs({ topic: "structure" })\\\`
- \\\`latitude_get_docs({ topic: "conversation-history" })\\\`
`;

export const DOCS_MESSAGES_MULTIMODAL = `# Multimodal Messages

> Images, files, and rich content

## Image Messages

\\\`\\\`\\\`
<user>
<image url="{{ image_url }}" />
Describe this image.
</user>
\\\`\\\`\\\`

## Base64 Images

\\\`\\\`\\\`
<user>
<image base64="{{ base64_data }}" type="image/png" />
What do you see?
</user>
\\\`\\\`\\\`

## File Attachments

\\\`\\\`\\\`
<user>
<file url="{{ file_url }}" name="document.pdf" />
Summarize this document.
</user>
\\\`\\\`\\\`

## Model Support

| Model | Images | Files |
|-------|--------|-------|
| gpt-4o | Yes | Via URL |
| claude-3 | Yes | Yes |
| gemini-pro | Yes | Yes |

## Tips

- Use appropriate models (vision-capable)
- Consider file size limits
- Test with various formats

## Next Steps

- \\\`latitude_get_docs({ topic: "messages-roles" })\\\`
- \\\`latitude_get_docs({ topic: "config-basics" })\\\`
`;

export const DOCS_TOOLS_CUSTOM = `# Custom Tool Definition

> Define your own tools with JSON Schema

## Overview

Custom tools let the AI call your functions.

\\\`\\\`\\\`yaml
---
tools:
  - name: get_weather
    description: Get weather for a location
    parameters:
      type: object
      properties:
        location:
          type: string
          description: City name
        unit:
          type: string
          enum: [celsius, fahrenheit]
      required: [location]
---
\\\`\\\`\\\`

## Tool Structure

| Field | Description |
|-------|-------------|
| \\\`name\\\` | Function name (snake_case) |
| \\\`description\\\` | What the tool does |
| \\\`parameters\\\` | JSON Schema for inputs |

## Example: Database Query

\\\`\\\`\\\`yaml
tools:
  - name: query_database
    description: Run SQL query
    parameters:
      type: object
      properties:
        query:
          type: string
        limit:
          type: integer
          default: 10
      required: [query]
\\\`\\\`\\\`

## Tips

- Clear descriptions help the model
- Mark required parameters
- Use enums for limited options

## Next Steps

- \\\`latitude_get_docs({ topic: "tools-schema" })\\\`
- \\\`latitude_get_docs({ topic: "tools-builtin" })\\\`
`;

export const DOCS_TOOLS_SCHEMA = `# Tool Schema Deep Dive

> JSON Schema for parameters

## Basic Types

| Type | Example |
|------|---------|
| \\\`string\\\` | "hello" |
| \\\`number\\\` | 3.14 |
| \\\`integer\\\` | 42 |
| \\\`boolean\\\` | true |
| \\\`array\\\` | [1, 2, 3] |
| \\\`object\\\` | {...} |

## String Constraints

\\\`\\\`\\\`yaml
name:
  type: string
  minLength: 1
  maxLength: 100
  pattern: "^[A-Z].*"
\\\`\\\`\\\`

## Number Constraints

\\\`\\\`\\\`yaml
age:
  type: integer
  minimum: 0
  maximum: 150
\\\`\\\`\\\`

## Enum (Limited Options)

\\\`\\\`\\\`yaml
status:
  type: string
  enum: [pending, approved, rejected]
\\\`\\\`\\\`

## Nested Objects

\\\`\\\`\\\`yaml
parameters:
  type: object
  properties:
    user:
      type: object
      properties:
        name:
          type: string
        email:
          type: string
      required: [name]
\\\`\\\`\\\`

## Arrays

\\\`\\\`\\\`yaml
tags:
  type: array
  items:
    type: string
  minItems: 1
  maxItems: 5
\\\`\\\`\\\`

## Next Steps

- \\\`latitude_get_docs({ topic: "tools-custom" })\\\`
- \\\`latitude_get_docs({ topic: "config-json-output" })\\\`
`;

export const DOCS_TECHNIQUE_FEW_SHOT = `# Few-Shot Learning

> Examples for in-context learning

## Overview

Provide examples to guide model behavior.

## Static Examples

\\\`\\\`\\\`
Translate to French:

English: Hello
French: Bonjour

English: Goodbye
French: Au revoir

English: {{ input }}
French:
\\\`\\\`\\\`

## Dynamic Examples

\\\`\\\`\\\`
{{ for ex in examples }}
Input: {{ ex.input }}
Output: {{ ex.output }}

{{ endfor }}
Input: {{ new_input }}
Output:
\\\`\\\`\\\`

## Message-Based Examples

\\\`\\\`\\\`
{{ for ex in examples }}
<user>{{ ex.question }}</user>
<assistant>{{ ex.answer }}</assistant>
{{ endfor }}

<user>{{ user_question }}</user>
\\\`\\\`\\\`

## Best Practices

| Practice | Why |
|----------|-----|
| 3-5 examples | Enough to learn pattern |
| Diverse examples | Cover edge cases |
| Consistent format | Clear pattern |
| Quality examples | Garbage in, garbage out |

## Next Steps

- \\\`latitude_get_docs({ topic: "loops" })\\\`
- \\\`latitude_get_docs({ topic: "recipe-classification" })\\\`
`;

export const DOCS_TECHNIQUE_COT = `# Chain-of-Thought

> Step-by-step reasoning

## Overview

Guide the model through reasoning steps.

## Zero-Shot CoT

Just add the magic phrase:

\\\`\\\`\\\`
{{ problem }}

Let's think step by step.
\\\`\\\`\\\`

## Prompted CoT

\\\`\\\`\\\`
Solve this problem:

{{ problem }}

Let's work through this:
1. First, identify what we know
2. Then, consider the approach
3. Finally, calculate the answer
\\\`\\\`\\\`

## CoT with Steps

\\\`\\\`\\\`
<step>
# Understand the Problem
{{ problem }}
What is being asked?
</step>

<step>
# Work Through Solution
Based on my understanding, let me solve...
</step>

<step>
# Verify and Conclude
Let me check my work...
</step>
\\\`\\\`\\\`

## When to Use

- Math problems
- Logical reasoning
- Complex analysis
- Multi-step tasks

## Next Steps

- \\\`latitude_get_docs({ topic: "technique-tot" })\\\`
- \\\`latitude_get_docs({ topic: "chains" })\\\`
`;

export const DOCS_TECHNIQUE_TOT = `# Tree-of-Thoughts

> Explore multiple reasoning paths

## Overview

Generate multiple approaches, evaluate, select best.

## Basic ToT

\\\`\\\`\\\`
Problem: {{ problem }}

## Approach A
1. Reasoning...
Confidence: X/10

## Approach B
1. Reasoning...
Confidence: X/10

## Approach C
1. Reasoning...
Confidence: X/10

## Evaluation
Compare approaches...

## Best Solution
Based on Approach [X]: ...
\\\`\\\`\\\`

## ToT with Chains

\\\`\\\`\\\`
<step>
# Generate Approaches
Problem: {{ problem }}
Generate 3 different solutions.
</step>

<step>
# Evaluate Each
Rate feasibility, correctness, elegance (1-10).
</step>

<step>
# Select and Develop
Choose best and elaborate.
</step>
\\\`\\\`\\\`

## Multi-Agent ToT

\\\`\\\`\\\`yaml
type: agent
agents:
  - agents/approach-a
  - agents/approach-b
  - agents/evaluator
\\\`\\\`\\\`

## When to Use

- Complex decisions
- Creative problems
- Planning tasks
- When one path might fail

## Next Steps

- \\\`latitude_get_docs({ topic: "technique-cot" })\\\`
- \\\`latitude_get_docs({ topic: "agents" })\\\`
`;

export const DOCS_RECIPE_GENERATION = `# Content Generation

> Writing and creation patterns

## Basic Generation

\\\`\\\`\\\`
Write a blog post about {{ topic }}.

Requirements:
- 500 words
- Engaging tone
- Include examples
\\\`\\\`\\\`

## Structured Generation

\\\`\\\`\\\`yaml
schema:
  type: object
  properties:
    title:
      type: string
    introduction:
      type: string
    sections:
      type: array
      items:
        type: object
        properties:
          heading:
            type: string
          content:
            type: string
    conclusion:
      type: string
\\\`\\\`\\\`

## Pipeline Pattern

\\\`\\\`\\\`
<step>
# Research
Topic: {{ topic }}
Outline key points.
</step>

<step>
# Draft
Write first draft based on outline.
</step>

<step>
# Edit
Polish for clarity and engagement.
</step>
\\\`\\\`\\\`

## Tips

- Set clear requirements
- Use role prompting for voice
- Structure with JSON schema
- Pipeline for quality

## Next Steps

- \\\`latitude_get_docs({ topic: "technique-role" })\\\`
- \\\`latitude_get_docs({ topic: "chains" })\\\`
`;

export const DOCS_RECIPE_CHATBOT = `# Chatbot Patterns

> Conversational AI design

## Basic Chatbot

\\\`\\\`\\\`
You are a helpful assistant for {{ company }}.

Be friendly, concise, and helpful.

{{ for msg in history }}
<{{ msg.role }}>{{ msg.content }}</{{ msg.role }}>
{{ endfor }}

<user>{{ input }}</user>
\\\`\\\`\\\`

## Persona Chatbot

\\\`\\\`\\\`
You are {{ persona.name }}, a {{ persona.role }}.

Personality: {{ persona.traits | join(", ") }}
Communication style: {{ persona.style }}

Remember: {{ persona.memory }}

{{ for msg in history }}
<{{ msg.role }}>{{ msg.content }}</{{ msg.role }}>
{{ endfor }}

<user>{{ input }}</user>
\\\`\\\`\\\`

## Task-Oriented Bot

\\\`\\\`\\\`
You are a customer service bot for {{ company }}.

Available actions:
- Check order status
- Process returns
- Answer FAQs

Current context:
- User: {{ user.name }}
- Order: {{ user.recent_order }}

{{ for msg in history }}
<{{ msg.role }}>{{ msg.content }}</{{ msg.role }}>
{{ endfor }}

<user>{{ input }}</user>
\\\`\\\`\\\`

## Tips

- Set clear persona
- Manage context length
- Handle edge cases
- Use memory wisely

## Next Steps

- \\\`latitude_get_docs({ topic: "conversation-history" })\\\`
- \\\`latitude_get_docs({ topic: "technique-role" })\\\`
`;

export const DOCS_GUIDE_SAFETY = `# Safety & Guardrails

> Content filtering and prevention

## System Instructions

\\\`\\\`\\\`
You are a helpful assistant.

IMPORTANT SAFETY RULES:
- Never provide harmful information
- Decline inappropriate requests politely
- Stay within your knowledge boundaries
- Recommend professionals for serious issues
\\\`\\\`\\\`

## Content Boundaries

\\\`\\\`\\\`
You are an expert in {{ domain }}.

You MUST NOT:
- Provide medical/legal/financial advice
- Share personal information
- Generate harmful content
- Pretend to be a human

If asked about these, politely redirect.
\\\`\\\`\\\`

## Input Validation

\\\`\\\`\\\`
{{ if input_seems_harmful }}
I'm not able to help with that request.
{{ else }}
[Normal response]
{{ endif }}
\\\`\\\`\\\`

## Output Filtering

\\\`\\\`\\\`yaml
schema:
  type: object
  properties:
    response:
      type: string
    is_appropriate:
      type: boolean
    reasoning:
      type: string
\\\`\\\`\\\`

## Best Practices

| Practice | Description |
|----------|-------------|
| Clear boundaries | State what you won't do |
| Polite refusals | Decline respectfully |
| Redirect safely | Point to professionals |
| Log concerns | Track problematic inputs |

## Next Steps

- \\\`latitude_get_docs({ topic: "technique-role" })\\\`
- \\\`latitude_get_docs({ topic: "guide-debugging" })\\\`
`;

export const DOCS_GUIDE_PERFORMANCE = `# Performance Optimization

> Tokens, caching, efficiency

## Token Optimization

### Reduce Input

- Shorter system prompts
- Summarize context
- Limit history length

### Reduce Output

\\\`\\\`\\\`yaml
maxTokens: 500
\\\`\\\`\\\`

Or in prompt:

\\\`\\\`\\\`
Be concise. Maximum 2 sentences.
\\\`\\\`\\\`

## Caching

Enable caching with temperature 0:

\\\`\\\`\\\`yaml
temperature: 0
\\\`\\\`\\\`

Identical inputs = cached responses.

## Model Selection

| Need | Model | Tokens |
|------|-------|--------|
| Simple | gpt-4o-mini | Fewer |
| Complex | gpt-4o | More |
| Fast | gpt-3.5-turbo | Fewer |

## Batch Efficiently

Process multiple items in one call:

\\\`\\\`\\\`
Analyze these 5 items:
{{ for item in items }}
{{ loop.index }}. {{ item }}
{{ endfor }}

Return analysis for each.
\\\`\\\`\\\`

## Cost Estimation

| Model | Input $/1M | Output $/1M |
|-------|-----------|------------|
| gpt-4o-mini | $0.15 | $0.60 |
| gpt-4o | $2.50 | $10.00 |

## Tips

- Start with smaller models
- Use caching when possible
- Batch similar requests
- Monitor token usage

## Next Steps

- \\\`latitude_get_docs({ topic: "config-generation" })\\\`
- \\\`latitude_get_docs({ topic: "config-advanced" })\\\`
`;
