/**
 * Help Content - Server Overview
 *
 * MCP-focused introduction with NO SDK references.
 * Documents all 8 MCP tools and quick start workflow.
 */

export const HELP_CONTENT = `# Latitude MCP Server

> AI Prompt Management via Model Context Protocol

## What is Latitude?

Latitude is an AI prompt management platform. You write prompts in **PromptL** (a templating language), store them in projects, version them, and execute them via API. This MCP server lets you manage prompts directly from your AI assistant.

## What is PromptL?

PromptL is a templating language for AI prompts. It combines:
- **YAML config header** - Set provider, model, temperature
- **Message tags** - \`<system>\`, \`<user>\`, \`<assistant>\`
- **Variables** - \`{{ name }}\` for dynamic content
- **Logic** - \`{{ if }}\`, \`{{ for }}\` for conditionals and loops
- **Tools** - Function calling definitions
- **Chains** - Multi-step \`<step>\` workflows
- **Agents** - Autonomous \`type: agent\` prompts

---

## Available MCP Tools

| Tool | Description |
|------|-------------|
| \`list_prompts\` | List all prompt names in LIVE version |
| \`get_prompt\` | Get full prompt content by name |
| \`run_prompt\` | Execute a prompt with parameters |
| \`push_prompts\` | Replace ALL prompts in LIVE (destructive) |
| \`append_prompts\` | Add prompts without removing existing ones |
| \`pull_prompts\` | Download LIVE prompts to local \`./prompts/*.promptl\` |
| \`replace_prompt\` | Replace or create a single prompt |
| \`docs\` | Get documentation (this system) |

---

## Quick Start Workflow

### 1. List Existing Prompts
\`\`\`
list_prompts()
\`\`\`
Returns all prompt names in your project's LIVE version.

### 2. Get a Prompt
\`\`\`
get_prompt({ name: "my-prompt" })
\`\`\`
Returns full content including config and messages.

### 3. Run a Prompt
\`\`\`
run_prompt({ 
  name: "my-prompt", 
  parameters: { user_name: "Alice" } 
})
\`\`\`
Executes the prompt and returns AI response.

### 4. Create/Update a Prompt
\`\`\`
replace_prompt({
  name: "greeting",
  content: \`---
provider: OpenAI
model: gpt-5-1
---
Hello {{ user_name }}! How can I help you today?
\`
})
\`\`\`
Creates new prompt or updates existing one in LIVE.

### 5. Pull Prompts Locally
\`\`\`
pull_prompts({ outputDir: "./prompts" })
\`\`\`
Downloads all prompts to local files for editing.

### 6. Push Multiple Prompts
\`\`\`
push_prompts({
  prompts: [
    { name: "prompt1", content: "..." },
    { name: "prompt2", content: "..." }
  ]
})
\`\`\`
⚠️ **Warning**: This replaces ALL existing prompts.

### 7. Append Without Deleting
\`\`\`
append_prompts({
  prompts: [{ name: "new-prompt", content: "..." }],
  overwrite: false
})
\`\`\`
Safer option - adds prompts without removing existing ones.

---

## Documentation Topics (50+)

Use \`docs({ action: "get", topic: "..." })\` to read any topic.

### Core Syntax (12 topics)
| Topic | Description |
|-------|-------------|
| \`overview\` | PromptL introduction and basics |
| \`structure\` | Config section + messages format |
| \`variables\` | \`{{ }}\` interpolation, defaults, expressions |
| \`conditionals\` | \`{{ if }}\` / \`{{ else }}\` logic |
| \`loops\` | \`{{ for }}\` iteration over arrays |
| \`references\` | Include/reuse prompts |
| \`tools\` | Tool definition basics |
| \`chains\` | Multi-step \`<step>\` workflows |
| \`agents\` | Autonomous \`type: agent\` prompts |
| \`techniques\` | Prompting techniques overview |
| \`agent-patterns\` | Advanced agent architectures |
| \`mocking\` | Mock responses for testing |

### Configuration (8 topics)
| Topic | Description |
|-------|-------------|
| \`config-basics\` | Provider and model selection |
| \`config-generation\` | temperature, max_tokens, penalties |
| \`config-json-output\` | JSON schema for structured output |
| \`config-advanced\` | maxSteps, retries, seed, cache |
| \`providers-openai\` | GPT-5 models |
| \`providers-anthropic\` | Claude 4.5 models |
| \`providers-google\` | Gemini 2.5 and 3 models |
| \`providers-azure\` | Azure OpenAI deployment |

### Messages (2 topics)
| Topic | Description |
|-------|-------------|
| \`messages-roles\` | system, user, assistant, tool |
| \`messages-multimodal\` | Images and files in prompts |

### Tools (4 topics)
| Topic | Description |
|-------|-------------|
| \`tools-builtin\` | latitude/search, latitude/code, latitude/extract |
| \`tools-custom\` | Define your own tools |
| \`tools-schema\` | JSON Schema for parameters |
| \`tools-orchestration\` | Coordinate multiple tools |

### Techniques (12 topics)
| Topic | Description |
|-------|-------------|
| \`technique-role\` | Expert personas |
| \`technique-few-shot\` | Learning from examples |
| \`technique-cot\` | Chain of Thought reasoning |
| \`technique-tot\` | Tree of Thoughts exploration |
| \`technique-react\` | Reasoning + Acting pattern |
| \`technique-self-consistency\` | Multiple response voting |
| \`technique-constitutional\` | Principle-based AI |
| \`technique-socratic\` | Question-guided learning |
| \`technique-meta\` | AI-generated prompts |
| \`technique-iterative\` | Refinement loops |
| \`technique-step-back\` | Abstract-first reasoning |
| \`technique-rag\` | Retrieval-augmented generation |

### Recipes (8 topics)
| Topic | Description |
|-------|-------------|
| \`recipe-classification\` | Sentiment, intent detection |
| \`recipe-extraction\` | Structured data parsing |
| \`recipe-generation\` | Content creation |
| \`recipe-chatbot\` | Conversational AI |
| \`recipe-rag\` | Search + generate pattern |
| \`recipe-analysis\` | Multi-step analysis |
| \`recipe-moderation\` | Content filtering |
| \`recipe-support\` | Customer support agent |

### Guides (6 topics)
| Topic | Description |
|-------|-------------|
| \`conversation-history\` | Multi-turn context handling |
| \`guide-debugging\` | Fix common issues |
| \`guide-safety\` | Guardrails and filtering |
| \`guide-performance\` | Optimize tokens and cost |
| \`guide-testing\` | Test prompts systematically |
| \`guide-versioning\` | Draft/live workflow |

---

## Common Tasks

| Task | Command |
|------|---------|
| **Find docs by keyword** | \`docs({ action: "find", query: "json output" })\` |
| **Get specific topic** | \`docs({ action: "get", topic: "variables" })\` |
| **See all topics** | \`docs({ action: "help" })\` |

---

## Learning Path

### Beginner
1. \`overview\` → What is PromptL?
2. \`structure\` → Config + messages format
3. \`variables\` → Dynamic content
4. \`config-basics\` → Provider/model setup

### Intermediate
1. \`conditionals\` → Dynamic logic
2. \`loops\` → Few-shot examples
3. \`tools\` → Function calling
4. \`config-json-output\` → Structured responses

### Advanced
1. \`chains\` → Multi-step workflows
2. \`agents\` → Autonomous AI
3. \`agent-patterns\` → Complex architectures
4. \`technique-cot\` → Reasoning techniques

---

## Example: Complete Prompt

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
temperature: 0.7
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
<system>
You are a sentiment analysis expert. Analyze the sentiment of user messages.
</system>

<user>
{{ message }}
</user>
\`\`\`

**Run it:**
\`\`\`
run_prompt({ 
  name: "sentiment-analyzer",
  parameters: { message: "I love this product!" }
})
\`\`\`

**Response:**
\`\`\`json
{ "sentiment": "positive", "confidence": 0.95 }
\`\`\`

---

## Next Steps

- **New to PromptL?** → \`docs({ action: "get", topic: "overview" })\`
- **Need structured output?** → \`docs({ action: "get", topic: "config-json-output" })\`
- **Building a chatbot?** → \`docs({ action: "get", topic: "recipe-chatbot" })\`
- **Need an agent?** → \`docs({ action: "get", topic: "agents" })\`
`;
