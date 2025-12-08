/**
 * Core Syntax Documentation Topics (12 topics)
 *
 * Comprehensive PromptL syntax documentation.
 * Each topic: 100+ lines with examples.
 */

// ============================================================================
// OVERVIEW
// ============================================================================

export const DOCS_OVERVIEW = `# PromptL Overview

> The templating language for AI prompts

## What is PromptL?

PromptL is a domain-specific language for writing AI prompts. It combines the power of templating with AI-specific features like message roles, tool definitions, and multi-step chains.

**Key Features:**
- **YAML configuration** - Set model, temperature, and provider
- **Message tags** - Define system, user, assistant conversations
- **Variables** - Dynamic content with \`{{ }}\` interpolation
- **Logic** - Conditionals and loops for dynamic prompts
- **Tools** - Enable AI to call external functions
- **Chains** - Multi-step reasoning workflows
- **Agents** - Autonomous AI that loops until done

---

## Quick Reference

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
temperature: 0.7
---
<system>
You are a helpful assistant.
</system>

<user>
Hello, my name is {{ name }}!
</user>
\`\`\`

---

## When to Use PromptL

| Use Case | PromptL Feature |
|----------|-----------------|
| Dynamic content | Variables \`{{ }}\` |
| Conditional responses | \`{{ if }}\` / \`{{ else }}\` |
| Few-shot examples | \`{{ for }}\` loops |
| Structured output | JSON schema |
| Function calling | Tools |
| Multi-step reasoning | Chains with \`<step>\` |
| Autonomous tasks | Agents with \`type: agent\` |

---

## Basic Structure

Every PromptL prompt has two parts:

### 1. Config Section (Optional)
\`\`\`yaml
---
provider: OpenAI
model: gpt-5-1
temperature: 0.7
---
\`\`\`

### 2. Messages Section
\`\`\`xml
<system>
You are a helpful assistant.
</system>

<user>
{{ user_input }}
</user>
\`\`\`

---

## Example: Simple Greeting

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
<system>
You are a friendly greeter.
</system>

<user>
Say hello to {{ name }} in {{ language }}.
</user>
\`\`\`

**Parameters:**
\`\`\`json
{ "name": "Alice", "language": "Spanish" }
\`\`\`

**Response:**
\`\`\`
¡Hola Alice! ¡Bienvenida!
\`\`\`

---

## Example: With JSON Output

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
schema:
  type: object
  properties:
    sentiment:
      type: string
      enum: [positive, negative, neutral]
  required: [sentiment]
---
Analyze the sentiment of: {{ text }}
\`\`\`

---

## Next Steps

- **Structure details** → \`docs({ action: "get", topic: "structure" })\`
- **Variables** → \`docs({ action: "get", topic: "variables" })\`
- **Configuration** → \`docs({ action: "get", topic: "config-basics" })\`
`;

// ============================================================================
// STRUCTURE
// ============================================================================

export const DOCS_STRUCTURE = `# Prompt Structure

> Config section + Messages section

## Overview

Every PromptL prompt consists of two parts:
1. **Config Section** - YAML between \`---\` delimiters (optional)
2. **Messages Section** - The actual prompt content

---

## Quick Reference

\`\`\`promptl
---
provider: OpenAI          # Required: AI provider
model: gpt-5-1             # Required: Model name
temperature: 0.7          # Optional: Creativity (0-2)
max_tokens: 500           # Optional: Response limit
---
<system>
System instructions here.
</system>

<user>
User message here.
</user>
\`\`\`

---

## Config Section

The config section uses YAML format and is enclosed between triple dashes (\`---\`).

### Required Fields

\`\`\`yaml
---
provider: OpenAI    # AI provider name
model: gpt-5-1       # Model identifier
---
\`\`\`

### Optional Fields

\`\`\`yaml
---
provider: OpenAI
model: gpt-5-1
temperature: 0.7        # 0 = deterministic, 2 = creative
top_p: 0.9              # Nucleus sampling
max_tokens: 1000        # Max response tokens
stop: ["\\n"]           # Stop sequences
presence_penalty: 0.2   # Topic diversity
frequency_penalty: 0.5  # Reduce repetition
---
\`\`\`

### No Config (Default)

You can omit config entirely - values come from defaults:

\`\`\`promptl
Hello, how are you today?
\`\`\`

---

## Messages Section

### System Message (Implicit)

Text without tags becomes a system message:

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
You are a helpful assistant that speaks like a pirate.
\`\`\`

### System Message (Explicit)

\`\`\`promptl
<system>
You are a helpful assistant that speaks like a pirate.
</system>
\`\`\`

### User Message

\`\`\`promptl
<user>
Tell me about {{ topic }}.
</user>
\`\`\`

### Assistant Message

Pre-filled assistant responses (for few-shot):

\`\`\`promptl
<assistant>
I'd be happy to help with that!
</assistant>
\`\`\`

### Tool Message

Tool call results:

\`\`\`promptl
<tool id="123">
{ "temperature": 72, "condition": "sunny" }
</tool>
\`\`\`

---

## Complete Example

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
temperature: 0.3
max_tokens: 500
---
<system>
You are a technical writer. Write clear, concise documentation.
</system>

<user>
Write documentation for: {{ feature_name }}

Requirements:
{{ for req in requirements }}
- {{ req }}
{{ endfor }}
</user>
\`\`\`

---

## Common Patterns

### Minimal Prompt
\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
{{ user_input }}
\`\`\`

### With System Instructions
\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
<system>
Be concise. Answer in 2-3 sentences max.
</system>

<user>{{ question }}</user>
\`\`\`

### Conversation History
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

<user>{{ new_message }}</user>
\`\`\`

---

## Best Practices

- ✅ **DO**: Always specify provider and model
- ✅ **DO**: Use system message for behavior/persona
- ✅ **DO**: Keep system instructions concise
- ❌ **DON'T**: Mix instructions across messages
- ❌ **DON'T**: Put user input in system message

---

## Next Steps

- **Variables** → \`docs({ action: "get", topic: "variables" })\`
- **Message roles** → \`docs({ action: "get", topic: "messages-roles" })\`
- **Config options** → \`docs({ action: "get", topic: "config-generation" })\`
`;

// ============================================================================
// VARIABLES
// ============================================================================

export const DOCS_VARIABLES = `# Variables & Expressions

> Dynamic content with \`{{ }}\`

## Overview

Variables in PromptL allow dynamic content injection. Use double curly braces \`{{ }}\` to:
- Insert input parameters
- Define local variables
- Perform calculations
- Access built-in values

---

## Quick Reference

\`\`\`promptl
{{ name }}                    # Input parameter
{{ name = "Alice" }}          # Define variable
{{ name || "default" }}       # Default value
{{ age * 12 }}                # Expression
{{ $now }}                    # Built-in: current date
{{ user.name }}               # Nested access
{{ items[0] }}                # Array access
\`\`\`

---

## Input Parameters

Variables without definition come from input parameters:

\`\`\`promptl
<user>
Hello {{ name }}, you ordered {{ product }}.
</user>
\`\`\`

**Run with:**
\`\`\`json
{ "name": "Alice", "product": "Blue Widget" }
\`\`\`

**Result:**
\`\`\`
Hello Alice, you ordered Blue Widget.
\`\`\`

---

## Defining Variables

Assign values directly in the prompt:

\`\`\`promptl
{{ greeting = "Hello" }}
{{ count = 5 }}
{{ active = true }}

{{ greeting }}! You have {{ count }} items.
\`\`\`

---

## Default Values

Use \`||\` for fallback when parameter is missing:

\`\`\`promptl
Hello {{ name || "Guest" }}!
Your role: {{ role || "user" }}
\`\`\`

If \`name\` is not provided, outputs: \`Hello Guest!\`

---

## Expressions

### Arithmetic

\`\`\`promptl
{{ age = 25 }}
{{ months = age * 12 }}

You are {{ age }} years old, which is {{ months }} months.
\`\`\`

### String Operations

\`\`\`promptl
{{ full_name = first_name + " " + last_name }}

Welcome, {{ full_name }}!
\`\`\`

### Ternary Conditions

\`\`\`promptl
{{ status = score >= 70 ? "passed" : "failed" }}

Result: {{ status }}
\`\`\`

### Comparisons

\`\`\`promptl
{{ is_adult = age >= 18 }}
{{ is_premium = plan == "premium" }}
{{ needs_review = score < 0.5 }}
\`\`\`

---

## Built-in Variables

### \`$now\` - Current Date/Time

\`\`\`promptl
Today is {{ $now }}.
\`\`\`

Outputs: \`Today is 2024-01-15T10:30:45.123Z.\`

### Date Methods

\`\`\`promptl
{{ year = $now.getFullYear() }}
{{ month = $now.getMonth() + 1 }}
{{ day = $now.getDate() }}

Date: {{ year }}-{{ month }}-{{ day }}
\`\`\`

---

## Nested Objects

Access nested properties with dot notation:

\`\`\`promptl
{{ user.name }}
{{ user.address.city }}
{{ order.items[0].name }}
\`\`\`

**Input:**
\`\`\`json
{
  "user": {
    "name": "Alice",
    "address": { "city": "NYC" }
  }
}
\`\`\`

---

## Arrays

Access array elements by index:

\`\`\`promptl
First item: {{ items[0] }}
Last item: {{ items[items.length - 1] }}
\`\`\`

---

## Complex Example

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
{{ today = $now }}
{{ greeting = hour < 12 ? "Good morning" : "Good afternoon" }}
{{ name = user.name || "Guest" }}
{{ items_count = cart.items.length }}

<system>
You are a shopping assistant. Be helpful and concise.
</system>

<user>
{{ greeting }}, {{ name }}!

You have {{ items_count }} item(s) in your cart:
{{ for item in cart.items }}
- {{ item.name }}: {{ item.price }} USD
{{ endfor }}

Total: {{ cart.total }} USD

{{ if cart.total > 100 }}
You qualify for free shipping!
{{ endif }}
</user>
\`\`\`

---

## Best Practices

- ✅ **DO**: Use descriptive variable names (\`user_name\` not \`x\`)
- ✅ **DO**: Provide defaults for optional parameters
- ✅ **DO**: Use expressions to preprocess data
- ❌ **DON'T**: Redefine variables unnecessarily
- ❌ **DON'T**: Use complex logic in variables (use conditionals instead)

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| \`{{ name }}\` undefined | Add default: \`{{ name \\|\\| "default" }}\` |
| \`{{ user.name }}\` on null | Check: \`{{ user?.name }}\` or validate input |
| Expression error | Wrap in parentheses: \`{{ (a + b) * c }}\` |

---

## Next Steps

- **Conditionals** → \`docs({ action: "get", topic: "conditionals" })\`
- **Loops** → \`docs({ action: "get", topic: "loops" })\`
- **Input parameters** → \`docs({ action: "get", topic: "structure" })\`
`;

// ============================================================================
// CONDITIONALS
// ============================================================================

export const DOCS_CONDITIONALS = `# Conditionals

> Dynamic prompts with if/else logic

## Overview

Conditionals let you include or exclude content based on conditions. Use \`{{ if }}\`, \`{{ else }}\`, \`{{ elseif }}\`, and \`{{ endif }}\`.

---

## Quick Reference

\`\`\`promptl
{{ if condition }}
  Content when true
{{ endif }}

{{ if condition }}
  Content when true
{{ else }}
  Content when false
{{ endif }}

{{ if condition1 }}
  First branch
{{ elseif condition2 }}
  Second branch
{{ else }}
  Default branch
{{ endif }}
\`\`\`

---

## Basic If

\`\`\`promptl
{{ if is_premium }}
Thank you for being a premium member!
{{ endif }}
\`\`\`

---

## If/Else

\`\`\`promptl
{{ if logged_in }}
Welcome back, {{ username }}!
{{ else }}
Please log in to continue.
{{ endif }}
\`\`\`

---

## If/Elseif/Else

\`\`\`promptl
{{ if score >= 90 }}
Grade: A - Excellent!
{{ elseif score >= 80 }}
Grade: B - Good job!
{{ elseif score >= 70 }}
Grade: C - Satisfactory
{{ elseif score >= 60 }}
Grade: D - Needs improvement
{{ else }}
Grade: F - Please try again
{{ endif }}
\`\`\`

---

## Comparison Operators

| Operator | Meaning |
|----------|---------|
| \`==\` | Equal |
| \`!=\` | Not equal |
| \`>\` | Greater than |
| \`<\` | Less than |
| \`>=\` | Greater or equal |
| \`<=\` | Less or equal |

\`\`\`promptl
{{ if age >= 18 }}Adult{{ endif }}
{{ if status == "active" }}Active user{{ endif }}
{{ if count != 0 }}Has items{{ endif }}
\`\`\`

---

## Logical Operators

| Operator | Meaning |
|----------|---------|
| \`&&\` | AND |
| \`\\|\\|\` | OR |
| \`!\` | NOT |

\`\`\`promptl
{{ if is_admin && is_active }}
Admin panel access granted.
{{ endif }}

{{ if is_premium || has_trial }}
Premium features unlocked.
{{ endif }}

{{ if !is_banned }}
Welcome!
{{ endif }}
\`\`\`

---

## Truthy/Falsy Values

| Falsy | Truthy |
|-------|--------|
| \`false\` | \`true\` |
| \`null\` | Any string |
| \`undefined\` | Any number |
| \`0\` | Objects |
| \`""\` (empty string) | Arrays |

\`\`\`promptl
{{ if user }}
User exists: {{ user.name }}
{{ endif }}

{{ if items.length }}
You have items in cart.
{{ endif }}
\`\`\`

---

## Nested Conditionals

\`\`\`promptl
{{ if user }}
  {{ if user.is_admin }}
    Admin: {{ user.name }}
  {{ elseif user.is_moderator }}
    Moderator: {{ user.name }}
  {{ else }}
    User: {{ user.name }}
  {{ endif }}
{{ else }}
  Guest user
{{ endif }}
\`\`\`

---

## Conditionals with Messages

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
<system>
You are a customer support agent.
{{ if is_premium }}
This is a premium customer - prioritize their request.
{{ endif }}
</system>

<user>
{{ if context }}
Context: {{ context }}

{{ endif }}
{{ question }}
</user>
\`\`\`

---

## Conditionals with Tools

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
{{ if needs_search }}
tools:
  - latitude/search
{{ endif }}
---
{{ query }}
\`\`\`

---

## Real-World Example: Multi-Language

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
<system>
{{ if language == "es" }}
Eres un asistente útil. Responde en español.
{{ elseif language == "fr" }}
Vous êtes un assistant utile. Répondez en français.
{{ elseif language == "de" }}
Sie sind ein hilfreicher Assistent. Antworten Sie auf Deutsch.
{{ else }}
You are a helpful assistant. Respond in English.
{{ endif }}
</system>

<user>
{{ message }}
</user>
\`\`\`

---

## Best Practices

- ✅ **DO**: Keep conditions simple and readable
- ✅ **DO**: Use \`elseif\` for multiple branches (not nested \`if\`)
- ✅ **DO**: Check for null/undefined before accessing properties
- ❌ **DON'T**: Create deeply nested conditionals (3+ levels)
- ❌ **DON'T**: Put complex logic in conditions (precompute in variables)

---

## Next Steps

- **Loops** → \`docs({ action: "get", topic: "loops" })\`
- **Variables** → \`docs({ action: "get", topic: "variables" })\`
`;

// ============================================================================
// LOOPS
// ============================================================================

export const DOCS_LOOPS = `# Loops & Iteration

> Iterate over arrays with for/endfor

## Overview

Loops let you iterate over arrays to generate dynamic content. Perfect for few-shot examples, lists, and dynamic prompts.

---

## Quick Reference

\`\`\`promptl
{{ for item in items }}
  {{ item }}
{{ endfor }}

{{ for item, index in items }}
  {{ index }}: {{ item }}
{{ endfor }}
\`\`\`

---

## Basic Loop

\`\`\`promptl
{{ for color in colors }}
- {{ color }}
{{ endfor }}
\`\`\`

**Input:** \`{ "colors": ["red", "green", "blue"] }\`

**Output:**
\`\`\`
- red
- green
- blue
\`\`\`

---

## Loop with Index

\`\`\`promptl
{{ for item, index in items }}
{{ index + 1 }}. {{ item }}
{{ endfor }}
\`\`\`

**Output:**
\`\`\`
1. First item
2. Second item
3. Third item
\`\`\`

---

## Loop Variables

Inside a loop, you have access to special variables:

| Variable | Description |
|----------|-------------|
| \`item\` | Current item |
| \`index\` | Current index (0-based) |
| \`first\` | \`true\` if first iteration |
| \`last\` | \`true\` if last iteration |

\`\`\`promptl
{{ for item in items }}
{{ if first }}First: {{ endif }}
{{ if last }}Last: {{ endif }}
{{ item }}
{{ endfor }}
\`\`\`

---

## Objects in Arrays

\`\`\`promptl
{{ for user in users }}
- {{ user.name }} ({{ user.email }})
{{ endfor }}
\`\`\`

**Input:**
\`\`\`json
{
  "users": [
    { "name": "Alice", "email": "alice@example.com" },
    { "name": "Bob", "email": "bob@example.com" }
  ]
}
\`\`\`

---

## Few-Shot Examples

The most common use case - providing examples to guide AI:

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
<system>
You are a sentiment classifier. Classify text as positive, negative, or neutral.
</system>

{{ for example in examples }}
<user>
{{ example.text }}
</user>
<assistant>
{{ example.sentiment }}
</assistant>
{{ endfor }}

<user>
{{ new_text }}
</user>
\`\`\`

**Input:**
\`\`\`json
{
  "examples": [
    { "text": "I love this!", "sentiment": "positive" },
    { "text": "This is terrible.", "sentiment": "negative" },
    { "text": "It's okay.", "sentiment": "neutral" }
  ],
  "new_text": "Best purchase ever!"
}
\`\`\`

---

## Nested Loops

\`\`\`promptl
{{ for category in categories }}
## {{ category.name }}
{{ for item in category.items }}
  - {{ item }}
{{ endfor }}

{{ endfor }}
\`\`\`

---

## Loop with Conditionals

\`\`\`promptl
{{ for product in products }}
{{ if product.in_stock }}
- {{ product.name }}: {{ product.price }} USD
{{ endif }}
{{ endfor }}
\`\`\`

---

## Conversation History

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
<system>
You are a helpful assistant.
</system>

{{ for msg in history }}
<{{ msg.role }}>
{{ msg.content }}
</{{ msg.role }}>
{{ endfor }}

<user>
{{ new_message }}
</user>
\`\`\`

---

## Comma-Separated Lists

\`\`\`promptl
Items: {{ for item, index in items }}{{ if index > 0 }}, {{ endif }}{{ item }}{{ endfor }}
\`\`\`

**Output:** \`Items: apple, banana, cherry\`

---

## Numbered List

\`\`\`promptl
Requirements:
{{ for req, i in requirements }}
{{ i + 1 }}. {{ req }}
{{ endfor }}
\`\`\`

---

## Empty Array Handling

\`\`\`promptl
{{ if items.length > 0 }}
Your items:
{{ for item in items }}
- {{ item }}
{{ endfor }}
{{ else }}
No items found.
{{ endif }}
\`\`\`

---

## Best Practices

- ✅ **DO**: Use descriptive loop variable names (\`user\` not \`x\`)
- ✅ **DO**: Check array length before looping if it might be empty
- ✅ **DO**: Use \`first\`/\`last\` for special formatting
- ❌ **DON'T**: Create deeply nested loops (3+ levels)
- ❌ **DON'T**: Loop over huge arrays (100+ items) - summarize instead

---

## Next Steps

- **Few-shot technique** → \`docs({ action: "get", topic: "technique-few-shot" })\`
- **Conditionals** → \`docs({ action: "get", topic: "conditionals" })\`
- **Chatbot recipe** → \`docs({ action: "get", topic: "recipe-chatbot" })\`
`;

// ============================================================================
// REFERENCES
// ============================================================================

export const DOCS_REFERENCES = `# References & Snippets

> Include and reuse prompts

## Overview

References let you include other prompts or snippets, creating modular, reusable prompt libraries.

---

## Quick Reference

\`\`\`promptl
<ref path="shared/system-prompt" />
<ref path="snippets/few-shot-examples" />
\`\`\`

---

## Basic Reference

Include another prompt by path:

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
<ref path="prompts/system-instructions" />

<user>
{{ user_input }}
</user>
\`\`\`

---

## Reference with Parameters

Pass parameters to referenced prompt:

\`\`\`promptl
<ref path="templates/greeting" name="{{ user_name }}" language="es" />
\`\`\`

---

## Shared System Prompts

Create reusable system instructions:

**\`shared/support-agent.promptl\`:**
\`\`\`promptl
<system>
You are a customer support agent for {{ company_name }}.
- Be helpful, empathetic, and professional
- If you don't know something, say so
- Never make up information
</system>
\`\`\`

**Use it:**
\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
<ref path="shared/support-agent" company_name="Acme Inc" />

<user>
{{ customer_message }}
</user>
\`\`\`

---

## Few-Shot Libraries

Create reusable example sets:

**\`examples/sentiment-examples.promptl\`:**
\`\`\`promptl
{{ for ex in examples }}
<user>{{ ex.text }}</user>
<assistant>{{ ex.label }}</assistant>
{{ endfor }}
\`\`\`

**Use it:**
\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
<system>Classify sentiment as positive, negative, or neutral.</system>

<ref path="examples/sentiment-examples" examples="{{ few_shot_data }}" />

<user>{{ new_text }}</user>
\`\`\`

---

## Composition Pattern

Build complex prompts from simple parts:

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
<ref path="parts/system-role" />
<ref path="parts/safety-rules" />
<ref path="parts/output-format" />

<user>
{{ user_input }}
</user>
\`\`\`

---

## Best Practices

- ✅ **DO**: Create small, focused snippets
- ✅ **DO**: Use clear naming conventions (\`shared/\`, \`templates/\`, \`examples/\`)
- ✅ **DO**: Document required parameters
- ❌ **DON'T**: Create circular references
- ❌ **DON'T**: Over-nest references (2-3 levels max)

---

## Next Steps

- **Agents** → \`docs({ action: "get", topic: "agents" })\`
- **Structure** → \`docs({ action: "get", topic: "structure" })\`
`;

// ============================================================================
// TOOLS
// ============================================================================

export const DOCS_TOOLS = `# Tools Overview

> Enable AI to call external functions

## Overview

Tools let AI models call external functions to perform actions beyond text generation. Define tools in config, and the AI decides when to use them.

---

## Quick Reference

\`\`\`yaml
---
provider: OpenAI
model: gpt-5-1
tools:
  - latitude/search              # Built-in tool
  - get_weather:                 # Custom tool
      description: Get weather for a city
      parameters:
        type: object
        properties:
          city:
            type: string
        required: [city]
---
\`\`\`

---

## Built-in Tools

Latitude provides ready-to-use tools:

| Tool | Description |
|------|-------------|
| \`latitude/search\` | Web search |
| \`latitude/code\` | Execute code |
| \`latitude/extract\` | Extract from URLs |
| \`latitude/*\` | All built-in tools |

\`\`\`yaml
---
provider: OpenAI
model: gpt-5-1
tools:
  - latitude/search
  - latitude/code
---
\`\`\`

---

## Custom Tools

Define your own tools with JSON Schema:

\`\`\`yaml
---
provider: OpenAI
model: gpt-5-1
tools:
  - get_weather:
      description: Get current weather for a location
      parameters:
        type: object
        properties:
          location:
            type: string
            description: City name (e.g., "San Francisco, CA")
        required: [location]
---
<user>
What's the weather in {{ city }}?
</user>
\`\`\`

---

## How Tools Work

1. **Define** - List tools in config
2. **AI decides** - Model chooses when to call
3. **Execute** - Tool runs and returns result
4. **Continue** - AI uses result to respond

---

## Tool Call Flow

\`\`\`
User: "What's the weather in Paris?"
    ↓
AI decides to call: get_weather({ location: "Paris" })
    ↓
Tool returns: { "temp": 18, "condition": "cloudy" }
    ↓
AI responds: "The weather in Paris is 18°C and cloudy."
\`\`\`

---

## Example: Search + Answer

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
tools:
  - latitude/search
---
<system>
You are a research assistant. Search for information before answering.
</system>

<user>
{{ question }}
</user>
\`\`\`

---

## Example: Multi-Tool

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
tools:
  - latitude/search
  - latitude/code
  - get_stock_price:
      description: Get current stock price
      parameters:
        type: object
        properties:
          symbol:
            type: string
        required: [symbol]
---
<user>
Analyze the stock {{ ticker }} and calculate 10% growth.
</user>
\`\`\`

---

## Tools with Agents

Agents loop until goal is achieved, using tools as needed:

\`\`\`yaml
---
provider: OpenAI
model: gpt-5-1
type: agent
maxSteps: 10
tools:
  - latitude/search
  - latitude/extract
---
Research and summarize the top 3 news stories about {{ topic }}.
\`\`\`

---

## Next Steps

- **Built-in tools** → \`docs({ action: "get", topic: "tools-builtin" })\`
- **Custom tools** → \`docs({ action: "get", topic: "tools-custom" })\`
- **JSON Schema** → \`docs({ action: "get", topic: "tools-schema" })\`
- **Agents** → \`docs({ action: "get", topic: "agents" })\`
`;

// ============================================================================
// CHAINS
// ============================================================================

export const DOCS_CHAINS = `# Chains & Steps

> Multi-step prompts with <step>

## Overview

Chains break complex tasks into sequential steps. Each \`<step>\` pauses for AI response, which can be used in subsequent steps.

---

## Quick Reference

\`\`\`promptl
<step>
  First, analyze this: {{ data }}
</step>

<step>
  Now, summarize the analysis.
</step>
\`\`\`

---

## Basic Chain

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
<step>
  Analyze this text: {{ text }}
  Identify the main themes.
</step>

<step>
  Now, write a one-paragraph summary based on those themes.
</step>
\`\`\`

---

## Storing Step Results

Use \`as\` attribute to save response to a variable:

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
<step as="analysis">
  Is this statement factually correct? {{ statement }}
  Answer only "yes" or "no".
</step>

{{ if analysis == "yes" }}
<step>
  Explain why this statement is correct.
</step>
{{ else }}
<step>
  Explain why this is incorrect and provide the correct information.
</step>
{{ endif }}
\`\`\`

---

## JSON Response Parsing

Parse step response as JSON with \`schema\`:

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
<step as="result" schema={{ { type: "object", properties: { score: { type: "number" }, feedback: { type: "string" } }, required: ["score", "feedback"] } }}>
  Evaluate this essay: {{ essay }}
  Return a score (0-100) and feedback.
</step>

{{ if result.score >= 70 }}
Congratulations! You passed with {{ result.score }}%.
{{ else }}
Score: {{ result.score }}%. Feedback: {{ result.feedback }}
{{ endif }}
\`\`\`

---

## Isolated Steps

Prevent context inheritance with \`isolated\`:

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
<step isolated as="summary1">
  Summarize document 1: {{ doc1 }}
</step>

<step isolated as="summary2">
  Summarize document 2: {{ doc2 }}
</step>

<step>
  Compare these summaries:
  1. {{ summary1 }}
  2. {{ summary2 }}
</step>
\`\`\`

Benefits of \`isolated\`:
- Reduces token usage (less context)
- Prevents cross-contamination
- Better for parallel tasks

---

## Step-Specific Config

Override config per step:

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
temperature: 0.7
---
<step model="gpt-5-mini" temperature={{ 0 }}>
  Extract keywords from: {{ text }}
</step>

<step temperature={{ 1.0 }}>
  Write a creative story using these keywords.
</step>
\`\`\`

---

## Raw Message Access

Get full message object with \`raw\`:

\`\`\`promptl
<step raw="message">
  {{ prompt }}
</step>

Role: {{ message.role }}
Content: {{ message.content[0].text }}
\`\`\`

---

## Limiting Steps

Prevent infinite loops with \`maxSteps\`:

\`\`\`yaml
---
provider: OpenAI
model: gpt-5-1
maxSteps: 5
---
\`\`\`

Default is 20 steps. Max is 150.

---

## Decision Tree Pattern

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
<step as="category">
  Classify this request into: billing, technical, general
  Request: {{ request }}
  Reply with only the category name.
</step>

{{ if category == "billing" }}
<step>
  You are a billing specialist. Address this billing question: {{ request }}
</step>
{{ elseif category == "technical" }}
<step>
  You are a technical support expert. Solve this: {{ request }}
</step>
{{ else }}
<step>
  Provide a helpful general response to: {{ request }}
</step>
{{ endif }}
\`\`\`

---

## Multi-Step Analysis

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
<step as="data">
  Extract key metrics from: {{ report }}
</step>

<step as="insights">
  Based on: {{ data }}
  What are the 3 key insights?
</step>

<step>
  Based on insights: {{ insights }}
  What actions should we take?
</step>
\`\`\`

---

## Best Practices

- ✅ **DO**: Use \`as\` to store results you'll need later
- ✅ **DO**: Use \`isolated\` for independent tasks
- ✅ **DO**: Set appropriate \`maxSteps\` limit
- ✅ **DO**: Use JSON schema for structured step outputs
- ❌ **DON'T**: Create steps that depend on undefined variables
- ❌ **DON'T**: Make chains too long (5-10 steps max)

---

## Next Steps

- **Agents** → \`docs({ action: "get", topic: "agents" })\`
- **Chain of Thought** → \`docs({ action: "get", topic: "technique-cot" })\`
`;

// ============================================================================
// AGENTS
// ============================================================================

export const DOCS_AGENTS = `# Agents

> Autonomous AI with type: agent

## Overview

Agents are prompts that loop autonomously until they achieve a goal. They can use tools, reason through steps, and adapt their approach.

---

## Quick Reference

\`\`\`yaml
---
provider: OpenAI
model: gpt-5-1
type: agent
maxSteps: 20
tools:
  - latitude/search
---
Research and summarize {{ topic }}.
\`\`\`

---

## Creating an Agent

Add \`type: agent\` to config:

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
type: agent
---
Plan and execute the steps needed to write a blog post about {{ topic }}.
\`\`\`

---

## Agent Loop

When an agent runs:
1. **Understand** - Parse the goal
2. **Plan** - Determine first step
3. **Act** - Generate text or call tool
4. **Observe** - Process tool results
5. **Reason** - Decide next action
6. **Repeat** - Until goal achieved
7. **Complete** - Return final answer

---

## Agents with Tools

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
type: agent
tools:
  - latitude/search
  - latitude/extract
---
<system>
You are a research assistant. Use tools to gather information before answering.
</system>

<user>
Find the top 3 features of {{ product }} and compare them.
</user>
\`\`\`

---

## Limiting Steps

Prevent runaway agents:

\`\`\`yaml
---
provider: OpenAI
model: gpt-5-1
type: agent
maxSteps: 10    # Stop after 10 steps
---
\`\`\`

Default: 20. Maximum: 150.

---

## Structured Output

Force agent to return specific format:

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
type: agent
tools:
  - latitude/search
schema:
  type: object
  properties:
    summary:
      type: string
    sources:
      type: array
      items:
        type: string
  required: [summary, sources]
---
Research {{ topic }} and provide a summary with sources.
\`\`\`

---

## Predefined Steps

Guide agent with initial steps:

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
type: agent
tools:
  - latitude/search
---
<step>
First, search for recent news about {{ topic }}.
</step>

<step>
Identify the top 3 trends.
</step>

Now analyze and write a summary comparing these trends.
\`\`\`

---

## Subagents

Delegate to other agents:

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
type: agent
agents:
  - research-agent
  - writing-agent
---
Use the research agent to gather information about {{ topic }}, 
then use the writing agent to create a blog post.
\`\`\`

---

## Example: Research Agent

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
type: agent
maxSteps: 15
tools:
  - latitude/search
  - latitude/extract
schema:
  type: object
  properties:
    findings:
      type: array
      items:
        type: object
        properties:
          fact:
            type: string
          source:
            type: string
  required: [findings]
---
<system>
You are a thorough researcher. 
- Search for multiple sources
- Verify facts across sources
- Cite your sources
</system>

<user>
Research: {{ research_question }}
</user>
\`\`\`

---

## Example: Support Agent

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
type: agent
tools:
  - search_knowledge_base:
      description: Search internal knowledge base
      parameters:
        type: object
        properties:
          query:
            type: string
        required: [query]
  - escalate_to_human:
      description: Escalate complex issues
      parameters:
        type: object
        properties:
          reason:
            type: string
        required: [reason]
---
<system>
You are a customer support agent.
- First search the knowledge base for answers
- If you can't find an answer, try rephrasing
- If still stuck, escalate to human
</system>

<user>
{{ customer_question }}
</user>
\`\`\`

---

## Best Practices

- ✅ **DO**: Set reasonable \`maxSteps\` (10-20)
- ✅ **DO**: Provide clear goal in prompt
- ✅ **DO**: Use tools that help achieve the goal
- ✅ **DO**: Add system instructions for behavior
- ❌ **DON'T**: Create agents for simple tasks (use chains)
- ❌ **DON'T**: Give too many tools (cognitive overload)
- ❌ **DON'T**: Forget \`maxSteps\` (can loop forever)

---

## Next Steps

- **Agent patterns** → \`docs({ action: "get", topic: "agent-patterns" })\`
- **Tools** → \`docs({ action: "get", topic: "tools-builtin" })\`
`;

// ============================================================================
// TECHNIQUES
// ============================================================================

export const DOCS_TECHNIQUES = `# Prompting Techniques Overview

> Choose the right approach for your task

## Overview

Different tasks require different prompting strategies. This guide helps you choose the right technique.

---

## Quick Reference

| Technique | Best For |
|-----------|----------|
| Role Prompting | Domain expertise |
| Few-Shot | Learning by example |
| Chain of Thought | Complex reasoning |
| Tree of Thoughts | Exploring options |
| RAG | Knowledge-grounded answers |
| Self-Consistency | Improved accuracy |
| ReAct | Tool-using agents |

---

## By Use Case

### Simple Tasks
- **Role Prompting** - Set expert persona
- **Few-Shot** - Provide examples

### Reasoning Tasks
- **Chain of Thought (CoT)** - Step-by-step
- **Tree of Thoughts (ToT)** - Multiple paths
- **Self-Consistency** - Vote on answers

### Knowledge Tasks
- **RAG** - Search then answer
- **Step-Back** - Abstract first

### Agent Tasks
- **ReAct** - Reason + Act
- **Tool Orchestration** - Multiple tools

### Quality Tasks
- **Iterative Refinement** - Improve output
- **Constitutional AI** - Follow principles

---

## Technique Combinations

| Task | Combine |
|------|---------|
| Complex Q&A | RAG + CoT |
| Code review | Role + Few-Shot + Iterative |
| Research | ReAct + RAG + ToT |
| Support | Role + RAG + Escalation |

---

## Choosing a Technique

\`\`\`
Is the task simple?
├── Yes → Role + Few-Shot
└── No → Does it need external data?
    ├── Yes → RAG
    └── No → Does it need reasoning?
        ├── Yes → CoT or ToT
        └── No → Does it need tools?
            ├── Yes → ReAct / Agent
            └── No → Iterative Refinement
\`\`\`

---

## Next Steps

- **Role Prompting** → \`docs({ action: "get", topic: "technique-role" })\`
- **Few-Shot** → \`docs({ action: "get", topic: "technique-few-shot" })\`
- **Chain of Thought** → \`docs({ action: "get", topic: "technique-cot" })\`
- **RAG** → \`docs({ action: "get", topic: "technique-rag" })\`
`;

// ============================================================================
// AGENT PATTERNS
// ============================================================================

export const DOCS_AGENT_PATTERNS = `# Agent Patterns

> Advanced multi-agent architectures

## Overview

Complex tasks benefit from structured agent patterns. These patterns coordinate multiple agents or steps for better results.

---

## Quick Reference

| Pattern | Use When |
|---------|----------|
| Orchestrator-Workers | Delegating subtasks |
| Evaluator-Optimizer | Quality iteration |
| Prompt Chaining | Sequential processing |
| Parallelization | Independent subtasks |
| Routing | Task classification |

---

## Orchestrator-Workers

One agent coordinates, others execute:

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
type: agent
agents:
  - research-worker
  - writing-worker
  - review-worker
---
<system>
You are an orchestrator. Break down the task and delegate to workers:
- research-worker: Gather information
- writing-worker: Create content
- review-worker: Check quality
</system>

<user>
Create a comprehensive report on {{ topic }}.
</user>
\`\`\`

---

## Evaluator-Optimizer

Generate, evaluate, improve loop:

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
<step as="draft">
Write a marketing email for {{ product }}.
</step>

<step as="evaluation" schema={{ { type: "object", properties: { score: { type: "number" }, issues: { type: "array", items: { type: "string" } } } } }}>
Evaluate this email draft:
{{ draft }}

Score 1-10 and list issues.
</step>

{{ if evaluation.score < 8 }}
<step>
Improve this email, addressing these issues:
{{ for issue in evaluation.issues }}
- {{ issue }}
{{ endfor }}

Original: {{ draft }}
</step>
{{ else }}
{{ draft }}
{{ endif }}
\`\`\`

---

## Prompt Chaining

Sequential transformation:

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
<step as="outline">
Create an outline for: {{ topic }}
</step>

<step as="draft">
Expand this outline into full content:
{{ outline }}
</step>

<step>
Polish and finalize:
{{ draft }}
</step>
\`\`\`

---

## Parallelization

Process independent tasks (conceptually):

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
<step isolated as="analysis1">
Analyze market for {{ product }} in US.
</step>

<step isolated as="analysis2">
Analyze market for {{ product }} in EU.
</step>

<step isolated as="analysis3">
Analyze market for {{ product }} in Asia.
</step>

<step>
Synthesize these regional analyses:
- US: {{ analysis1 }}
- EU: {{ analysis2 }}
- Asia: {{ analysis3 }}
</step>
\`\`\`

---

## Routing

Classify then route:

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
<step as="route">
Classify this request: {{ request }}
Options: technical, billing, sales, general
Reply with only the category.
</step>

{{ if route == "technical" }}
<step>
You are a technical support expert.
Solve: {{ request }}
</step>
{{ elseif route == "billing" }}
<step>
You are a billing specialist.
Address: {{ request }}
</step>
{{ elseif route == "sales" }}
<step>
You are a sales representative.
Help with: {{ request }}
</step>
{{ else }}
<step>
Provide general assistance for: {{ request }}
</step>
{{ endif }}
\`\`\`

---

## Best Practices

- ✅ **DO**: Use orchestrator for complex multi-step tasks
- ✅ **DO**: Use evaluator-optimizer for quality-critical outputs
- ✅ **DO**: Use isolated steps for parallelizable subtasks
- ✅ **DO**: Use routing for multi-domain assistants
- ❌ **DON'T**: Over-engineer simple tasks
- ❌ **DON'T**: Chain more than 5-7 steps without good reason

---

## Next Steps

- **Agents** → \`docs({ action: "get", topic: "agents" })\`
- **Chains** → \`docs({ action: "get", topic: "chains" })\`
`;

// ============================================================================
// MOCKING (placeholder)
// ============================================================================

export const DOCS_MOCKING = `# Mocking Responses

> Test prompts without API calls

## Overview

Mock responses let you test prompt logic without making actual API calls. Useful for development and testing.

---

## Quick Reference

\`\`\`promptl
<assistant mock>
This is a mock response that won't call the API.
</assistant>
\`\`\`

---

## When to Use

- **Development** - Test prompt structure
- **Testing** - Verify logic paths
- **Cost savings** - Avoid API calls during iteration
- **Debugging** - Isolate issues

---

## Basic Mocking

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
---
<step as="analysis">
Analyze: {{ text }}
</step>

<assistant mock>
positive
</assistant>

{{ if analysis == "positive" }}
Great! The sentiment is positive.
{{ else }}
The sentiment needs attention.
{{ endif }}
\`\`\`

---

## Next Steps

- **Testing guide** → \`docs({ action: "get", topic: "guide-testing" })\`
- **Debugging** → \`docs({ action: "get", topic: "guide-debugging" })\`
`;
