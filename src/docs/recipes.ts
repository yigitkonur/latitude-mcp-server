/**
 * Recipes Documentation
 * Complete implementation patterns for common use cases
 */

// ============================================================================
// RECIPE-ANALYSIS
// ============================================================================

export const DOCS_RECIPE_ANALYSIS = `# Analysis Recipe

> Multi-step data analysis workflow

## Overview

Analyze data through structured steps: gather, process, interpret, conclude. Perfect for reports, insights, and decision support.

---

## Quick Reference

\`\`\`
Gather data → Analyze → Synthesize → Recommend
\`\`\`

---

## Basic Analysis

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
---
<step as="data_summary">
Summarize the key data points:
{{ data }}
</step>

<step as="analysis">
Analyze patterns and trends:
{{ data_summary }}
</step>

<step as="insights">
What are the top 3 insights?
{{ analysis }}
</step>

<step>
## Analysis Report

### Data Summary
{{ data_summary }}

### Key Insights
{{ insights }}

### Recommendations
Based on the analysis, here are my recommendations:
</step>
\`\`\`

---

## Structured Analysis Report

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
schema:
  type: object
  properties:
    executive_summary:
      type: string
    key_findings:
      type: array
      items:
        type: object
        properties:
          finding:
            type: string
          evidence:
            type: string
          impact:
            type: string
            enum: [high, medium, low]
        required: [finding, evidence, impact]
    recommendations:
      type: array
      items:
        type: object
        properties:
          action:
            type: string
          priority:
            type: string
            enum: [immediate, short-term, long-term]
          rationale:
            type: string
        required: [action, priority]
    risks:
      type: array
      items:
        type: string
  required: [executive_summary, key_findings, recommendations]
---
<system>
You are a business analyst. Provide structured, actionable analysis.
</system>

<user>
Analyze this data and provide a comprehensive report:

{{ data }}

Focus areas: {{ focus_areas }}
</user>
\`\`\`

---

## Comparative Analysis

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
---
<step as="option_a">
Analyze Option A:
{{ option_a }}
- Pros:
- Cons:
- Key metrics:
</step>

<step as="option_b">
Analyze Option B:
{{ option_b }}
- Pros:
- Cons:
- Key metrics:
</step>

<step>
## Comparison

| Aspect | Option A | Option B |
|--------|----------|----------|
| ... | ... | ... |

### Recommendation
Based on {{ criteria }}, I recommend...
</step>
\`\`\`

---

## With Research

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
type: agent
tools:
  - latitude/search
  - latitude/extract
---
<system>
You are a research analyst. 
1. Gather relevant data
2. Analyze patterns
3. Provide evidence-based conclusions
</system>

<user>
Research and analyze: {{ topic }}

Deliverable: {{ report_type }}
</user>
\`\`\`

---

## Best Practices

- ✅ **DO**: Break analysis into clear steps
- ✅ **DO**: Cite data for every claim
- ✅ **DO**: Provide actionable recommendations
- ✅ **DO**: Acknowledge limitations
- ❌ **DON'T**: Make claims without evidence
- ❌ **DON'T**: Overcomplicate simple analyses

---

## Next Steps

- **Chains** → \`docs({ action: "get", topic: "chains" })\`
- **RAG Recipe** → \`docs({ action: "get", topic: "recipe-rag" })\`
`;

// ============================================================================
// RECIPE-MODERATION
// ============================================================================

export const DOCS_RECIPE_MODERATION = `# Content Moderation Recipe

> Detect and filter inappropriate content

## Overview

Automatically detect harmful, inappropriate, or policy-violating content. Essential for user-generated content platforms.

---

## Quick Reference

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
schema:
  type: object
  properties:
    safe:
      type: boolean
    categories:
      type: array
      items:
        type: string
    confidence:
      type: number
  required: [safe, categories, confidence]
---
Analyze content for policy violations.
\`\`\`

---

## Basic Moderation

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
temperature: 0
schema:
  type: object
  properties:
    decision:
      type: string
      enum: [approve, flag, reject]
    reason:
      type: string
    categories:
      type: array
      items:
        type: string
        enum: [safe, spam, hate_speech, harassment, violence, sexual, self_harm, illegal, misinformation]
    confidence:
      type: number
  required: [decision, categories, confidence]
---
<system>
You are a content moderator. Analyze content against these policies:

PROHIBITED:
- Hate speech or discrimination
- Harassment or bullying
- Violence or threats
- Sexual content (if inappropriate for platform)
- Self-harm promotion
- Illegal activities
- Misinformation

Flag content that needs human review.
Reject clearly violating content.
Approve safe content.
</system>

<user>
Moderate this content:
{{ content }}
</user>
\`\`\`

---

## Multi-Category Moderation

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
temperature: 0
schema:
  type: object
  properties:
    overall_safe:
      type: boolean
    categories:
      type: object
      properties:
        hate_speech:
          type: object
          properties:
            detected:
              type: boolean
            severity:
              type: string
              enum: [none, low, medium, high]
            evidence:
              type: string
        harassment:
          type: object
          properties:
            detected:
              type: boolean
            severity:
              type: string
              enum: [none, low, medium, high]
            evidence:
              type: string
        violence:
          type: object
          properties:
            detected:
              type: boolean
            severity:
              type: string
              enum: [none, low, medium, high]
            evidence:
              type: string
    action:
      type: string
      enum: [approve, flag_for_review, auto_reject]
  required: [overall_safe, categories, action]
---
Analyze content for each category of potential violation.
Content: {{ content }}
\`\`\`

---

## With Context

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
temperature: 0
---
<system>
Content moderator for {{ platform_type }}.

Platform rules:
{{ platform_rules }}

Age restriction: {{ age_rating }}

Consider context - something appropriate for one platform may not be for another.
</system>

<user>
Content: {{ content }}
Author history: {{ author_context }}
Thread context: {{ thread_context }}
</user>
\`\`\`

---

## Moderation Pipeline

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
---
<step as="quick_check" temperature={{ 0 }}>
Quick safety check - any obvious violations?
Content: {{ content }}
Answer: safe/unsafe
</step>

{{ if quick_check == "unsafe" }}
<step as="detailed" temperature={{ 0 }}>
Detailed analysis of flagged content:
{{ content }}

Specific violations:
Severity:
Recommended action:
</step>
{{ endif }}

<step>
{{ if quick_check == "safe" }}
APPROVED - No violations detected
{{ else }}
{{ detailed }}
{{ endif }}
</step>
\`\`\`

---

## Best Practices

- ✅ **DO**: Use temperature 0 for consistency
- ✅ **DO**: Require confidence scores
- ✅ **DO**: Consider context
- ✅ **DO**: Have human review for edge cases
- ❌ **DON'T**: Rely solely on AI moderation
- ❌ **DON'T**: Over-moderate (false positives)

---

## Next Steps

- **Safety guide** → \`docs({ action: "get", topic: "guide-safety" })\`
- **Classification** → \`docs({ action: "get", topic: "recipe-classification" })\`
`;

// ============================================================================
// RECIPE-SUPPORT
// ============================================================================

export const DOCS_RECIPE_SUPPORT = `# Customer Support Recipe

> AI support agent with tools and escalation

## Overview

Build a customer support agent that can answer questions, look up information, and escalate to humans when needed.

---

## Quick Reference

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
type: agent
tools:
  - search_knowledge_base
  - get_order_status
  - escalate_to_human
---
Customer support agent with tools.
\`\`\`

---

## Basic Support Agent

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
---
<system>
You are a customer support agent for {{ company }}.

Guidelines:
- Be empathetic and professional
- Solve problems step by step
- Offer alternatives if first solution doesn't work
- Apologize for inconvenience when appropriate
- Know when to escalate

{{ if customer_tier }}
Customer tier: {{ customer_tier }}
{{ endif }}
</system>

{{ for msg in history }}
<{{ msg.role }}>{{ msg.content }}</{{ msg.role }}>
{{ endfor }}

<user>{{ message }}</user>
\`\`\`

---

## Support Agent with Tools

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
type: agent
maxSteps: 10
tools:
  - search_knowledge_base:
      description: Search help articles and FAQs
      parameters:
        type: object
        properties:
          query:
            type: string
        required: [query]
  - get_order_status:
      description: Look up order status by order ID
      parameters:
        type: object
        properties:
          order_id:
            type: string
        required: [order_id]
  - get_account_info:
      description: Get customer account information
      parameters:
        type: object
        properties:
          customer_id:
            type: string
        required: [customer_id]
  - create_ticket:
      description: Create support ticket for complex issues
      parameters:
        type: object
        properties:
          subject:
            type: string
          priority:
            type: string
            enum: [low, medium, high, urgent]
          description:
            type: string
        required: [subject, priority, description]
  - escalate_to_human:
      description: Transfer to human agent
      parameters:
        type: object
        properties:
          reason:
            type: string
          context:
            type: string
        required: [reason]
---
<system>
You are a support agent for {{ company }}.

WORKFLOW:
1. Understand the customer's issue
2. Search knowledge base first
3. Look up account/order info if relevant
4. Try to resolve the issue
5. Create ticket for complex issues
6. Escalate to human if:
   - Customer requests it
   - Issue is too complex
   - Customer is frustrated
   - Involves refunds > $100
   - Security concerns

TONE:
- Professional but friendly
- Empathetic
- Solution-oriented

Customer ID: {{ customer_id }}
</system>

{{ for msg in history }}
<{{ msg.role }}>{{ msg.content }}</{{ msg.role }}>
{{ endfor }}

<user>{{ message }}</user>
\`\`\`

---

## Issue Classification

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
temperature: 0
schema:
  type: object
  properties:
    category:
      type: string
      enum: [billing, technical, shipping, returns, account, general]
    priority:
      type: string
      enum: [low, medium, high, urgent]
    sentiment:
      type: string
      enum: [positive, neutral, frustrated, angry]
    needs_human:
      type: boolean
    summary:
      type: string
  required: [category, priority, sentiment, needs_human, summary]
---
Classify this support request:
{{ message }}
\`\`\`

---

## Escalation Handling

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
---
<step as="classification">
Classify and assess:
- Issue type
- Customer sentiment
- Complexity
- Requires human? (yes/no)

Message: {{ message }}
</step>

{{ if classification requires_human }}
<step>
I understand this is a complex situation. Let me connect you with a specialist who can better assist you.

[Creating ticket and escalating...]

In the meantime, is there anything else I can help clarify?
</step>
{{ else }}
<step>
[Provide solution based on classification]
</step>
{{ endif }}
\`\`\`

---

## Multi-Language Support

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
---
<system>
You are a multilingual support agent.

Detect the customer's language and respond in the same language.
If unsure, ask for confirmation.

Supported languages: English, Spanish, French, German, Portuguese
</system>

<user>{{ message }}</user>
\`\`\`

---

## Best Practices

- ✅ **DO**: Search knowledge base before answering
- ✅ **DO**: Track conversation context
- ✅ **DO**: Have clear escalation criteria
- ✅ **DO**: Be empathetic with frustrated customers
- ❌ **DON'T**: Make promises you can't keep
- ❌ **DON'T**: Argue with customers
- ❌ **DON'T**: Ignore escalation signals

---

## Next Steps

- **Chatbot recipe** → \`docs({ action: "get", topic: "recipe-chatbot" })\`
- **Agents** → \`docs({ action: "get", topic: "agents" })\`
`;

// ============================================================================
// TOOLS-ORCHESTRATION
// ============================================================================

export const DOCS_TOOLS_ORCHESTRATION = `# Tool Orchestration

> Coordinate multiple tools in agents

## Overview

Orchestrate multiple tools to accomplish complex tasks. Define when to use which tool and how to chain results.

---

## Quick Reference

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
type: agent
tools:
  - tool_a
  - tool_b
  - tool_c
---
Use tools in sequence or parallel to achieve goal.
\`\`\`

---

## Sequential Orchestration

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
type: agent
tools:
  - search_products:
      description: Search product catalog
      parameters:
        type: object
        properties:
          query:
            type: string
        required: [query]
  - get_inventory:
      description: Check inventory for product
      parameters:
        type: object
        properties:
          product_id:
            type: string
        required: [product_id]
  - create_order:
      description: Create order for product
      parameters:
        type: object
        properties:
          product_id:
            type: string
          quantity:
            type: integer
        required: [product_id, quantity]
---
<system>
Shopping assistant workflow:
1. Search for products matching request
2. Check inventory for selected product
3. Create order if in stock
4. Report result

Always confirm inventory before ordering.
</system>

<user>
{{ request }}
</user>
\`\`\`

---

## Conditional Tool Selection

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
type: agent
tools:
  - search_internal_docs:
      description: Search company documentation
      parameters:
        type: object
        properties:
          query:
            type: string
        required: [query]
  - search_web:
      description: Search the public web
      parameters:
        type: object
        properties:
          query:
            type: string
        required: [query]
  - ask_expert:
      description: Escalate to human expert
      parameters:
        type: object
        properties:
          question:
            type: string
        required: [question]
---
<system>
Research assistant with tiered search:

1. FIRST: Search internal docs
2. IF not found: Search web
3. IF still unclear: Ask expert

Don't search web for internal company questions.
Don't ask expert for simple factual questions.
</system>

<user>
{{ question }}
</user>
\`\`\`

---

## Parallel Tool Calls

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
type: agent
tools:
  - get_weather:
      description: Get weather for city
      parameters:
        type: object
        properties:
          city:
            type: string
        required: [city]
  - get_events:
      description: Get events for city
      parameters:
        type: object
        properties:
          city:
            type: string
        required: [city]
  - get_restaurants:
      description: Get restaurants for city
      parameters:
        type: object
        properties:
          city:
            type: string
          cuisine:
            type: string
        required: [city]
---
<system>
Travel planner. When user asks about a city:
- Get weather, events, AND restaurants simultaneously
- Synthesize into travel recommendation
</system>

<user>
Plan a day trip to {{ city }}
</user>
\`\`\`

---

## Error Handling

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
type: agent
tools:
  - primary_api:
      description: Main data source
      parameters:
        type: object
        properties:
          query:
            type: string
        required: [query]
  - fallback_api:
      description: Backup data source
      parameters:
        type: object
        properties:
          query:
            type: string
        required: [query]
---
<system>
Data retrieval with fallback:

1. Try primary_api first
2. If it fails or returns empty, try fallback_api
3. If both fail, explain limitation to user

Never return empty results without trying fallback.
</system>

<user>
{{ query }}
</user>
\`\`\`

---

## Tool Selection Guide

| Scenario | Strategy |
|----------|----------|
| Data gathering | Parallel calls |
| Dependent data | Sequential calls |
| Uncertain source | Conditional with fallback |
| User workflow | Sequential with confirmation |

---

## Best Practices

- ✅ **DO**: Define clear tool selection criteria
- ✅ **DO**: Handle tool failures gracefully
- ✅ **DO**: Limit number of tools (5-7 max)
- ✅ **DO**: Use descriptive tool names
- ❌ **DON'T**: Give agent too many tools
- ❌ **DON'T**: Skip error handling

---

## Next Steps

- **Agents** → \`docs({ action: "get", topic: "agents" })\`
- **Custom tools** → \`docs({ action: "get", topic: "tools-custom" })\`
`;

// ============================================================================
// PROVIDERS-AZURE
// ============================================================================

export const DOCS_PROVIDERS_AZURE = `# Azure OpenAI Provider

> Enterprise Azure-hosted OpenAI models

## Overview

Azure OpenAI provides OpenAI models through Microsoft Azure, offering enterprise compliance, regional deployment, and Azure integration.

---

## Quick Reference

\`\`\`yaml
---
provider: Azure
model: gpt-4
endpoint: https://your-resource.openai.azure.com
deployment: your-deployment-name
---
\`\`\`

---

## Configuration

\`\`\`yaml
---
provider: Azure
model: gpt-4
endpoint: {{ azure_endpoint }}
deployment: {{ deployment_name }}
api_version: 2024-02-15-preview
---
\`\`\`

---

## Available Models

Models are deployed to your Azure resource:

| Azure Model | OpenAI Equivalent |
|-------------|-------------------|
| gpt-4 | GPT-4 |
| gpt-4-32k | GPT-4 32k context |
| gpt-4-turbo | GPT-4 Turbo |
| gpt-35-turbo | GPT-3.5 Turbo |

---

## Deployment Setup

1. Create Azure OpenAI resource
2. Deploy a model
3. Get endpoint and deployment name
4. Configure in prompt

---

## Complete Example

\`\`\`promptl
---
provider: Azure
model: gpt-4
endpoint: https://mycompany.openai.azure.com
deployment: gpt4-production
api_version: 2024-02-15-preview
temperature: 0.7
---
<system>
Enterprise assistant with Azure compliance.
</system>

<user>
{{ question }}
</user>
\`\`\`

---

## When to Use Azure

| Requirement | Use Azure? |
|-------------|------------|
| Enterprise compliance | Yes ✅ |
| Data residency | Yes ✅ |
| Azure integration | Yes ✅ |
| Quick prototyping | No (use OpenAI directly) |
| Cost-sensitive | Depends on agreement |

---

## Azure vs OpenAI Direct

| Aspect | Azure | OpenAI Direct |
|--------|-------|---------------|
| Compliance | Enterprise | Standard |
| Regions | Multiple | US-based |
| SLA | Available | Limited |
| Setup | More complex | Simple |
| Pricing | Custom | Pay-as-you-go |

---

## Best Practices

- ✅ **DO**: Use for enterprise workloads
- ✅ **DO**: Set up proper Azure RBAC
- ✅ **DO**: Monitor usage in Azure portal
- ❌ **DON'T**: Hardcode credentials
- ❌ **DON'T**: Use for quick prototypes

---

## Next Steps

- **OpenAI** → \`docs({ action: "get", topic: "providers-openai" })\`
- **Config basics** → \`docs({ action: "get", topic: "config-basics" })\`
`;
