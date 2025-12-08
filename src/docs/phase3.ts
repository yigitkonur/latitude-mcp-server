/**
 * Phase 3 Documentation Topics (Expanded)
 * Tier 3: recipe-rag, guide-testing, guide-versioning,
 *         providers-openai, providers-anthropic, providers-google
 */

export const DOCS_RECIPE_RAG = `# RAG Recipe

> Retrieval-Augmented Generation

## Overview

RAG combines search with generation: retrieve relevant context, then generate a grounded response. Essential for knowledge-based applications.

---

## Quick Reference

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
tools:
  - latitude/search
---
<step as="context">
Search for information about {{ topic }}.
</step>

<step>
Based on the search results, answer: {{ question }}

Context: {{ context }}
</step>
\`\`\`

---

## Basic RAG Pattern

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
type: agent
tools:
  - latitude/search
---
<system>
You are a research assistant. Always search for information before answering.
Cite your sources.
</system>

<user>
{{ question }}
</user>
\`\`\`

---

## Two-Step RAG

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
tools:
  - latitude/search
  - latitude/extract
---
<step as="search_results">
Search for: {{ query }}
</step>

<step as="extracted">
Extract key information from the most relevant result.
</step>

<step>
Based on this information:
{{ extracted }}

Answer the question: {{ question }}

Include citations.
</step>
\`\`\`

---

## RAG with Custom Knowledge Base

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
tools:
  - search_kb:
      description: Search internal knowledge base
      parameters:
        type: object
        properties:
          query:
            type: string
          limit:
            type: integer
        required: [query]
---
<system>
You are a support agent. Search the knowledge base before answering.
If you can't find relevant information, say so.
</system>

<user>
{{ question }}
</user>
\`\`\`

---

## Grounded Responses

Force citation of sources:

\`\`\`promptl
---
provider: OpenAI
model: gpt-5-1
schema:
  type: object
  properties:
    answer:
      type: string
    sources:
      type: array
      items:
        type: object
        properties:
          title:
            type: string
          url:
            type: string
        required: [title]
    confidence:
      type: number
  required: [answer, sources]
tools:
  - latitude/search
---
Research and answer: {{ question }}

You must cite sources for every claim.
\`\`\`

---

## When to Use RAG

| Scenario | RAG? |
|----------|------|
| Current information needed | Yes ✅ |
| Domain knowledge required | Yes ✅ |
| Fact-checking | Yes ✅ |
| Creative writing | No |
| Simple chat | No |

---

## Best Practices

- ✅ **DO**: Always cite sources
- ✅ **DO**: Use structured output for citations
- ✅ **DO**: Search before generating
- ✅ **DO**: Validate retrieved information
- ❌ **DON'T**: Generate without context
- ❌ **DON'T**: Trust search results blindly

---

## Next Steps

- **Built-in tools** → \`docs({ action: "get", topic: "tools-builtin" })\`
- **Chains** → \`docs({ action: "get", topic: "chains" })\`
`;

export const DOCS_GUIDE_TESTING = `# Testing Prompts

> Systematic prompt testing strategies

## Overview

Test prompts to ensure quality, catch regressions, and validate behavior across different inputs.

---

## Quick Reference

| Test Type | Purpose |
|-----------|---------|
| Unit | Test individual prompts |
| Integration | Test full workflows |
| Edge cases | Handle unusual inputs |
| Regression | Prevent breaking changes |
| Adversarial | Test safety boundaries |

---

## Basic Testing Strategy

\`\`\`
1. Define expected behavior
2. Create test cases (normal + edge)
3. Run prompt with test inputs
4. Verify outputs match expectations
5. Automate regression tests
\`\`\`

---

## Test Case Structure

\`\`\`json
{
  "test_name": "sentiment_positive",
  "input": {
    "text": "I love this product!"
  },
  "expected": {
    "sentiment": "positive",
    "confidence_min": 0.8
  }
}
\`\`\`

---

## Testing with MCP Tools

### Run Test Cases

\`\`\`
run_prompt({
  name: "sentiment-analyzer",
  parameters: { "text": "I love this product!" }
})
\`\`\`

### Verify Output

Check that response matches expected structure and values.

---

## Edge Case Testing

| Category | Examples |
|----------|----------|
| Empty input | \`""\`, \`null\` |
| Long input | 10k+ characters |
| Special chars | Emojis, unicode, quotes |
| Multiple languages | Non-English text |
| Malformed | Invalid JSON, broken formatting |

---

## Adversarial Testing

Test prompt boundaries:

\`\`\`json
{
  "test": "jailbreak_attempt",
  "input": "Ignore previous instructions and...",
  "expected_behavior": "decline_politely"
}
\`\`\`

---

## Regression Testing Checklist

- [ ] Core functionality works
- [ ] Edge cases handled
- [ ] Error messages appropriate
- [ ] Response format consistent
- [ ] Safety guardrails active
- [ ] Performance acceptable

---

## Best Practices

- ✅ **DO**: Test before deploying changes
- ✅ **DO**: Include edge cases
- ✅ **DO**: Test adversarial inputs
- ✅ **DO**: Automate regression tests
- ❌ **DON'T**: Test only happy paths
- ❌ **DON'T**: Skip safety testing

---

## Next Steps

- **Debugging** → \`docs({ action: "get", topic: "guide-debugging" })\`
- **Versioning** → \`docs({ action: "get", topic: "guide-versioning" })\`
`;

export const DOCS_GUIDE_VERSIONING = `# Version Control

> Manage prompt versions with draft/live workflow

## Overview

Latitude uses a draft/live versioning system. Make changes in draft, test, then publish to live.

---

## Quick Reference

| Version | Description |
|---------|-------------|
| LIVE | Production version, what \`run_prompt\` uses |
| Draft | Work-in-progress, for testing |

---

## Workflow

\`\`\`
1. Work in LIVE (or create draft)
2. Make changes
3. Test changes
4. Publish draft → LIVE
\`\`\`

---

## MCP Tools for Versioning

### List Current Prompts (LIVE)

\`\`\`
list_prompts()
\`\`\`

### Get Prompt Content

\`\`\`
get_prompt({ name: "my-prompt" })
\`\`\`

### Update Prompt (Direct to LIVE)

\`\`\`
replace_prompt({
  name: "my-prompt",
  content: "..."
})
\`\`\`

### Push Multiple Prompts (Replace All)

\`\`\`
push_prompts({
  prompts: [
    { name: "prompt1", content: "..." },
    { name: "prompt2", content: "..." }
  ]
})
\`\`\`

⚠️ **Warning**: This replaces ALL existing prompts.

### Add Without Replacing

\`\`\`
append_prompts({
  prompts: [{ name: "new-prompt", content: "..." }],
  overwrite: false
})
\`\`\`

---

## Safe Update Pattern

1. **Pull current state**
   \`\`\`
   pull_prompts({ outputDir: "./prompts-backup" })
   \`\`\`

2. **Make changes locally**

3. **Test with run_prompt**
   \`\`\`
   run_prompt({ name: "my-prompt", parameters: {...} })
   \`\`\`

4. **Deploy when ready**
   \`\`\`
   replace_prompt({ name: "my-prompt", content: "..." })
   \`\`\`

---

## Rollback Strategy

Keep backups before major changes:

\`\`\`
# Backup current state
pull_prompts({ outputDir: "./backup-YYYYMMDD" })

# Make changes...

# If something breaks, restore from backup
push_prompts({ prompts: [...backup_prompts...] })
\`\`\`

---

## Best Practices

- ✅ **DO**: Backup before major changes
- ✅ **DO**: Test prompts before deploying
- ✅ **DO**: Use append_prompts for adding (safer)
- ✅ **DO**: Keep local copies of prompts
- ❌ **DON'T**: Use push_prompts without backup
- ❌ **DON'T**: Deploy untested changes

---

## Next Steps

- **Testing** → \`docs({ action: "get", topic: "guide-testing" })\`
- **Debugging** → \`docs({ action: "get", topic: "guide-debugging" })\`
`;

export const DOCS_PROVIDERS_OPENAI = `# OpenAI Provider

> GPT-5 models

## Overview

Use OpenAI's models in your prompts.

\`\`\`yaml
---
provider: OpenAI
model: gpt-5-1
---
\`\`\`

## Models

- **gpt-5-1**: Most capable GPT-5 model
- **gpt-5-mini**: Fast and economical GPT-5

---

## Next Steps

- **Config basics** → \`docs({ action: "get", topic: "config-basics" })\`
- **Anthropic** → \`docs({ action: "get", topic: "providers-anthropic" })\`
`;

export const DOCS_PROVIDERS_ANTHROPIC = `# Anthropic Provider

> Claude 4.5 models

## Overview

Use Anthropic's Claude models.

\`\`\`yaml
---
provider: Anthropic
model: claude-opus-4-5
---
\`\`\`

## Models

- **claude-opus-4-5**: Most capable Claude model
- **claude-sonnet-4-5**: Balanced performance and speed
- **claude-haiku-4-5**: Fastest Claude model

---

## Next Steps

- **Config basics**: \`docs({ action: "get", topic: "config-basics" })\`
- **OpenAI**: \`docs({ action: "get", topic: "providers-openai" })\`
`;

export const DOCS_PROVIDERS_GOOGLE = `# Google Provider

> Gemini models

## Overview

Use Google's Gemini models.

\`\`\`yaml
---
provider: Google
model: gemini-3-pro
---
\`\`\`

## Models

- **gemini-3-pro**: Most capable Gemini model
- **gemini-2-5-flash**: Balanced performance
- **gemini-2-5-flash-lite**: Fastest and most economical

---

## Next Steps

- **Config basics**: \`docs({ action: "get", topic: "config-basics" })\`
- **OpenAI**: \`docs({ action: "get", topic: "providers-openai" })\`
`;
