// ═══════════════════════════════════════════
// METAL TYPES MODULE — Full (Metals / Spark / Quiz / Glossary)
// ═══════════════════════════════════════════

const MetalsModule = (() => {

  /* ─── CSS ─────────────────────────────────── */
  const CSS = `
  /* metals module */
  .metals-wrap { max-width: 700px; margin: 0 auto; }
  .metals-tab-nav {
    display: flex; gap: 4px;
    background: var(--card-bg, #242424);
    border: 1px solid var(--border, #3a3a3a);
    border-radius: 10px; padding: 4px;
    margin-bottom: 18px; overflow-x: auto;
    scrollbar-width: none;
  }
  .metals-tab-nav::-webkit-scrollbar { display: none; }
  .metals-tab-btn {
    flex: 1; min-width: 70px; padding: 7px 10px;
    border: none; border-radius: 6px;
    background: transparent; color: #aaa;
    font-size: 12px; font-weight: 500;
    cursor: pointer; white-space: nowrap; transition: all .15s;
  }
  .metals-tab-btn.active { background: var(--red, #e53935); color: #fff; }
  .metals-tab-btn:hover:not(.active) { background: #2e2e2e; color: #f0f0f0; }
  .metals-pane { display: none; }
  .metals-pane.active { display: block; }

  /* section header */
  .metals-sec-hdr { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
  .metals-sec-dot { width: 4px; height: 22px; background: var(--red, #e53935); border-radius: 2px; }
  .metals-sec-hdr h2 { font-size: 16px; font-weight: 600; color: #f0f0f0; }

  /* metal chip grid */
  .metal-chip-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 8px; margin-bottom: 16px;
  }
  @media (max-width: 420px) { .metal-chip-grid { grid-template-columns: repeat(2, 1fr); } }
  .metal-chip {
    background: #242424; border: 1px solid #3a3a3a;
    border-radius: 10px; padding: 10px 8px;
    cursor: pointer; transition: all .15s; text-align: center;
  }
  .metal-chip:hover { border-color: #4a4a4a; background: #2e2e2e; }
  .metal-chip.active { border-color: var(--red, #e53935); background: rgba(229,57,53,.12); }
  .metal-chip .m-swatch {
    width: 24px; height: 24px; border-radius: 50%;
    margin: 0 auto 6px; border: 2px solid rgba(255,255,255,.1);
  }
  .metal-chip .m-chip-name { font-size: 11px; font-weight: 600; color: #f0f0f0; margin-bottom: 1px; }
  .metal-chip .m-chip-tag  { font-size: 10px; color: #707070; line-height: 1.2; }

  /* detail card */
  .m-detail-card {
    background: #242424; border: 1px solid #3a3a3a;
    border-radius: 10px; overflow: hidden;
  }
  .m-detail-hdr {
    padding: 14px 16px 12px; border-bottom: 1px solid #3a3a3a;
    display: flex; align-items: center; gap: 10px;
  }
  .m-detail-swatch { width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0; border: 2px solid rgba(255,255,255,.12); }
  .m-detail-hdr-text h3 { font-size: 15px; font-weight: 600; color: #f0f0f0; }
  .m-detail-hdr-text .m-std { font-size: 12px; color: #707070; margin-top: 1px; }
  .m-difficulty { margin-left: auto; display: flex; gap: 3px; }
  .m-diff-dot { width: 8px; height: 8px; border-radius: 50%; }
  .m-diff-dot.filled { background: var(--red, #e53935); }
  .m-diff-dot.empty  { background: #383838; }
  .m-detail-desc {
    padding: 14px 16px; font-size: 13px; color: #aaa;
    line-height: 1.6; border-bottom: 1px solid #3a3a3a;
  }
  .m-props-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: #3a3a3a; }
  .m-prop-cell  { background: #242424; padding: 10px 14px; }
  .m-prop-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: .5px; color: #707070; margin-bottom: 3px; }
  .m-prop-val   { font-size: 13px; font-weight: 500; color: #f0f0f0; }
  .m-bars-sec   { padding: 12px 16px; border-top: 1px solid #3a3a3a; }
  .m-bar-row    { margin-bottom: 8px; }
  .m-bar-meta   { display: flex; justify-content: space-between; font-size: 11px; color: #707070; margin-bottom: 4px; }
  .m-bar-track  { height: 5px; border-radius: 3px; background: #383838; overflow: hidden; }
  .m-bar-fill   { height: 100%; border-radius: 3px; }
  .m-weld-spec  { border-top: 1px solid #3a3a3a; padding: 12px 16px; }
  .m-weld-row   { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; font-size: 13px; }
  .m-weld-row:last-child { margin-bottom: 0; }
  .m-weld-icon  { width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; margin-top: 1px; }
  .m-weld-key   { color: #707070; min-width: 88px; }
  .m-weld-val   { color: #f0f0f0; flex: 1; font-weight: 500; }
  .m-tip-box    { margin: 0 16px 16px; padding: 10px 13px; border-radius: 6px; border-left: 3px solid; font-size: 12px; line-height: 1.6; }
  .m-tip-warn   { background: rgba(251,140,0,.12); border-color: #fb8c00; color: #ffcc80; }
  .m-tip-info   { background: rgba(30,136,229,.12); border-color: #1e88e5; color: #90caf9; }
  .m-tip-good   { background: rgba(67,160,71,.12);  border-color: #43a047; color: #a5d6a7; }
  .m-placeholder { background: #242424; border: 1px dashed #4a4a4a; border-radius: 10px; padding: 28px 16px; text-align: center; color: #707070; font-size: 13px; }
  .m-placeholder .ph-icon { font-size: 28px; margin-bottom: 8px; }

  /* spark test */
  .spark-grid-m { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 16px; }
  .spark-chip {
    background: #242424; border: 1px solid #3a3a3a;
    border-radius: 10px; padding: 12px; cursor: pointer; transition: all .15s;
  }
  .spark-chip:hover  { border-color: #4a4a4a; background: #2e2e2e; }
  .spark-chip.active { border-color: var(--red, #e53935); background: rgba(229,57,53,.12); }
  .spark-chip-name { font-size: 13px; font-weight: 600; color: #f0f0f0; margin-bottom: 3px; }
  .spark-chip-sub  { font-size: 11px; color: #707070; margin-bottom: 8px; }
  .spark-svg-wrap  { height: 46px; }

  /* quiz */
  .quiz-score-bar {
    display: flex; align-items: center; gap: 10px;
    background: #242424; border: 1px solid #3a3a3a;
    border-radius: 10px; padding: 10px 14px;
    margin-bottom: 14px; font-size: 13px; color: #aaa;
  }
  .quiz-score-val { margin-left: auto; font-weight: 600; color: var(--red, #e53935); font-size: 15px; }
  .quiz-card { background: #242424; border: 1px solid #3a3a3a; border-radius: 10px; overflow: hidden; margin-bottom: 12px; }
  .quiz-q    { padding: 16px; font-size: 14px; font-weight: 500; color: #f0f0f0; line-height: 1.55; border-bottom: 1px solid #3a3a3a; }
  .quiz-opts { padding: 10px 12px; display: flex; flex-direction: column; gap: 7px; }
  .quiz-opt  {
    background: #2e2e2e; border: 1px solid #3a3a3a;
    border-radius: 6px; padding: 10px 13px;
    font-size: 13px; color: #f0f0f0;
    cursor: pointer; text-align: left; transition: all .15s;
  }
  .quiz-opt:hover:not(:disabled) { background: #383838; border-color: #4a4a4a; }
  .quiz-opt.correct { background: rgba(67,160,71,.15);  border-color: #43a047; color: #a5d6a7; }
  .quiz-opt.wrong   { background: rgba(229,57,53,.15);  border-color: #e53935; color: #ef9a9a; }
  .quiz-feedback { padding: 10px 14px; font-size: 12px; color: #aaa; line-height: 1.5; min-height: 20px; }
  .quiz-next-row { padding: 0 12px 12px; display: flex; justify-content: flex-end; }
  .quiz-next {
    background: var(--red, #e53935); color: #fff;
    border: none; border-radius: 6px;
    padding: 8px 16px; font-size: 13px; cursor: pointer;
  }
  .quiz-done { text-align: center; padding: 24px 16px; font-size: 14px; color: #aaa; line-height: 1.6; }
  .quiz-done .score-big { font-size: 42px; font-weight: 700; color: var(--red, #e53935); line-height: 1; margin-bottom: 8px; }
  .quiz-restart {
    margin-top: 16px; background: #2e2e2e; color: #aaa;
    border: 1px solid #4a4a4a; border-radius: 6px;
    padding: 8px 18px; font-size: 13px; cursor: pointer; transition: all .15s;
  }
  .quiz-restart:hover { background: #383838; color: #f0f0f0; }

  /* glossary */
  .gloss-search-wrap { position: relative; margin-bottom: 12px; }
  .gloss-search-input {
    width: 100%; background: #242424; border: 1px solid #3a3a3a;
    border-radius: 10px; padding: 9px 12px 9px 36px;
    font-size: 13px; color: #f0f0f0; transition: border-color .15s;
  }
  .gloss-search-input:focus { outline: none; border-color: var(--red, #e53935); }
  .gloss-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: #707070; font-size: 14px; pointer-events: none; }
  .gloss-list  { display: flex; flex-direction: column; gap: 6px; }
  .gloss-item  { background: #242424; border: 1px solid #3a3a3a; border-radius: 10px; padding: 11px 14px; }
  .gloss-term  { font-size: 13px; font-weight: 600; color: #f0f0f0; margin-bottom: 2px; }
  .gloss-heb   { display: inline-block; background: rgba(229,57,53,.12); border: 1px solid rgba(229,57,53,.35); color: var(--red, #e53935); border-radius: 4px; font-size: 11px; padding: 1px 7px; margin-right: 6px; vertical-align: middle; font-weight: 500; }
  .gloss-def   { font-size: 12px; color: #aaa; line-height: 1.55; }
  .gloss-no-results { text-align: center; color: #707070; font-size: 13px; padding: 20px; }
  `;

  /* ─── Localization helper ────────────────── */
  function loc(val) {
    if (typeof val === 'object' && val !== null && val.en) return t(val.en, val.he);
    return val;
  }

  /* ─── Data ────────────────────────────────── */
  const METALS = [
    {
      id:'mild', name:'Mild steel', tag:'A36 / S235', color:'#888780', difficulty:1,
      desc:{
        en:'The most common metal in any fabrication shop. Low carbon (under 0.3%), bends without cracking, and welds easily with almost any process. Your default material for frames, brackets, general repairs, and bucket shells.',
        he:'המתכת הנפוצה ביותר בכל מסגריה. פחמן נמוך (מתחת ל-0.3%), מתכופפת בלי להיסדק, ומתרתכת בקלות כמעט בכל תהליך. חומר ברירת המחדל שלך למסגרות, זוויתנים, תיקונים כלליים ודפנות דלי.'
      },
      props:[
        {label:{en:'Yield strength',  he:'חוזק כניעה'},   val:'250 MPa'},
        {label:{en:'Tensile strength', he:'חוזק משיכה'},   val:'400–500 MPa'},
        {label:{en:'Carbon content',   he:'תכולת פחמן'},   val:'< 0.30%'},
        {label:{en:'Weldability',      he:'כשירות ריתוך'}, val:{en:'Very easy', he:'קלה מאוד'}},
        {label:{en:'Preheat needed',   he:'חימום מקדים'},   val:{en:'Usually none', he:'בדרך כלל לא'}},
        {label:{en:'Polarity (SMAW)',  he:'קוטביות (SMAW)'},val:'AC or DC+'},
      ],
      bars:[
        {label:{en:'Strength',    he:'חוזק'},          val:30, color:'#43a047'},
        {label:{en:'Hardness',    he:'קשיות'},         val:25, color:'#43a047'},
        {label:{en:'Weldability', he:'כשירות ריתוך'},  val:95, color:'#1e88e5'},
        {label:{en:'Crack risk',  he:'סיכון לסדיקה'},  val:8,  color:'#43a047'},
      ],
      weld:[
        {icon:'E', bg:'#c62828', label:{en:'Electrode (SMAW)', he:'אלקטרודה (SMAW)'},  val:'E6013 or E7018'},
        {icon:'W', bg:'#1565c0', label:{en:'Wire (MIG)',       he:'תיל (MIG)'},         val:'ER70S-6'},
        {icon:'G', bg:'#2e7d32', label:{en:'Gas (MIG)',        he:'גז (MIG)'},          val:'75% Ar / 25% CO\u2082'},
        {icon:'A', bg:'#e65100', label:{en:'Amps (3.2mm)',     he:'\u05D0\u05DE\u05E4\u05E8 (3.2mm)'},val:'100\u2013140 A'},
      ],
      realWorld:{en:'Bucket shells, general frames, brackets, walkways', he:'דפנות דלי, מסגרות כלליות, זוויתנים, מעברי הליכה'},
      tip:{type:'good', text:{
        en:'<strong>Start here.</strong> Mild steel forgives beginner mistakes. If a weld looks bad, grind it off and retry \u2014 the base metal will be fine. Master this before moving to HSLA.',
        he:'<strong>התחל כאן.</strong> פלדה רכה סולחת לטעויות של מתחילים. אם הלחם נראה רע, תשחיז ותנסה שוב \u2014 מתכת הבסיס תהיה בסדר. שלוט בזה לפני שתעבור ל-HSLA.'
      }}
    },
    {
      id:'hsla', name:'HSLA steel', tag:'A572 Gr50 / S355', color:'#1e88e5', difficulty:2,
      desc:{
        en:'High-Strength Low-Alloy. Stronger than mild steel but with a similar carbon content. Engineers use HSLA to build lighter structures that carry the same load. Your Gehl and Mustang skid loader frames are HSLA steel.',
        he:'פלדה חזקה דלת סגסוגת. חזקה יותר מפלדה רכה אך עם תכולת פחמן דומה. מהנדסים משתמשים ב-HSLA כדי לבנות מבנים קלים יותר שנושאים את אותו עומס. שלדות הבובקאט Gehl ו-Mustang שלך עשויות מפלדת HSLA.'
      },
      props:[
        {label:{en:'Yield strength',  he:'חוזק כניעה'},   val:'345\u2013355 MPa'},
        {label:{en:'Tensile strength', he:'חוזק משיכה'},   val:'450\u2013630 MPa'},
        {label:{en:'Carbon content',   he:'תכולת פחמן'},   val:'\u2264 0.23%'},
        {label:{en:'Weldability',      he:'כשירות ריתוך'}, val:{en:'Good', he:'טובה'}},
        {label:{en:'Preheat needed',   he:'חימום מקדים'},   val:{en:'Yes \u2014 thick sections', he:'כן \u2014 חתכים עבים'}},
        {label:{en:'Polarity (SMAW)',  he:'קוטביות (SMAW)'},val:'DC+'},
      ],
      bars:[
        {label:{en:'Strength',    he:'חוזק'},          val:62, color:'#fb8c00'},
        {label:{en:'Hardness',    he:'קשיות'},         val:45, color:'#43a047'},
        {label:{en:'Weldability', he:'כשירות ריתוך'},  val:80, color:'#1e88e5'},
        {label:{en:'Crack risk',  he:'סיכון לסדיקה'},  val:30, color:'#fb8c00'},
      ],
      weld:[
        {icon:'E', bg:'#c62828', label:{en:'Electrode (SMAW)', he:'אלקטרודה (SMAW)'},  val:{en:'E7018 \u2014 low-hydrogen only', he:'E7018 \u2014 דל-מימן בלבד'}},
        {icon:'W', bg:'#1565c0', label:{en:'Wire (MIG)',       he:'תיל (MIG)'},         val:'ER70S-6'},
        {icon:'G', bg:'#2e7d32', label:{en:'Gas (MIG)',        he:'גז (MIG)'},          val:'75% Ar / 25% CO\u2082'},
        {icon:'P', bg:'#6a1b9a', label:{en:'Preheat',          he:'חימום מקדים'},       val:{en:'100\u2013150\u00B0C if section > 12mm', he:'100\u2013150\u00B0C אם החתך > 12mm'}},
      ],
      realWorld:{en:'Gehl/Mustang lift arms, skid steer frames, structural beams', he:'זרועות הרמה Gehl/Mustang, שלדות בובקאט, קורות מבניות'},
      tip:{type:'warn', text:{
        en:'<strong>Use low-hydrogen rods only.</strong> Moisture in the electrode coating causes hydrogen to enter the weld and crack it \u2014 hours or even days later. Always store E7018 in a rod oven or sealed container. Never use E6013 on HSLA.',
        he:'<strong>השתמש רק באלקטרודות דלות-מימן.</strong> לחות בציפוי האלקטרודה גורמת למימן לחדור ללחם ולסדוק אותו \u2014 שעות ואף ימים לאחר מכן. תמיד אחסן E7018 בתנור אלקטרודות או מיכל אטום. לעולם אל תשתמש ב-E6013 על HSLA.'
      }}
    },
    {
      id:'s355', name:'S355J2', tag:'EN 10025 \u2014 European', color:'#185FA5', difficulty:2,
      desc:{
        en:'The European equivalent of A572 Gr50 \u2014 same strength class, just named to EN standards. Your Wirtgen W200 and W50Ri are made in Germany and follow EN 10025. When you repair a Wirtgen frame, you are welding S355J2.',
        he:'המקבילה האירופית ל-A572 Gr50 \u2014 אותה דרגת חוזק, רק בשם לפי תקן EN. ה-Wirtgen W200 ו-W50Ri שלך מיוצרים בגרמניה ועוקבים אחרי EN 10025. כשאתה מתקן שלדת Wirtgen, אתה מרתך S355J2.'
      },
      props:[
        {label:{en:'Yield strength',  he:'חוזק כניעה'},   val:'355 MPa'},
        {label:{en:'Tensile strength', he:'חוזק משיכה'},   val:'490\u2013630 MPa'},
        {label:{en:'Carbon content',   he:'תכולת פחמן'},   val:'\u2264 0.20%'},
        {label:{en:'Weldability',      he:'כשירות ריתוך'}, val:{en:'Good', he:'טובה'}},
        {label:{en:'Preheat needed',   he:'חימום מקדים'},   val:{en:'100\u00B0C if section > 20mm', he:'100\u00B0C אם החתך > 20mm'}},
        {label:{en:'Polarity (SMAW)',  he:'קוטביות (SMAW)'},val:'DC+'},
      ],
      bars:[
        {label:{en:'Strength',    he:'חוזק'},          val:62, color:'#fb8c00'},
        {label:{en:'Hardness',    he:'קשיות'},         val:45, color:'#43a047'},
        {label:{en:'Weldability', he:'כשירות ריתוך'},  val:82, color:'#1e88e5'},
        {label:{en:'Crack risk',  he:'סיכון לסדיקה'},  val:28, color:'#43a047'},
      ],
      weld:[
        {icon:'E', bg:'#c62828', label:{en:'Electrode (SMAW)', he:'אלקטרודה (SMAW)'},  val:'E7018 / Zika Z-4'},
        {icon:'W', bg:'#1565c0', label:{en:'Wire (MIG)',       he:'תיל (MIG)'},         val:'ER70S-6 (ISO: G4Si1)'},
        {icon:'G', bg:'#2e7d32', label:{en:'Gas (MIG)',        he:'גז (MIG)'},          val:'75% Ar / 25% CO\u2082'},
        {icon:'P', bg:'#6a1b9a', label:{en:'Preheat',          he:'חימום מקדים'},       val:{en:'100\u00B0C for sections > 20mm', he:'100\u00B0C לחתכים > 20mm'}},
      ],
      realWorld:{en:'Wirtgen W200 / W50Ri chassis, crawler frames, European equipment', he:'שלדות Wirtgen W200 / W50Ri, מסגרות זחלים, ציוד אירופי'},
      tip:{type:'info', text:{
        en:'<strong>Same as A572 Gr50 in practice.</strong> The name is different because Wirtgen follows European EN 10025 steel standards. Treat it exactly like HSLA \u2014 E7018, preheat on thick sections, slow cool under a blanket.',
        he:'<strong>זהה ל-A572 Gr50 בפועל.</strong> השם שונה כי Wirtgen עוקבת אחרי תקן פלדה אירופי EN 10025. טפל בזה בדיוק כמו HSLA \u2014 E7018, חימום מקדים בחתכים עבים, קירור איטי מתחת לשמיכה.'
      }}
    },
    {
      id:'ar400', name:'AR400', tag:'Wear-resistant plate', color:'#d85a30', difficulty:3,
      desc:{
        en:'Abrasion-Resistant steel, quenched and tempered to Brinell hardness ~400. Used for bucket cutting edges, milling machine wear liners, and chutes. The high carbon equivalent means it is highly prone to cracking if welded cold.',
        he:'פלדה עמידה בשחיקה, מחושלת ומחוסמת לקשיות Brinell ~400. משמשת לשיני דלי, ציפויי בלאי למכרסמות, ומגלשות. שווה-ערך הפחמן הגבוה אומר שהיא נוטה מאוד להיסדק אם מרתכים בקור.'
      },
      props:[
        {label:{en:'Yield strength',  he:'חוזק כניעה'},    val:'1000+ MPa'},
        {label:{en:'Tensile strength', he:'חוזק משיכה'},    val:'1250 MPa'},
        {label:{en:'Carbon equiv.',    he:'שווה-ערך פחמן'}, val:'~0.55+ CE (high)'},
        {label:{en:'Weldability',      he:'כשירות ריתוך'},  val:{en:'Difficult', he:'קשה'}},
        {label:{en:'Preheat needed',   he:'חימום מקדים'},    val:{en:'150\u2013200\u00B0C \u2014 mandatory', he:'150\u2013200\u00B0C \u2014 חובה'}},
        {label:{en:'Polarity (SMAW)',  he:'קוטביות (SMAW)'},val:'DC+'},
      ],
      bars:[
        {label:{en:'Strength',    he:'חוזק'},          val:95, color:'#e53935'},
        {label:{en:'Hardness',    he:'קשיות'},         val:92, color:'#e53935'},
        {label:{en:'Weldability', he:'כשירות ריתוך'},  val:30, color:'#e53935'},
        {label:{en:'Crack risk',  he:'סיכון לסדיקה'},  val:88, color:'#e53935'},
      ],
      weld:[
        {icon:'E', bg:'#c62828', label:{en:'Electrode (SMAW)', he:'אלקטרודה (SMAW)'},  val:{en:'E8018-G for structural joins', he:'E8018-G לחיבורים מבניים'}},
        {icon:'E', bg:'#6a1b9a', label:{en:'Hardfacing rod',   he:'אלקטרודת ציפוי קשה'}, val:{en:'Chromium carbide overlay', he:'ציפוי כרום קרביד'}},
        {icon:'P', bg:'#6a1b9a', label:{en:'Preheat',          he:'חימום מקדים'},       val:{en:'150\u2013200\u00B0C \u2014 no exceptions', he:'150\u2013200\u00B0C \u2014 ללא יוצא מהכלל'}},
        {icon:'C', bg:'#1565c0', label:{en:'Cool',             he:'קירור'},             val:{en:'Cover with blanket, slow cool', he:'כסה בשמיכה, קירור איטי'}},
      ],
      realWorld:{en:'Bucket cutting edges, Wirtgen milling drum liners, chutes, hoppers', he:'שיני דלי, ציפויי תוף כרסום Wirtgen, מגלשות, משפכים'},
      tip:{type:'warn', text:{
        en:'<strong>Never weld AR400 cold.</strong> Preheat to at least 150\u00B0C across the whole part, not just the repair zone. Weld short passes. After welding, immediately cover with a welding blanket and let it cool for hours. Fast cooling = guaranteed cracks.',
        he:'<strong>לעולם אל תרתך AR400 בקור.</strong> חמם מראש לפחות ל-150\u00B0C על כל החלק, לא רק באזור התיקון. רתך מעברים קצרים. אחרי הריתוך, כסה מיד בשמיכת ריתוך ותן לזה להתקרר שעות. קירור מהיר = סדקים מובטחים.'
      }}
    },
    {
      id:'cast', name:'Cast iron', tag:'Grey / ductile iron', color:'#555', difficulty:4,
      desc:{
        en:'Found in engine blocks, pump housings, gearboxes, and old machine frames. Very high carbon (2\u20134%) makes it brittle \u2014 it cracks from both mechanical shock and thermal shock during welding. Requires special nickel electrodes and very controlled heating and cooling.',
        he:'נמצא בגושי מנוע, בתי משאבות, תיבות הילוכים ומסגרות מכונות ישנות. תכולת פחמן גבוהה מאוד (2\u20134%) הופכת אותו לשביר \u2014 נסדק גם מזעזוע מכני וגם מזעזוע חום בזמן הריתוך. דורש אלקטרודות ניקל מיוחדות ובקרת חימום וקירור מדוקדקת.'
      },
      props:[
        {label:{en:'Tensile strength', he:'חוזק משיכה'},    val:{en:'200\u2013400 MPa (brittle)', he:'200\u2013400 MPa (שביר)'}},
        {label:{en:'Carbon content',   he:'תכולת פחמן'},    val:{en:'2\u20134% \u2014 extremely high', he:'2\u20134% \u2014 גבוה במיוחד'}},
        {label:{en:'Weldability',      he:'כשירות ריתוך'},  val:{en:'Very difficult', he:'קשה מאוד'}},
        {label:{en:'Preheat needed',   he:'חימום מקדים'},    val:{en:'200\u2013300\u00B0C \u2014 entire part', he:'200\u2013300\u00B0C \u2014 כל החלק'}},
        {label:{en:'Electrode type',   he:'סוג אלקטרודה'},  val:{en:'Nickel-based only', he:'מבוסס ניקל בלבד'}},
        {label:{en:'Cool rate',        he:'קצב קירור'},     val:{en:'Very slow \u2014 hours', he:'איטי מאוד \u2014 שעות'}},
      ],
      bars:[
        {label:{en:'Strength',    he:'חוזק'},          val:28, color:'#fb8c00'},
        {label:{en:'Hardness',    he:'קשיות'},         val:70, color:'#fb8c00'},
        {label:{en:'Weldability', he:'כשירות ריתוך'},  val:15, color:'#e53935'},
        {label:{en:'Crack risk',  he:'סיכון לסדיקה'},  val:96, color:'#e53935'},
      ],
      weld:[
        {icon:'E', bg:'#c62828', label:{en:'Electrode (SMAW)', he:'אלקטרודה (SMAW)'},  val:'ENiFe-CI (nickel-iron rod)'},
        {icon:'P', bg:'#6a1b9a', label:{en:'Preheat',          he:'חימום מקדים'},       val:{en:'200\u2013300\u00B0C \u2014 whole casting', he:'200\u2013300\u00B0C \u2014 כל היציקה'}},
        {icon:'T', bg:'#1565c0', label:{en:'Technique',        he:'טכניקה'},            val:{en:'Short passes, peen each bead', he:'מעברים קצרים, פטפוט כל גולל'}},
        {icon:'C', bg:'#2e7d32', label:{en:'Cool',             he:'קירור'},             val:{en:'Bury in dry sand or vermiculite', he:'קבור בחול יבש או ורמיקוליט'}},
      ],
      realWorld:{en:'Engine blocks, gearbox housings, pump bodies, old machine bases', he:'גושי מנוע, בתי תיבות הילוכים, גופי משאבות, בסיסי מכונות ישנות'},
      tip:{type:'warn', text:{
        en:'<strong>Preheat the entire casting</strong> \u2014 not just the repair area. Use only nickel-based electrodes. After each pass, peen the bead lightly while hot to relieve stress. Let it cool buried in insulating material for many hours. A crack here is a scrapped part.',
        he:'<strong>חמם את כל היציקה מראש</strong> \u2014 לא רק את אזור התיקון. השתמש רק באלקטרודות מבוססות ניקל. אחרי כל מעבר, פטפט את הגולל בעדינות כשהוא חם כדי לשחרר מתח. תן לזה להתקרר קבור בחומר מבודד שעות רבות. סדק כאן = חלק לפח.'
      }}
    },
    {
      id:'stainless', name:'Stainless', tag:'304 / 309L / 316', color:'#bdbdbd', difficulty:3,
      desc:{
        en:'Contains 10%+ chromium which forms a passive oxide layer that prevents rust. Heat spreads slowly, causing distortion. You must use matching filler metal \u2014 the wrong wire destroys the corrosion resistance at the weld joint.',
        he:'מכיל 10%+ כרום היוצר שכבת תחמוצת פסיבית שמונעת חלודה. חום מתפזר לאט וגורם לעיוות. חובה להשתמש במתכת מילוי תואמת \u2014 תיל שגוי הורס את העמידות לקורוזיה במפרק הלחם.'
      },
      props:[
        {label:{en:'Yield strength',  he:'חוזק כניעה'},   val:'205\u2013310 MPa'},
        {label:{en:'Tensile strength', he:'חוזק משיכה'},   val:'515\u2013620 MPa'},
        {label:{en:'Carbon content',   he:'תכולת פחמן'},   val:'< 0.08%'},
        {label:{en:'Weldability',      he:'כשירות ריתוך'}, val:{en:'Moderate (TIG best)', he:'בינונית (TIG מועדף)'}},
        {label:{en:'Preheat needed',   he:'חימום מקדים'},   val:{en:'Not usually \u2014 control heat', he:'בדרך כלל לא \u2014 שלוט בחום'}},
        {label:{en:'Polarity (SMAW)',  he:'קוטביות (SMAW)'},val:'DC+'},
      ],
      bars:[
        {label:{en:'Strength',    he:'חוזק'},          val:48, color:'#43a047'},
        {label:{en:'Hardness',    he:'קשיות'},         val:52, color:'#43a047'},
        {label:{en:'Weldability', he:'כשירות ריתוך'},  val:55, color:'#fb8c00'},
        {label:{en:'Crack risk',  he:'סיכון לסדיקה'},  val:22, color:'#43a047'},
      ],
      weld:[
        {icon:'E', bg:'#c62828', label:{en:'Electrode (SMAW)', he:'אלקטרודה (SMAW)'},  val:'E308L-16 (304 to 304)'},
        {icon:'W', bg:'#1565c0', label:{en:'Wire (MIG/TIG)',   he:'תיל (MIG/TIG)'},     val:'ER308L or ER309L'},
        {icon:'G', bg:'#2e7d32', label:{en:'Gas',              he:'גז'},                val:{en:'100% Ar (TIG) / Tri-mix (MIG)', he:'100% Ar (TIG) / תערובת משולשת (MIG)'}},
        {icon:'D', bg:'#6a1b9a', label:{en:'Dissimilar',       he:'מתכות שונות'},       val:{en:'ER309L \u2014 SS to mild steel', he:'ER309L \u2014 נירוסטה לפלדה רכה'}},
      ],
      realWorld:{en:'Hydraulic tanks, food equipment, marine parts, fluid lines', he:'מיכלי הידראוליקה, ציוד מזון, חלקים ימיים, קווי נוזלים'},
      tip:{type:'info', text:{
        en:'<strong>Dedicated tools only.</strong> Never use carbon steel brushes or grinders on stainless \u2014 contamination causes rust spots. Keep heat input low to avoid warping. Back-purge with argon on TIG root passes or the underside will oxidise (turns gold/blue/black).',
        he:'<strong>כלים ייעודיים בלבד.</strong> לעולם אל תשתמש במברשות או משחזות של פלדת פחמן על נירוסטה \u2014 זיהום גורם לכתמי חלודה. שמור על כניסת חום נמוכה למניעת עיוות. שטוף בארגון בצד האחורי במעברי שורש TIG אחרת הצד התחתון יתחמצן (הופך לזהב/כחול/שחור).'
      }}
    },
  ];

  const SPARKS = [
    {
      id:'mild_sp', name:'Mild steel', sub:{en:'A36 / S235 \u2014 easy to weld', he:'A36 / S235 \u2014 קל לריתוך'},
      desc:{
        en:'Long, flowing yellow-orange streamers. Few or no bursts at the tips. Sparks travel far from the wheel and fan out gently. The most common pattern you will see.',
        he:'זרמים ארוכים וזורמים בצהוב-כתום. פרצים מעטים או ללא פרצים בקצוות. ניצוצות נוסעים רחוק מהגלגל ומתפזרים בעדינות. הדפוס הנפוץ ביותר שתראה.'
      },
      action:{
        en:'Safe to weld with E6013 or E7018. No preheat needed on normal thickness.',
        he:'בטוח לרתך עם E6013 או E7018. אין צורך בחימום מקדים בעובי רגיל.'
      },
      tipType:'good', color:'#F5A623', burst:false, streamLen:90, count:8,
    },
    {
      id:'hsla_sp', name:'HSLA / S355', sub:{en:'A572 Gr50 \u2014 skid loaders, Wirtgen', he:'A572 Gr50 \u2014 בובקאטים, Wirtgen'},
      desc:{
        en:'Similar to mild steel but slightly shorter and brighter. Small bursts appear near the tips \u2014 caused by vanadium and niobium alloying elements.',
        he:'דומה לפלדה רכה אך מעט קצר יותר ובוהק יותר. פרצים קטנים מופיעים ליד הקצוות \u2014 נגרמים על ידי יסודות סגסוגת ונדיום וניוביום.'
      },
      action:{
        en:'Use E7018 only \u2014 low-hydrogen. Preheat sections over 12mm.',
        he:'השתמש רק ב-E7018 \u2014 דל-מימן. חמם מראש חתכים מעל 12mm.'
      },
      tipType:'info', color:'#FFD54F', burst:true, streamLen:68, count:9,
    },
    {
      id:'ar_sp', name:'AR400 / hardened', sub:{en:'Wear plate, tool steel', he:'פלטת בלאי, פלדת כלים'},
      desc:{
        en:'Short, intensely bright white sparks. Dense, explosive burst pattern close to the wheel. Much more violent-looking than mild steel.',
        he:'ניצוצות לבנים קצרים ובוהקים מאוד. דפוס פרצים צפוף ונפיץ קרוב לגלגל. נראה הרבה יותר אלים מפלדה רכה.'
      },
      action:{
        en:'STOP \u2014 preheat to 150\u00B0C+ before welding. Use E8018-G. Never cold-weld AR plate.',
        he:'עצור \u2014 חמם מראש ל-150\u00B0C+ לפני הריתוך. השתמש ב-E8018-G. לעולם אל תרתך פלטת AR בקור.'
      },
      tipType:'warn', color:'#FFFFFF', burst:true, streamLen:30, count:16,
    },
    {
      id:'cast_sp', name:'Cast iron', sub:{en:'Engine blocks, housings', he:'גושי מנוע, בתי מכונות'},
      desc:{
        en:'Very short, dull red sparks. Almost no burst. The stream is thin, sparse, and weak-looking. Unmistakable once you know what to look for.',
        he:'ניצוצות אדומים קצרים ועמומים מאוד. כמעט ללא פרצים. הזרם דק, דליל ונראה חלש. בלתי ניתן לטעות כשיודעים מה לחפש.'
      },
      action:{
        en:'Requires ENiFe-CI nickel rod. Preheat entire part to 200\u2013300\u00B0C. Never weld cold.',
        he:'דורש אלקטרודת ניקל ENiFe-CI. חמם את כל החלק מראש ל-200\u2013300\u00B0C. לעולם אל תרתך בקור.'
      },
      tipType:'warn', color:'#EF6C00', burst:false, streamLen:18, count:4,
    },
  ];

  const QUIZ = [
    {
      q:{en:'Spark test shows long yellow streamers, almost no bursts. What metal is this most likely?',
         he:'בדיקת ניצוץ מראה זרמים צהובים ארוכים, כמעט ללא פרצים. איזו מתכת זו ככל הנראה?'},
      opts:[
        {en:'AR400 wear plate',      he:'פלטת בלאי AR400'},
        {en:'Mild steel (A36)',      he:'פלדה רכה (A36)'},
        {en:'Cast iron',             he:'יציקת ברזל'},
        {en:'Stainless steel',       he:'נירוסטה'}
      ],
      ans:1,
      exp:{en:'Long, gentle yellow streamers = mild steel. Easy to weld, no special procedure needed.',
           he:'זרמים צהובים ארוכים ועדינים = פלדה רכה. קלה לריתוך, אין צורך בנוהל מיוחד.'}
    },
    {
      q:{en:'Your Gehl skid loader lift arm has cracked. Which electrode should you use?',
         he:'זרוע ההרמה של הבובקאט Gehl שלך נסדקה. באיזו אלקטרודה עליך להשתמש?'},
      opts:[
        {en:'E6013 \u2014 it\'s fine for any steel',       he:'E6013 \u2014 מתאימה לכל פלדה'},
        {en:'E7018 \u2014 low-hydrogen',                    he:'E7018 \u2014 דלת-מימן'},
        {en:'E6010 \u2014 deep penetration',                he:'E6010 \u2014 חדירה עמוקה'},
        {en:'Any rod available',                            he:'כל אלקטרודה זמינה'}
      ],
      ans:1,
      exp:{en:'Lift arms are HSLA (A572 Gr50). E7018 is mandatory \u2014 it matches the steel strength and is low-hydrogen. E6013 is too soft and will not match strength. Never guess on a safety-critical part.',
           he:'זרועות הרמה עשויות HSLA (A572 Gr50). E7018 חובה \u2014 היא תואמת את חוזק הפלדה ודלת-מימן. E6013 רכה מדי ולא תתאים לחוזק. לעולם אל תנחש בחלק קריטי לבטיחות.'}
    },
    {
      q:{en:'What is S355J2, the steel used in your Wirtgen W200?',
         he:'מהי S355J2, הפלדה המשמשת ב-Wirtgen W200 שלך?'},
      opts:[
        {en:'Stainless steel alloy',                        he:'סגסוגת נירוסטה'},
        {en:'A hardfacing wear material',                   he:'חומר ציפוי קשה לבלאי'},
        {en:'European HSLA \u2014 equivalent to A572 Gr50', he:'HSLA אירופית \u2014 מקבילה ל-A572 Gr50'},
        {en:'Cast iron specification',                      he:'מפרט יציקת ברזל'}
      ],
      ans:2,
      exp:{en:'S355J2 is EN 10025 European structural HSLA steel. Same strength class as American A572 Gr50. Same welding procedure \u2014 E7018, preheat thick sections, slow cool.',
           he:'S355J2 היא פלדת HSLA מבנית אירופית לפי EN 10025. אותה דרגת חוזק כמו A572 Gr50 האמריקנית. אותו נוהל ריתוך \u2014 E7018, חימום מקדים בחתכים עבים, קירור איטי.'}
    },
    {
      q:{en:'Why must E7018 rods be kept in a rod oven or sealed container?',
         he:'למה חובה לשמור אלקטרודות E7018 בתנור אלקטרודות או מיכל אטום?'},
      opts:[
        {en:'To stop the flux coating from chipping off',                      he:'למנוע מציפוי הפלאקס להתפורר'},
        {en:'Moisture causes hydrogen to enter the weld and crack it later',   he:'לחות גורמת למימן לחדור ללחם ולסדוק אותו מאוחר יותר'},
        {en:'They lose current capacity if stored cold',                       he:'הן מאבדות יכולת הולכת זרם באחסון קר'},
        {en:'To keep them at striking temperature',                            he:'לשמור עליהן בטמפרטורת הצתה'}
      ],
      ans:1,
      exp:{en:'Hydrogen-induced cracking (delayed cracking) happens when moisture in the coating decomposes in the arc, releasing hydrogen into the weld metal. The crack can appear hours or days after welding \u2014 not while you\'re watching.',
           he:'סדיקה מושרית מימן (סדיקה מושהית) קורית כשלחות בציפוי מתפרקת בקשת, ומשחררת מימן למתכת הלחם. הסדק יכול להופיע שעות או ימים אחרי הריתוך \u2014 לא בזמן שאתה צופה.'}
    },
    {
      q:{en:'You need to weld an AR400 cutting edge onto a bucket. What is the correct first step?',
         he:'אתה צריך לרתך שן AR400 על דלי. מהו הצעד הראשון הנכון?'},
      opts:[
        {en:'Clean the surface and start welding',  he:'נקה את המשטח והתחל לרתך'},
        {en:'Apply anti-spatter and go',            he:'מרח חומר נגד התזות והתחל'},
        {en:'Preheat to at least 150\u00B0C first', he:'חמם מראש לפחות ל-150\u00B0C קודם'},
        {en:'Use E6013 \u2014 it runs smooth',      he:'השתמש ב-E6013 \u2014 היא רצה חלק'}
      ],
      ans:2,
      exp:{en:'AR400 is high-carbon hardened steel. Welding cold = cracking. Preheat to 150\u2013200\u00B0C, weld short passes, and allow slow cooling under a blanket.',
           he:'AR400 היא פלדה מחוסמת עם פחמן גבוה. ריתוך בקור = סדיקה. חמם מראש ל-150\u2013200\u00B0C, רתך מעברים קצרים, ואפשר קירור איטי תחת שמיכה.'}
    },
    {
      q:{en:'You\'re welding stainless steel 304 to a mild steel frame. Which filler metal?',
         he:'אתה מרתך נירוסטה 304 למסגרת פלדה רכה. איזו מתכת מילוי?'},
      opts:[
        {en:'E7018',   he:'E7018'},
        {en:'ER70S-6', he:'ER70S-6'},
        {en:'ER309L',  he:'ER309L'},
        {en:'ER308L',  he:'ER308L'}
      ],
      ans:2,
      exp:{en:'ER309L is designed for dissimilar metal joints \u2014 stainless to carbon/mild steel. ER308L is 304-to-304 only. Using carbon steel wire on stainless destroys corrosion protection at the joint.',
           he:'ER309L מתוכנן לחיבורי מתכות שונות \u2014 נירוסטה לפלדת פחמן/רכה. ER308L הוא 304-ל-304 בלבד. שימוש בתיל פלדת פחמן על נירוסטה הורס את ההגנה מפני קורוזיה במפרק.'}
    },
    {
      q:{en:'What electrode is required to weld cast iron?',
         he:'איזו אלקטרודה נדרשת לריתוך יציקת ברזל?'},
      opts:[
        {en:'E7018',                      he:'E7018'},
        {en:'E6013',                      he:'E6013'},
        {en:'E6010',                      he:'E6010'},
        {en:'ENiFe-CI (nickel-iron)',     he:'ENiFe-CI (ניקל-ברזל)'}
      ],
      ans:3,
      exp:{en:'Cast iron has 2\u20134% carbon \u2014 far too high for steel electrodes. Nickel-based rods (ENiFe-CI) are ductile enough to absorb stress without cracking. A steel rod will crack the casting almost every time.',
           he:'ליציקת ברזל יש 2\u20134% פחמן \u2014 גבוה מדי לאלקטרודות פלדה. אלקטרודות מבוססות ניקל (ENiFe-CI) גמישות מספיק לספוג מתח בלי להיסדק. אלקטרודת פלדה תסדיק את היציקה כמעט בכל פעם.'}
    },
    {
      q:{en:'After welding a thick S355J2 frame section, what should you do immediately?',
         he:'אחרי ריתוך חתך שלדה עבה מ-S355J2, מה עליך לעשות מיד?'},
      opts:[
        {en:'Quench with water to cool it fast',                           he:'כבה במים כדי לקרר מהר'},
        {en:'Leave it in open air and walk away',                          he:'השאר באוויר פתוח ולך'},
        {en:'Cover it with a welding blanket and let it cool slowly',      he:'כסה בשמיכת ריתוך ותן לזה להתקרר לאט'},
        {en:'Grind the weld smooth right away',                            he:'שחזז את הלחם חלק מיד'}
      ],
      ans:2,
      exp:{en:'Slow cooling prevents hardening and cracking in the HAZ (heat affected zone). Covering with a welding blanket \u2014 especially in cold weather \u2014 gives the weld time to cool without thermal shock.',
           he:'קירור איטי מונע התקשות וסדיקה באזור מושפע החום (HAZ). כיסוי בשמיכת ריתוך \u2014 במיוחד במזג אוויר קר \u2014 נותן ללחם זמן להתקרר ללא זעזוע חום.'}
    },
  ];

  const GLOSSARY = [
    {term:'Base metal',              heb:'\u05DE\u05EA\u05DB\u05EA \u05D1\u05E1\u05D9\u05E1',
     def:{en:'The metal being welded \u2014 as opposed to the filler metal you add.',
          he:'המתכת שמרתכים \u2014 בניגוד למתכת המילוי שמוסיפים.'}},
    {term:'Filler metal',            heb:'\u05DE\u05EA\u05DB\u05EA \u05DE\u05D9\u05DC\u05D5\u05D9 / \u05EA\u05D5\u05E1\u05E4\u05EA',
     def:{en:'The electrode or wire that melts and becomes part of the weld joint.',
          he:'האלקטרודה או התיל שנמס והופך לחלק ממפרק הלחם.'}},
    {term:'HSLA steel',              heb:'\u05E4\u05DC\u05D3\u05EA HSLA',
     def:{en:'High-Strength Low-Alloy structural steel. Stronger than mild steel. Examples: A572 Gr50, S355J2.',
          he:'פלדה מבנית חזקה דלת-סגסוגת. חזקה יותר מפלדה רכה. דוגמאות: A572 Gr50, S355J2.'}},
    {term:'S355J2',                  heb:'S355J2 \u2014 \u05E4\u05DC\u05D3\u05EA EN',
     def:{en:'European structural steel (EN 10025-2). Same strength as A572 Gr50. Used in Wirtgen machines.',
          he:'פלדה מבנית אירופית (EN 10025-2). אותו חוזק כמו A572 Gr50. משמשת במכונות Wirtgen.'}},
    {term:'A572 Grade 50',           heb:'A572 Gr50 \u2014 \u05E4\u05DC\u05D3\u05EA ASTM',
     def:{en:'North American HSLA structural steel. Used in Gehl and Mustang skid loaders.',
          he:'פלדת HSLA מבנית צפון אמריקנית. משמשת בבובקאטים Gehl ו-Mustang.'}},
    {term:'Preheat',                 heb:'\u05D7\u05D9\u05DE\u05D5\u05DD \u05DE\u05E7\u05D3\u05D9\u05DD',
     def:{en:'Heating the base metal before welding to slow the cooling rate and prevent cracking.',
          he:'חימום מתכת הבסיס לפני הריתוך כדי להאט את קצב הקירור ולמנוע סדיקה.'}},
    {term:'Interpass temperature',   heb:'\u05D8\u05DE\u05E4\u05E8\u05D8\u05D5\u05E8\u05EA \u05D1\u05D9\u05DF-\u05DE\u05E2\u05D1\u05E8\u05D9\u05DD',
     def:{en:'The minimum temperature the steel must stay at between weld passes. Usually equals the preheat temp.',
          he:'הטמפרטורה המינימלית שהפלדה חייבת להישאר בה בין מעברי ריתוך. בדרך כלל שווה לטמפרטורת החימום המקדים.'}},
    {term:'Low-hydrogen electrode',  heb:'\u05D0\u05DC\u05E7\u05D8\u05E8\u05D5\u05D3\u05D4 \u05D3\u05DC\u05EA-\u05DE\u05D9\u05DE\u05DF',
     def:{en:'An electrode (like E7018) with a coating that limits moisture/hydrogen. Critical for HSLA steel.',
          he:'אלקטרודה (כמו E7018) עם ציפוי שמגביל לחות/מימן. קריטית לפלדת HSLA.'}},
    {term:'Hydrogen cracking',       heb:'\u05E1\u05D3\u05D9\u05E7\u05D4 \u05DE\u05DE\u05D9\u05DE\u05DF',
     def:{en:'Delayed cracks caused by hydrogen trapped in the weld. Appears hours to days after welding. Prevented by dry rods and preheat.',
          he:'סדקים מושהים הנגרמים ממימן הלכוד בלחם. מופיע שעות עד ימים אחרי הריתוך. נמנע על ידי אלקטרודות יבשות וחימום מקדים.'}},
    {term:'HAZ',                     heb:'\u05D0\u05D6\u05D5\u05E8 \u05DE\u05D5\u05E9\u05E4\u05E2 \u05D7\u05D5\u05DD',
     def:{en:'Heat Affected Zone \u2014 the area of base metal next to the weld that was altered by heat but not melted. Often the weakest point.',
          he:'אזור מושפע חום \u2014 אזור מתכת הבסיס ליד הלחם ששונה על ידי חום אך לא נמס. לרוב הנקודה החלשה ביותר.'}},
    {term:'AR400',                   heb:'\u05E4\u05DC\u05D3\u05EA \u05D1\u05DC\u05D0\u05D9 AR400',
     def:{en:'Abrasion-Resistant steel, Brinell ~400. Used for cutting edges and wear liners. Difficult to weld \u2014 must preheat.',
          he:'פלדה עמידה בשחיקה, Brinell ~400. משמשת לשיני חיתוך וציפויי בלאי. קשה לריתוך \u2014 חובה לחמם מראש.'}},
    {term:'Carbon equivalent (CE)',  heb:'\u05E9\u05D5\u05D5\u05D4-\u05E2\u05E8\u05DA \u05E4\u05D7\u05DE\u05DF',
     def:{en:'A formula that predicts how crack-prone a steel is when welded. Higher CE = more preheat needed.',
          he:'נוסחה שמנבאת עד כמה פלדה נוטה להיסדק בריתוך. CE גבוה יותר = יותר חימום מקדים נדרש.'}},
    {term:'E7018',                   heb:'E7018 \u2014 \u05D0\u05DC\u05E7\u05D8\u05E8\u05D5\u05D3\u05D4',
     def:{en:'Low-hydrogen stick electrode for HSLA and structural steel. Must be stored dry. Standard for structural repair.',
          he:'אלקטרודת סטיק דלת-מימן לפלדת HSLA ומבנית. חייבת להיות מאוחסנת יבשה. סטנדרט לתיקון מבני.'}},
    {term:'ER70S-6',                 heb:'ER70S-6 \u2014 \u05EA\u05D9\u05DC MIG',
     def:{en:'Standard MIG wire for mild and HSLA steel. Used with 75/25 Ar/CO\u2082 shielding gas.',
          he:'תיל MIG סטנדרטי לפלדה רכה ו-HSLA. משמש עם גז מגן 75/25 Ar/CO\u2082.'}},
    {term:'ER309L',                  heb:'ER309L \u2014 \u05EA\u05D9\u05DC \u05E0\u05D9\u05E8\u05D5\u05E1\u05D8\u05D4',
     def:{en:'MIG/TIG wire for welding stainless steel to mild steel. The correct choice for dissimilar metals.',
          he:'תיל MIG/TIG לריתוך נירוסטה לפלדה רכה. הבחירה הנכונה למתכות שונות.'}},
    {term:'ENiFe-CI',                heb:'ENiFe-CI \u2014 \u05D0\u05DC\u05E7\u05D8\u05E8\u05D5\u05D3\u05EA \u05E0\u05D9\u05E7\u05DC',
     def:{en:'Nickel-iron electrode for welding cast iron. Soft enough to absorb stress without cracking the casting.',
          he:'אלקטרודת ניקל-ברזל לריתוך יציקת ברזל. רכה מספיק לספוג מתח בלי לסדוק את היציקה.'}},
    {term:'Stringer bead',           heb:'\u05D2\u05D5\u05DC\u05DC \u05D9\u05E9\u05E8',
     def:{en:'A weld bead with no sideways motion. Preferred for HSLA and high-strength steels to limit heat input.',
          he:'גולל ריתוך ללא תנועה צידית. מועדף לפלדות HSLA וחזקות כדי להגביל כניסת חום.'}},
    {term:'Weave bead',              heb:'\u05D2\u05D5\u05DC\u05DC \u05DE\u05D5\u05E6\u05DC\u05D1',
     def:{en:'A bead with side-to-side oscillation. Used on wide cap passes but kept minimal on high-strength steel.',
          he:'גולל עם תנודה מצד לצד. משמש במעברי כיסוי רחבים אך נשמר מינימלי על פלדה חזקה.'}},
    {term:'Root pass',               heb:'\u05DE\u05E2\u05D1\u05E8 \u05E9\u05D5\u05E8\u05E9',
     def:{en:'The first weld pass that fuses the two base metal pieces. Must fully penetrate the joint.',
          he:'מעבר הריתוך הראשון שמאחה את שני חלקי מתכת הבסיס. חייב לחדור את המפרק במלואו.'}},
    {term:'Slow cooling',            heb:'\u05E7\u05D9\u05E8\u05D5\u05E8 \u05D0\u05D9\u05D8\u05D9',
     def:{en:'Covering a weld with a blanket to prevent rapid cooling \u2014 which causes cracking in HSLA, AR, and cast iron.',
          he:'כיסוי לחם בשמיכה למניעת קירור מהיר \u2014 שגורם לסדיקה ב-HSLA, AR ויציקת ברזל.'}},
    {term:'Spark test',              heb:'\u05D1\u05D3\u05D9\u05E7\u05EA \u05E0\u05D9\u05E6\u05D5\u05E6\u05D5\u05EA',
     def:{en:'Briefly grinding metal on a bench grinder and reading the spark pattern to identify the steel type.',
          he:'השחזה קצרה של מתכת על משחזת שולחן וקריאת דפוס הניצוצות לזיהוי סוג הפלדה.'}},
    {term:'Post-weld heat treatment', heb:'\u05D8\u05D9\u05E4\u05D5\u05DC \u05D7\u05D5\u05DD \u05DC\u05D0\u05D7\u05E8 \u05E8\u05D9\u05EA\u05D5\u05DA',
     def:{en:'Controlled reheating after welding to relieve residual stress. Required on some alloy steels.',
          he:'חימום מבוקר לאחר ריתוך לשחרור מתח שיורי. נדרש בחלק מפלדות הסגסוגת.'}},
  ];

  /* ─── State ───────────────────────────────── */
  let quizIdx = 0, quizScore = 0, quizAnswered = false;
  let stylesInjected = false;

  /* ─── Helpers ─────────────────────────────── */
  function injectStyles() {
    if (stylesInjected) return;
    const el = document.createElement('style');
    el.id = 'metals-module-css';
    el.textContent = CSS;
    document.head.appendChild(el);
    stylesInjected = true;
  }

  function drawSparkSVG(s) {
    const lines = [];
    const seed = s.id.charCodeAt(0);
    for (let i = 0; i < s.count; i++) {
      const angle = -35 + (i / s.count) * 70 + ((i * seed * 7) % 11 - 5);
      const len   = s.streamLen * (0.55 + ((i * seed * 13) % 100) / 220);
      const r  = angle * Math.PI / 180;
      const x2 = (35 + Math.cos(r) * len).toFixed(1);
      const y2 = (40 - Math.sin(r) * len).toFixed(1);
      const op = (0.4 + (i % 5) * 0.12).toFixed(2);
      lines.push(`<line x1="35" y1="40" x2="${x2}" y2="${y2}" stroke="${s.color}" stroke-width="${0.8 + (i%3)*0.4}" opacity="${op}" stroke-linecap="round"/>`);
      if (s.burst && i % 2 === 0) {
        const bx = 35 + Math.cos(r) * len * 0.78;
        const by = 40 - Math.sin(r) * len * 0.78;
        for (let j = 0; j < 4; j++) {
          const ba = r + (j - 1.5) * 0.38;
          const bl = 5 + j * 4;
          lines.push(`<line x1="${bx.toFixed(1)}" y1="${by.toFixed(1)}" x2="${(bx + Math.cos(ba)*bl).toFixed(1)}" y2="${(by - Math.sin(ba)*bl).toFixed(1)}" stroke="${s.color}" stroke-width=".6" opacity=".55" stroke-linecap="round"/>`);
        }
      }
    }
    return `<svg viewBox="0 0 130 46" width="100%" height="46" style="overflow:visible">
      <circle cx="35" cy="40" r="5" fill="#333" stroke="#555" stroke-width="1"/>
      ${lines.join('')}
    </svg>`;
  }

  /* ─── Tab HTML builders ───────────────────── */
  function buildMetalsTab() {
    const chips = METALS.map(m => `
      <div class="metal-chip" id="mchip-${m.id}" onclick="MetalsModule._selectMetal('${m.id}')">
        <div class="m-swatch" style="background:${m.color}"></div>
        <div class="m-chip-name">${m.name}</div>
        <div class="m-chip-tag">${m.tag}</div>
      </div>`).join('');

    return `
      <div class="metals-sec-hdr"><div class="metals-sec-dot"></div><h2>${t('Common metals in the shop', 'מתכות נפוצות בסדנה')}</h2></div>
      <div class="metal-chip-grid">${chips}</div>
      <div id="m-metal-detail">
        <div class="m-placeholder">
          <div class="ph-icon">🔩</div>
          ${t('Select a metal above to see welding data', 'בחר מתכת למעלה כדי לראות נתוני ריתוך')}
        </div>
      </div>`;
  }

  function buildSparksTab() {
    const chips = SPARKS.map(s => `
      <div class="spark-chip" id="sc-${s.id}" onclick="MetalsModule._selectSpark('${s.id}')">
        <div class="spark-chip-name">${s.name}</div>
        <div class="spark-chip-sub">${loc(s.sub)}</div>
        <div class="spark-svg-wrap">${drawSparkSVG(s)}</div>
      </div>`).join('');

    return `
      <div class="metals-sec-hdr"><div class="metals-sec-dot"></div><h2>${t('Spark test guide', 'מדריך בדיקת ניצוץ')}</h2></div>
      <p style="font-size:13px;color:#707070;margin-bottom:14px;line-height:1.5">
        ${t(
          'Grind the metal briefly on a bench grinder in a dim area. Read the sparks to identify the steel before you pick up an electrode.',
          'השחז את המתכת לרגע על משחזת שולחן באזור מוחשך. קרא את הניצוצות כדי לזהות את הפלדה לפני שתרים אלקטרודה.'
        )}
      </p>
      <div class="spark-grid-m">${chips}</div>
      <div id="m-spark-detail">
        <div class="m-placeholder">
          <div class="ph-icon">✨</div>
          ${t('Select a steel type above', 'בחר סוג פלדה למעלה')}
        </div>
      </div>`;
  }

  function buildQuizTab() {
    quizIdx = 0; quizScore = 0; quizAnswered = false;
    return `
      <div class="metals-sec-hdr"><div class="metals-sec-dot"></div><h2>${t('Test yourself', 'בחן את עצמך')}</h2></div>
      <div id="m-quiz-area"></div>`;
  }

  function buildGlossaryTab() {
    const items = GLOSSARY.map(g => `
      <div class="gloss-item">
        <div class="gloss-term"><span class="gloss-heb">${g.heb}</span>${g.term}</div>
        <div class="gloss-def">${loc(g.def)}</div>
      </div>`).join('');

    return `
      <div class="metals-sec-hdr"><div class="metals-sec-dot"></div><h2>${t('Welding metals glossary', 'מילון מתכות ריתוך')}</h2></div>
      <div class="gloss-search-wrap">
        <span class="gloss-search-icon">🔍</span>
        <input class="gloss-search-input" type="text" placeholder="${t('Search English or Hebrew...', 'חפש באנגלית או בעברית...')}"
               oninput="MetalsModule._filterGloss(this.value)">
      </div>
      <div class="gloss-list" id="m-gloss-list">${items}</div>`;
  }

  /* ─── Actions ─────────────────────────────── */
  function selectMetal(id) {
    document.querySelectorAll('.metal-chip').forEach(c => c.classList.remove('active'));
    const chip = document.getElementById('mchip-' + id);
    if (chip) chip.classList.add('active');
    const m = METALS.find(x => x.id === id);
    if (!m) return;

    const diffDots = Array.from({length:4}, (_,i) =>
      `<div class="m-diff-dot ${i < m.difficulty ? 'filled' : 'empty'}"></div>`
    ).join('');

    const propsHTML = m.props.map(p => `
      <div class="m-prop-cell">
        <div class="m-prop-label">${loc(p.label)}</div>
        <div class="m-prop-val">${loc(p.val)}</div>
      </div>`).join('');

    const barsHTML = m.bars.map(b => `
      <div class="m-bar-row">
        <div class="m-bar-meta"><span>${loc(b.label)}</span><span>${b.val}%</span></div>
        <div class="m-bar-track">
          <div class="m-bar-fill" style="width:${b.val}%;background:${b.color}"></div>
        </div>
      </div>`).join('');

    const weldHTML = m.weld.map(w => `
      <div class="m-weld-row">
        <div class="m-weld-icon" style="background:${w.bg};color:#fff">${w.icon}</div>
        <span class="m-weld-key">${loc(w.label)}</span>
        <span class="m-weld-val">${loc(w.val)}</span>
      </div>`).join('');

    document.getElementById('m-metal-detail').innerHTML = `
      <div class="m-detail-card">
        <div class="m-detail-hdr">
          <div class="m-detail-swatch" style="background:${m.color}"></div>
          <div class="m-detail-hdr-text">
            <h3>${m.name}</h3>
            <div class="m-std">${m.tag}</div>
          </div>
          <div class="m-difficulty">${diffDots}</div>
        </div>
        <div class="m-detail-desc">${loc(m.desc)}</div>
        <div class="m-props-grid">${propsHTML}</div>
        <div class="m-bars-sec">${barsHTML}</div>
        <div class="m-weld-spec">
          ${weldHTML}
          <div class="m-weld-row" style="margin-top:4px">
            <div class="m-weld-icon" style="background:#37474f;color:#fff">★</div>
            <span class="m-weld-key">${t('Used in', 'שימושים')}</span>
            <span class="m-weld-val" style="color:#aaa;font-weight:400">${loc(m.realWorld)}</span>
          </div>
        </div>
        <div class="m-tip-box m-tip-${m.tip.type}">${loc(m.tip.text)}</div>
      </div>`;
  }

  function selectSpark(id) {
    document.querySelectorAll('.spark-chip').forEach(c => c.classList.remove('active'));
    const chip = document.getElementById('sc-' + id);
    if (chip) chip.classList.add('active');
    const s = SPARKS.find(x => x.id === id);
    if (!s) return;
    document.getElementById('m-spark-detail').innerHTML = `
      <div class="m-detail-card">
        <div class="m-detail-hdr">
          <div class="m-detail-swatch" style="background:${s.color};border-color:rgba(255,255,255,.15)"></div>
          <div class="m-detail-hdr-text">
            <h3>${s.name}</h3>
            <div class="m-std">${loc(s.sub)}</div>
          </div>
        </div>
        <div class="m-detail-desc">${loc(s.desc)}</div>
        <div class="m-tip-box m-tip-${s.tipType}"><strong>${t('What to do:', 'מה לעשות:')}</strong> ${loc(s.action)}</div>
      </div>`;
  }

  function renderQuiz() {
    const area = document.getElementById('m-quiz-area');
    if (!area) return;

    if (quizIdx >= QUIZ.length) {
      const pct = Math.round((quizScore / QUIZ.length) * 100);
      const msg = pct >= 75 ? t('Nice work! 💪', 'עבודה יפה! 💪')
                : pct >= 50 ? t('Good effort \u2014 keep at it.', 'מאמץ טוב \u2014 המשך כך.')
                : t('Keep learning \u2014 every weld teaches you something.', 'המשך ללמוד \u2014 כל לחם מלמד אותך משהו.');
      area.innerHTML = `
        <div class="quiz-card">
          <div class="quiz-done">
            <div class="score-big">${quizScore}/${QUIZ.length}</div>
            <div style="font-size:16px;color:#f0f0f0;font-weight:600;margin-bottom:6px">${pct}% ${t('correct', 'נכון')}</div>
            <div>${msg}</div>
            <button class="quiz-restart" onclick="MetalsModule._restartQuiz()">${t('Try again', 'נסה שוב')} ↺</button>
          </div>
        </div>`;
      return;
    }

    quizAnswered = false;
    const q = QUIZ[quizIdx];
    area.innerHTML = `
      <div class="quiz-score-bar">
        <span>${t('Question', 'שאלה')} ${quizIdx + 1} ${t('of', 'מתוך')} ${QUIZ.length}</span>
        <span class="quiz-score-val">${quizScore} ${t('correct', 'נכון')}</span>
      </div>
      <div class="quiz-card">
        <div class="quiz-q">${loc(q.q)}</div>
        <div class="quiz-opts">
          ${q.opts.map((o,i) => `
            <button class="quiz-opt" id="mopt-${i}" onclick="MetalsModule._answerQuiz(${i})">${loc(o)}</button>
          `).join('')}
        </div>
        <div class="quiz-feedback" id="m-quiz-feedback"></div>
        <div class="quiz-next-row">
          <button class="quiz-next" id="m-quiz-next" style="display:none" onclick="MetalsModule._nextQuestion()">
            ${quizIdx + 1 < QUIZ.length ? t('Next question', 'שאלה הבאה') + ' \u2192' : t('See results', 'ראה תוצאות') + ' \u2192'}
          </button>
        </div>
      </div>`;
  }

  function answerQuiz(i) {
    if (quizAnswered) return;
    quizAnswered = true;
    const q = QUIZ[quizIdx];
    document.querySelectorAll('.quiz-opt').forEach(b => b.disabled = true);
    document.getElementById('mopt-' + i).classList.add(i === q.ans ? 'correct' : 'wrong');
    document.getElementById('mopt-' + q.ans).classList.add('correct');
    if (i === q.ans) quizScore++;
    document.getElementById('m-quiz-feedback').textContent = loc(q.exp);
    document.getElementById('m-quiz-next').style.display = 'block';
    quizIdx++;
  }

  function filterGloss(val) {
    const q = (val || '').toLowerCase();
    const items = q
      ? GLOSSARY.filter(g =>
          g.term.toLowerCase().includes(q) ||
          g.heb.includes(q) ||
          (typeof g.def === 'object' ? (g.def.en.toLowerCase().includes(q) || g.def.he.includes(q)) : g.def.toLowerCase().includes(q)))
      : GLOSSARY;

    const list = document.getElementById('m-gloss-list');
    if (!list) return;
    list.innerHTML = items.length
      ? items.map(g => `
          <div class="gloss-item">
            <div class="gloss-term"><span class="gloss-heb">${g.heb}</span>${g.term}</div>
            <div class="gloss-def">${loc(g.def)}</div>
          </div>`).join('')
      : `<div class="gloss-no-results">${t('No matches found.', 'לא נמצאו תוצאות.')}</div>`;
  }

  function showTab(name) {
    document.querySelectorAll('.metals-pane').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.metals-tab-btn').forEach(b => b.classList.remove('active'));
    const pane = document.getElementById('mpane-' + name);
    const btn  = document.getElementById('mtab-'  + name);
    if (pane) pane.classList.add('active');
    if (btn)  btn.classList.add('active');
    if (name === 'quiz') renderQuiz();
  }

  /* ─── Public API ──────────────────────────── */
  return {
    render() {
      injectStyles();

      document.getElementById('main-content').innerHTML = `
      <div class="metals-wrap fade-up">
        <div class="page-header">
          <div class="page-title">${t('Metal', 'סוגי')} <span>${t('Types', 'מתכות')}</span></div>
          <div class="page-sub">${t('Steel grades \u00B7 Weld specs \u00B7 Spark test \u00B7 Glossary', 'דרגות פלדה \u00B7 מפרטי ריתוך \u00B7 בדיקת ניצוץ \u00B7 מילון')}</div>
        </div>

        <nav class="metals-tab-nav">
          <button class="metals-tab-btn active" id="mtab-metals"  onclick="MetalsModule._showTab('metals')">${t('Metals', 'מתכות')}</button>
          <button class="metals-tab-btn"         id="mtab-sparks"  onclick="MetalsModule._showTab('sparks')">${t('Spark Test', 'בדיקת ניצוץ')}</button>
          <button class="metals-tab-btn"         id="mtab-quiz"    onclick="MetalsModule._showTab('quiz')">${t('Quiz', 'חידון')}</button>
          <button class="metals-tab-btn"         id="mtab-glossary" onclick="MetalsModule._showTab('glossary')">${t('Glossary', 'מילון')}</button>
        </nav>

        <div id="mpane-metals"   class="metals-pane active">${buildMetalsTab()}</div>
        <div id="mpane-sparks"   class="metals-pane">${buildSparksTab()}</div>
        <div id="mpane-quiz"     class="metals-pane">${buildQuizTab()}</div>
        <div id="mpane-glossary" class="metals-pane">${buildGlossaryTab()}</div>

        <div class="module-footer">${t(
          'Preheat and filler recommendations are field guidelines. For critical structural repairs, consult applicable welding procedure specifications (WPS).',
          'המלצות חימום מקדים ומתכת מילוי הן הנחיות שטח. לתיקונים מבניים קריטיים, התייעץ עם מפרטי נוהלי ריתוך (WPS) רלוונטיים.'
        )}</div>
      </div>`;

      // Render quiz after DOM is ready
      renderQuiz();
    },

    // Exposed for inline onclick handlers
    _selectMetal: selectMetal,
    _selectSpark:  selectSpark,
    _showTab:      showTab,
    _answerQuiz:   answerQuiz,
    _nextQuestion() { renderQuiz(); },
    _restartQuiz() { quizIdx = 0; quizScore = 0; quizAnswered = false; renderQuiz(); },
    _filterGloss:  filterGloss,
  };
})();
