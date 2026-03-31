# WeldRef Overhaul — Design Spec
**Date:** 2026-03-31
**Status:** Approved

---

## Overview

Five coordinated changes to the WeldRef single-file HTML/JS welding reference app:

1. H-Plus module — complete redesign (hydraulic fluid → human performance)
2. Remove Electrode Stock and Grinding Discs modules
3. Machines module — accurate hot start / arc force per machine
4. Weld Settings module — Zika brand names + accurate settings
5. Hebrew language toggle — full RTL translation across all modules

No framework changes. All modules follow the existing pattern: plain JS object with a `.render()` method that sets `#main-content` innerHTML. CSS injected via `<style>` tag on first render.

---

## 1. H-Plus Module Redesign

### Concept
Replace the hydraulic fluid tracker with a personal performance optimization tool based on the Monroe Institute Human Plus (H+) program. The module helps the user access the right mental state at the right moment during the workday.

H+ command words (e.g. *PLUS-FOCUS*, *PLUS-RESET, RESET*) remain in English in both languages — they are proprietary Monroe Institute phrases. All surrounding UI, descriptions, and welding guidance are translated.

### Structure — 3 tabs

**Tab 1: Now**
Situation picker — 10 welding-tied scenarios. User taps a situation, gets a command card.

| Situation (EN) | Situation (HE) | Primary Command | Secondary |
|---|---|---|---|
| About to do precision weld | לפני ריתוך מדויק | SYNCHRONIZING — *PLUS-SMOOTH, FAST* | ATTENTION |
| Can't concentrate / distracted | לא מצליח להתרכז | ATTENTION — *PLUS-FOCUS* | — |
| Tired / low energy | עייף / חסר אנרגיה | RECHARGE — *PLUS-RECHARGE* | RESET |
| Stressed / frustrated after a mistake | לחוץ אחרי טעות | LET GO — *PLUS-LET GO* | RELAX |
| Procrastinating on a repair | דוחה תיקון | DO THIS NOW — *PLUS-DO THIS NOW* | — |
| Learning a new rod or technique | לומד טכניקה חדשה | IMPRINT — *PLUS-IMPRINT, IMPRINT* | ATTENTION |
| Need to recall a procedure | צריך לזכור הליך | RECALL — *PLUS-RECALL* | — |
| Making a go/no-go decision on a repair | להחליט על תיקון | OPTIONS — *PLUS-OPTIONS, CHOICES* | — |
| Physical pain / body tension | כאב גוף / מתח | TUNE-UP — *PLUS-BALANCE, HEAL* | CIRCULATION |
| Starting fresh after a rough patch | להתחיל מחדש | RESET — *PLUS-RESET, RESET* | EIGHT-GREAT |

Tapping a situation shows a full command card:
- Command words displayed large and prominent (always English)
- One-sentence welding tip in current language
- Description of the program
- Companion programs listed
- "Also try" chip if a secondary command exists

**Tab 2: Daily Stack**
Three time blocks with program suggestions and checkboxes. State persists in `localStorage` keyed by today's date (ISO format). Resets automatically at midnight.

| Block | Key | Programs | Purpose |
|---|---|---|---|
| ☀️ Morning | `hplus_morning` | RESET · ATTENTION · EIGHT-GREAT | Clear slate, prime focus, load positive attitude |
| ⚡ Mid-day | `hplus_midday` | RECHARGE · LET GO | Fight energy dip, drop accumulated frustration |
| 🌙 End of shift | `hplus_evening` | RESTORATIVE SLEEP · TUNE-UP | Physical recovery, body maintenance overnight |

Nav badge (existing `shouldShowReminder()`) fires if morning block is not fully checked. Clears when all three morning items are ticked.

**Tab 3: Index**
All 37 H+ programs as compact searchable cards. Live search filters by program name, command word, or keyword. Each card shows:
- Program name
- Command words (large, always English)
- One-line purpose (translated)
- Companion programs

### Data
Full 37-program dataset stored in the module from H_COMMANDS.xlsx. Each entry:
```js
{
  id: 'attention',
  name: 'ATTENTION',          // always English (Monroe Institute name)
  command: 'PLUS-FOCUS',      // always English
  purpose: { en: '...', he: '...' },
  desc: { en: '...', he: '...' },
  companions: ['RELAX', 'IMPRINT', 'SPEAK UP'],
  weldingTip: { en: '...', he: '...' },  // only on situation-mapped items
}
```

---

## 2. Remove Electrode Stock + Grinding Discs

**Files to delete:**
- `modules/inventory.js`
- `modules/grinding.js`

**Changes to `index.html`:**
- Remove `<script>` tags for both files
- Remove from `MODULE_MAP`
- Remove from `MODULE_TITLES`
- Remove nav items from sidebar
- Remove module cards from `renderHome()`

---

## 3. Machines Module — Accurate Hot Start / Arc Force

### Audit per machine

| Machine | Process | Hot Start | Arc Force |
|---|---|---|---|
| Helvi Compact 406C | SMAW / MIG / TIG | ✅ SMAW only | ✅ SMAW only |
| Jasic ARC 630 Z321 | SMAW only | ✅ Yes | ✅ Yes |
| Kemppi MinarcMig Evo 200 | MIG only | ❌ N/A | ❌ N/A |
| BTT FOX 189 | MIG + SMAW | ✅ SMAW mode only | ❌ N/A (no arc force control) |
| Zika i-200C Premium | SMAW only | ✅ Yes | ✅ Yes |
| Jasic CUT-100 | Plasma only | ❌ N/A | ❌ N/A |

**Changes:**
- Kemppi: remove Hot Start / Arc Force fields entirely, add note "MIG only — no hot start or arc force"
- BTT FOX 189: Hot Start shown for SMAW mode only, Arc Force field removed (unit has no arc force adjustment)
- Jasic CUT-100: remove both fields, settings show air pressure + cut height + speed only
- All SMAW machines: keep existing values

---

## 4. Weld Settings — Zika Brand Names

**Mapping:**
| Code | Zika brand |
|---|---|
| E7018 | Zika Z-4 |
| E6013 | Zika Z-11 |
| E8018-G | Zika Z-3 |
| E6010 | Zika Z-610 |

**Change:** In the `SETTINGS_DB`, electrode field for SMAW entries becomes `"E7018 (Zika Z-4)"`, etc. Notes updated where electrode brand is mentioned. No structural change to the settings lookup logic.

---

## 5. Hebrew Language Toggle — Full RTL Translation

### Scope
All modules translate UI text, labels, descriptions, and data content. H+ command words stay English. Metal grade names, electrode codes, and machine model names stay English (they are technical identifiers, not prose).

### Implementation approach
Each module's `render()` already has access to `currentLang` (global). Bilingual strings are stored as `{ en: '...', he: '...' }` objects (or inline ternaries for short strings). Helper function `t(obj)` or `t(en, he)` returns the correct string.

### RTL layout
`index.html` already calls `document.documentElement.dir = 'rtl'` on Hebrew toggle. All modules rely on CSS logical properties and inherit direction from `<html>`. Specific fixes:
- Badge alignment (flex-direction stays, text-align follows dir)
- Table column order stays the same (data columns don't swap)
- Sidebar nav inherits RTL correctly via existing CSS
- Input placeholders use bilingual strings
- Number values (amps, voltages) remain LTR inside RTL context via `dir="ltr"` span wrapper

### Modules to translate

| Module | Content to translate |
|---|---|
| Home | Card titles, subtitles, section labels, date |
| Electrodes | Tab labels, column headers, filter labels, electrode descriptions |
| Compare | Labels, result text |
| Machines | Page title, section headers, spec labels, notes |
| Metals | Already partially translated — complete all tabs (Spark Test, Quiz, Glossary UI chrome) |
| Settings | Labels, repair type names, notes, result headers |
| H-Plus | Situation names, daily stack block names, program purposes, welding tips (commands stay EN) |
| Daily Tip | Tip content (or bilingual tip array) |
| Checklist | Item names, section headers, buttons |
| Repairs | Form labels, status text, table headers |

### Translation delivery
Bilingual string tables added to each module. Hebrew provided by Claude using welding-domain knowledge and the existing Hebrew already present in `metals.js`. Native Hebrew phrasing, not machine-translated.

---

## File Change Summary

| File | Change |
|---|---|
| `modules/hplus.js` | Complete rewrite |
| `modules/inventory.js` | Delete |
| `modules/grinding.js` | Delete |
| `modules/machines.js` | Audit hot start/arc force + Hebrew |
| `modules/settings.js` | Zika brand names + Hebrew |
| `modules/metals.js` | Complete Hebrew for all 4 tabs |
| `modules/electrodes.js` | Hebrew |
| `modules/compare.js` | Hebrew |
| `modules/tip.js` | Hebrew |
| `modules/checklist.js` | Hebrew |
| `modules/repairs.js` | Hebrew |
| `index.html` | Remove inventory/grinding, Hebrew for home + nav |

---

## What Is Not Changing

- No framework, no build tools, no new dependencies
- App architecture (SPA, module pattern, router) unchanged
- Metals module 4-tab structure (just completed) unchanged
- CSS file (`css/style.css`) unchanged — all new module CSS is injected
- Electrode lookup page (`electrode_lookup.html`) out of scope
