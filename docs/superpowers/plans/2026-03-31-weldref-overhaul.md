# WeldRef Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove two unused modules, redesign H-Plus as a personal performance tool, fix machine/settings accuracy, and add full Hebrew RTL translation across the entire app.

**Architecture:** Vanilla JS SPA — each module is a plain object with `.render()`. A global `t(en, he)` helper (added to `index.html`) returns the correct language string. Modules call `t()` inside their `render()` function so language re-renders correctly on toggle. H+ command words always stay English regardless of language. RTL direction is already set by `document.documentElement.dir` in the existing toggle — module CSS inherits it.

**Tech Stack:** HTML, CSS, vanilla JS, localStorage. No build tools. No test framework — verification is done by opening `index.html` in a browser and checking the specific behaviors listed in each task.

---

## File Change Map

| File | Action | What changes |
|---|---|---|
| `index.html` | Modify | Remove inventory/grinding from script tags, MODULE_MAP, MODULE_TITLES, nav, home grid. Add `t()` helper. Translate nav + home. |
| `modules/hplus.js` | Full rewrite | Human performance tool — 3 tabs: Now / Daily Stack / Index |
| `modules/machines.js` | Modify | Remove/fix hot start & arc force per machine. Add Hebrew. |
| `modules/settings.js` | Modify | Add Zika brand names. Add Hebrew. |
| `modules/metals.js` | Modify | Complete Hebrew for all 4 tabs. |
| `modules/checklist.js` | Modify | Add Hebrew. |
| `modules/repairs.js` | Modify | Add Hebrew. |
| `modules/tip.js` | Modify | Add Hebrew UI chrome (tips stay English). |
| `modules/electrodes.js` | Modify | Add Hebrew UI chrome (electrode data stays English). |
| `modules/compare.js` | Modify | Add Hebrew UI chrome. |
| `modules/inventory.js` | Delete | Removed from app. |
| `modules/grinding.js` | Delete | Removed from app. |

---

## Task 1: Remove Electrode Stock + Grinding Discs

**Files:**
- Modify: `index.html`
- Delete: `modules/inventory.js`
- Delete: `modules/grinding.js`

- [ ] **Step 1: Remove script tags from index.html**

In `index.html`, delete these two lines (around line 105–106):
```html
<script src="modules/inventory.js"></script>
<script src="modules/grinding.js"></script>
```

- [ ] **Step 2: Remove from MODULE_MAP**

Find the `MODULE_MAP` object and remove:
```js
inventory: InventoryModule,
grinding:  GrindingModule,
```

- [ ] **Step 3: Remove from MODULE_TITLES**

Find the `MODULE_TITLES` object and remove:
```js
inventory: 'Electrode Stock',
grinding:  'Grinding Discs',
```

- [ ] **Step 4: Remove nav items from sidebar**

Find and delete these two nav items:
```html
<a class="nav-item" data-module="inventory" onclick="navigate('inventory')">
  <span class="nav-icon">📦</span><span class="nav-label">Electrode Stock</span>
</a>
<a class="nav-item" data-module="grinding" onclick="navigate('grinding')">
  <span class="nav-icon">💿</span><span class="nav-label">Grinding Discs</span>
</a>
```

- [ ] **Step 5: Remove home grid cards from renderHome()**

Find and delete these two module cards in `renderHome()`:
```html
<div class="module-card" onclick="navigate('inventory')">
  <span class="module-icon">📦</span>
  <div class="module-name">${currentLang === 'he' ? 'מלאי אלקטרודות' : 'Electrode Stock'}</div>
  <div class="module-desc">${currentLang === 'he' ? 'מעקב מלאי' : 'Inventory tracking'}</div>
</div>
<div class="module-card" onclick="navigate('grinding')">
  <span class="module-icon">💿</span>
  <div class="module-name">${currentLang === 'he' ? 'דיסקים' : 'Grinding Discs'}</div>
  <div class="module-desc">${currentLang === 'he' ? 'מלאי דיסקי שחיקה' : 'Disc inventory'}</div>
</div>
```

- [ ] **Step 6: Delete the JS files**

```bash
rm repo_clone/modules/inventory.js
rm repo_clone/modules/grinding.js
```

- [ ] **Step 7: Verify**

Open `index.html` in browser. Check:
- Sidebar has no Electrode Stock or Grinding Discs items
- Home grid has no those cards
- No JS console errors on load

- [ ] **Step 8: Commit**

```bash
git add index.html
git rm modules/inventory.js modules/grinding.js
git commit -m "Remove Electrode Stock and Grinding Discs modules"
```

---

## Task 2: Fix machines.js — Accurate Hot Start / Arc Force

**Files:**
- Modify: `modules/machines.js`

**Audit result:**
- **Helvi 406C** — SMAW/MIG/TIG. Hot Start + Arc Force apply to SMAW mode only. Keep values, add note.
- **Jasic 630** — SMAW only. Hot Start + Arc Force correct. Keep.
- **Kemppi MinarcMig** — MIG only. No Hot Start, no Arc Force. Remove both fields entirely.
- **BTT FOX 189** — MIG + SMAW combo. Hot Start in SMAW mode only. Unit has NO Arc Force adjustment knob. Remove arcForce field.
- **Zika i-200C** — SMAW only. Hot Start + Arc Force correct. Keep.
- **Jasic CUT-100** — Plasma only. Neither applies. Remove both fields.

- [ ] **Step 1: Fix Kemppi MinarcMig Evo 200 settings block**

Find the `kemppi-minarcmig` entry in `DB`. Replace its `settings` object:
```js
settings: {
  wire: '0.8mm ER70S-6',
  gas:  '75% Ar / 25% CO₂ at 12–15 L/min',
  note: 'MIG only — no Hot Start or Arc Force controls',
}
```

- [ ] **Step 2: Fix BTT FOX 189 settings block**

Find the `btt-fox-189` entry. Replace its `settings` object:
```js
settings: {
  wire:     '0.8mm ER70S-6 (MIG mode)',
  gas:      '75% Ar / 25% CO₂ at 10–12 L/min',
  hotStart: '10–25% (SMAW mode only)',
  note:     'No Arc Force adjustment on this unit',
}
```

- [ ] **Step 3: Fix Helvi 406C settings block note**

Find the `helvi-406c` entry. Update the `settings` object to:
```js
settings: {
  hotStart: '20–40% (SMAW mode only)',
  arcForce: '15–30% (E7018) · 40–60% (E6010/E6011) — SMAW mode only',
}
```

- [ ] **Step 4: Fix Jasic CUT-100 settings block**

Find the `jasic-cut100` entry. Replace its `settings` object:
```js
settings: {
  pressure:      '5.0 bar recommended',
  cuttingHeight: '1.5–2.5mm above work surface',
  speed:         'Reduce on thick material for clean cut face',
  note:          'Plasma — no Hot Start or Arc Force',
}
```

- [ ] **Step 5: Verify**

Open browser → Machines. Check:
- Kemppi card shows no Hot Start / Arc Force rows
- BTT FOX shows Hot Start with "(SMAW mode only)" and no Arc Force row
- Jasic CUT-100 shows pressure/height/speed but no Hot Start / Arc Force
- Helvi and Jasic 630 and Zika i-200C still show both Hot Start and Arc Force

- [ ] **Step 6: Commit**

```bash
git add modules/machines.js
git commit -m "Fix machines module: accurate hot start/arc force per machine"
```

---

## Task 3: Fix settings.js — Zika Brand Names

**Files:**
- Modify: `modules/settings.js`

**Mapping:** E7018 → `E7018 (Zika Z-4)` · E6013 → `E6013 (Zika Z-11)` · E8018 / E8018-G → `E8018-G (Zika Z-3)` · E6010 → `E6010 (Zika Z-610)` · E6011 stays as-is (no Zika equivalent listed).

- [ ] **Step 1: Update electrode field values in SETTINGS_DB**

In `modules/settings.js`, do a find-and-replace of the electrode values across all entries in `SETTINGS_DB`. Change each electrode field as follows:

| Old value | New value |
|---|---|
| `'E7018'` (electrode field) | `'E7018 (Zika Z-4)'` |
| `'E8018'` (electrode field) | `'E8018-G (Zika Z-3)'` |
| `'E8018-G'` | `'E8018-G (Zika Z-3)'` |
| `'E6013'` (electrode field) | `'E6013 (Zika Z-11)'` |
| `'E6010 / E6011'` (electrode field) | `'E6010 (Zika Z-610) / E6011'` |
| `'E7018 / E8018'` (electrode field) | `'E7018 (Zika Z-4) / E8018-G (Zika Z-3)'` |
| `'ER70S-6 (MIG) / E7018 (SMAW)'` | `'ER70S-6 (MIG) / E7018 Zika Z-4 (SMAW)'` |
| `'E308L-16 (if SMAW)'` | `'E308L-16 (SMAW)'` |
| `'ENi-1 (Nickel rod)'` | `'ENi-1 / ENiFe-CI (Nickel rod)'` |
| `'Stoody 31 / equivalent'` | `'Stoody 31 or equivalent hard-facing rod'` |

Only change the `electrode:` field values, not the notes text.

- [ ] **Step 2: Update MACHINES list to add Zika i-200C if missing**

Verify `MACHINES` array includes:
```js
{ id: 'zika-i200c', name: 'Zika i-200C Premium', type: 'MMA' },
```
It should already be there — confirm it is.

- [ ] **Step 3: Verify**

Open browser → Weld Settings. Select Helvi + "Structural steel (general)". Confirm electrode shows `E7018 (Zika Z-4)`. Select Jasic 630 + "Root pass" — confirm `E6010 (Zika Z-610) / E6011`.

- [ ] **Step 4: Commit**

```bash
git add modules/settings.js
git commit -m "Add Zika brand names to weld settings electrode references"
```

---

## Task 4: Rewrite hplus.js — Human Performance Module

**Files:**
- Full rewrite: `modules/hplus.js`

Replace the entire file with the following. This is the complete new module — 3 tabs (Now / Daily Stack / Index), all 37 H+ programs, bilingual UI, localStorage daily tracking.

- [ ] **Step 1: Replace modules/hplus.js entirely**

```js
// ═══════════════════════════════════════════
// H-PLUS MODULE — Human Performance
// Monroe Institute Human Plus program reference
// ═══════════════════════════════════════════

const HPlusModule = (() => {

  /* ─── CSS ─────────────────────────────────── */
  const CSS = `
  .hp-wrap { max-width:700px; margin:0 auto; }
  .hp-tab-nav {
    display:flex; gap:4px;
    background:#242424; border:1px solid #3a3a3a;
    border-radius:10px; padding:4px;
    margin-bottom:18px; overflow-x:auto; scrollbar-width:none;
  }
  .hp-tab-nav::-webkit-scrollbar { display:none; }
  .hp-tab-btn {
    flex:1; min-width:60px; padding:7px 10px;
    border:none; border-radius:6px;
    background:transparent; color:#aaa;
    font-size:12px; font-weight:500;
    cursor:pointer; white-space:nowrap; transition:all .15s;
  }
  .hp-tab-btn.active { background:var(--accent,#e53935); color:#fff; }
  .hp-tab-btn:hover:not(.active) { background:#2e2e2e; color:#f0f0f0; }
  .hp-pane { display:none; }
  .hp-pane.active { display:block; }

  /* situation grid */
  .hp-sit-grid {
    display:grid; grid-template-columns:1fr 1fr;
    gap:8px; margin-bottom:16px;
  }
  @media(max-width:440px) { .hp-sit-grid { grid-template-columns:1fr; } }
  .hp-sit-chip {
    background:#242424; border:1px solid #3a3a3a;
    border-radius:10px; padding:12px 14px;
    cursor:pointer; transition:all .15s;
  }
  .hp-sit-chip:hover { border-color:#4a4a4a; background:#2e2e2e; }
  .hp-sit-chip.active { border-color:var(--accent,#e53935); background:rgba(229,57,53,.12); }
  .hp-sit-icon { font-size:20px; margin-bottom:6px; }
  .hp-sit-label { font-size:13px; font-weight:600; color:#f0f0f0; }

  /* command card */
  .hp-cmd-card {
    background:#242424; border:1px solid #3a3a3a;
    border-radius:10px; overflow:hidden; margin-bottom:16px;
  }
  .hp-cmd-header { padding:16px 18px 14px; border-bottom:1px solid #3a3a3a; }
  .hp-cmd-program { font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#707070; margin-bottom:4px; }
  .hp-cmd-words {
    font-size:28px; font-weight:800; color:var(--accent,#e53935);
    letter-spacing:.5px; line-height:1.2; font-family:'Barlow Condensed',sans-serif;
  }
  .hp-cmd-desc { padding:14px 18px; font-size:13px; color:#aaa; line-height:1.6; border-bottom:1px solid #3a3a3a; }
  .hp-cmd-weld-tip {
    margin:12px 18px; padding:10px 13px;
    background:rgba(30,136,229,.1); border-left:3px solid #1e88e5;
    border-radius:6px; font-size:12px; color:#90caf9; line-height:1.6;
  }
  .hp-cmd-companions {
    padding:10px 18px 14px; font-size:12px; color:#707070;
  }
  .hp-cmd-companions strong { color:#aaa; }
  .hp-also-chip {
    display:inline-block; margin-top:10px; margin-inline-end:8px;
    background:#2e2e2e; border:1px solid #4a4a4a;
    border-radius:20px; padding:4px 12px;
    font-size:11px; font-weight:600; color:#aaa; cursor:pointer;
    transition:all .15s;
  }
  .hp-also-chip:hover { border-color:var(--accent,#e53935); color:#f0f0f0; }

  /* daily stack */
  .hp-stack-block {
    background:#242424; border:1px solid #3a3a3a;
    border-radius:10px; overflow:hidden; margin-bottom:12px;
  }
  .hp-stack-block-hdr {
    padding:12px 16px; border-bottom:1px solid #3a3a3a;
    display:flex; align-items:center; gap:10px;
  }
  .hp-stack-block-icon { font-size:18px; }
  .hp-stack-block-title { font-size:14px; font-weight:700; color:#f0f0f0; }
  .hp-stack-block-sub   { font-size:11px; color:#707070; margin-top:1px; }
  .hp-stack-done-pill {
    margin-inline-start:auto;
    background:rgba(67,160,71,.15); border:1px solid #43a047;
    border-radius:20px; padding:2px 10px;
    font-size:11px; font-weight:700; color:#a5d6a7;
    display:none;
  }
  .hp-stack-items { padding:8px 0; }
  .hp-stack-item {
    display:flex; align-items:center; gap:12px;
    padding:10px 16px; cursor:pointer;
    transition:background .1s;
  }
  .hp-stack-item:hover { background:#2a2a2a; }
  .hp-stack-item.checked .hp-stack-item-name { color:#555; text-decoration:line-through; }
  .hp-stack-check {
    width:20px; height:20px; border-radius:5px;
    border:2px solid #4a4a4a; flex-shrink:0;
    display:flex; align-items:center; justify-content:center;
    font-size:12px; font-weight:700; color:#43a047;
    transition:all .15s;
  }
  .hp-stack-item.checked .hp-stack-check { background:rgba(67,160,71,.15); border-color:#43a047; }
  .hp-stack-item-name { font-size:13px; font-weight:600; color:#f0f0f0; }
  .hp-stack-item-cmd  { font-size:11px; color:var(--accent,#e53935); font-weight:700; margin-top:1px; }

  /* index */
  .hp-index-search-wrap { position:relative; margin-bottom:12px; }
  .hp-index-search {
    width:100%; background:#242424; border:1px solid #3a3a3a;
    border-radius:10px; padding:9px 12px 9px 36px;
    font-size:13px; color:#f0f0f0; transition:border-color .15s;
  }
  .hp-index-search:focus { outline:none; border-color:var(--accent,#e53935); }
  .hp-index-search-icon { position:absolute; inset-inline-start:11px; top:50%; transform:translateY(-50%); color:#707070; pointer-events:none; }
  .hp-index-list { display:flex; flex-direction:column; gap:6px; }
  .hp-index-card {
    background:#242424; border:1px solid #3a3a3a;
    border-radius:10px; padding:12px 14px;
  }
  .hp-index-card-name { font-size:11px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#707070; margin-bottom:3px; }
  .hp-index-card-cmd  { font-size:18px; font-weight:800; color:var(--accent,#e53935); font-family:'Barlow Condensed',sans-serif; margin-bottom:4px; }
  .hp-index-card-purpose { font-size:12px; color:#aaa; line-height:1.5; }
  .hp-index-card-comp { font-size:11px; color:#555; margin-top:4px; }
  .hp-no-results { text-align:center; color:#707070; font-size:13px; padding:20px; }
  `;

  /* ─── Data ────────────────────────────────── */
  // Situations mapped to H+ programs
  const SITUATIONS = [
    {
      icon: '🎯',
      label: { en: 'About to do precision weld', he: 'לפני ריתוך מדויק' },
      primary: 'synchronizing',
      also: 'attention',
      weldTip: {
        en: 'Before a tight joint, root pass, or any weld where hand steadiness matters — run PLUS-SMOOTH, FAST to synchronize your mind-body coordination.',
        he: 'לפני חיבור צר, מעבר שורש, או כל ריתוך שדורש יד יציבה — הפעל PLUS-SMOOTH, FAST לתיאום גוף-נפש.'
      }
    },
    {
      icon: '🧠',
      label: { en: "Can't concentrate / distracted", he: 'לא מצליח להתרכז' },
      primary: 'attention',
      also: null,
      weldTip: {
        en: 'Use before reading a procedure, setting up a repair sequence, or any task requiring sustained mental focus on the job.',
        he: 'השתמש לפני קריאת הוראות, תכנון רצף תיקון, או כל משימה הדורשת ריכוז מתמשך.'
      }
    },
    {
      icon: '⚡',
      label: { en: 'Tired / low energy', he: 'עייף / חסר אנרגיה' },
      primary: 'recharge',
      also: 'reset',
      weldTip: {
        en: 'Mid-shift energy dip or after a physically demanding repair session. A fast mental recharge before picking up the rod again.',
        he: 'ירידת אנרגיה באמצע משמרת או אחרי תיקון מאומץ. טעינה מחדש לפני שמחזיקים את האלקטרודה שוב.'
      }
    },
    {
      icon: '🌬️',
      label: { en: 'Stressed / frustrated after a mistake', he: 'לחוץ אחרי טעות' },
      primary: 'let-go',
      also: 'relax',
      weldTip: {
        en: 'After a bad weld, a stuck rod, or a grinding mistake. Release the frustration before attempting the repair — emotion causes more mistakes.',
        he: 'אחרי ריתוך רע, אלקטרודה תקועה, או טעות בשחיקה. שחרר את התסכול לפני ניסיון התיקון — רגשות גורמים לעוד טעויות.'
      }
    },
    {
      icon: '🚀',
      label: { en: 'Procrastinating on a repair', he: 'דוחה תיקון' },
      primary: 'do-this-now',
      also: null,
      weldTip: {
        en: "The job's been sitting there. Use this before the repair you've been avoiding — cracks, worn parts, or anything you've been putting off.",
        he: 'העבודה ממתינה. השתמש לפני התיקון שדחית — סדקים, חלקים שחוקים, או כל דבר שהמשכת לדחות.'
      }
    },
    {
      icon: '📖',
      label: { en: 'Learning a new rod or technique', he: 'לומד טכניקה חדשה' },
      primary: 'imprint',
      also: 'attention',
      weldTip: {
        en: 'Before studying a procedure, watching a technique demo, or trying a new electrode type for the first time. Lock the information in deep.',
        he: 'לפני לימוד הליך, צפייה בהדגמת טכניקה, או ניסיון סוג אלקטרודה חדש. הצמד את המידע עמוק.'
      }
    },
    {
      icon: '💾',
      label: { en: 'Need to recall a procedure', he: 'צריך לזכור הליך' },
      primary: 'recall',
      also: null,
      weldTip: {
        en: 'When you need to remember preheat temps, electrode specs, or a sequence you learned but cannot quite pull up — use PLUS-RECALL.',
        he: 'כשצריך לזכור טמפרטורות חימום מקדים, מפרטי אלקטרודה, או רצף שלמדת אבל לא מצליח לשלוף — השתמש ב-PLUS-RECALL.'
      }
    },
    {
      icon: '⚖️',
      label: { en: 'Making a go/no-go decision on a repair', he: 'להחליט אם לתקן' },
      primary: 'options',
      also: null,
      weldTip: {
        en: "Not sure if a crack is weldable, if a part needs replacing, or how to approach a complex repair? Use OPTIONS to think it through objectively.",
        he: 'לא בטוח אם סדק ניתן לריתוך, אם חלק צריך החלפה, או איך לגשת לתיקון מורכב? השתמש ב-OPTIONS לחשיבה אובייקטיבית.'
      }
    },
    {
      icon: '💪',
      label: { en: 'Physical pain / body tension', he: 'כאב גוף / מתח שרירי' },
      primary: 'tune-up',
      also: 'circulation',
      weldTip: {
        en: 'Back strain from overhead welding, hand tension from grinding, or general physical fatigue mid-shift. Maintain your body as a tool.',
        he: 'עומס גב מריתוך עילי, מתח ביד מהשחזה, או עייפות גופנית כללית. טפל בגופך כמו בכלי עבודה.'
      }
    },
    {
      icon: '🔄',
      label: { en: 'Starting fresh after a rough patch', he: 'להתחיל מחדש' },
      primary: 'reset',
      also: 'eight-great',
      weldTip: {
        en: 'After a bad morning, an argument, or just a stretch of nothing going right. Shift your state completely before continuing work.',
        he: 'אחרי בוקר קשה, ויכוח, או תקופה שכלום לא עובד. שנה את המצב שלך לחלוטין לפני שממשיך לעבוד.'
      }
    },
  ];

  // Full 37-program H+ index
  const PROGRAMS = [
    { id:'attention',      name:'ATTENTION',               command:'PLUS-FOCUS',                    purpose:{en:'Sharpen focus and concentration',                         he:'חידוד ריכוז ומיקוד'}, companions:['RELAX','IMPRINT','SPEAK UP'] },
    { id:'brain-support',  name:'BRAIN: SUPPORT',          command:'PLUS-FLOW BETTER',               purpose:{en:'Improve blood supply to the brain',                       he:'שיפור אספקת דם למוח'}, companions:['TUNE-UP','RESTORATIVE SLEEP','CIRCULATION','THINK FAST'] },
    { id:'buy-numbers',    name:'BUY THE NUMBERS',          command:'PLUS-CALCULATE',                 purpose:{en:'Improve ability to work with numbers',                    he:'שיפור יכולת עבודה עם מספרים'}, companions:['RELAX','ATTENTION','IMPRINT','RECALL','THINK FAST'] },
    { id:'circulation',    name:'CIRCULATION',              command:'PLUS-FLOW SMOOTH',               purpose:{en:'Improve and regulate blood flow in the body',             he:'שיפור וויסות זרימת דם בגוף'}, companions:['RESTORATIVE SLEEP','TUNE-UP','NUTRICIA'] },
    { id:'contemplation',  name:'CONTEMPLATION',            command:'PLUS-OPEN / PLUS-CLOSED',        purpose:{en:'Access creativity and intuition from your total self',    he:'גישה ליצירתיות ואינטואיציה מהעצמי השלם'}, companions:['OPTIONS','MOBIUS-WEST','EIGHT-GREAT'] },
    { id:'de-discomfort',  name:'DE-DISCOMFORT',            command:'PLUS-55515',                     purpose:{en:'Control physical body discomfort signals',                he:'שליטה באותות אי-נוחות גופנית'}, companions:['TUNE-UP','RESTORATIVE SLEEP'] },
    { id:'de-hab',         name:'DE-HAB',                   command:'PLUS-NO MORE / NO MORE',         purpose:{en:'Release physical and mental patterns that restrict you',  he:'שחרור דפוסים גופניים ומנטליים מגבילים'}, companions:['LET GO','SPEAK UP','MAKE YOUR DAY','EAT/NOEAT'] },
    { id:'detox',          name:'DETOX: BODY',              command:'PLUS-CLEAN / CLEAR',             purpose:{en:'Enhance body\'s natural ability to cleanse itself',       he:'שיפור יכולת הגוף לנקות את עצמו'}, companions:['TUNE-UP','RESTORATIVE SLEEP','SHORT FIX'] },
    { id:'do-this-now',    name:'DO THIS NOW',              command:'PLUS-DO THIS NOW',               purpose:{en:'Stop procrastinating — start with energy',                he:'הפסק לדחות — התחל עם אנרגיה'}, companions:[] },
    { id:'eat-no-eat',     name:'EAT / NO EAT',             command:'PLUS-SATISFIED / SUPPLIED',      purpose:{en:'Control your desire for food',                           he:'שליטה בתשוקה לאוכל'}, companions:['LET GO','MOBIUS WEST','DE-HAB','RELAX'] },
    { id:'eight-great',    name:'EIGHT-GREAT',              command:'PLUS-EIGHT GREAT',               purpose:{en:'Use your inner strength on demand',                      he:'שימוש בכוח הפנימי שלך על פי דרישה'}, companions:['RESET','CONTEMPLATION','MAKE YOUR DAY','DE-HAB'] },
    { id:'heart',          name:'HEART: MAINTENANCE',       command:'PLUS-HEART BETTER, BETTER',      purpose:{en:'Direct the action and strength of your heart',           he:'הפניית פעולת הלב וחיזוקו'}, companions:['RELAX','RESTORATIVE SLEEP','CIRCULATION'] },
    { id:'hypertension',   name:'HYPERTENSION',             command:'PLUS-BALANCE BLOOD PRESSURE',    purpose:{en:'Balance blood pressure',                                 he:'איזון לחץ דם'}, companions:[] },
    { id:'immunizing',     name:'IMMUNIZING',               command:'PLUS-ALERT, DESTROY',            purpose:{en:'Direct your body\'s immune system',                      he:'הפניית מערכת החיסון של הגוף'}, companions:['DETOX: BODY','TUNE-UP','RESTORATIVE SLEEP','CIRCULATION'] },
    { id:'imprint',        name:'IMPRINT',                  command:'PLUS-IMPRINT, IMPRINT / PLUS-RECALL', purpose:{en:'Install information deep in your memory',            he:'הצמדת מידע עמוק בזיכרון'}, companions:['ATTENTION','THINK FAST'] },
    { id:'let-go',         name:'LET GO',                   command:'PLUS-LET GO',                    purpose:{en:'Release disturbing emotions on demand',                  he:'שחרור רגשות מטרידים על פי דרישה'}, companions:['RELAX','ATTENTION','RESET','OPTIONS'] },
    { id:'lungs',          name:'LUNGS: MAINTENANCE',       command:'PLUS-BREATH BETTER',             purpose:{en:'Improve breathing system condition and performance',     he:'שיפור מצב ותפקוד מערכת הנשימה'}, companions:['RESTORATIVE SLEEP','TUNE-UP','DE-HAB'] },
    { id:'mobius-west',    name:'MOBIUS WEST',              command:'PLUS-CHANGE, CHANGE',            purpose:{en:'Program your future — create the reality you desire',    he:'תכנת את עתידך — צור את המציאות שאתה רוצה'}, companions:['DE-HAB','LET GO','OFF-LOADING','OPTIONS'] },
    { id:'nutricia',       name:'NUTRICIA',                 command:'PLUS-FOOD MORE / FOOD LESS',     purpose:{en:'Control the use and application of your food intake',    he:'שליטה בצריכת המזון וניצולו'}, companions:['EAT/NO-EAT','DE-HAB','RESTORATIVE SLEEP','EIGHT-GREAT'] },
    { id:'off-loading',    name:'OFF-LOADING',              command:'PLUS-FADE, FADE',                purpose:{en:'Erase distracting thought patterns',                     he:'מחיקת דפוסי מחשבה מסיחים'}, companions:['RECALL','RELAX','LET GO','DE-HAB'] },
    { id:'options',        name:'OPTIONS',                  command:'PLUS-OPTIONS, CHOICES',          purpose:{en:'Solve problems objectively with confidence',              he:'פתרון בעיות באופן אובייקטיבי ובביטחון'}, companions:[] },
    { id:'passages',       name:'PASSAGES',                 command:'PLUS-EQUALIZE, HARMONIZE',       purpose:{en:'Ease physical, mental and emotional symptoms',            he:'הקלה על סימפטומים גופניים, נפשיים ורגשיים'}, companions:[] },
    { id:'recall',         name:'RECALL',                   command:'PLUS-RECALL',                    purpose:{en:'Learn to remember — dreams, facts, procedures',           he:'לימוד לזכור — חלומות, עובדות, הליכים'}, companions:['ATTENTION','THINK FAST'] },
    { id:'recharge',       name:'RECHARGE',                 command:'PLUS-RECHARGE',                  purpose:{en:'Recharge quickly during a catnap or break',              he:'טעינה מחדש מהירה בהפסקה'}, companions:['RELAX','TUNE-UP','SHORT FIX','RESET'] },
    { id:'relax',          name:'RELAX',                    command:'PLUS-RELAX, RELAX',              purpose:{en:'Maintain calm and think clearly under stress',            he:'שמירה על רוגע וחשיבה ברורה תחת לחץ'}, companions:['All programs'] },
    { id:'reset',          name:'RESET',                    command:'PLUS-RESET, RESET',              purpose:{en:'Shift mental/physical state from down to energetic',     he:'מעבר ממצב ירוד לאנרגטי'}, companions:['Any program'] },
    { id:'restorative-sleep', name:'RESTORATIVE SLEEP',     command:'PLUS-HEAL, HEAL',                purpose:{en:'Heal and restore yourself during sleep',                 he:'ריפוי ושיקום עצמי במהלך השינה'}, companions:['TUNE-UP','SHORT FIX','CIRCULATION'] },
    { id:'sensory-hearing',name:'SENSORY: HEARING',         command:'PLUS-HEAR MORE / PLUS-HEAR LESS',purpose:{en:'Regulate your sensitivity to sound',                     he:'ויסות הרגישות שמיעה'}, companions:['SLEEP EASY','ATTENTION'] },
    { id:'sensory-seeing', name:'SENSORY: SEEING',          command:'PLUS-SEE BETTER',                purpose:{en:'Improve physical sight and seeing ability',              he:'שיפור ראייה פיזית ויכולת ראייה'}, companions:['RESTORATIVE SLEEP','TUNE-UP','ATTENTION'] },
    { id:'sex-drive',      name:'SEX DRIVE',                command:'PLUS-SEX GREATER / PLUS-SEX LESSER', purpose:{en:'Control and direct your sexual drive',              he:'שליטה והכוונת הדחף המיני'}, companions:['RELAX','LET GO','EIGHT-GREAT'] },
    { id:'sleep',          name:'SLEEP',                    command:'PLUS-20-20',                     purpose:{en:'Fall asleep whenever you desire',                        he:'להירדם בכל עת שתרצה'}, companions:['RESTORATIVE SLEEP','WAKE/KNOW','SWEET DREAMS'] },
    { id:'speak-up',       name:'SPEAK UP',                 command:'PLUS-SPEAK UP',                  purpose:{en:'Speak and read strongly and effectively to others',      he:'לדבר ולקרוא בצורה חזקה ואפקטיבית'}, companions:['RELAX','ATTENTION','RECALL','LET GO'] },
    { id:'sweet-dreams',   name:'SWEET DREAMS',             command:'PLUS-THEME, DREAM, SLEEP',       purpose:{en:'Program the content of your dreams',                    he:'תכנות תוכן החלומות שלך'}, companions:['SLEEP','WAKE/KNOW'] },
    { id:'synchronizing',  name:'SYNCHRONIZING',            command:'PLUS-SMOOTH, FAST',              purpose:{en:'Rapid and smooth mind-body coordination',                he:'תיאום מהיר וחלק של גוף-נפש'}, companions:['RELAX','ATTENTION'] },
    { id:'think-fast',     name:'THINK FAST',               command:'PLUS-THINK',                     purpose:{en:'Think quickly with all of your mental ability',          he:'לחשוב מהר עם כל יכולת המחשבה'}, companions:['ATTENTION','IMPRINT','RECALL','SPEAK UP','SYNCHRONIZING'] },
    { id:'tune-up',        name:'TUNE-UP',                  command:'PLUS-BALANCE, HEAL',             purpose:{en:'Perceive and adjust any part of your physical body',     he:'תפיסה ותיקון כל חלק בגוף הפיזי'}, companions:['RELAX','RESTORATIVE SLEEP','CIRCULATION'] },
    { id:'wake-know',      name:'WAKE/KNOW',                command:'PLUS-SLEEP, HELP',               purpose:{en:'Wake with the answer — use during sleep for guidance',  he:'להתעורר עם התשובה — שימוש בשינה להכוונה'}, companions:['MOBIUS WEST','OPTIONS','CONTEMPLATION'] },
  ];

  // Daily stack blocks
  const STACK = [
    {
      key: 'morning',
      icon: '☀️',
      label: { en: 'Morning — Start of shift', he: 'בוקר — תחילת משמרת' },
      sub:   { en: 'Clear slate · Prime focus · Load positive attitude', he: 'נקה לוח · כוון ריכוז · טען גישה חיובית' },
      items: ['reset','attention','eight-great'],
    },
    {
      key: 'midday',
      icon: '⚡',
      label: { en: 'Mid-day — After lunch', he: 'צהריים — אחרי ארוחה' },
      sub:   { en: 'Fight energy dip · Drop accumulated frustration', he: 'מאבק בירידת אנרגיה · שחרור תסכול שנצבר' },
      items: ['recharge','let-go'],
    },
    {
      key: 'evening',
      icon: '🌙',
      label: { en: 'End of shift', he: 'סוף משמרת' },
      sub:   { en: 'Physical recovery · Body maintenance overnight', he: 'התאוששות גופנית · תחזוקת גוף לילית' },
      items: ['restorative-sleep','tune-up'],
    },
  ];

  /* ─── State ───────────────────────────────── */
  let stylesInjected = false;

  /* ─── Helpers ─────────────────────────────── */
  function injectStyles() {
    if (stylesInjected || document.getElementById('hp-module-css')) return;
    const el = document.createElement('style');
    el.id = 'hp-module-css';
    el.textContent = CSS;
    document.head.appendChild(el);
    stylesInjected = true;
  }

  function t(obj) {
    return (typeof obj === 'string') ? obj : (obj[window.currentLang] || obj.en);
  }

  function prog(id) {
    return PROGRAMS.find(p => p.id === id);
  }

  // localStorage key for today's stack state
  function stackKey() {
    return 'hplus_stack_' + new Date().toISOString().slice(0, 10);
  }

  function getStackState() {
    const raw = localStorage.getItem(stackKey());
    return raw ? JSON.parse(raw) : {};
  }

  function setStackItem(blockKey, itemId, checked) {
    const state = getStackState();
    if (!state[blockKey]) state[blockKey] = {};
    state[blockKey][itemId] = checked;
    localStorage.setItem(stackKey(), JSON.stringify(state));
  }

  function isBlockDone(blockKey) {
    const state = getStackState();
    const block = STACK.find(b => b.key === blockKey);
    if (!block) return false;
    return block.items.every(id => state[blockKey] && state[blockKey][id]);
  }

  /* ─── Nav badge logic (called from index.html) ── */
  function shouldShowReminder() {
    return !isBlockDone('morning');
  }

  /* ─── Tab switching ───────────────────────── */
  function showTab(name) {
    document.querySelectorAll('.hp-pane').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.hp-tab-btn').forEach(b => b.classList.remove('active'));
    const pane = document.getElementById('hp-pane-' + name);
    const btn  = document.getElementById('hp-tab-' + name);
    if (pane) pane.classList.add('active');
    if (btn)  btn.classList.add('active');
  }

  /* ─── Now tab ─────────────────────────────── */
  function buildNowTab() {
    const chips = SITUATIONS.map((s, i) => `
      <div class="hp-sit-chip" id="hp-sit-${i}" onclick="HPlusModule._selectSit(${i})">
        <div class="hp-sit-icon">${s.icon}</div>
        <div class="hp-sit-label">${t(s.label)}</div>
      </div>`).join('');

    return `
      <div style="font-size:13px;color:#707070;margin-bottom:14px;line-height:1.5">
        ${t({en:'Tap a situation to get the right H+ command for this moment.', he:'לחץ על מצב כדי לקבל את פקודת H+ הנכונה לרגע זה.'})}
      </div>
      <div class="hp-sit-grid">${chips}</div>
      <div id="hp-cmd-result">
        <div style="background:#242424;border:1px dashed #3a3a3a;border-radius:10px;padding:28px;text-align:center;color:#707070;font-size:13px;">
          ${t({en:'Select a situation above', he:'בחר מצב למעלה'})}
        </div>
      </div>`;
  }

  function selectSit(i) {
    document.querySelectorAll('.hp-sit-chip').forEach(c => c.classList.remove('active'));
    const chip = document.getElementById('hp-sit-' + i);
    if (chip) chip.classList.add('active');

    const sit = SITUATIONS[i];
    const p   = prog(sit.primary);
    const also = sit.also ? prog(sit.also) : null;

    document.getElementById('hp-cmd-result').innerHTML = `
      <div class="hp-cmd-card">
        <div class="hp-cmd-header">
          <div class="hp-cmd-program">${p.name}</div>
          <div class="hp-cmd-words" dir="ltr">${p.command}</div>
        </div>
        <div class="hp-cmd-desc">${t(p.purpose)}</div>
        <div class="hp-cmd-weld-tip">🔧 ${t(sit.weldTip)}</div>
        ${p.companions.length ? `
          <div class="hp-cmd-companions">
            <strong>${t({en:'Also use with:', he:'השתמש גם עם:'})}</strong> ${p.companions.join(' · ')}
          </div>` : ''}
        ${also ? `
          <div style="padding:0 18px 14px;">
            <span style="font-size:11px;color:#707070;">${t({en:'Also try:', he:'נסה גם:'})}</span><br>
            <span class="hp-also-chip" onclick="HPlusModule._showProgCard('${also.id}')" dir="ltr">${also.command}</span>
            <span style="font-size:11px;color:#555;margin-inline-start:6px;">${also.name}</span>
          </div>` : ''}
      </div>`;
  }

  function showProgCard(id) {
    const p = prog(id);
    if (!p) return;
    document.getElementById('hp-cmd-result').innerHTML = `
      <div class="hp-cmd-card">
        <div class="hp-cmd-header">
          <div class="hp-cmd-program">${p.name}</div>
          <div class="hp-cmd-words" dir="ltr">${p.command}</div>
        </div>
        <div class="hp-cmd-desc">${t(p.purpose)}</div>
        ${p.companions.length ? `
          <div class="hp-cmd-companions">
            <strong>${t({en:'Also use with:', he:'השתמש גם עם:'})}</strong> ${p.companions.join(' · ')}
          </div>` : ''}
      </div>`;
  }

  /* ─── Daily Stack tab ─────────────────────── */
  function buildStackTab() {
    const state = getStackState();

    const blocks = STACK.map(block => {
      const allDone = isBlockDone(block.key);
      const items = block.items.map(id => {
        const p = prog(id);
        const checked = state[block.key] && state[block.key][id];
        return `
          <div class="hp-stack-item${checked ? ' checked' : ''}" id="hp-si-${block.key}-${id}"
               onclick="HPlusModule._toggleStack('${block.key}','${id}')">
            <div class="hp-stack-check">${checked ? '✓' : ''}</div>
            <div>
              <div class="hp-stack-item-name">${p.name}</div>
              <div class="hp-stack-item-cmd" dir="ltr">${p.command}</div>
            </div>
          </div>`;
      }).join('');

      return `
        <div class="hp-stack-block" id="hp-block-${block.key}">
          <div class="hp-stack-block-hdr">
            <span class="hp-stack-block-icon">${block.icon}</span>
            <div>
              <div class="hp-stack-block-title">${t(block.label)}</div>
              <div class="hp-stack-block-sub">${t(block.sub)}</div>
            </div>
            <div class="hp-stack-done-pill" id="hp-done-pill-${block.key}" style="${allDone ? 'display:block' : ''}">
              ${t({en:'Done', he:'הושלם'})} ✓
            </div>
          </div>
          <div class="hp-stack-items">${items}</div>
        </div>`;
    }).join('');

    return `
      <div style="font-size:13px;color:#707070;margin-bottom:14px;line-height:1.5">
        ${t({en:'Check off each program as you complete it. Resets at midnight.', he:'סמן כל תוכנית כשמסיים. מתאפס בחצות.'})}
      </div>
      ${blocks}`;
  }

  function toggleStack(blockKey, itemId) {
    const state = getStackState();
    const cur = state[blockKey] && state[blockKey][itemId];
    setStackItem(blockKey, itemId, !cur);

    // Update item UI
    const el = document.getElementById(`hp-si-${blockKey}-${itemId}`);
    if (el) {
      el.classList.toggle('checked', !cur);
      el.querySelector('.hp-stack-check').textContent = !cur ? '✓' : '';
    }

    // Update done pill
    const pill = document.getElementById(`hp-done-pill-${blockKey}`);
    if (pill) pill.style.display = isBlockDone(blockKey) ? 'block' : 'none';
  }

  /* ─── Index tab ───────────────────────────── */
  function buildIndexTab() {
    const cards = renderIndexCards(PROGRAMS);
    return `
      <div class="hp-index-search-wrap">
        <span class="hp-index-search-icon">🔍</span>
        <input class="hp-index-search" type="text"
               placeholder="${t({en:'Search programs or commands…', he:'חיפוש תוכניות או פקודות…'})}"
               oninput="HPlusModule._filterIndex(this.value)">
      </div>
      <div class="hp-index-list" id="hp-index-list">${cards}</div>`;
  }

  function renderIndexCards(list) {
    return list.map(p => `
      <div class="hp-index-card">
        <div class="hp-index-card-name">${p.name}</div>
        <div class="hp-index-card-cmd" dir="ltr">${p.command}</div>
        <div class="hp-index-card-purpose">${t(p.purpose)}</div>
        ${p.companions.length ? `<div class="hp-index-card-comp">${t({en:'With:', he:'עם:'})} ${p.companions.join(' · ')}</div>` : ''}
      </div>`).join('');
  }

  function filterIndex(val) {
    const q = (val || '').toLowerCase();
    const list = document.getElementById('hp-index-list');
    if (!list) return;
    const filtered = q
      ? PROGRAMS.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.command.toLowerCase().includes(q) ||
          (p.purpose.en || '').toLowerCase().includes(q) ||
          (p.purpose.he || '').includes(q))
      : PROGRAMS;
    list.innerHTML = filtered.length
      ? renderIndexCards(filtered)
      : `<div class="hp-no-results">${t({en:'No matches found.', he:'לא נמצאו תוצאות.'})}</div>`;
  }

  /* ─── Public API ──────────────────────────── */
  return {
    render() {
      injectStyles();
      document.getElementById('main-content').innerHTML = `
      <div class="hp-wrap fade-up">
        <div class="page-header">
          <div class="page-title">H-<span>Plus</span></div>
          <div class="page-sub">${t({en:'Human performance · Monroe Institute H+ programs', he:'ביצועים אנושיים · תוכניות H+ של מכון מונרו'})}</div>
        </div>

        <nav class="hp-tab-nav">
          <button class="hp-tab-btn active" id="hp-tab-now"   onclick="HPlusModule._showTab('now')">${t({en:'Now', he:'עכשיו'})}</button>
          <button class="hp-tab-btn"        id="hp-tab-stack" onclick="HPlusModule._showTab('stack')">${t({en:'Daily Stack', he:'מחסנית יומית'})}</button>
          <button class="hp-tab-btn"        id="hp-tab-index" onclick="HPlusModule._showTab('index')">${t({en:'Index', he:'מדריך'})}</button>
        </nav>

        <div id="hp-pane-now"   class="hp-pane active">${buildNowTab()}</div>
        <div id="hp-pane-stack" class="hp-pane">${buildStackTab()}</div>
        <div id="hp-pane-index" class="hp-pane">${buildIndexTab()}</div>
      </div>`;
    },

    shouldShowReminder,

    // Exposed for inline handlers
    _showTab:     showTab,
    _selectSit:   selectSit,
    _showProgCard: showProgCard,
    _toggleStack:  toggleStack,
    _filterIndex:  filterIndex,
  };
})();
```

- [ ] **Step 2: Verify H-Plus module**

Open browser → H-Plus (via sidebar or home card):
- "Now" tab shows 10 situation chips in 2-column grid
- Tapping "About to do precision weld" shows PLUS-SMOOTH, FAST in large red text
- Command words are always in English (LTR) even if app is in Hebrew
- "Daily Stack" tab shows 3 blocks with checkboxes — ticking one persists on refresh
- "Index" tab shows all 37 programs, search filters correctly
- Nav badge (!) appears in sidebar if morning stack is incomplete

- [ ] **Step 3: Commit**

```bash
git add modules/hplus.js
git commit -m "Rewrite H-Plus module as Monroe Institute human performance tool"
```

---

## Task 5: Add t() helper + Translate index.html (Nav + Home)

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add global t() helper after the existing script block opens**

Find the line `<script>` that starts the router block in `index.html`. Add this function at the very top of that script block:

```js
// ─── Bilingual helper ───────────────────────
function t(en, he) {
  return currentLang === 'he' ? he : en;
}
```

- [ ] **Step 2: Translate sidebar nav labels**

Replace all `<span class="nav-label">...</span>` in the sidebar:
```html
<a class="nav-item" data-module="electrodes" onclick="navigate('electrodes')">
  <span class="nav-icon">🔥</span><span class="nav-label" id="nav-electrodes">Electrodes</span>
</a>
<a class="nav-item" data-module="compare" onclick="navigate('compare')">
  <span class="nav-icon">⊗</span><span class="nav-label" id="nav-compare">Compare</span>
</a>
<a class="nav-item" data-module="machines" onclick="navigate('machines')">
  <span class="nav-icon">⚙</span><span class="nav-label" id="nav-machines">Machines</span>
</a>
<a class="nav-item" data-module="metals" onclick="navigate('metals')">
  <span class="nav-icon">🔩</span><span class="nav-label" id="nav-metals">Metal Types</span>
</a>
<a class="nav-item" data-module="settings" onclick="navigate('settings')">
  <span class="nav-icon">⚡</span><span class="nav-label" id="nav-settings">Weld Settings</span>
</a>
<a class="nav-item" data-module="tip" onclick="navigate('tip')">
  <span class="nav-icon">💡</span><span class="nav-label" id="nav-tip">Daily Tip</span>
</a>
<a class="nav-item" data-module="hplus" onclick="navigate('hplus')">
  <span class="nav-icon">🧠</span><span class="nav-label" id="nav-hplus">H-Plus</span>
</a>
<a class="nav-item" data-module="checklist" onclick="navigate('checklist')">
  <span class="nav-icon">✅</span><span class="nav-label" id="nav-checklist">Checklist</span>
</a>
<a class="nav-item" data-module="repairs" onclick="navigate('repairs')">
  <span class="nav-icon">📋</span><span class="nav-label" id="nav-repairs">Repairs</span>
</a>
```

Note: the sidebar icon for H-Plus changes from 🛢 to 🧠 (brain/performance instead of oil drum).

- [ ] **Step 3: Update nav section labels**

Replace static section labels in the sidebar:
```html
<div class="nav-section-label" id="nav-sec-reference">Reference</div>
...
<div class="nav-section-label" id="nav-sec-daily">Daily Tools</div>
...
<div class="nav-section-label" id="nav-sec-records">Records</div>
```

- [ ] **Step 4: Add updateNavLabels() function and call it on language toggle**

Add this function to the script block:
```js
function updateNavLabels() {
  const labels = {
    'nav-electrodes': t('Electrodes',   'אלקטרודות'),
    'nav-compare':    t('Compare',      'השוואה'),
    'nav-machines':   t('Machines',     'מכונות'),
    'nav-metals':     t('Metal Types',  'סוגי מתכת'),
    'nav-settings':   t('Weld Settings','הגדרות ריתוך'),
    'nav-tip':        t('Daily Tip',    'טיפ יומי'),
    'nav-hplus':      t('H-Plus',       'H-Plus'),
    'nav-checklist':  t('Checklist',    'צ\'קליסט'),
    'nav-repairs':    t('Repairs',      'תיקונים'),
    'nav-sec-reference': t('Reference', 'עיון'),
    'nav-sec-daily':     t('Daily Tools','כלים יומיים'),
    'nav-sec-records':   t('Records',   'רשומות'),
  };
  Object.entries(labels).forEach(([id, text]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  });
}
```

In `toggleLang()`, add a call to `updateNavLabels()` at the end:
```js
function toggleLang() {
  currentLang = currentLang === 'en' ? 'he' : 'en';
  localStorage.setItem('weldref_lang', currentLang);
  const btn = document.getElementById('lang-label');
  if (btn) btn.textContent = currentLang === 'en' ? '🇮🇱 עברית' : '🇬🇧 English';
  document.documentElement.lang = currentLang === 'he' ? 'he' : 'en';
  document.documentElement.dir  = currentLang === 'he' ? 'rtl' : 'ltr';
  updateNavLabels();
  navigate(currentModule);
}
```

Also call `updateNavLabels()` in `DOMContentLoaded` (after existing setup):
```js
document.addEventListener('DOMContentLoaded', () => {
  // ... existing code ...
  updateNavLabels();
  // ... rest of existing code ...
});
```

- [ ] **Step 5: Translate MODULE_TITLES**

Replace the `MODULE_TITLES` object so it pulls from `t()`:
```js
function getModuleTitle(mod) {
  const titles = {
    home:       t('WeldRef',       'WeldRef'),
    electrodes: t('Electrodes',    'אלקטרודות'),
    compare:    t('Compare',       'השוואה'),
    machines:   t('Machines',      'מכונות'),
    metals:     t('Metal Types',   'סוגי מתכת'),
    settings:   t('Weld Settings', 'הגדרות ריתוך'),
    tip:        t('Daily Tip',     'טיפ יומי'),
    hplus:      t('H-Plus',        'H-Plus'),
    checklist:  t('Checklist',     'צ\'קליסט'),
    repairs:    t('Repair Log',    'יומן תיקונים'),
  };
  return titles[mod] || 'WeldRef';
}
```

Replace the line `document.getElementById('topbar-title').textContent = MODULE_TITLES[mod] || 'WeldRef';` with:
```js
document.getElementById('topbar-title').textContent = getModuleTitle(mod);
```

Remove the old static `MODULE_TITLES` object.

- [ ] **Step 6: Translate renderHome()**

Replace the entire `renderHome()` function body with:
```js
function renderHome() {
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const todayHe = new Date().toLocaleDateString('he-IL', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const tip = TipModule.getTodaysTip();
  const cl  = ChecklistModule.getSummary();

  document.getElementById('main-content').innerHTML = `
  <div class="home-page fade-up">
    <div class="home-header">
      <div class="home-brand">
        <span class="logo-tag">⚡ ${t('Welding Reference','עיון בריתוך')}</span>
        <h1>Weld<span>Ref</span></h1>
        <p class="home-date">${currentLang === 'he' ? todayHe : today}</p>
      </div>
    </div>

    <div class="home-grid">
      <div class="home-card tip-card" onclick="navigate('tip')">
        <div class="home-card-label">💡 ${t('Daily Tip','טיפ יומי')}</div>
        <div class="home-card-content">${tip}</div>
      </div>
      <div class="home-card checklist-card" onclick="navigate('checklist')">
        <div class="home-card-label">✅ ${t("End-of-Day Checklist","צ'קליסט סוף יום")}</div>
        <div class="home-card-content">
          <div class="checklist-mini-progress">
            <div class="progress-bar">
              <div class="progress-fill" style="width:${cl.percent}%"></div>
            </div>
            <span style="font-size:13px;color:var(--muted);">${cl.done}/${cl.total}</span>
          </div>
          <div style="font-size:12px;color:var(--muted);margin-top:6px;">
            ${cl.done === cl.total
              ? `<span style="color:var(--green);">✓ ${t('All done!','הכל הושלם!')}</span>`
              : `${cl.total - cl.done} ${t('item' + ((cl.total - cl.done) !== 1 ? 's' : '') + ' remaining', 'פריטים נותרו')}`
            }
          </div>
        </div>
      </div>
    </div>

    <div class="quick-access-label">${t('Quick Access','גישה מהירה')}</div>
    <div class="module-grid">
      <div class="module-card" onclick="navigate('electrodes')">
        <span class="module-icon">🔥</span>
        <div class="module-name">${t('Electrodes','אלקטרודות')}</div>
        <div class="module-desc">SMAW · MIG · TIG · FCAW</div>
      </div>
      <div class="module-card" onclick="navigate('machines')">
        <span class="module-icon">⚙</span>
        <div class="module-name">${t('Machines','מכונות')}</div>
        <div class="module-desc">Helvi · Jasic · Kemppi · BTT</div>
      </div>
      <div class="module-card" onclick="navigate('settings')">
        <span class="module-icon">⚡</span>
        <div class="module-name">${t('Weld Settings','הגדרות ריתוך')}</div>
        <div class="module-desc">${t('Amps · Hot Start · Arc Force','אמפר · הדלקה · כוח קשת')}</div>
      </div>
      <div class="module-card" onclick="navigate('metals')">
        <span class="module-icon">🔩</span>
        <div class="module-name">${t('Metal Types','סוגי מתכת')}</div>
        <div class="module-desc">${t('Wirtgen · Skid Loaders · Fab','וירטגן · עגלות · מסגרייה')}</div>
      </div>
      <div class="module-card" onclick="navigate('hplus')">
        <span class="module-icon">🧠</span>
        <div class="module-name">H-Plus</div>
        <div class="module-desc">${t('Human performance · Monroe','ביצועים אנושיים · מונרו')}</div>
      </div>
      <div class="module-card" onclick="navigate('repairs')">
        <span class="module-icon">📋</span>
        <div class="module-name">${t('Repair Log','יומן תיקונים')}</div>
        <div class="module-desc">${t('Track your welds','מעקב ריתוכים')}</div>
      </div>
    </div>
  </div>`;
}
```

- [ ] **Step 7: Verify**

Open browser. Toggle to Hebrew:
- Sidebar nav labels switch to Hebrew with RTL layout
- Home page grid cards show Hebrew names
- Date shows Hebrew format
- Toggle back to English — all returns to English correctly

- [ ] **Step 8: Commit**

```bash
git add index.html
git commit -m "Add t() helper, translate nav and home page to Hebrew with RTL"
```

---

## Task 6: Translate machines.js

**Files:**
- Modify: `modules/machines.js`

- [ ] **Step 1: Add t() usage to render() and machineCard()**

Replace the `render()` method:
```js
render() {
  document.getElementById('main-content').innerHTML = `
  <div class="fade-up" style="max-width:1060px;">
    <div class="page-header">
      <div class="page-title">${t('Machine','מכונות')} <span>${t('Reference','עיון')}</span></div>
      <div class="page-sub">${t('Specs, settings, and notes for your welding machines','מפרטים, הגדרות והערות למכונות הריתוך שלך')}</div>
    </div>
    <div class="machine-grid">
      ${this.DB.map(m => this.machineCard(m)).join('')}
    </div>
    <div class="module-footer">${t('Specs are reference values. Verify with machine manuals. Duty cycle varies with ambient temperature.','הערכים הם לעיון בלבד. אמת עם מדריכי המכונה. מחזור עבודה משתנה עם טמפרטורת הסביבה.')}</div>
  </div>`;
},
```

- [ ] **Step 2: Translate spec labels in each machine's DB entry**

The spec labels (e.g. "Input Voltage", "Welding Current") are in the `specs` array of each machine. Replace each machine's `specs` array so labels use `t()`. Since these are static data (not inside a function), the cleanest approach is to make `specs` a function or move label translation to `machineCard()`.

In `machineCard()`, update the spec row rendering to translate known labels:
```js
const specLabelMap = {
  'Input Voltage':     t('Input Voltage',    'מתח כניסה'),
  'Input Current':     t('Input Current',    'זרם כניסה'),
  'Welding Current':   t('Welding Current',  'זרם ריתוך'),
  'Cutting Current':   t('Cutting Current',  'זרם חיתוך'),
  'Duty Cycle':        t('Duty Cycle',       'מחזור עבודה'),
  'OCV':               t('OCV',              'מתח פתיחה'),
  'Weight':            t('Weight',           'משקל'),
  'IP Rating':         t('IP Rating',        'דירוג IP'),
  'Wire Diameter':     t('Wire Diameter',    'קוטר תיל'),
  'Max Electrode':     t('Max Electrode',    'אלקטרודה מקסימלית'),
  'Required Fuse':     t('Required Fuse',    'נתיך נדרש'),
  'Generator':         t('Generator compatible', 'תאימות גנרטור'),
  'Max Cut (mild steel)': t('Max Cut (mild steel)', 'חיתוך מקסימלי (פלדה)'),
  'Air Pressure':      t('Air Pressure',     'לחץ אוויר'),
  'Air Flow':          t('Air Flow',         'ספיקת אוויר'),
};
```

Then inside the spec row map:
```js
${m.specs.map(s => `
  <div class="machine-spec-row">
    <span class="spec-label">${specLabelMap[s.label] || s.label}</span>
    <span class="spec-value" dir="ltr">${s.value}</span>
  </div>
`).join('')}
```

- [ ] **Step 3: Translate setting key names in machineCard()**

Replace the settings key transform:
```js
const settingKeyMap = {
  hotStart:      t('Hot Start',       'הדלקה חמה'),
  arcForce:      t('Arc Force',       'כוח קשת'),
  wire:          t('Wire',            'תיל'),
  gas:           t('Gas',             'גז'),
  pressure:      t('Pressure',        'לחץ'),
  cuttingHeight: t('Cut Height',      'גובה חיתוך'),
  speed:         t('Cut Speed',       'מהירות חיתוך'),
  note:          t('Note',            'הערה'),
};

const settingRows = Object.entries(m.settings || {}).map(([k, v]) =>
  `<div class="machine-spec-row">
    <span class="spec-label">${settingKeyMap[k] || k}</span>
    <span class="spec-value" dir="ltr" style="font-size:12px;">${v}</span>
  </div>`
).join('');
```

- [ ] **Step 4: Translate section headers inside machineCard()**

```js
// "Quick Settings" header
`<div style="font-size:9px;…color:var(--accent)…">${t('Quick Settings','הגדרות מהירות')}</div>`

// "Notes" header
`<div style="font-size:9px;…color:var(--muted)…">${t('Notes','הערות')}</div>`
```

- [ ] **Step 5: Verify**

Toggle Hebrew → Machines module. Check:
- Page title in Hebrew
- Spec labels in Hebrew, values remain LTR (numbers/voltages)
- Quick Settings and Notes headers in Hebrew
- Toggle back to English — all correct

- [ ] **Step 6: Commit**

```bash
git add modules/machines.js
git commit -m "Add Hebrew translations to Machines module"
```

---

## Task 7: Translate settings.js

**Files:**
- Modify: `modules/settings.js`

- [ ] **Step 1: Translate repair type names**

Add a bilingual repair type map. Replace the `REPAIR_TYPES` array with an object array:
```js
REPAIR_TYPES: [
  { en: 'Structural steel (general)',           he: 'פלדה מבנית (כללי)' },
  { en: 'Structural steel (critical / thick)',  he: 'פלדה מבנית (קריטי / עבה)' },
  { en: 'Hardox / wear plate',                  he: 'Hardox / לוח בלאי' },
  { en: 'Tooth holder repair (Wirtgen)',        he: 'תיקון מחזיק שן (וירטגן)' },
  { en: 'Drum frame repair (Wirtgen)',          he: 'תיקון מסגרת תוף (וירטגן)' },
  { en: 'Skid loader frame repair',             he: 'תיקון מסגרת עגלה' },
  { en: 'Skid loader bucket repair',            he: 'תיקון דלי עגלה' },
  { en: 'Fillet weld (light)',                  he: 'ריתוך פינה (קל)' },
  { en: 'Root pass (pipe / tube)',              he: 'מעבר שורש (צינור)' },
  { en: 'Stainless steel 304/316',              he: 'נירוסטה 304/316' },
  { en: 'Carbon to stainless (dissimilar)',     he: 'פחמן לנירוסטה (מתכות שונות)' },
  { en: 'Aluminum 6061',                        he: 'אלומיניום 6061' },
  { en: 'Cast iron repair',                     he: 'תיקון ברזל יצוק' },
  { en: 'Hard-facing overlay',                  he: 'ציפוי הקשחה' },
  { en: 'Thin sheet (< 3mm)',                   he: 'פח דק (> 3 מ"מ)' },
],
```

The `SETTINGS_DB` keys stay in English (they are looked up by the English key). The dropdown renders translated labels but submits the English value for lookup.

- [ ] **Step 2: Translate render() method**

Replace `render()`:
```js
render() {
  document.getElementById('main-content').innerHTML = `
  <div class="fade-up" style="max-width:860px;">
    <div class="page-header">
      <div class="page-title">${t('Weld','ריתוך')} <span>${t('Settings','הגדרות')}</span></div>
      <div class="page-sub">${t('Recommended electrode, amperage, Hot Start, and Arc Force by machine and repair type','אלקטרודה מומלצת, אמפרג, הדלקה חמה וכוח קשת לפי מכונה וסוג תיקון')}</div>
    </div>

    <div class="settings-selectors">
      <div class="form-row">
        <label class="form-label">${t('Machine','מכונה')}</label>
        <select id="st-machine" onchange="SettingsModule.update()">
          <option value="">— ${t('Select Machine','בחר מכונה')} —</option>
          ${this.MACHINES.map(m => `<option value="${m.id}">${m.name} (${m.type})</option>`).join('')}
        </select>
      </div>
      <div class="form-row">
        <label class="form-label">${t('Repair / Joint Type','סוג תיקון / חיבור')}</label>
        <select id="st-repair" onchange="SettingsModule.update()">
          <option value="">— ${t('Select Repair Type','בחר סוג תיקון')} —</option>
          ${this.REPAIR_TYPES.map(r => `<option value="${r.en}">${t(r.en, r.he)}</option>`).join('')}
        </select>
      </div>
    </div>

    <div id="st-result">
      <div class="empty-state"><div class="big">⚡</div><p>${t('Select a machine and repair type to see recommended settings.','בחר מכונה וסוג תיקון כדי לראות הגדרות מומלצות.')}</p></div>
    </div>

    <div class="module-footer">${t("Settings are starting-point recommendations. Always test on scrap first. Actual settings vary with electrode brand, material condition, and position.","ההגדרות הן המלצות נקודת פתיחה. תמיד בדוק על גרוטאה קודם. ההגדרות בפועל משתנות לפי מותג האלקטרודה, מצב החומר והמיקום.")}</div>
  </div>`;
},
```

- [ ] **Step 3: Translate update() result labels**

In the `update()` method, translate the `params` labels array:
```js
const params = [
  { label: t('Electrode / Wire','אלקטרודה / תיל'), value: s.electrode, unit: '' },
  { label: t('Diameter','קוטר'),                   value: s.diameter,  unit: '' },
  { label: t('Amperage Range','טווח אמפרג'),        value: s.ampRange,  unit: 'A' },
  { label: t('Hot Start','הדלקה חמה'),              value: s.hotStart || '—', unit: '' },
  { label: t('Arc Force','כוח קשת'),                value: s.arcForce || '—', unit: '' },
];
if (s.gas) params.push({ label: t('Gas / Flow','גז / ספיקה'), value: s.gas, unit: '' });
```

Also wrap the result header:
```js
<div class="settings-result-machine">${machine.name}</div>
<div class="settings-result-type">${t(repairType, this.REPAIR_TYPES.find(r=>r.en===repairType)?.he || repairType)}</div>
```

And the Notes label:
```js
<div style="…">${t('Notes','הערות')}</div>
```

- [ ] **Step 4: Wrap numeric values in dir="ltr"**

In the `update()` method result rendering, add `dir="ltr"` to the param value span:
```js
<div class="settings-param-value" dir="ltr" style="font-size:${p.value.length > 10 ? '18px' : '26px'}">${p.value}</div>
```

- [ ] **Step 5: Verify**

Toggle Hebrew → Weld Settings. Check:
- Page title, dropdowns, and labels in Hebrew
- Repair type dropdown shows Hebrew names
- Selecting Helvi + "פלדה מבנית (כללי)" shows result with Hebrew labels and LTR values
- Notes section header in Hebrew

- [ ] **Step 6: Commit**

```bash
git add modules/settings.js
git commit -m "Add Hebrew translations to Weld Settings module"
```

---

## Task 8: Translate checklist.js and repairs.js

**Files:**
- Modify: `modules/checklist.js`
- Modify: `modules/repairs.js`

- [ ] **Step 1: Translate checklist.js ITEMS labels and notes**

The `ITEMS` array needs bilingual labels. Replace:
```js
ITEMS: [
  { id:'batteries', label:{en:'Charge Batteries',           he:'טעינת סוללות'},          icon:'🔋', note:{en:'All battery-powered tools on charge',              he:'כל הכלים הסוללתיים בטעינה'} },
  { id:'cart',      label:{en:'Fold & Organize Welding Cart',he:'קיפול וסידור עגלת ריתוך'},icon:'🛒', note:{en:'Cart folded, cables coiled, in position',          he:'עגלה מקופלת, כבלים מגולגלים, במקום'} },
  { id:'machines',  label:{en:'Organize Welding Machines',  he:'סידור מכונות ריתוך'},     icon:'⚙️',  note:{en:'Machines stored, cables stowed',                   he:'מכונות מאוחסנות, כבלים מסודרים'} },
  { id:'generator', label:{en:'Close Generator Switch 24',  he:'סגירת מתג גנרטור 24'},    icon:'⚡',  note:{en:'Verify switch 24 is OFF',                          he:'ודא שמתג 24 כבוי'} },
  { id:'oven',      label:{en:'Fill Electrode Drying Oven', he:'מילוי תנור ייבוש אלקטרודות'},icon:'🔥',note:{en:'Restock oven with 7018 / 8018 for tomorrow',     he:'חדש את התנור עם 7018 / 8018 למחר'} },
],
```

- [ ] **Step 2: Update checklist render() to use bilingual labels**

In `render()`, update the date line and title:
```js
const today   = new Date().toLocaleDateString('en-GB', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
const todayHe = new Date().toLocaleDateString('he-IL', { weekday:'long', year:'numeric', month:'long', day:'numeric' });

// In HTML:
<div class="page-title">${t('End-of-Day','סוף יום')} <span>${t('Checklist',"צ'קליסט")}</span></div>
<div class="page-sub">${t('Resets automatically at midnight · State saved locally','מתאפס אוטומטית בחצות · מצב שמור מקומית')}</div>
<div class="checklist-date">${currentLang === 'he' ? todayHe : today}</div>
```

Update the progress label in `updateUI()`:
```js
if (lbl) lbl.textContent = `${summary.done} / ${this.ITEMS.length} ${t('complete','הושלם')}`;
```

Update item rendering to use bilingual label:
```js
${this.ITEMS.map(item => {
  const done = !!state[item.id];
  const label = t(item.label.en, item.label.he);
  const note  = t(item.note.en,  item.note.he);
  return `
    <div class="checklist-item ${done ? 'done' : ''}" id="cl-item-${item.id}"
         onclick="ChecklistModule.toggle('${item.id}')">
      <div class="cl-checkbox" id="cl-box-${item.id}">${done ? '✓' : ''}</div>
      <div class="cl-text">
        <span class="cl-icon">${item.icon}</span>
        <span class="cl-label">${label}</span>
        <span class="cl-note">${note}</span>
      </div>
    </div>`;
}).join('')}
```

- [ ] **Step 3: Translate repairs.js render() form labels**

In `repairs.js` `render()`, translate form labels and table headers:
```js
// Page title
<div class="page-title">${t('Repair','תיקון')} <span>${t('Log','יומן')}</span></div>
<div class="page-sub">${repairs.length} ${t('repair' + (repairs.length !== 1 ? 's' : '') + ' logged · Stored locally', 'תיקונים מתועדים · שמור מקומית')}</div>

// Form title
<div class="form-title">${t('Log New Repair','תעד תיקון חדש')}</div>

// Labels
<label class="form-label">${t('Date','תאריך')}</label>
<label class="form-label">${t('Machine','מכונה')}</label>
<label class="form-label">${t('Repair Type','סוג תיקון')}</label>
<label class="form-label">${t('Electrode Used','אלקטרודה בשימוש')}</label>
<label class="form-label">${t('Notes','הערות')}</label>

// Submit button
<button … >${t('Save Repair','שמור תיקון')}</button>

// Table headers
<th>${t('Date','תאריך')}</th>
<th>${t('Machine','מכונה')}</th>
<th>${t('Type','סוג')}</th>
<th>${t('Electrode','אלקטרודה')}</th>
<th>${t('Notes','הערות')}</th>
<th></th>
```

Also translate the REPAIR_TYPES list in repairs.js to bilingual:
```js
REPAIR_TYPES: [
  { en:'Crack repair',       he:'תיקון סדק' },
  { en:'Broken tooth holder',he:'מחזיק שן שבור' },
  { en:'Worn drum shell',    he:'קליפת תוף שחוקה' },
  { en:'Frame crack',        he:'סדק במסגרת' },
  { en:'Bucket repair',      he:'תיקון דלי' },
  { en:'Structural weld',    he:'ריתוך מבני' },
  { en:'Hard-facing',        he:'הקשחה' },
  { en:'Hydraulic bracket',  he:'סוגר הידראולי' },
  { en:'Root pass',          he:'מעבר שורש' },
  { en:'Sheet metal',        he:'פח' },
  { en:'Cast iron repair',   he:'תיקון ברזל יצוק' },
  { en:'Stainless repair',   he:'תיקון נירוסטה' },
  { en:'Other',              he:'אחר' },
],
```

Render the select options with translated labels:
```js
${this.REPAIR_TYPES.map(r => `<option value="${r.en}">${t(r.en, r.he)}</option>`).join('')}
```

- [ ] **Step 4: Verify**

Toggle Hebrew → Checklist:
- Title, date, and items in Hebrew
- Progress label in Hebrew
- Toggle → Repairs form: labels in Hebrew, repair types in Hebrew

- [ ] **Step 5: Commit**

```bash
git add modules/checklist.js modules/repairs.js
git commit -m "Add Hebrew translations to Checklist and Repairs modules"
```

---

## Task 9: Translate tip.js, compare.js, electrodes.js

**Files:**
- Modify: `modules/tip.js`
- Modify: `modules/compare.js`
- Modify: `modules/electrodes.js`

**Note:** Tip content, electrode data (names, specs, descriptions), and electrode codes stay in English — these are technical references. Only UI chrome (page titles, labels, buttons, section headers) is translated.

- [ ] **Step 1: Translate tip.js render()**

In `render()`:
```js
<div class="page-title">${t('Daily','יומי')} <span>${t('Tip','טיפ')}</span></div>
<div class="page-sub">${t('A new welding tip each day','טיפ ריתוך חדש בכל יום')}</div>

// Category badge label stays English (it's a technical category)

// Navigation buttons
<button … onclick="TipModule.prev()">← ${t('Prev','הקודם')}</button>
<button … onclick="TipModule.next()">${t('Next','הבא')} →</button>

// Footer
<div class="module-footer">${t('Tips rotate daily based on date.','הטיפים מתחלפים יומית לפי תאריך.')}</div>
```

- [ ] **Step 2: Translate compare.js render()**

```js
<div class="page-title">${t('Electrode','אלקטרודה')} <span>${t('Compare','השוואה')}</span></div>
<div class="page-sub">${t('Side-by-side comparison of up to 4 electrodes across all processes','השוואה צד-לצד של עד 4 אלקטרודות בכל התהליכים')}</div>

<div class="form-title">${t('Select Electrodes to Compare','בחר אלקטרודות להשוואה')}</div>
<label class="form-label">${t('Electrode','אלקטרודה')} ${idx + 1}</label>

// Buttons
<button … >⊗ ${t('Compare','השווה')}</button>
<button … >✕ ${t('Clear','נקה')}</button>

// Empty state
<p>${t('Select at least 2 electrodes above to compare.','בחר לפחות 2 אלקטרודות למעלה להשוואה.')}</p>

// Footer
<div class="module-footer">${t('Always verify specifications with manufacturer datasheets','תמיד אמת מפרטים עם גיליוני נתוני היצרן')} · AWS A5.1 / A5.5 / A5.18 / A5.9 / A5.10 / A5.20 / A5.22</div>
```

- [ ] **Step 3: Translate electrodes.js UI chrome**

In the `render()` method of ElectrodesModule:
```js
// Home page
<div class="page-title">${t('Filler Metal','מתכת מילוי')} <span>${t('Database','מאגר')}</span></div>
<div class="page-sub">SMAW · MIG / GMAW · TIG / GTAW · FCAW — AWS A5.1 / A5.5 / A5.18 / A5.9 / A5.10 / A5.20 / A5.22</div>

// Process cards (labels only — technical names stay English)
<div class="process-desc">${t('Stick welding with coated electrodes. Versatile, portable, works on dirty or rusty metal.','ריתוך מוט עם אלקטרודות מצופות. גמיש, נייד, עובד על מתכת מלוכלכת או מחולידה.')}</div>
<div class="process-desc">${t('Wire-feed welding with shielding gas. Fast, clean, ideal for production and light fabrication.','ריתוך הזנת תיל עם גז מגן. מהיר, נקי, אידיאלי לייצור ומסגרייה קלה.')}</div>
<div class="process-desc">${t('Precision welding with non-consumable tungsten electrode. Cleanest welds across all metals.','ריתוך דיוק עם אלקטרודת טונגסטן. ריתוכים הנקיים ביותר על כל המתכות.')}</div>
<div class="process-desc">${t('High-deposition flux-cored wire. Self-shielded or gas-shielded for structural and outdoor work.','תיל ליבה שטף עם שקיעה גבוהה. עצמאי או עם גז לעבודות מבניות וחוץ.')}</div>

// Back button
<button … >← ${t('Back','חזור')}</button>

// Search placeholder
placeholder="${t('e.g. 6010, 7018, ER70S-6, EWTh-2…','לדוגמה: 6010, 7018, ER70S-6…')}"

// Buttons
<button … >${t('Search','חיפוש')}</button>
<button … >✕ ${t('Clear','נקה')}</button>
<button … >⊕ ${t('Compare','השווה')}</button>
```

For the electrode detail cards, translate structural labels only (the electrode data and descriptions remain English):
- "Properties" → "תכונות"
- "Applications" → "שימושים"
- "Notes" → "הערות"
- "Polarity" → "קטביות"
- "Positions" → "עמדות"

- [ ] **Step 4: Verify**

Toggle Hebrew → Electrodes page:
- Process cards show Hebrew descriptions, SMAW/MIG/TIG/FCAW names stay English
- Search placeholder in Hebrew
- Buttons in Hebrew
- Electrode data (E7018, specs, descriptions) stays in English

Toggle Hebrew → Compare page: labels in Hebrew.
Toggle Hebrew → Daily Tip: UI in Hebrew, tip text stays English.

- [ ] **Step 5: Commit**

```bash
git add modules/tip.js modules/compare.js modules/electrodes.js
git commit -m "Add Hebrew UI translations to Tip, Compare, and Electrodes modules"
```

---

## Task 10: Complete Hebrew for metals.js

**Files:**
- Modify: `modules/metals.js`

The metals module already has Hebrew in the Glossary tab (heb badges). This task completes Hebrew for the tab nav, section headers, quiz, spark test, and UI chrome.

- [ ] **Step 1: Translate tab buttons**

In `render()`, replace the tab nav button labels:
```js
<button … id="mtab-metals"   …>${t('Metals','מתכות')}</button>
<button … id="mtab-sparks"   …>${t('Spark Test','בדיקת ניצוצות')}</button>
<button … id="mtab-quiz"     …>${t('Quiz','חידון')}</button>
<button … id="mtab-glossary" …>${t('Glossary','מילון')}</button>
```

- [ ] **Step 2: Translate metals tab section header and placeholder**

In `buildMetalsTab()`:
```js
<h2>${t('Common metals in the shop','מתכות נפוצות בסדנה')}</h2>

// Placeholder
<div class="ph-icon">🔩</div>
${t('Select a metal above to see welding data','בחר מתכת למעלה לראות נתוני ריתוך')}
```

- [ ] **Step 3: Translate spark test section header and placeholder**

In `buildSparksTab()`:
```js
<h2>${t('Spark test guide','מדריך בדיקת ניצוצות')}</h2>
<p>…${t('Grind the metal briefly on a bench grinder in a dim area. Read the sparks to identify the steel before you pick up an electrode.','שחוק את המתכת בקצרה על מטחנת ספסל באזור עמום. קרא את הניצוצות כדי לזהות את הפלדה לפני שמרים אלקטרודה.')}</p>

// Placeholder
<div class="ph-icon">✨</div>
${t('Select a steel type above','בחר סוג פלדה למעלה')}
```

- [ ] **Step 4: Translate spark detail card "What to do" label**

In `selectSpark()`:
```js
<div class="m-tip-box m-tip-${s.tipType}"><strong>${t('What to do:','מה לעשות:')}</strong> ${s.action}</div>
```

- [ ] **Step 5: Translate quiz section header and result messages**

In `buildQuizTab()`:
```js
<h2>${t('Test yourself — מתחיל','בדוק את עצמך — מתחיל')}</h2>
```

In `renderQuiz()` (the completion screen):
```js
const msg = pct >= 75 ? t('Nice work — מתחיל מתקדם! 💪','כל הכבוד — מתחיל מתקדם! 💪')
           : pct >= 50 ? t('Good effort — keep at it.','מאמץ טוב — המשך להתאמן.')
           : t('Keep learning — every weld teaches you something.','המשך ללמוד — כל ריתוך מלמד משהו.');

// Try again button
<button … >Try again ↺</button>  →  ${t('Try again','נסה שוב')} ↺

// Question counter
<span>${t('Question','שאלה')} ${quizIdx + 1} ${t('of','מתוך')} ${QUIZ.length}</span>
<span class="quiz-score-val">${quizScore} ${t('correct','נכון')}</span>

// Next button
${quizIdx + 1 < QUIZ.length ? t('Next question →','שאלה הבאה →') : t('See results →','ראה תוצאות →')}
```

- [ ] **Step 6: Translate glossary section header and search placeholder**

In `buildGlossaryTab()`:
```js
<h2>${t('Welding metals glossary','מילון מתכות לריתוך')}</h2>
placeholder="${t('Search English or Hebrew…','חיפוש אנגלית או עברית…')}"
```

In `filterGloss()` no-results message:
```js
`<div class="gloss-no-results">${t('No matches found.','לא נמצאו תוצאות.')}</div>`
```

- [ ] **Step 7: Translate module footer**

```js
<div class="module-footer">${t('Preheat and filler recommendations are field guidelines. For critical structural repairs, consult applicable welding procedure specifications (WPS).','המלצות חימום מקדים ומתכת מילוי הן הנחיות שדה. לתיקונים מבניים קריטיים, עיין במפרטי נוהל הריתוך המתאימים (WPS).')}</div>
```

- [ ] **Step 8: Translate page header**

```js
<div class="page-title">${t('Metal','מתכת')} <span>${t('Types','סוגים')}</span></div>
<div class="page-sub">${t('Steel grades · Weld specs · Spark test · Glossary','דרגות פלדה · מפרטי ריתוך · בדיקת ניצוצות · מילון')}</div>
```

- [ ] **Step 9: Verify**

Toggle Hebrew → Metals module:
- Tab buttons in Hebrew
- Section headers in Hebrew
- Quiz shows Hebrew labels, question text stays English
- Glossary search placeholder in Hebrew
- Spark test placeholders and headers in Hebrew

- [ ] **Step 10: Commit**

```bash
git add modules/metals.js
git commit -m "Complete Hebrew translations for Metals module all 4 tabs"
```

---

## Task 11: RTL layout fixes + final verification

**Files:**
- Modify: `css/style.css` (only if layout breaks are found)
- Modify: any module with RTL rendering issues found in this task

- [ ] **Step 1: Check number/value alignment in RTL**

Open app in Hebrew mode. For each module, verify:
- Amperage values, voltages, percentages display LTR (left-to-right) inside RTL containers
- All `<span dir="ltr">` wrappers are in place on numeric values (added in Tasks 6 and 7)
- Machine spec value column aligns correctly on the right side
- Settings result large numbers display correctly

If any numeric value is mirrored, add `dir="ltr"` to its containing element.

- [ ] **Step 2: Check sidebar RTL**

In Hebrew mode:
- Sidebar slides from the correct side (CSS handles this via existing `dir` attribute)
- Nav icons appear on the correct side relative to labels
- Active indicator (border) appears on correct side

If the sidebar border indicator is on the wrong side in RTL, add to `css/style.css`:
```css
[dir="rtl"] .nav-item.active,
[dir="rtl"] .nav-item:hover {
  border-right: none;
  border-left: 3px solid var(--accent);
}
```

- [ ] **Step 3: Check badge/pill alignment**

In Hebrew mode:
- Glossary Hebrew badges appear before (inline-start of) the term
- H-Plus command words are LTR within RTL context (handled by `dir="ltr"` on `.hp-cmd-words`)
- Metals difficulty dots appear on the correct side

- [ ] **Step 4: Check tab nav scrolling**

On mobile (or narrow browser) in Hebrew mode, tab navs (Metals, H-Plus) should scroll horizontally without showing the scrollbar. Verify `overflow-x: auto; scrollbar-width: none;` is applied and direction doesn't break horizontal scroll.

- [ ] **Step 5: Final full-app walkthrough**

In English mode — navigate every module, verify no regressions:
- [ ] Home loads correctly, all 6 cards present
- [ ] Electrodes: process selection, search, electrode cards
- [ ] Compare: dropdown, compare button, results
- [ ] Machines: all 6 cards, correct hot start/arc force
- [ ] Metals: all 4 tabs functional, quiz scores, glossary search
- [ ] Settings: machine+repair selection shows Zika brand names
- [ ] H-Plus: situation picker, daily stack checkboxes persist, index search
- [ ] Tip: loads with tip, prev/next works
- [ ] Checklist: items toggle, progress bar updates
- [ ] Repairs: form submits, log shows entries

Toggle to Hebrew — repeat walkthrough, checking translations are present and RTL layout is correct.

- [ ] **Step 6: Push to remote**

```bash
git push
```

---

## Self-Review Notes

**Spec coverage check:**
- ✅ H-Plus redesign (Task 4)
- ✅ Delete Electrode Stock + Grinding Discs (Task 1)
- ✅ Machines hot start/arc force accuracy (Task 2)
- ✅ Weld Settings Zika brand names (Task 3)
- ✅ Hebrew RTL — nav + home (Task 5)
- ✅ Hebrew RTL — Machines (Task 6)
- ✅ Hebrew RTL — Settings (Task 7)
- ✅ Hebrew RTL — H-Plus (baked into Task 4)
- ✅ Hebrew RTL — Checklist + Repairs (Task 8)
- ✅ Hebrew RTL — Tip + Compare + Electrodes (Task 9)
- ✅ Hebrew RTL — Metals (Task 10)
- ✅ RTL layout fixes + final verification (Task 11)

**Key consistency notes:**
- `t()` helper is defined in `index.html` and available globally — all modules use `window.currentLang` (existing global)
- H-Plus command words always use `dir="ltr"` regardless of app language
- Numeric values (voltages, amps, percentages) always use `dir="ltr"` spans
- `REPAIR_TYPES` in both `settings.js` and `repairs.js` use `{en, he}` objects — lookup keys remain English strings to avoid touching `SETTINGS_DB`
- `shouldShowReminder()` on `HPlusModule` is called from `index.html` DOMContentLoaded — ensure it is in the public API (it is, in Task 4)
