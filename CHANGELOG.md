# Changelog

## [2.0.0] - 2024-12-08

### Breaking Changes
- **LATITUDE_PROJECT_ID is now required** - Must be set in environment
- Removed 11 tools - Simplified from 19 to 8 focused tools
- Removed CLI commands - MCP-only interface
- Removed resources - Tools only

### Added
- `push_prompts` - Replace ALL LIVE prompts with auto-publish
- `append_prompts` - Add prompts to LIVE with optional overwrite
- `pull_prompts` - Download LIVE prompts to `./prompts/*.promptl`
- `replace_prompt` - Replace single prompt with auto-publish
- Merged `docs` tool - Combines help, get, and find actions

### Changed
- All write operations now auto-publish to LIVE (no manual versioning)
- Simplified tool names (removed `latitude_` prefix)
- Direct HTTP API client (no SDK dependency)
- Markdown-only output format (removed TOON)

### Removed
- Project management tools (list_projects, create_project)
- Version management tools (list_versions, create_version, publish_version)
- Conversation tools (chat, get_conversation, stop_conversation)
- Log tools (create_log)
- CLI interface
- Resources (latitude://, docs://)
- TOON format support
- HTTP transport mode

### Dependencies Removed
- @toon-format/toon
- commander
- cors
- express
- jmespath

### File Structure
```
src/
├── index.ts      # Entry point
├── server.ts     # MCP server setup
├── api.ts        # Latitude API client
├── tools.ts      # 8 MCP tools
├── docs.ts       # Merged documentation
├── types.ts      # Minimal types
└── utils/        # Logger & config only
    ├── config.util.ts
    └── logger.util.ts
```

### Migration Guide

| v1 Tool | v2 Tool |
|---------|---------|
| `latitude_list_prompts` | `list_prompts` |
| `latitude_get_prompt` | `get_prompt` |
| `latitude_run_prompt` | `run_prompt` |
| `latitude_push_prompt` | `replace_prompt` |
| `latitude_help` | `docs({ action: "help" })` |
| `latitude_get_docs` | `docs({ action: "get", topic: "..." })` |
| `latitude_find_docs` | `docs({ action: "find", query: "..." })` |

All other v1 tools have been removed.
