/**
 * Prompting Techniques Documentation
 * Comprehensive guides for each technique pattern
 */

// ============================================================================
// TECHNIQUE-REACT
// ============================================================================

export const DOCS_TECHNIQUE_REACT = `# ReAct Pattern

> Reasoning + Acting in a loop

## Overview

ReAct (Reasoning and Acting) combines chain-of-thought reasoning with action-taking. The AI thinks through problems step by step while using tools to gather information.

---

## Quick Reference

\`\`\`
Think → Act → Observe → Repeat
\`\`\`

---

## The ReAct Loop

1. **Thought**: Reason about what to do
2. **Action**: Call a tool or take an action
3. **Observation**: Process the result
4. **Repeat**: Until goal is achieved

---

## Basic ReAct Agent

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
type: agent
maxSteps: 10
tools:
  - latitude/search
  - latitude/extract
---
<system>
You are a research assistant that follows the ReAct pattern.

For each step:
1. THOUGHT: Explain your reasoning
2. ACTION: Use a tool if needed
3. OBSERVATION: Analyze the result
4. Repeat until you have the answer

Always show your thinking process.
</system>

<user>
{{ question }}
</user>
\`\`\`

---

## Structured ReAct

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
type: agent
tools:
  - search_database:
      description: Search internal database
      parameters:
        type: object
        properties:
          query:
            type: string
        required: [query]
  - get_details:
      description: Get details for an item
      parameters:
        type: object
        properties:
          id:
            type: string
        required: [id]
---
<system>
Follow the ReAct pattern strictly:

**THOUGHT**: [What do I need to do? What information do I need?]
**ACTION**: [Which tool to use and why]
**OBSERVATION**: [What did I learn from the result?]

Continue until you can provide a complete answer.
</system>

<user>
{{ task }}
</user>
\`\`\`

---

## ReAct vs Standard Agent

| Aspect | Standard Agent | ReAct Agent |
|--------|---------------|-------------|
| Transparency | Low | High (shows reasoning) |
| Debugging | Harder | Easier (visible thoughts) |
| Token usage | Lower | Higher |
| Accuracy | Good | Better (explicit reasoning) |

---

## When to Use ReAct

| Scenario | Use ReAct? |
|----------|------------|
| Research tasks | Yes ✅ |
| Multi-step problems | Yes ✅ |
| Debugging needed | Yes ✅ |
| Simple lookups | No (overkill) |
| High volume | No (too many tokens) |

---

## Best Practices

- ✅ **DO**: Require explicit THOUGHT/ACTION/OBSERVATION format
- ✅ **DO**: Set appropriate maxSteps limit
- ✅ **DO**: Use for complex, multi-step tasks
- ❌ **DON'T**: Use for simple tasks
- ❌ **DON'T**: Skip the observation step

---

## Next Steps

- **Agents** → \`docs({ action: "get", topic: "agents" })\`
- **Chain of Thought** → \`docs({ action: "get", topic: "technique-cot" })\`
`;

// ============================================================================
// TECHNIQUE-SELF-CONSISTENCY
// ============================================================================

export const DOCS_TECHNIQUE_SELF_CONSISTENCY = `# Self-Consistency

> Multiple answers, majority vote

## Overview

Self-consistency generates multiple reasoning paths and selects the most common answer. Improves accuracy on reasoning tasks by 5-10%.

---

## Quick Reference

\`\`\`
Generate N solutions → Vote → Select majority
\`\`\`

---

## Basic Self-Consistency

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
---
<step as="answer1" temperature={{ 0.7 }}>
{{ problem }}
Think step by step and give your final answer.
</step>

<step as="answer2" temperature={{ 0.7 }}>
{{ problem }}
Think step by step and give your final answer.
</step>

<step as="answer3" temperature={{ 0.7 }}>
{{ problem }}
Think step by step and give your final answer.
</step>

<step>
I generated three solutions:
1. {{ answer1 }}
2. {{ answer2 }}
3. {{ answer3 }}

What is the most common answer? Provide only that answer.
</step>
\`\`\`

---

## Structured Self-Consistency

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
schema:
  type: object
  properties:
    final_answer:
      type: string
    confidence:
      type: number
    reasoning:
      type: string
  required: [final_answer, confidence]
---
<step isolated as="sol1" temperature={{ 0.8 }}>
{{ problem }}
Solve step by step.
</step>

<step isolated as="sol2" temperature={{ 0.8 }}>
{{ problem }}
Solve step by step.
</step>

<step isolated as="sol3" temperature={{ 0.8 }}>
{{ problem }}
Solve step by step.
</step>

<step>
Compare these solutions:
1. {{ sol1 }}
2. {{ sol2 }}
3. {{ sol3 }}

Determine the consensus answer.
- If all agree: confidence = 1.0
- If 2/3 agree: confidence = 0.7
- If all different: pick best, confidence = 0.3
</step>
\`\`\`

---

## When to Use

| Task | Self-Consistency? |
|------|-------------------|
| Math problems | Yes ✅ |
| Logic puzzles | Yes ✅ |
| Code generation | Yes ✅ |
| Creative writing | No |
| Simple questions | No (overkill) |

---

## Number of Samples

| Samples | Accuracy Boost | Cost |
|---------|----------------|------|
| 3 | Moderate | 3x |
| 5 | Good | 5x |
| 10+ | Diminishing returns | 10x+ |

**Recommendation**: Start with 3, increase if needed.

---

## Best Practices

- ✅ **DO**: Use temperature > 0.5 for diversity
- ✅ **DO**: Use isolated steps to prevent contamination
- ✅ **DO**: Use for high-stakes reasoning
- ❌ **DON'T**: Use for subjective questions
- ❌ **DON'T**: Use when cost is a concern

---

## Next Steps

- **Chain of Thought** → \`docs({ action: "get", topic: "technique-cot" })\`
- **Tree of Thoughts** → \`docs({ action: "get", topic: "technique-tot" })\`
`;

// ============================================================================
// TECHNIQUE-CONSTITUTIONAL
// ============================================================================

export const DOCS_TECHNIQUE_CONSTITUTIONAL = `# Constitutional AI

> Principle-based self-critique

## Overview

Constitutional AI defines principles the AI must follow, then critiques its own outputs against those principles. Creates safer, more aligned responses.

---

## Quick Reference

\`\`\`
Generate → Critique against principles → Revise
\`\`\`

---

## Basic Constitutional Pattern

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
---
<system>
CONSTITUTIONAL PRINCIPLES:
1. Be helpful, harmless, and honest
2. Never provide harmful information
3. Respect user privacy
4. Acknowledge limitations
5. Recommend professionals when appropriate

Always check your response against these principles before answering.
</system>

<user>
{{ question }}
</user>
\`\`\`

---

## Self-Critique Pattern

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
---
<step as="draft">
{{ request }}
</step>

<step as="critique">
Review this response against our principles:

PRINCIPLES:
- Be helpful and accurate
- Never provide harmful information
- Be respectful and inclusive
- Acknowledge uncertainty

Response to review:
{{ draft }}

Issues found (list each):
</step>

<step>
{{ if critique contains issues }}
Revise the response to address:
{{ critique }}

Original: {{ draft }}
{{ else }}
{{ draft }}
{{ endif }}
</step>
\`\`\`

---

## Domain-Specific Principles

### Medical Assistant

\`\`\`promptl
<system>
MEDICAL PRINCIPLES:
1. Never diagnose - suggest consulting a doctor
2. Provide general health information only
3. Recommend emergency services for urgent symptoms
4. Cite reputable sources (CDC, WHO, NIH)
5. Acknowledge not being a medical professional
</system>
\`\`\`

### Financial Assistant

\`\`\`promptl
<system>
FINANCIAL PRINCIPLES:
1. Never provide specific investment advice
2. Always recommend consulting a financial advisor
3. Explain risks alongside opportunities
4. Use disclaimers for financial information
5. Don't guarantee returns
</system>
\`\`\`

---

## When to Use

| Scenario | Constitutional AI? |
|----------|-------------------|
| Sensitive topics | Yes ✅ |
| User safety critical | Yes ✅ |
| Regulated domains | Yes ✅ |
| General chat | Optional |
| Internal tools | Optional |

---

## Best Practices

- ✅ **DO**: Define clear, specific principles
- ✅ **DO**: Include self-critique step for sensitive tasks
- ✅ **DO**: Update principles based on failures
- ❌ **DON'T**: Use too many principles (5-10 max)
- ❌ **DON'T**: Make principles too vague

---

## Next Steps

- **Safety guide** → \`docs({ action: "get", topic: "guide-safety" })\`
- **Iterative refinement** → \`docs({ action: "get", topic: "technique-iterative" })\`
`;

// ============================================================================
// TECHNIQUE-SOCRATIC
// ============================================================================

export const DOCS_TECHNIQUE_SOCRATIC = `# Socratic Questioning

> Guide through questions, not answers

## Overview

Instead of giving direct answers, guide users to discover answers themselves through thoughtful questions. Excellent for education and coaching.

---

## Quick Reference

\`\`\`
Ask clarifying questions → Guide thinking → Let user discover
\`\`\`

---

## Basic Socratic Tutor

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
---
<system>
You are a Socratic tutor. Never give direct answers.

Instead:
1. Ask clarifying questions
2. Break complex problems into parts
3. Guide toward discovery
4. Celebrate insights
5. Offer hints only when stuck

Example:
User: "What is 15% of 80?"
You: "Let's think about this. What does 'percent' mean? And how might you find a part of a whole number?"
</system>

<user>
{{ question }}
</user>
\`\`\`

---

## Structured Socratic Flow

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
---
<system>
Follow the Socratic method:

1. UNDERSTAND: "What do you already know about this?"
2. PROBE: "What assumptions are you making?"
3. CHALLENGE: "Is there another way to look at this?"
4. IMPLICATIONS: "What follows from that reasoning?"
5. REFLECT: "What have you learned?"

Never reveal the answer. Guide the student to find it.
</system>

{{ for msg in history }}
<{{ msg.role }}>{{ msg.content }}</{{ msg.role }}>
{{ endfor }}

<user>{{ message }}</user>
\`\`\`

---

## With Difficulty Levels

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
---
<system>
You are a {{ subject }} tutor using Socratic method.

Difficulty: {{ difficulty }}

{{ if difficulty == "beginner" }}
- Ask simple yes/no questions
- Provide more scaffolding
- Celebrate small wins
{{ elseif difficulty == "intermediate" }}
- Ask open-ended questions
- Provide moderate hints
{{ else }}
- Ask challenging questions
- Minimal hints
- Encourage deeper exploration
{{ endif }}
</system>

<user>{{ question }}</user>
\`\`\`

---

## When to Use

| Scenario | Socratic? |
|----------|-----------|
| Teaching/tutoring | Yes ✅ |
| Coaching | Yes ✅ |
| Problem-solving training | Yes ✅ |
| Quick answers needed | No |
| Technical support | No |

---

## Best Practices

- ✅ **DO**: Be patient and encouraging
- ✅ **DO**: Break problems into smaller parts
- ✅ **DO**: Adapt to user's level
- ❌ **DON'T**: Give direct answers when asked
- ❌ **DON'T**: Ask leading questions with obvious answers

---

## Next Steps

- **Role prompting** → \`docs({ action: "get", topic: "technique-role" })\`
- **Chain of Thought** → \`docs({ action: "get", topic: "technique-cot" })\`
`;

// ============================================================================
// TECHNIQUE-META
// ============================================================================

export const DOCS_TECHNIQUE_META = `# Meta-Prompting

> AI generates or improves prompts

## Overview

Use AI to generate, analyze, or improve prompts. The AI becomes a prompt engineer, creating better prompts than humans might write.

---

## Quick Reference

\`\`\`
Describe goal → AI generates prompt → Refine → Use
\`\`\`

---

## Prompt Generator

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
---
<system>
You are an expert prompt engineer. Generate PromptL prompts based on user requirements.

Include:
1. Appropriate provider/model
2. Temperature settings
3. System message with role
4. User message with variables
5. Output schema if structured output needed
</system>

<user>
Create a prompt for: {{ use_case }}

Requirements:
{{ requirements }}
</user>
\`\`\`

---

## Prompt Improver

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
---
<system>
You are a prompt optimization expert. Analyze and improve prompts.

Evaluate:
1. Clarity of instructions
2. Appropriate constraints
3. Good examples (if few-shot)
4. Output format specification
5. Edge case handling

Provide the improved version with explanations.
</system>

<user>
Improve this prompt:

\`\`\`
{{ original_prompt }}
\`\`\`

Goal: {{ goal }}
Issues: {{ issues }}
</user>
\`\`\`

---

## Prompt Analyzer

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
schema:
  type: object
  properties:
    score:
      type: integer
      description: 1-10 quality score
    strengths:
      type: array
      items:
        type: string
    weaknesses:
      type: array
      items:
        type: string
    suggestions:
      type: array
      items:
        type: string
  required: [score, strengths, weaknesses, suggestions]
---
Analyze this prompt's quality:

\`\`\`
{{ prompt_to_analyze }}
\`\`\`

Intended use: {{ intended_use }}
\`\`\`

---

## Auto-Improve Loop

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
---
<step as="analysis">
Analyze this prompt for weaknesses:
{{ prompt }}
</step>

<step as="improved">
Based on this analysis:
{{ analysis }}

Generate an improved version.
</step>

<step>
IMPROVED PROMPT:
{{ improved }}

CHANGES MADE:
[explain what changed and why]
</step>
\`\`\`

---

## When to Use

| Scenario | Meta-Prompting? |
|----------|-----------------|
| Creating new prompts | Yes ✅ |
| Debugging poor results | Yes ✅ |
| Prompt library creation | Yes ✅ |
| Quick one-off task | No (overkill) |

---

## Best Practices

- ✅ **DO**: Be specific about requirements
- ✅ **DO**: Test generated prompts
- ✅ **DO**: Iterate with feedback
- ❌ **DON'T**: Blindly trust generated prompts
- ❌ **DON'T**: Over-complicate simple needs

---

## Next Steps

- **Iterative refinement** → \`docs({ action: "get", topic: "technique-iterative" })\`
- **Testing** → \`docs({ action: "get", topic: "guide-testing" })\`
`;

// ============================================================================
// TECHNIQUE-ITERATIVE
// ============================================================================

export const DOCS_TECHNIQUE_ITERATIVE = `# Iterative Refinement

> Generate → Critique → Improve loop

## Overview

Iterative refinement improves output through multiple passes. Generate a draft, critique it, then refine based on the critique.

---

## Quick Reference

\`\`\`
Draft → Critique → Revise → Repeat
\`\`\`

---

## Basic Iteration

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
---
<step as="draft">
Write a {{ content_type }} about {{ topic }}.
</step>

<step as="critique">
Review this draft and list specific improvements:
{{ draft }}

Focus on:
- Clarity
- Accuracy
- Engagement
- Missing information
</step>

<step>
Revise the draft based on this feedback:
{{ critique }}

Original: {{ draft }}
</step>
\`\`\`

---

## Multi-Round Iteration

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
---
<step as="v1">
{{ task }}
</step>

<step as="critique1">
Critique v1: {{ v1 }}
List 3 improvements.
</step>

<step as="v2">
Improve based on: {{ critique1 }}
Original: {{ v1 }}
</step>

<step as="critique2">
Critique v2: {{ v2 }}
Any remaining issues?
</step>

<step>
{{ if critique2 has issues }}
Final revision based on: {{ critique2 }}
{{ else }}
{{ v2 }}
{{ endif }}
</step>
\`\`\`

---

## Targeted Refinement

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
---
<step as="draft">
{{ task }}
</step>

<step as="clarity_check">
Rate clarity 1-10 and suggest fixes:
{{ draft }}
</step>

<step as="accuracy_check">
Check for factual accuracy:
{{ draft }}
</step>

<step as="tone_check">
Is the tone appropriate for {{ audience }}?
{{ draft }}
</step>

<step>
Final revision addressing:
- Clarity: {{ clarity_check }}
- Accuracy: {{ accuracy_check }}
- Tone: {{ tone_check }}

Original: {{ draft }}
</step>
\`\`\`

---

## When to Use

| Content Type | Iterations |
|--------------|------------|
| Code | 1-2 |
| Blog posts | 2-3 |
| Legal/Medical | 3+ |
| Simple responses | 0-1 |

---

## Best Practices

- ✅ **DO**: Be specific in critique prompts
- ✅ **DO**: Limit iterations (2-3 usually enough)
- ✅ **DO**: Use different critique angles
- ❌ **DON'T**: Iterate endlessly
- ❌ **DON'T**: Use for simple tasks

---

## Next Steps

- **Constitutional AI** → \`docs({ action: "get", topic: "technique-constitutional" })\`
- **Chains** → \`docs({ action: "get", topic: "chains" })\`
`;

// ============================================================================
// TECHNIQUE-STEP-BACK
// ============================================================================

export const DOCS_TECHNIQUE_STEP_BACK = `# Step-Back Prompting

> Abstract first, then specific

## Overview

Step-back prompting asks a high-level question first, then uses that understanding to answer the specific question. Improves reasoning on complex problems.

---

## Quick Reference

\`\`\`
Specific question → Step back to principles → Apply to specific
\`\`\`

---

## Basic Step-Back

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
---
<step as="principles">
Before answering the specific question, let's step back.

Question: {{ question }}

What are the general principles or concepts needed to answer this?
</step>

<step>
Using these principles:
{{ principles }}

Now answer the specific question:
{{ question }}
</step>
\`\`\`

---

## Domain Step-Back

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
---
<step as="context">
Question: {{ question }}

Step back: What domain knowledge is relevant here?
- Key concepts:
- Relevant rules:
- Common patterns:
</step>

<step>
Applying this context:
{{ context }}

Answer: {{ question }}
</step>
\`\`\`

---

## Example: Physics Problem

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
---
<step as="physics_principles">
Problem: A ball is thrown upward at 20 m/s. How high does it go?

Step back: What physics principles apply to projectile motion?
</step>

<step>
Using: {{ physics_principles }}

Solve: A ball is thrown upward at 20 m/s. How high does it go?
</step>
\`\`\`

---

## When to Use

| Problem Type | Step-Back? |
|--------------|------------|
| Complex reasoning | Yes ✅ |
| Domain-specific | Yes ✅ |
| Multi-step logic | Yes ✅ |
| Simple factual | No |
| Creative tasks | No |

---

## Best Practices

- ✅ **DO**: Use for problems requiring domain knowledge
- ✅ **DO**: Keep step-back question focused
- ✅ **DO**: Connect principles back to specific question
- ❌ **DON'T**: Over-abstract simple questions
- ❌ **DON'T**: Make step-back too generic

---

## Next Steps

- **Chain of Thought** → \`docs({ action: "get", topic: "technique-cot" })\`
- **Tree of Thoughts** → \`docs({ action: "get", topic: "technique-tot" })\`
`;

// ============================================================================
// TECHNIQUE-RAG
// ============================================================================

export const DOCS_TECHNIQUE_RAG = `# RAG Technique

> Retrieval-Augmented Generation fundamentals

## Overview

RAG retrieves relevant context before generating responses. Grounds AI in real data, reducing hallucination and enabling knowledge-based answers.

---

## Quick Reference

\`\`\`
Query → Retrieve relevant docs → Generate with context
\`\`\`

---

## RAG Components

1. **Retriever**: Finds relevant documents
2. **Context**: Retrieved information
3. **Generator**: Creates response using context

---

## Basic RAG Pattern

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
---
<system>
Answer questions using ONLY the provided context.
If the context doesn't contain the answer, say "I don't have information about that."
</system>

<user>
Context:
{{ context }}

Question: {{ question }}
</user>
\`\`\`

---

## RAG with Tool

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
tools:
  - latitude/search
---
<system>
You are a research assistant.
1. Search for relevant information
2. Cite sources in your answer
3. Say "I couldn't find information" if search fails
</system>

<user>
{{ question }}
</user>
\`\`\`

---

## RAG with Citation

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
schema:
  type: object
  properties:
    answer:
      type: string
    citations:
      type: array
      items:
        type: object
        properties:
          claim:
            type: string
          source:
            type: string
        required: [claim, source]
  required: [answer, citations]
---
<system>
Answer questions with citations.
Every factual claim must have a citation.
</system>

<user>
Context: {{ context }}

Question: {{ question }}
</user>
\`\`\`

---

## Multi-Source RAG

\`\`\`promptl
---
provider: OpenAI
model: gpt-4o
tools:
  - search_docs:
      description: Search documentation
      parameters:
        type: object
        properties:
          query:
            type: string
        required: [query]
  - search_web:
      description: Search the web
      parameters:
        type: object
        properties:
          query:
            type: string
        required: [query]
---
<system>
Research assistant with multiple sources.
1. First check internal docs
2. Then search web if needed
3. Synthesize information from all sources
</system>

<user>
{{ question }}
</user>
\`\`\`

---

## When to Use RAG

| Scenario | RAG? |
|----------|------|
| Knowledge-based Q&A | Yes ✅ |
| Current information | Yes ✅ |
| Domain expertise | Yes ✅ |
| Creative writing | No |
| General conversation | No |

---

## Best Practices

- ✅ **DO**: Instruct to use ONLY provided context
- ✅ **DO**: Require citations
- ✅ **DO**: Handle "no information" cases
- ❌ **DON'T**: Trust model's pre-training for facts
- ❌ **DON'T**: Skip context relevance check

---

## Next Steps

- **RAG Recipe** → \`docs({ action: "get", topic: "recipe-rag" })\`
- **Built-in tools** → \`docs({ action: "get", topic: "tools-builtin" })\`
`;
