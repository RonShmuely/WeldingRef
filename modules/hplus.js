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
