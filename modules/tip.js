// ═══════════════════════════════════════════
// DAILY TIP MODULE
// ═══════════════════════════════════════════

const TipModule = {

  TIPS: [
    { text: "Clean your base metal before welding. Oil, rust, paint, and moisture cause porosity and weak welds. A wire brush and acetone go a long way.", category: "Prep" },
    { text: "Store low-hydrogen electrodes (7018, 8018) in a rod oven at 120–150°C. Moisture absorbed in 4+ hours of open air causes hydrogen cracking.", category: "Storage" },
    { text: "When striking an arc on 7018, use a slight whipping motion to prevent the rod from sticking. Drag rods (7024, 6013) just drag flat.", category: "Technique" },
    { text: "On vertical-up welds, use a weave pattern — side to side, pause at the toes. This controls the puddle and prevents undercutting.", category: "Technique" },
    { text: "E6010 is your go-to for root passes on dirty or rusty steel. Its fast-freezing slag lets you work against gravity and burn through contamination.", category: "Electrodes" },
    { text: "Preheat thick steel (over 25mm) before welding to slow the cooling rate. Fast cooling traps hydrogen and causes underbead cracking.", category: "Technique" },
    { text: "On MIG, the contact tip should be recessed 2–3mm from the nozzle for short-circuit transfer, and flush for spray transfer.", category: "Equipment" },
    { text: "Check your gas flow rate — 15–20 L/min for MIG with 75/25 gas, 8–12 L/min for TIG. Too much gas causes turbulence and porosity.", category: "Equipment" },
    { text: "For aluminum MIG (push gun): push the gun, never pull. Dragging causes the wire to dig into the soft metal and feed problems.", category: "Technique" },
    { text: "Grind TIG tungsten longitudinally, not in circles. A circumferential grind mark causes the arc to wander. Always grind toward the tip.", category: "TIG" },
    { text: "When welding Hardox or AR400 wear plate, use low-hydrogen electrodes (7018, 8018), preheat to 100–150°C, and control interpass temperature.", category: "Metals" },
    { text: "Cast iron must be preheated to 200–300°C and cooled slowly (wrapped in insulating blanket). Rapid cooling causes cracks.", category: "Metals" },
    { text: "Tack weld in sequence to distribute heat evenly and minimize distortion. Don't tack only on one side of a long joint.", category: "Technique" },
    { text: "Back-step welding reduces distortion on long welds: weld short segments in the opposite direction to the overall progression.", category: "Technique" },
    { text: "On stainless steel, keep interpass temperature below 150°C. High heat causes sensitization — chromium carbide precipitation at grain boundaries.", category: "Metals" },
    { text: "Always remove slag completely between passes. Trapped slag inclusions are defects that will show up on x-ray and cause failure.", category: "Quality" },
    { text: "Arc length equals electrode diameter. Too long an arc on SMAW causes porosity, spatter, and loss of shielding.", category: "Technique" },
    { text: "Hot Start on stick welders prevents the electrode from sticking on arc strike by momentarily boosting amperage. Set it to 30–50% above welding amps.", category: "Equipment" },
    { text: "Arc Force (dig) controls the amperage boost when the arc gets short. High arc force on 6010 helps prevent sticking in deep groove work.", category: "Equipment" },
    { text: "MIG wire stick-out (CTWD) should be 10–15mm for steel, 15–20mm for flux-cored. Longer stick-out increases resistance and reduces heat into the base metal.", category: "MIG" },
    { text: "For vertical-down SMAW, only use E6013 or similar fast-freeze rods. Never weld vertical-down with 7018 — the slag runs ahead of the arc.", category: "Technique" },
    { text: "Use a magnetic square or clamp-and-check to ensure joint alignment before welding. It's much harder to fix distortion after welding than before.", category: "Prep" },
    { text: "When repairing Wirtgen milling teeth holders: preheat the drum steel, use 7018 or 8018, and weld in sequence to avoid warping the drum.", category: "Repairs" },
    { text: "On high-wear parts, consider depositing a hard-facing layer with a rod like Stoody 31 before the final surface weld.", category: "Repairs" },
    { text: "For hydraulic cylinder rod repairs: the base metal is usually high-strength steel. Use 7018LF (extra low hydrogen) and strict preheat.", category: "Repairs" },
    { text: "Argon is heavier than air — it sinks. For pipe welding with back-purge argon, purge from the top so argon displaces air downward.", category: "TIG" },
    { text: "On aluminum TIG, clean the oxide layer with a dedicated stainless steel brush immediately before welding. Aluminum oxide re-forms in minutes.", category: "TIG" },
    { text: "The dip test for aluminum cleanliness: drag a clean wire brush across the surface. If it leaves a gray smear, the oxide is too thick — clean more.", category: "TIG" },
    { text: "For structural fillet welds, the leg size matters: a 6mm fillet on 10mm plate is undersized. Match weld size to the engineering requirement or base metal thickness.", category: "Quality" },
    { text: "Undercut is a stress concentration. If you see a sharp groove at the weld toe, grind it out and re-weld. Never leave undercut on load-bearing joints.", category: "Quality" },
    { text: "When welding in windy conditions outdoors: use self-shielded FCAW (E71T-8) or SMAW. MIG loses its shielding gas in even moderate wind.", category: "Equipment" },
    { text: "Check your earth clamp connection. A loose or corroded earth causes arc instability, spatter, and uneven fusion. Clean contact = clean arc.", category: "Equipment" },
    { text: "On Jasic inverters, the panel fan is temperature-controlled — if it never runs, check the duty cycle. Pushing past duty cycle trips thermal protection.", category: "Equipment" },
    { text: "After welding high-strength steel, allow slow natural cooling before moving the part. Quenching in water or compressed air can cause cracking.", category: "Technique" },
    { text: "Electrode polarity matters: DC+ (electrode positive) gives about 2/3 of heat into the base metal. DC− gives 2/3 into the electrode — used for TIG.", category: "Electrodes" },
    { text: "When changing from carbon steel to stainless, clean ALL tooling. A wire brush used on carbon steel contaminates stainless and causes rust.", category: "Stainless" },
    { text: "Peening (lightly hammering) a weld bead while still warm reduces residual stress and can prevent cracking on restrained joints.", category: "Technique" },
    { text: "For plasma cutting: ensure the air/gas supply is dry and clean. Water in the plasma gas destroys the torch consumables and ruins cut quality.", category: "Equipment" },
    { text: "On the Jasic CUT-100: start with a drag cut at the edge, not a pierce in the middle — middle-starts wear consumables much faster.", category: "Equipment" },
    { text: "Plasma cut edge prep: let the cut edge cool before welding. Hot-cut edges oxidize quickly and can cause fusion problems if welded immediately.", category: "Prep" },
    { text: "Measure twice, tack once. Thermal expansion during welding moves parts. Account for weld shrinkage — typically 1.5–3mm per meter per pass.", category: "Prep" },
    { text: "For repair welding on worn parts: remove all cracks, corrosion, and fatigue zones by grinding before depositing new metal.", category: "Repairs" },
    { text: "Use a wire brush between every pass on stick welding. Slag inclusions are invisible until x-ray — don't give them a chance to form.", category: "Quality" },
    { text: "The Kemppi MinarcMig performs best with 0.8mm wire for thin material (1.5–4mm). Switch to 1.0mm for material over 5mm.", category: "Equipment" },
    { text: "Weld sequence on T-joints: start at the root, build outward. Don't cap before filling — trapped gas causes porosity under the cap.", category: "Technique" },
    { text: "On overhead welding with 6011: turn amperage up slightly versus flat position (5–10A more). The puddle needs extra heat to avoid sagging.", category: "Technique" },
    { text: "Post-weld inspection: look at the weld toe under angle-light. Cracks at the toe are the most common fatigue failure point in structural welds.", category: "Quality" },
    { text: "Color-code your tungsten electrodes. EWTh-2 is red (radioactive — dispose properly). EWLa-1.5 is gold. EWP is green. Never mix them up.", category: "TIG" },
    { text: "For hard-to-reach joints: a bent rod holder or angled torch nozzle gets you into corners. Never try to force a straight rod into an awkward joint.", category: "Technique" },
    { text: "Grinding disc safety: always check the RPM rating on the disc against the grinder's RPM. Overspeeding a disc causes catastrophic failure.", category: "Safety" },
    { text: "After every repair, mark it: stamp the date, electrode used, and your initials on a tag near the weld. Traceability matters for maintenance records.", category: "Repairs" },
  ],

  currentIndex: -1,

  getTodaysTip() {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    return this.TIPS[dayOfYear % this.TIPS.length].text;
  },

  getTodaysTipObj() {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    return { ...this.TIPS[dayOfYear % this.TIPS.length], index: dayOfYear % this.TIPS.length };
  },

  render() {
    const today = this.getTodaysTipObj();
    this.currentIndex = today.index;
    const total = this.TIPS.length;

    document.getElementById('main-content').innerHTML = `
    <div class="tip-page fade-up">
      <div class="page-header">
        <div class="page-title">${t('Daily','טיפ')} <span>${t('Tip','יומי')}</span></div>
        <div class="page-sub">${total} ${t('welding tips — one per day, rotating automatically','טיפי ריתוך — אחד ליום, מתחלף אוטומטית')}</div>
      </div>

      <div class="tip-display" id="tip-display">
        <div class="tip-day-label">💡 ${t('Tip of the Day','טיפ היום')} · ${new Date().toLocaleDateString('en-GB', {weekday:'long', day:'numeric', month:'long'})}</div>
        <div class="tip-text" id="tip-text">${today.text}</div>
        <div class="tip-category" id="tip-category">${t('Category','קטגוריה')}: ${today.category}</div>
      </div>

      <div class="tip-nav">
        <button class="btn btn-ghost btn-sm" onclick="TipModule.prev()">← ${t('Prev','הקודם')}</button>
        <span class="tip-counter" id="tip-counter">${t('Tip','טיפ')} ${today.index + 1} ${t('of','מתוך')} ${total}</span>
        <button class="btn btn-ghost btn-sm" onclick="TipModule.next()">${t('Next','הבא')} →</button>
        <button class="btn btn-ghost btn-sm" onclick="TipModule.jumpToday()">${t('Today','היום')}</button>
      </div>

      <div style="margin-bottom:16px;">
        <div class="section-divider"><span>${t('All Tips','כל הטיפים')}</span></div>
      </div>
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:6px;overflow:hidden;">
        ${this.TIPS.map((tip, i) => `
          <div class="tip-list-item" ${i === today.index ? 'style="background:rgba(232,41,11,.05);"' : ''}>
            <span class="tip-num">${i + 1}</span>
            <div>
              <div>${tip.text}</div>
              <div style="font-size:10px;color:var(--muted);margin-top:4px;letter-spacing:1px;text-transform:uppercase;">${tip.category}</div>
            </div>
          </div>`).join('')}
      </div>

      <div class="module-footer">${t('Tips based on AWS, welding best practices, and field experience.','טיפים מבוססים על AWS, שיטות עבודה מומלצות וניסיון שטח.')}</div>
    </div>`;
  },

  showTip(idx) {
    this.currentIndex = ((idx % this.TIPS.length) + this.TIPS.length) % this.TIPS.length;
    const t = this.TIPS[this.currentIndex];
    const el = document.getElementById('tip-text');
    const cat = document.getElementById('tip-category');
    const ctr = document.getElementById('tip-counter');
    if (el)  el.textContent = t.text;
    if (cat) cat.textContent = `${window.t('Category','קטגוריה')}: ${t.category}`;
    if (ctr) ctr.textContent = `${window.t('Tip','טיפ')} ${this.currentIndex + 1} ${window.t('of','מתוך')} ${this.TIPS.length}`;
  },

  next()    { this.showTip(this.currentIndex + 1); },
  prev()    { this.showTip(this.currentIndex - 1); },
  jumpToday() { this.showTip(this.getTodaysTipObj().index); }
};
