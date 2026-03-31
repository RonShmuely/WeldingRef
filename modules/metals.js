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

  /* ─── Data ────────────────────────────────── */
  const METALS = [
    {
      id:'mild', name:'Mild steel', tag:'A36 / S235', color:'#888780', difficulty:1,
      desc:'The most common metal in any fabrication shop. Low carbon (under 0.3%), bends without cracking, and welds easily with almost any process. Your default material for frames, brackets, general repairs, and bucket shells.',
      props:[
        {label:'Yield strength',  val:'250 MPa'},
        {label:'Tensile strength',val:'400–500 MPa'},
        {label:'Carbon content',  val:'< 0.30%'},
        {label:'Weldability',     val:'Very easy'},
        {label:'Preheat needed',  val:'Usually none'},
        {label:'Polarity (SMAW)', val:'AC or DC+'},
      ],
      bars:[
        {label:'Strength',   val:30, color:'#43a047'},
        {label:'Hardness',   val:25, color:'#43a047'},
        {label:'Weldability',val:95, color:'#1e88e5'},
        {label:'Crack risk', val:8,  color:'#43a047'},
      ],
      weld:[
        {icon:'E', bg:'#c62828', label:'Electrode (SMAW)', val:'E6013 or E7018'},
        {icon:'W', bg:'#1565c0', label:'Wire (MIG)',       val:'ER70S-6'},
        {icon:'G', bg:'#2e7d32', label:'Gas (MIG)',        val:'75% Ar / 25% CO₂'},
        {icon:'A', bg:'#e65100', label:'Amps (3.2mm)',     val:'100–140 A'},
      ],
      realWorld:'Bucket shells, general frames, brackets, walkways',
      tip:{type:'good', text:'<strong>Start here.</strong> Mild steel forgives beginner mistakes. If a weld looks bad, grind it off and retry — the base metal will be fine. Master this before moving to HSLA.'}
    },
    {
      id:'hsla', name:'HSLA steel', tag:'A572 Gr50 / S355', color:'#1e88e5', difficulty:2,
      desc:'High-Strength Low-Alloy. Stronger than mild steel but with a similar carbon content. Engineers use HSLA to build lighter structures that carry the same load. Your Gehl and Mustang skid loader frames are HSLA steel.',
      props:[
        {label:'Yield strength',  val:'345–355 MPa'},
        {label:'Tensile strength',val:'450–630 MPa'},
        {label:'Carbon content',  val:'≤ 0.23%'},
        {label:'Weldability',     val:'Good'},
        {label:'Preheat needed',  val:'Yes — thick sections'},
        {label:'Polarity (SMAW)', val:'DC+'},
      ],
      bars:[
        {label:'Strength',   val:62, color:'#fb8c00'},
        {label:'Hardness',   val:45, color:'#43a047'},
        {label:'Weldability',val:80, color:'#1e88e5'},
        {label:'Crack risk', val:30, color:'#fb8c00'},
      ],
      weld:[
        {icon:'E', bg:'#c62828', label:'Electrode (SMAW)', val:'E7018 — low-hydrogen only'},
        {icon:'W', bg:'#1565c0', label:'Wire (MIG)',       val:'ER70S-6'},
        {icon:'G', bg:'#2e7d32', label:'Gas (MIG)',        val:'75% Ar / 25% CO₂'},
        {icon:'P', bg:'#6a1b9a', label:'Preheat',          val:'100–150°C if section > 12mm'},
      ],
      realWorld:'Gehl/Mustang lift arms, skid steer frames, structural beams',
      tip:{type:'warn', text:'<strong>Use low-hydrogen rods only.</strong> Moisture in the electrode coating causes hydrogen to enter the weld and crack it — hours or even days later. Always store E7018 in a rod oven or sealed container. Never use E6013 on HSLA.'}
    },
    {
      id:'s355', name:'S355J2', tag:'EN 10025 — European', color:'#185FA5', difficulty:2,
      desc:'The European equivalent of A572 Gr50 — same strength class, just named to EN standards. Your Wirtgen W200 and W50Ri are made in Germany and follow EN 10025. When you repair a Wirtgen frame, you are welding S355J2.',
      props:[
        {label:'Yield strength',  val:'355 MPa'},
        {label:'Tensile strength',val:'490–630 MPa'},
        {label:'Carbon content',  val:'≤ 0.20%'},
        {label:'Weldability',     val:'Good'},
        {label:'Preheat needed',  val:'100°C if section > 20mm'},
        {label:'Polarity (SMAW)', val:'DC+'},
      ],
      bars:[
        {label:'Strength',   val:62, color:'#fb8c00'},
        {label:'Hardness',   val:45, color:'#43a047'},
        {label:'Weldability',val:82, color:'#1e88e5'},
        {label:'Crack risk', val:28, color:'#43a047'},
      ],
      weld:[
        {icon:'E', bg:'#c62828', label:'Electrode (SMAW)', val:'E7018 / Zika Z-4'},
        {icon:'W', bg:'#1565c0', label:'Wire (MIG)',       val:'ER70S-6 (ISO: G4Si1)'},
        {icon:'G', bg:'#2e7d32', label:'Gas (MIG)',        val:'75% Ar / 25% CO₂'},
        {icon:'P', bg:'#6a1b9a', label:'Preheat',          val:'100°C for sections > 20mm'},
      ],
      realWorld:'Wirtgen W200 / W50Ri chassis, crawler frames, European equipment',
      tip:{type:'info', text:'<strong>Same as A572 Gr50 in practice.</strong> The name is different because Wirtgen follows European EN 10025 steel standards. Treat it exactly like HSLA — E7018, preheat on thick sections, slow cool under a blanket.'}
    },
    {
      id:'ar400', name:'AR400', tag:'Wear-resistant plate', color:'#d85a30', difficulty:3,
      desc:'Abrasion-Resistant steel, quenched and tempered to Brinell hardness ~400. Used for bucket cutting edges, milling machine wear liners, and chutes. The high carbon equivalent means it is highly prone to cracking if welded cold.',
      props:[
        {label:'Yield strength',  val:'1000+ MPa'},
        {label:'Tensile strength',val:'1250 MPa'},
        {label:'Carbon equiv.',   val:'~0.55+ CE (high)'},
        {label:'Weldability',     val:'Difficult'},
        {label:'Preheat needed',  val:'150–200°C — mandatory'},
        {label:'Polarity (SMAW)', val:'DC+'},
      ],
      bars:[
        {label:'Strength',   val:95, color:'#e53935'},
        {label:'Hardness',   val:92, color:'#e53935'},
        {label:'Weldability',val:30, color:'#e53935'},
        {label:'Crack risk', val:88, color:'#e53935'},
      ],
      weld:[
        {icon:'E', bg:'#c62828', label:'Electrode (SMAW)', val:'E8018-G for structural joins'},
        {icon:'E', bg:'#6a1b9a', label:'Hardfacing rod',   val:'Chromium carbide overlay'},
        {icon:'P', bg:'#6a1b9a', label:'Preheat',          val:'150–200°C — no exceptions'},
        {icon:'C', bg:'#1565c0', label:'Cool',             val:'Cover with blanket, slow cool'},
      ],
      realWorld:'Bucket cutting edges, Wirtgen milling drum liners, chutes, hoppers',
      tip:{type:'warn', text:'<strong>Never weld AR400 cold.</strong> Preheat to at least 150°C across the whole part, not just the repair zone. Weld short passes. After welding, immediately cover with a welding blanket and let it cool for hours. Fast cooling = guaranteed cracks.'}
    },
    {
      id:'cast', name:'Cast iron', tag:'Grey / ductile iron', color:'#555', difficulty:4,
      desc:'Found in engine blocks, pump housings, gearboxes, and old machine frames. Very high carbon (2–4%) makes it brittle — it cracks from both mechanical shock and thermal shock during welding. Requires special nickel electrodes and very controlled heating and cooling.',
      props:[
        {label:'Tensile strength',val:'200–400 MPa (brittle)'},
        {label:'Carbon content',  val:'2–4% — extremely high'},
        {label:'Weldability',     val:'Very difficult'},
        {label:'Preheat needed',  val:'200–300°C — entire part'},
        {label:'Electrode type',  val:'Nickel-based only'},
        {label:'Cool rate',       val:'Very slow — hours'},
      ],
      bars:[
        {label:'Strength',   val:28, color:'#fb8c00'},
        {label:'Hardness',   val:70, color:'#fb8c00'},
        {label:'Weldability',val:15, color:'#e53935'},
        {label:'Crack risk', val:96, color:'#e53935'},
      ],
      weld:[
        {icon:'E', bg:'#c62828', label:'Electrode (SMAW)', val:'ENiFe-CI (nickel-iron rod)'},
        {icon:'P', bg:'#6a1b9a', label:'Preheat',          val:'200–300°C — whole casting'},
        {icon:'T', bg:'#1565c0', label:'Technique',        val:'Short passes, peen each bead'},
        {icon:'C', bg:'#2e7d32', label:'Cool',             val:'Bury in dry sand or vermiculite'},
      ],
      realWorld:'Engine blocks, gearbox housings, pump bodies, old machine bases',
      tip:{type:'warn', text:'<strong>Preheat the entire casting</strong> — not just the repair area. Use only nickel-based electrodes. After each pass, peen the bead lightly while hot to relieve stress. Let it cool buried in insulating material for many hours. A crack here is a scrapped part.'}
    },
    {
      id:'stainless', name:'Stainless', tag:'304 / 309L / 316', color:'#bdbdbd', difficulty:3,
      desc:'Contains 10%+ chromium which forms a passive oxide layer that prevents rust. Heat spreads slowly, causing distortion. You must use matching filler metal — the wrong wire destroys the corrosion resistance at the weld joint.',
      props:[
        {label:'Yield strength',  val:'205–310 MPa'},
        {label:'Tensile strength',val:'515–620 MPa'},
        {label:'Carbon content',  val:'< 0.08%'},
        {label:'Weldability',     val:'Moderate (TIG best)'},
        {label:'Preheat needed',  val:'Not usually — control heat'},
        {label:'Polarity (SMAW)', val:'DC+'},
      ],
      bars:[
        {label:'Strength',   val:48, color:'#43a047'},
        {label:'Hardness',   val:52, color:'#43a047'},
        {label:'Weldability',val:55, color:'#fb8c00'},
        {label:'Crack risk', val:22, color:'#43a047'},
      ],
      weld:[
        {icon:'E', bg:'#c62828', label:'Electrode (SMAW)', val:'E308L-16 (304 to 304)'},
        {icon:'W', bg:'#1565c0', label:'Wire (MIG/TIG)',   val:'ER308L or ER309L'},
        {icon:'G', bg:'#2e7d32', label:'Gas',              val:'100% Ar (TIG) / Tri-mix (MIG)'},
        {icon:'D', bg:'#6a1b9a', label:'Dissimilar',       val:'ER309L — SS to mild steel'},
      ],
      realWorld:'Hydraulic tanks, food equipment, marine parts, fluid lines',
      tip:{type:'info', text:'<strong>Dedicated tools only.</strong> Never use carbon steel brushes or grinders on stainless — contamination causes rust spots. Keep heat input low to avoid warping. Back-purge with argon on TIG root passes or the underside will oxidise (turns gold/blue/black).'}
    },
  ];

  const SPARKS = [
    {
      id:'mild_sp', name:'Mild steel', sub:'A36 / S235 — easy to weld',
      desc:'Long, flowing yellow-orange streamers. Few or no bursts at the tips. Sparks travel far from the wheel and fan out gently. The most common pattern you will see.',
      action:'Safe to weld with E6013 or E7018. No preheat needed on normal thickness.',
      tipType:'good', color:'#F5A623', burst:false, streamLen:90, count:8,
    },
    {
      id:'hsla_sp', name:'HSLA / S355', sub:'A572 Gr50 — skid loaders, Wirtgen',
      desc:'Similar to mild steel but slightly shorter and brighter. Small bursts appear near the tips — caused by vanadium and niobium alloying elements.',
      action:'Use E7018 only — low-hydrogen. Preheat sections over 12mm.',
      tipType:'info', color:'#FFD54F', burst:true, streamLen:68, count:9,
    },
    {
      id:'ar_sp', name:'AR400 / hardened', sub:'Wear plate, tool steel',
      desc:'Short, intensely bright white sparks. Dense, explosive burst pattern close to the wheel. Much more violent-looking than mild steel.',
      action:'STOP — preheat to 150°C+ before welding. Use E8018-G. Never cold-weld AR plate.',
      tipType:'warn', color:'#FFFFFF', burst:true, streamLen:30, count:16,
    },
    {
      id:'cast_sp', name:'Cast iron', sub:'Engine blocks, housings',
      desc:'Very short, dull red sparks. Almost no burst. The stream is thin, sparse, and weak-looking. Unmistakable once you know what to look for.',
      action:'Requires ENiFe-CI nickel rod. Preheat entire part to 200–300°C. Never weld cold.',
      tipType:'warn', color:'#EF6C00', burst:false, streamLen:18, count:4,
    },
  ];

  const QUIZ = [
    {
      q:'Spark test shows long yellow streamers, almost no bursts. What metal is this most likely?',
      opts:['AR400 wear plate','Mild steel (A36)','Cast iron','Stainless steel'],
      ans:1, exp:'Long, gentle yellow streamers = mild steel. Easy to weld, no special procedure needed.'
    },
    {
      q:'Your Gehl skid loader lift arm has cracked. Which electrode should you use?',
      opts:['E6013 — it\'s fine for any steel','E7018 — low-hydrogen','E6010 — deep penetration','Any rod available'],
      ans:1, exp:'Lift arms are HSLA (A572 Gr50). E7018 is mandatory — it matches the steel strength and is low-hydrogen. E6013 is too soft and will not match strength. Never guess on a safety-critical part.'
    },
    {
      q:'What is S355J2, the steel used in your Wirtgen W200?',
      opts:['Stainless steel alloy','A hardfacing wear material','European HSLA — equivalent to A572 Gr50','Cast iron specification'],
      ans:2, exp:'S355J2 is EN 10025 European structural HSLA steel. Same strength class as American A572 Gr50. Same welding procedure — E7018, preheat thick sections, slow cool.'
    },
    {
      q:'Why must E7018 rods be kept in a rod oven or sealed container?',
      opts:['To stop the flux coating from chipping off','Moisture causes hydrogen to enter the weld and crack it later','They lose current capacity if stored cold','To keep them at striking temperature'],
      ans:1, exp:'Hydrogen-induced cracking (delayed cracking) happens when moisture in the coating decomposes in the arc, releasing hydrogen into the weld metal. The crack can appear hours or days after welding — not while you\'re watching.'
    },
    {
      q:'You need to weld an AR400 cutting edge onto a bucket. What is the correct first step?',
      opts:['Clean the surface and start welding','Apply anti-spatter and go','Preheat to at least 150°C first','Use E6013 — it runs smooth'],
      ans:2, exp:'AR400 is high-carbon hardened steel. Welding cold = cracking. Preheat to 150–200°C, weld short passes, and allow slow cooling under a blanket.'
    },
    {
      q:'You\'re welding stainless steel 304 to a mild steel frame. Which filler metal?',
      opts:['E7018','ER70S-6','ER309L','ER308L'],
      ans:2, exp:'ER309L is designed for dissimilar metal joints — stainless to carbon/mild steel. ER308L is 304-to-304 only. Using carbon steel wire on stainless destroys corrosion protection at the joint.'
    },
    {
      q:'What electrode is required to weld cast iron?',
      opts:['E7018','E6013','E6010','ENiFe-CI (nickel-iron)'],
      ans:3, exp:'Cast iron has 2–4% carbon — far too high for steel electrodes. Nickel-based rods (ENiFe-CI) are ductile enough to absorb stress without cracking. A steel rod will crack the casting almost every time.'
    },
    {
      q:'After welding a thick S355J2 frame section, what should you do immediately?',
      opts:['Quench with water to cool it fast','Leave it in open air and walk away','Cover it with a welding blanket and let it cool slowly','Grind the weld smooth right away'],
      ans:2, exp:'Slow cooling prevents hardening and cracking in the HAZ (heat affected zone). Covering with a welding blanket — especially in cold weather — gives the weld time to cool without thermal shock.'
    },
  ];

  const GLOSSARY = [
    {term:'Base metal',              heb:'מתכת בסיס',             def:'The metal being welded — as opposed to the filler metal you add.'},
    {term:'Filler metal',            heb:'מתכת מילוי / תוספת',    def:'The electrode or wire that melts and becomes part of the weld joint.'},
    {term:'HSLA steel',              heb:'פלדת HSLA',              def:'High-Strength Low-Alloy structural steel. Stronger than mild steel. Examples: A572 Gr50, S355J2.'},
    {term:'S355J2',                  heb:'S355J2 — פלדת EN',       def:'European structural steel (EN 10025-2). Same strength as A572 Gr50. Used in Wirtgen machines.'},
    {term:'A572 Grade 50',           heb:'A572 Gr50 — פלדת ASTM',  def:'North American HSLA structural steel. Used in Gehl and Mustang skid loaders.'},
    {term:'Preheat',                 heb:'חימום מקדים',             def:'Heating the base metal before welding to slow the cooling rate and prevent cracking.'},
    {term:'Interpass temperature',   heb:'טמפרטורת בין-מעברים',   def:'The minimum temperature the steel must stay at between weld passes. Usually equals the preheat temp.'},
    {term:'Low-hydrogen electrode',  heb:'אלקטרודה דלת-מימן',      def:'An electrode (like E7018) with a coating that limits moisture/hydrogen. Critical for HSLA steel.'},
    {term:'Hydrogen cracking',       heb:'סדיקה ממימן',             def:'Delayed cracks caused by hydrogen trapped in the weld. Appears hours to days after welding. Prevented by dry rods and preheat.'},
    {term:'HAZ',                     heb:'אזור מושפע חום',          def:'Heat Affected Zone — the area of base metal next to the weld that was altered by heat but not melted. Often the weakest point.'},
    {term:'AR400',                   heb:'פלדת בלאי AR400',         def:'Abrasion-Resistant steel, Brinell ~400. Used for cutting edges and wear liners. Difficult to weld — must preheat.'},
    {term:'Carbon equivalent (CE)',  heb:'שווה-ערך פחמן',           def:'A formula that predicts how crack-prone a steel is when welded. Higher CE = more preheat needed.'},
    {term:'E7018',                   heb:'E7018 — אלקטרודה',        def:'Low-hydrogen stick electrode for HSLA and structural steel. Must be stored dry. Standard for structural repair.'},
    {term:'ER70S-6',                 heb:'ER70S-6 — תיל MIG',       def:'Standard MIG wire for mild and HSLA steel. Used with 75/25 Ar/CO₂ shielding gas.'},
    {term:'ER309L',                  heb:'ER309L — תיל נירוסטה',    def:'MIG/TIG wire for welding stainless steel to mild steel. The correct choice for dissimilar metals.'},
    {term:'ENiFe-CI',                heb:'ENiFe-CI — אלקטרודת ניקל',def:'Nickel-iron electrode for welding cast iron. Soft enough to absorb stress without cracking the casting.'},
    {term:'Stringer bead',           heb:'גולל ישר',                def:'A weld bead with no sideways motion. Preferred for HSLA and high-strength steels to limit heat input.'},
    {term:'Weave bead',              heb:'גולל מוצלב',              def:'A bead with side-to-side oscillation. Used on wide cap passes but kept minimal on high-strength steel.'},
    {term:'Root pass',               heb:'מעבר שורש',               def:'The first weld pass that fuses the two base metal pieces. Must fully penetrate the joint.'},
    {term:'Slow cooling',            heb:'קירור איטי',              def:'Covering a weld with a blanket to prevent rapid cooling — which causes cracking in HSLA, AR, and cast iron.'},
    {term:'Spark test',              heb:'בדיקת ניצוצות',           def:'Briefly grinding metal on a bench grinder and reading the spark pattern to identify the steel type.'},
    {term:'Post-weld heat treatment',heb:'טיפול חום לאחר ריתוך',   def:'Controlled reheating after welding to relieve residual stress. Required on some alloy steels.'},
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
      <div class="metals-sec-hdr"><div class="metals-sec-dot"></div><h2>Common metals in the shop</h2></div>
      <div class="metal-chip-grid">${chips}</div>
      <div id="m-metal-detail">
        <div class="m-placeholder">
          <div class="ph-icon">🔩</div>
          Select a metal above to see welding data
        </div>
      </div>`;
  }

  function buildSparksTab() {
    const chips = SPARKS.map(s => `
      <div class="spark-chip" id="sc-${s.id}" onclick="MetalsModule._selectSpark('${s.id}')">
        <div class="spark-chip-name">${s.name}</div>
        <div class="spark-chip-sub">${s.sub}</div>
        <div class="spark-svg-wrap">${drawSparkSVG(s)}</div>
      </div>`).join('');

    return `
      <div class="metals-sec-hdr"><div class="metals-sec-dot"></div><h2>Spark test guide</h2></div>
      <p style="font-size:13px;color:#707070;margin-bottom:14px;line-height:1.5">
        Grind the metal briefly on a bench grinder in a dim area. Read the sparks to identify the steel before you pick up an electrode.
      </p>
      <div class="spark-grid-m">${chips}</div>
      <div id="m-spark-detail">
        <div class="m-placeholder">
          <div class="ph-icon">✨</div>
          Select a steel type above
        </div>
      </div>`;
  }

  function buildQuizTab() {
    quizIdx = 0; quizScore = 0; quizAnswered = false;
    return `
      <div class="metals-sec-hdr"><div class="metals-sec-dot"></div><h2>Test yourself — מתחיל</h2></div>
      <div id="m-quiz-area"></div>`;
  }

  function buildGlossaryTab() {
    const items = GLOSSARY.map(g => `
      <div class="gloss-item">
        <div class="gloss-term"><span class="gloss-heb">${g.heb}</span>${g.term}</div>
        <div class="gloss-def">${g.def}</div>
      </div>`).join('');

    return `
      <div class="metals-sec-hdr"><div class="metals-sec-dot"></div><h2>Welding metals glossary</h2></div>
      <div class="gloss-search-wrap">
        <span class="gloss-search-icon">🔍</span>
        <input class="gloss-search-input" type="text" placeholder="Search English or Hebrew..."
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
        <div class="m-prop-label">${p.label}</div>
        <div class="m-prop-val">${p.val}</div>
      </div>`).join('');

    const barsHTML = m.bars.map(b => `
      <div class="m-bar-row">
        <div class="m-bar-meta"><span>${b.label}</span><span>${b.val}%</span></div>
        <div class="m-bar-track">
          <div class="m-bar-fill" style="width:${b.val}%;background:${b.color}"></div>
        </div>
      </div>`).join('');

    const weldHTML = m.weld.map(w => `
      <div class="m-weld-row">
        <div class="m-weld-icon" style="background:${w.bg};color:#fff">${w.icon}</div>
        <span class="m-weld-key">${w.label}</span>
        <span class="m-weld-val">${w.val}</span>
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
        <div class="m-detail-desc">${m.desc}</div>
        <div class="m-props-grid">${propsHTML}</div>
        <div class="m-bars-sec">${barsHTML}</div>
        <div class="m-weld-spec">
          ${weldHTML}
          <div class="m-weld-row" style="margin-top:4px">
            <div class="m-weld-icon" style="background:#37474f;color:#fff">★</div>
            <span class="m-weld-key">Used in</span>
            <span class="m-weld-val" style="color:#aaa;font-weight:400">${m.realWorld}</span>
          </div>
        </div>
        <div class="m-tip-box m-tip-${m.tip.type}">${m.tip.text}</div>
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
            <div class="m-std">${s.sub}</div>
          </div>
        </div>
        <div class="m-detail-desc">${s.desc}</div>
        <div class="m-tip-box m-tip-${s.tipType}"><strong>What to do:</strong> ${s.action}</div>
      </div>`;
  }

  function renderQuiz() {
    const area = document.getElementById('m-quiz-area');
    if (!area) return;

    if (quizIdx >= QUIZ.length) {
      const pct = Math.round((quizScore / QUIZ.length) * 100);
      const msg = pct >= 75 ? 'Nice work — מתחיל מתקדם! 💪'
                : pct >= 50 ? 'Good effort — keep at it.'
                : 'Keep learning — every weld teaches you something.';
      area.innerHTML = `
        <div class="quiz-card">
          <div class="quiz-done">
            <div class="score-big">${quizScore}/${QUIZ.length}</div>
            <div style="font-size:16px;color:#f0f0f0;font-weight:600;margin-bottom:6px">${pct}% correct</div>
            <div>${msg}</div>
            <button class="quiz-restart" onclick="MetalsModule._restartQuiz()">Try again ↺</button>
          </div>
        </div>`;
      return;
    }

    quizAnswered = false;
    const q = QUIZ[quizIdx];
    area.innerHTML = `
      <div class="quiz-score-bar">
        <span>Question ${quizIdx + 1} of ${QUIZ.length}</span>
        <span class="quiz-score-val">${quizScore} correct</span>
      </div>
      <div class="quiz-card">
        <div class="quiz-q">${q.q}</div>
        <div class="quiz-opts">
          ${q.opts.map((o,i) => `
            <button class="quiz-opt" id="mopt-${i}" onclick="MetalsModule._answerQuiz(${i})">${o}</button>
          `).join('')}
        </div>
        <div class="quiz-feedback" id="m-quiz-feedback"></div>
        <div class="quiz-next-row">
          <button class="quiz-next" id="m-quiz-next" style="display:none" onclick="MetalsModule._nextQuestion()">
            ${quizIdx + 1 < QUIZ.length ? 'Next question →' : 'See results →'}
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
    document.getElementById('m-quiz-feedback').textContent = q.exp;
    document.getElementById('m-quiz-next').style.display = 'block';
    quizIdx++;
  }

  function filterGloss(val) {
    const q = (val || '').toLowerCase();
    const items = q
      ? GLOSSARY.filter(g =>
          g.term.toLowerCase().includes(q) ||
          g.heb.includes(q) ||
          g.def.toLowerCase().includes(q))
      : GLOSSARY;

    const list = document.getElementById('m-gloss-list');
    if (!list) return;
    list.innerHTML = items.length
      ? items.map(g => `
          <div class="gloss-item">
            <div class="gloss-term"><span class="gloss-heb">${g.heb}</span>${g.term}</div>
            <div class="gloss-def">${g.def}</div>
          </div>`).join('')
      : '<div class="gloss-no-results">No matches found.</div>';
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
          <div class="page-title">Metal <span>Types</span></div>
          <div class="page-sub">Steel grades · Weld specs · Spark test · Glossary</div>
        </div>

        <nav class="metals-tab-nav">
          <button class="metals-tab-btn active" id="mtab-metals"  onclick="MetalsModule._showTab('metals')">Metals</button>
          <button class="metals-tab-btn"         id="mtab-sparks"  onclick="MetalsModule._showTab('sparks')">Spark Test</button>
          <button class="metals-tab-btn"         id="mtab-quiz"    onclick="MetalsModule._showTab('quiz')">Quiz</button>
          <button class="metals-tab-btn"         id="mtab-glossary" onclick="MetalsModule._showTab('glossary')">Glossary</button>
        </nav>

        <div id="mpane-metals"   class="metals-pane active">${buildMetalsTab()}</div>
        <div id="mpane-sparks"   class="metals-pane">${buildSparksTab()}</div>
        <div id="mpane-quiz"     class="metals-pane">${buildQuizTab()}</div>
        <div id="mpane-glossary" class="metals-pane">${buildGlossaryTab()}</div>

        <div class="module-footer">Preheat and filler recommendations are field guidelines. For critical structural repairs, consult applicable welding procedure specifications (WPS).</div>
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
