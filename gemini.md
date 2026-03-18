# Geminis Notes

## The 3-Layer Architecture

Every project follows a simple 3-layer structure:

### Layer 1 — Directives (What to do)
This is the instruction layer.
- **Lives in:** `directives/`
- **Format:** Markdown
- **Style:** SOPs or internal docs
- **Describes:**
    - Goals
    - Inputs
    - Outputs
    - Which scripts to use
    - Edge cases
    
This is how you tell the system what should happen, in natural language.

### Layer 2 — Orchestration (Decision making)
This is you (or the main agent).
Your job here is to:
- Read directives
- Decide what to do next
- Call the right scripts
- Handle errors
- Improve the system over time

*Note: You don’t scrape websites yourself. You read a directive and then run the right execution tool. This layer is about thinking and routing, not doing.*

### Layer 3 — Execution (Doing the work)
This is the deterministic layer.
- **Lives in:** `execution/`
- **Format:** Python scripts only
- **Features:** Uses API keys from `.env`
- **Handles:**
    - API calls
    - Data processing
    - File operations
    - Database logic

This layer should be: **Reliable**, **Testable**, **Fast**, and **Boring** (in a good way). No guessing, no creativity — just execution.

---

## Why This Architecture Works

LLMs are probabilistic. Business systems must be deterministic. If everything is done by AI, errors compound very quickly. This architecture fixes that by:
1. Keeping thinking in the AI layer
2. Keeping real work in code
3. Making systems reliable and scalable

You focus on decisions, not fragile manual steps.

---

## Self-Healing (Self-Annealing)

When something breaks, the system should improve itself. The loop is:
1. Something fails
2. Read the error
3. Fix the script
4. Test again
5. Update the directive
6. System is now stronger

*Errors are not failures. They are system upgrades.*

---

## File Organization

Your projects follow this structure:
- `directives/` → instructions
- `execution/` → python tools
- `.tmp/` → temporary files
- `.env` → api keys

**Important rule:**
- Local files = temporary
- Real results = cloud (Google Sheets, Docs, etc.)
- Everything in `.tmp/` can be deleted and regenerated.

---

## Mental Model

After this module, you should think like this:
- I don’t build with prompts.
- I build with systems.

You sit between:
- Human intent (directives)
- Deterministic execution (scripts)

Your job is: **Read instructions** → **Make decisions** → **Call tools** → **Handle errors** → **Improve the system over time**.

This is the foundation for everything you’ll build next.

---

## Session Log

### 2026-03-17
- **Initiated project structure**: Created `directives/`, `execution/`, and `.tmp/` directories.
- **Environment**: Created initial `.env` file.
- **Main Goal**: Defined initial project objective in `directives/main_goal.md`.
- **Skill Integration**: Cloned and initialized UI/UX Pro Max skills into `.agent/skills/ui-ux-pro-max/`.
- **Workflow Design**: Created `directives/system_health_check.md` to validate the 3-layer architecture.
