/**
 * Phase 1 Documentation Topics
 * Tier 1: config-json-output, config-generation, tools-builtin, technique-role,
 *         recipe-classification, recipe-extraction, conversation-history, guide-debugging
 */

// ============================================================================
// CONFIG-JSON-OUTPUT
// ============================================================================

export const DOCS_CONFIG_JSON_OUTPUT = `# JSON Output Schema

> Force structured JSON responses

## Overview

Use the \`schema\` config option to force AI responses into specific JSON structure. Essential for data extraction, classification, and API integrations.

---

## Quick Reference

\`\`\`yaml
---
provider: OpenAI
model: gpt-5-1
schema:
  type: object
  properties:
    result:
      type: string
  required: [result]
---
\`\`\`

---

## Basic Schema

Force a simple JSON response:

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
schema:
  type: object
  properties:
    answer:
      type: string
    confidence:
      type: number
  required: [answer, confidence]
---
Answer this question: What is the capital of France?
\`\`\`

**Response:**
\`\`\`json
{
  "answer": "Paris",
  "confidence": 1.0
}
\`\`\`

---

## Schema Types

| Type | JSON Schema | Example |
|------|-------------|---------|
| String | \`type: string\` | \`"hello"\` |
| Number | \`type: number\` | \`3.14\` |
| Integer | \`type: integer\` | \`42\` |
| Boolean | \`type: boolean\` | \`true\` |
| Array | \`type: array\` | \`[1, 2, 3]\` |
| Object | \`type: object\` | \`{"a": 1}\` |

---

## Enum (Fixed Options)

\`\`\`yaml
schema:
  type: object
  properties:
    sentiment:
      type: string
      enum: [positive, negative, neutral]
  required: [sentiment]
\`\`\`

---

## Arrays

\`\`\`yaml
schema:
  type: object
  properties:
    keywords:
      type: array
      items:
        type: string
  required: [keywords]
\`\`\`

**Response:**
\`\`\`json
{
  "keywords": ["AI", "machine learning", "automation"]
}
\`\`\`

---

## Nested Objects

\`\`\`yaml
schema:
  type: object
  properties:
    person:
      type: object
      properties:
        name:
          type: string
        age:
          type: integer
      required: [name]
    address:
      type: object
      properties:
        city:
          type: string
        country:
          type: string
  required: [person]
\`\`\`

---

## Array of Objects

\`\`\`yaml
schema:
  type: object
  properties:
    items:
      type: array
      items:
        type: object
        properties:
          name:
            type: string
          price:
            type: number
        required: [name, price]
  required: [items]
\`\`\`

---

## Complete Example: Entity Extraction

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
schema:
  type: object
  properties:
    entities:
      type: array
      items:
        type: object
        properties:
          text:
            type: string
            description: The extracted entity text
          type:
            type: string
            enum: [person, organization, location, date, money]
          confidence:
            type: number
            description: Confidence score 0-1
        required: [text, type, confidence]
    summary:
      type: string
  required: [entities, summary]
---
<system>
Extract all named entities from the text. Identify people, organizations, locations, dates, and monetary amounts.
</system>

<user>
On January 15, 2024, Apple CEO Tim Cook announced a $50 million investment in their new Austin, Texas facility.
</user>
\`\`\`

**Response:**
\`\`\`json
{
  "entities": [
    { "text": "January 15, 2024", "type": "date", "confidence": 0.99 },
    { "text": "Apple", "type": "organization", "confidence": 0.99 },
    { "text": "Tim Cook", "type": "person", "confidence": 0.99 },
    { "text": "$50 million", "type": "money", "confidence": 0.98 },
    { "text": "Austin, Texas", "type": "location", "confidence": 0.99 }
  ],
  "summary": "Apple CEO Tim Cook announced a $50M investment in Austin, Texas"
}
\`\`\`

---

## Best Practices

- ✅ **DO**: Add \`description\` to help AI understand fields
- ✅ **DO**: Use \`enum\` for fixed-choice fields
- ✅ **DO**: Mark truly required fields with \`required\`
- ✅ **DO**: Keep schemas reasonably simple
- ❌ **DON'T**: Create deeply nested schemas (3+ levels)
- ❌ **DON'T**: Use very long descriptions
- ❌ **DON'T**: Expect perfect schema adherence (validate!)

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Schema not working | Check YAML indentation |
| Wrong types returned | Add \`description\` to guide AI |
| Missing required fields | Simplify schema or add examples |

---

## Next Steps

- **Data extraction recipe** → \`docs({ action: "get", topic: "recipe-extraction" })\`
- **Tool schemas** → \`docs({ action: "get", topic: "tools-schema" })\`
`;

// ============================================================================
// CONFIG-GENERATION
// ============================================================================

export const DOCS_CONFIG_GENERATION = `# Generation Parameters

> Control AI output: temperature, tokens, penalties

## Overview

Generation parameters control how the AI generates responses. Adjust these for creativity, length, and consistency.

---

## Quick Reference

\`\`\`yaml
---
provider: OpenAI
model: gpt-5-1
temperature: 0.7       # Creativity (0-2)
top_p: 0.9             # Nucleus sampling
max_tokens: 500        # Response length limit
presence_penalty: 0.2  # Topic diversity
frequency_penalty: 0.5 # Reduce repetition
stop: ["\\n\\n"]       # Stop sequences
---
\`\`\`

---

## Temperature

Controls randomness/creativity:

| Value | Behavior | Use For |
|-------|----------|---------|
| 0 | Deterministic | Facts, math, code |
| 0.3-0.5 | Focused | Analysis, summaries |
| 0.7 | Balanced | General chat |
| 1.0+ | Creative | Stories, brainstorming |

\`\`\`yaml
# Factual, consistent
temperature: 0

# Creative writing
temperature: 1.2
\`\`\`

---

## Top P (Nucleus Sampling)

Alternative to temperature - limits token pool:

| Value | Effect |
|-------|--------|
| 0.1 | Very focused (top 10% tokens) |
| 0.5 | Moderate diversity |
| 0.9 | More diverse |
| 1.0 | Full vocabulary |

\`\`\`yaml
# Use one or the other, not both
temperature: 1
top_p: 0.9
\`\`\`

---

## Max Tokens

Limit response length:

\`\`\`yaml
max_tokens: 100    # Short responses
max_tokens: 500    # Medium
max_tokens: 2000   # Long form
max_tokens: 4096   # Very long
\`\`\`

**Tip**: Set this to control costs and ensure concise answers.

---

## Stop Sequences

Stop generation at specific strings:

\`\`\`yaml
stop: ["\\n"]           # Stop at newline
stop: ["END"]          # Stop at "END"
stop: ["\\n\\n", "---"] # Multiple stops
\`\`\`

---

## Presence Penalty

Encourage new topics (0-2):

\`\`\`yaml
presence_penalty: 0    # Allow repetition
presence_penalty: 0.5  # Moderate diversity
presence_penalty: 2    # Maximum diversity
\`\`\`

Higher = more likely to talk about new topics.

---

## Frequency Penalty

Reduce word repetition (0-2):

\`\`\`yaml
frequency_penalty: 0    # Allow repetition
frequency_penalty: 0.5  # Reduce some
frequency_penalty: 2    # Strongly penalize
\`\`\`

Higher = less repetitive text.

---

## Common Configurations

### Factual Q&A
\`\`\`yaml
temperature: 0
max_tokens: 500
\`\`\`

### Creative Writing
\`\`\`yaml
temperature: 1.0
top_p: 0.95
presence_penalty: 0.5
frequency_penalty: 0.5
\`\`\`

### Code Generation
\`\`\`yaml
temperature: 0
max_tokens: 2000
\`\`\`

### Summarization
\`\`\`yaml
temperature: 0.3
max_tokens: 300
\`\`\`

### Brainstorming
\`\`\`yaml
temperature: 1.2
presence_penalty: 1.0
\`\`\`

---

## Best Practices

- ✅ **DO**: Use temperature 0 for deterministic tasks
- ✅ **DO**: Set max_tokens to control costs
- ✅ **DO**: Test different values for your use case
- ❌ **DON'T**: Use temperature > 1.5 for production
- ❌ **DON'T**: Set max_tokens too low (may cut off)

---

## Next Steps

- **Config basics** → \`docs({ action: "get", topic: "config-basics" })\`
- **Performance guide** → \`docs({ action: "get", topic: "guide-performance" })\`
`;

// ============================================================================
// TOOLS-BUILTIN
// ============================================================================

export const DOCS_TOOLS_BUILTIN = `# Latitude Built-in Tools

> latitude/search, latitude/code, latitude/extract

## Overview

Latitude provides powerful built-in tools that require no setup. Enable them in your prompt config.

---

## Quick Reference

\`\`\`yaml
---
provider: OpenAI
model: gpt-5-1
tools:
  - latitude/search   # Web search
  - latitude/code     # Code execution
  - latitude/extract  # URL extraction
  - latitude/*        # All tools
---
\`\`\`

---

## latitude/search

**Web search** - Find real-time information online.

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
tools:
  - latitude/search
---
<system>
You are a research assistant. Search the web before answering.
</system>

<user>
What are the latest developments in AI regulation?
</user>
\`\`\`

**Use cases:**
- Current events
- Fact checking
- Research questions
- Real-time data

---

## latitude/code

**Code execution** - Run Python or JavaScript snippets.

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
tools:
  - latitude/code
---
<system>
You can execute code to solve problems. Use Python for calculations.
</system>

<user>
Calculate the compound interest on $10,000 at 5% for 10 years.
</user>
\`\`\`

**Use cases:**
- Complex calculations
- Data processing
- API calls
- File generation

---

## latitude/extract

**URL extraction** - Fetch and parse web page content.

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
tools:
  - latitude/extract
---
<system>
You can extract content from URLs. Summarize web pages when asked.
</system>

<user>
Summarize the main points from: https://example.com/article
</user>
\`\`\`

**Use cases:**
- Article summarization
- Data extraction
- Content analysis
- Research gathering

---

## All Tools

Enable all built-in tools:

\`\`\`yaml
tools:
  - latitude/*
\`\`\`

---

## Combining Tools

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
type: agent
tools:
  - latitude/search
  - latitude/extract
  - latitude/code
---
Research the top 3 AI companies by market cap, extract their recent news, and create a comparison chart.
\`\`\`

---

## Best Practices

- ✅ **DO**: Use search for current information
- ✅ **DO**: Use code for complex calculations
- ✅ **DO**: Use extract for specific URLs
- ✅ **DO**: Combine with agents for powerful workflows
- ❌ **DON'T**: Enable tools you don't need
- ❌ **DON'T**: Expect code to access external systems

---

## Next Steps

- **Custom tools** → \`docs({ action: "get", topic: "tools-custom" })\`
- **Agents** → \`docs({ action: "get", topic: "agents" })\`
`;

// ============================================================================
// TECHNIQUE-ROLE
// ============================================================================

export const DOCS_TECHNIQUE_ROLE = `# Role Prompting

> Assign expert personas for better responses

## Overview

Role prompting assigns a persona or expertise to the AI. This improves response quality for domain-specific tasks.

---

## Quick Reference

\`\`\`promptl
<system>
You are a [role] with expertise in [domain].
You [key behaviors/traits].
</system>
\`\`\`

---

## Basic Role

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
<system>
You are a senior software engineer with 15 years of experience.
You write clean, maintainable code and explain your decisions.
</system>

<user>
Review this code and suggest improvements.
</user>
\`\`\`

---

## Role Template

Structure your role prompts:

\`\`\`promptl
<system>
You are a [profession/expert type].

Background:
- [Relevant experience]
- [Specializations]

Communication style:
- [Tone: formal/casual/friendly]
- [Format: bullet points/paragraphs/structured]

Rules:
- [Key constraint 1]
- [Key constraint 2]
</system>
\`\`\`

---

## Example: Technical Writer

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
<system>
You are a senior technical writer at a leading tech company.

Background:
- 10+ years documenting APIs and SDKs
- Expert in clear, concise technical communication
- Experience with developer audiences

Communication style:
- Use clear, simple language
- Include code examples when helpful
- Structure with headers and bullet points

Rules:
- Never assume reader knowledge
- Define technical terms on first use
- Keep sentences under 25 words
</system>

<user>
Write documentation for this API endpoint: POST /users
</user>
\`\`\`

---

## Example: Data Analyst

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
<system>
You are a data analyst specializing in business intelligence.

Expertise:
- Statistical analysis and data visualization
- SQL, Python, and BI tools
- Translating data into actionable insights

Approach:
- Always cite the data behind conclusions
- Present findings with clear visualizations
- Highlight actionable recommendations
</system>

<user>
Analyze these sales figures and identify trends.
</user>
\`\`\`

---

## Example: Customer Support

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
<system>
You are a friendly customer support agent for Acme Software.

Traits:
- Empathetic and patient
- Solution-oriented
- Clear communicator

Guidelines:
- Acknowledge the customer's frustration
- Provide step-by-step solutions
- Offer alternatives if the first solution doesn't work
- Escalate complex issues appropriately
</system>
\`\`\`

---

## When to Use

| Use Case | Example Role |
|----------|--------------|
| Code review | Senior software engineer |
| Writing | Professional copywriter |
| Analysis | Data scientist |
| Support | Customer success agent |
| Teaching | Patient tutor |
| Research | Academic researcher |

---

## Best Practices

- ✅ **DO**: Be specific about expertise level
- ✅ **DO**: Include communication style preferences
- ✅ **DO**: Add relevant constraints/rules
- ✅ **DO**: Match role to task complexity
- ❌ **DON'T**: Use vague roles ("helpful assistant")
- ❌ **DON'T**: Create conflicting role attributes
- ❌ **DON'T**: Make the role description too long

---

## Next Steps

- **Few-shot learning** → \`docs({ action: "get", topic: "technique-few-shot" })\`
- **Message roles** → \`docs({ action: "get", topic: "messages-roles" })\`
`;

// ============================================================================
// RECIPE-CLASSIFICATION
// ============================================================================

export const DOCS_RECIPE_CLASSIFICATION = `# Classification Recipe

> Sentiment, intent, and category classification

## Overview

Classification assigns text to predefined categories. Common uses: sentiment analysis, intent detection, topic classification.

---

## Quick Reference

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
schema:
  type: object
  properties:
    category:
      type: string
      enum: [category1, category2, category3]
    confidence:
      type: number
  required: [category, confidence]
---
Classify: [text]
\`\`\`

---

## Sentiment Analysis

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
temperature: 0
schema:
  type: object
  properties:
    sentiment:
      type: string
      enum: [positive, negative, neutral]
    confidence:
      type: number
      description: Confidence score 0-1
    reasoning:
      type: string
  required: [sentiment, confidence]
---
<system>
You are a sentiment analysis expert. Analyze the emotional tone of text.
</system>

<user>
Analyze the sentiment of: "{{ text }}"
</user>
\`\`\`

---

## Intent Detection

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
temperature: 0
schema:
  type: object
  properties:
    intent:
      type: string
      enum: [greeting, question, complaint, request, feedback, other]
    entities:
      type: array
      items:
        type: string
    confidence:
      type: number
  required: [intent, confidence]
---
<system>
Detect the user's intent from their message.
</system>

<user>
Classify this message: "{{ message }}"
</user>
\`\`\`

---

## Multi-Label Classification

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
temperature: 0
schema:
  type: object
  properties:
    labels:
      type: array
      items:
        type: object
        properties:
          label:
            type: string
            enum: [urgent, technical, billing, feature_request, bug_report]
          confidence:
            type: number
        required: [label, confidence]
    primary_label:
      type: string
  required: [labels, primary_label]
---
<system>
Classify this support ticket. Multiple labels may apply.
</system>

<user>
{{ ticket_text }}
</user>
\`\`\`

---

## With Few-Shot Examples

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
temperature: 0
schema:
  type: object
  properties:
    category:
      type: string
      enum: [sports, politics, technology, entertainment]
  required: [category]
---
<system>
Classify news headlines into categories.
</system>

<user>Apple announces new iPhone with AI features</user>
<assistant>{"category": "technology"}</assistant>

<user>Lakers win championship in overtime thriller</user>
<assistant>{"category": "sports"}</assistant>

<user>{{ headline }}</user>
\`\`\`

---

## Best Practices

- ✅ **DO**: Use temperature 0 for consistent results
- ✅ **DO**: Define clear, mutually exclusive categories
- ✅ **DO**: Include confidence scores
- ✅ **DO**: Add few-shot examples for edge cases
- ❌ **DON'T**: Use too many categories (5-10 max)
- ❌ **DON'T**: Use overlapping categories

---

## Next Steps

- **Extraction recipe** → \`docs({ action: "get", topic: "recipe-extraction" })\`
- **JSON output** → \`docs({ action: "get", topic: "config-json-output" })\`
`;

// ============================================================================
// RECIPE-EXTRACTION
// ============================================================================

export const DOCS_RECIPE_EXTRACTION = `# Data Extraction Recipe

> Extract structured data from text

## Overview

Extract specific information from unstructured text into a defined schema. Perfect for parsing documents, emails, and forms.

---

## Quick Reference

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
temperature: 0
schema:
  type: object
  properties:
    [your fields]
  required: [required_fields]
---
Extract information from: [text]
\`\`\`

---

## Contact Information Extraction

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
temperature: 0
schema:
  type: object
  properties:
    name:
      type: string
    email:
      type: string
    phone:
      type: string
    company:
      type: string
  required: [name]
---
<system>
Extract contact information from the text. Leave fields empty if not found.
</system>

<user>
{{ text }}
</user>
\`\`\`

---

## Invoice Data Extraction

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
temperature: 0
schema:
  type: object
  properties:
    invoice_number:
      type: string
    date:
      type: string
      description: ISO date format YYYY-MM-DD
    vendor:
      type: string
    line_items:
      type: array
      items:
        type: object
        properties:
          description:
            type: string
          quantity:
            type: integer
          unit_price:
            type: number
          total:
            type: number
        required: [description, total]
    subtotal:
      type: number
    tax:
      type: number
    total:
      type: number
  required: [vendor, total, line_items]
---
<system>
Extract invoice data from the document text. Convert all amounts to numbers.
</system>

<user>
{{ invoice_text }}
</user>
\`\`\`

---

## Event Extraction

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
temperature: 0
schema:
  type: object
  properties:
    events:
      type: array
      items:
        type: object
        properties:
          title:
            type: string
          date:
            type: string
          time:
            type: string
          location:
            type: string
          description:
            type: string
        required: [title]
  required: [events]
---
<system>
Extract all events mentioned in the text.
</system>

<user>
{{ text }}
</user>
\`\`\`

---

## With Validation

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
temperature: 0
schema:
  type: object
  properties:
    data:
      type: object
      properties:
        email:
          type: string
        amount:
          type: number
    validation:
      type: object
      properties:
        is_valid:
          type: boolean
        issues:
          type: array
          items:
            type: string
  required: [data, validation]
---
<system>
Extract the data and validate it:
- Email must be a valid format
- Amount must be positive
</system>

<user>
{{ text }}
</user>
\`\`\`

---

## Best Practices

- ✅ **DO**: Use temperature 0 for consistent extraction
- ✅ **DO**: Add descriptions to guide the AI
- ✅ **DO**: Handle missing data gracefully
- ✅ **DO**: Validate extracted data in your code
- ❌ **DON'T**: Expect perfect extraction (always validate)
- ❌ **DON'T**: Use overly complex nested schemas

---

## Next Steps

- **JSON output** → \`docs({ action: "get", topic: "config-json-output" })\`
- **Classification** → \`docs({ action: "get", topic: "recipe-classification" })\`
`;

// ============================================================================
// CONVERSATION-HISTORY
// ============================================================================

export const DOCS_CONVERSATION_HISTORY = `# Conversation History

> Handle multi-turn context

## Overview

For chatbots and multi-turn conversations, you need to pass conversation history to maintain context.

---

## Quick Reference

\`\`\`promptl
{{ for msg in history }}
<{{ msg.role }}>{{ msg.content }}</{{ msg.role }}>
{{ endfor }}

<user>{{ new_message }}</user>
\`\`\`

---

## Basic History

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
<system>
You are a helpful assistant.
</system>

{{ for msg in history }}
<{{ msg.role }}>{{ msg.content }}</{{ msg.role }}>
{{ endfor }}

<user>{{ message }}</user>
\`\`\`

**Input:**
\`\`\`json
{
  "history": [
    { "role": "user", "content": "What's 2+2?" },
    { "role": "assistant", "content": "2+2 equals 4." }
  ],
  "message": "What about 3+3?"
}
\`\`\`

---

## With Context Window Management

Limit history to avoid token limits:

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
<system>
You are a helpful assistant.
</system>

{{ for msg in history.slice(-10) }}
<{{ msg.role }}>{{ msg.content }}</{{ msg.role }}>
{{ endfor }}

<user>{{ message }}</user>
\`\`\`

---

## With System Summary

Summarize old context:

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
<system>
You are a helpful assistant.

{{ if summary }}
Previous conversation summary: {{ summary }}
{{ endif }}
</system>

{{ for msg in recent_history }}
<{{ msg.role }}>{{ msg.content }}</{{ msg.role }}>
{{ endfor }}

<user>{{ message }}</user>
\`\`\`

---

## Best Practices

- ✅ **DO**: Limit history length (10-20 messages)
- ✅ **DO**: Summarize old conversations
- ✅ **DO**: Include system message with each request
- ❌ **DON'T**: Pass unlimited history (token overflow)
- ❌ **DON'T**: Forget to include system context

---

## Next Steps

- **Chatbot recipe** → \`docs({ action: "get", topic: "recipe-chatbot" })\`
- **Loops** → \`docs({ action: "get", topic: "loops" })\`
`;

// ============================================================================
// GUIDE-DEBUGGING
// ============================================================================

export const DOCS_GUIDE_DEBUGGING = `# Debugging Prompts

> Fix common issues

## Overview

When prompts don't work as expected, follow these debugging steps.

---

## Common Issues

| Issue | Likely Cause |
|-------|--------------|
| YAML error | Bad indentation |
| Variable undefined | Typo or missing parameter |
| Wrong output format | Missing schema |
| Unexpected response | Temperature too high |
| Truncated response | max_tokens too low |
| Inconsistent results | Temperature > 0 |

---

## YAML Debugging

### Check Indentation
\`\`\`yaml
# ❌ Wrong
schema:
type: object  # Missing indent

# ✅ Correct
schema:
  type: object
\`\`\`

### Check Colons
\`\`\`yaml
# ❌ Wrong
description: Get weather: current  # Colon in value

# ✅ Correct
description: "Get weather: current"  # Quoted
\`\`\`

---

## Variable Debugging

### Check Names
\`\`\`promptl
# ❌ Wrong
Hello {{ userName }}  # camelCase

# ✅ Correct - match your parameter
Hello {{ user_name }}  # snake_case
\`\`\`

### Add Defaults
\`\`\`promptl
# Safe: won't fail if missing
Hello {{ name || "Guest" }}
\`\`\`

---

## Output Debugging

### Force JSON
\`\`\`yaml
# Add schema to force JSON output
schema:
  type: object
  properties:
    answer:
      type: string
\`\`\`

### Lower Temperature
\`\`\`yaml
# For consistent, predictable output
temperature: 0
\`\`\`

---

## Debugging Steps

1. **Check YAML syntax** - Validate indentation
2. **Check variable names** - Match parameters exactly
3. **Add defaults** - Handle missing parameters
4. **Lower temperature** - Get consistent output
5. **Increase max_tokens** - Allow longer responses
6. **Add schema** - Force structured output
7. **Simplify prompt** - Remove complexity to isolate issue

---

## Validation Checklist

- [ ] YAML syntax valid
- [ ] All variables have values
- [ ] Schema matches expected output
- [ ] Temperature appropriate for task
- [ ] max_tokens sufficient
- [ ] Provider/model supported

---

## Next Steps

- **Testing guide** → \`docs({ action: "get", topic: "guide-testing" })\`
- **Structure** → \`docs({ action: "get", topic: "structure" })\`
`;
