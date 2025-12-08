# Latitude MCP Server v2

> Simplified MCP server for Latitude.so prompt management

[![npm](https://img.shields.io/npm/v/latitude-mcp-server.svg)](https://www.npmjs.com/package/latitude-mcp-server)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Overview

**8 focused tools** for managing prompts on [Latitude.so](https://latitude.so). Push, pull, run, and manage your prompts directly from your AI assistant.

## Quick Start

### 1. Get Your API Key & Project ID

1. Go to [app.latitude.so/settings](https://app.latitude.so/settings)
2. Create or copy your API key
3. Get your project ID from the URL when viewing a project

### 2. Configure Your MCP Client

Add to your MCP configuration:

```json
{
  "mcpServers": {
    "latitude": {
      "command": "npx",
      "args": ["latitude-mcp-server"],
      "env": {
        "LATITUDE_API_KEY": "your-api-key",
        "LATITUDE_PROJECT_ID": "your-project-id"
      }
    }
  }
}
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `LATITUDE_API_KEY` | ✅ | Your Latitude API key |
| `LATITUDE_PROJECT_ID` | ✅ | Target project ID |
| `LATITUDE_BASE_URL` | ❌ | API base URL (default: gateway.latitude.so) |

## Tools (8 total)

### Prompt Management

| Tool | Description |
|------|-------------|
| `list_prompts` | List all prompt names in LIVE |
| `get_prompt` | Get full prompt content by name |
| `run_prompt` | Execute a prompt with parameters |
| `replace_prompt` | Replace a single prompt in LIVE |

### Sync Operations

| Tool | Description |
|------|-------------|
| `push_prompts` | Replace ALL LIVE prompts with given files |
| `append_prompts` | Add prompts to LIVE (optional overwrite) |
| `pull_prompts` | Download LIVE prompts to `./prompts/*.promptl` |

### Documentation

| Tool | Description |
|------|-------------|
| `docs` | Get documentation (help, get topic, find) |

## Tool Examples

### List all prompts
```json
{}
```

### Get a specific prompt
```json
{ "name": "my-prompt" }
```

### Run a prompt
```json
{
  "name": "greeting",
  "parameters": { "user_name": "Alice" }
}
```

### Replace a single prompt
```json
{
  "name": "greeting",
  "content": "---\nprovider: openai\nmodel: gpt-4o\n---\nHello {{ user_name }}!"
}
```

### Push all prompts (replaces LIVE)
```json
{
  "prompts": [
    { "name": "greeting", "content": "---\nprovider: openai\nmodel: gpt-4o\n---\nHello!" },
    { "name": "farewell", "content": "---\nprovider: openai\nmodel: gpt-4o\n---\nGoodbye!" }
  ]
}
```

### Append prompts (keeps existing)
```json
{
  "prompts": [
    { "name": "new-prompt", "content": "..." }
  ],
  "overwrite": false
}
```

### Pull prompts to local directory
```json
{
  "outputDir": "./prompts"
}
```

### Get documentation
```json
{ "action": "help" }
{ "action": "get", "topic": "variables" }
{ "action": "find", "query": "json output" }
```

## Documentation Topics

Available topics for `docs({ action: "get", topic: "..." })`:

- `overview` - PromptL basics
- `structure` - Config + Messages format
- `variables` - `{{ }}` syntax
- `conditionals` - if/else logic
- `loops` - for/each iteration
- `tools` - Function calling
- `chains` - Multi-step prompts
- `agents` - Multi-agent systems
- `config-json` - JSON Schema output
- `config-generation` - Temperature, tokens
- `debugging` - Error troubleshooting

## Automatic Publishing

All write operations (`push_prompts`, `append_prompts`, `replace_prompt`) automatically:

1. Create a draft version
2. Push changes
3. Publish to LIVE

No manual versioning required.

## Local Prompts Directory

`pull_prompts` downloads all prompts to `./prompts/` as `.promptl` files:

```
prompts/
├── greeting.promptl
├── support-bot.promptl
└── data-extractor.promptl
```

## Development

```bash
# Install
npm install

# Build
npm run build

# Run locally
LATITUDE_API_KEY=your-key LATITUDE_PROJECT_ID=your-id node dist/index.js
```

## Migration from v1

v2 simplifies the toolset and requires `LATITUDE_PROJECT_ID`:

| v1 | v2 |
|----|-----|
| `latitude_list_projects` | Removed (project ID is required) |
| `latitude_create_project` | Removed |
| `latitude_list_versions` | Removed (auto-versioning) |
| `latitude_create_version` | Removed (automatic) |
| `latitude_publish_version` | Removed (automatic) |
| `latitude_list_prompts` | `list_prompts` |
| `latitude_get_prompt` | `get_prompt` |
| `latitude_run_prompt` | `run_prompt` |
| `latitude_push_prompt` | `replace_prompt` |
| `latitude_push_prompt_from_file` | `push_prompts` / `append_prompts` |
| `latitude_help` | `docs({ action: "help" })` |
| `latitude_get_docs` | `docs({ action: "get", topic: "..." })` |
| `latitude_find_docs` | `docs({ action: "find", query: "..." })` |

---

ISC © [Yiğit Konur](https://github.com/yigitkonur)
