# Session Memory — WeldingRef

## 2026-04-18 — file-viewer + Gemma chat

**Topic:** Added file-viewer page to WeldingRef and wired it to local Ollama/Gemma AI.

### What was built
- Pulled `RonShmuely/file-viewer` (Markdown read-mode viewer) into WeldingRef root as `file-viewer.html` + `mark-mode.js`
- Live at `http://weldref.duckdns.org/file-viewer.html`
- Added Ollama chat drawer: floating llama FAB (bottom-right), press **G** to toggle
- Streams from `gemma4:26b` via `http://localhost:11434/api/chat`
- Doc icon in composer toggles sending current document as system context

### Key decisions
- Ollama over Google AI Studio — fully offline, no API key, gemma4:26b already installed
- Chat panel is a right-side drawer matching existing file-viewer design (Anthropic palette)
- Files land in repo root — no subdirectory — so `mark-mode.js` path resolves correctly

### Deployment
- Server path: `C:\Users\ronsh\Desktop\WeldingRef`
- Deploy = `git pull` in that folder (master branch, local Gitea)
- Git remote for file-viewer: added as `file-viewer` remote, extracted with `git show file-viewer/main:...`

### Pending action items
- **OLLAMA CORS** — run on Windows: `setx OLLAMA_ORIGINS "*"` then restart Ollama from system tray
- **notebooklm CLI** — not yet installed; wrap-up skill requires it for future sessions

### Skills installed
- `wrap-up` — from `RonShmuely/claude-skills` → `~/.claude/skills/wrap-up/SKILL.md`

### Repo state (master)
| File | Purpose |
|------|---------|
| `file-viewer.html` | Markdown viewer (drag-drop, TOC, themes, lightbox, Gemma chat) |
| `mark-mode.js` | Annotation overlay, press M |
| `memory.md` | This file — session memory for new chats |
