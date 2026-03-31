// ═══════════════════════════════════════════
// RECOMMENDED SETTINGS MODULE
// Electrode/wire selector by machine + repair type
// ═══════════════════════════════════════════

const SettingsModule = {

  MACHINES: [
    { id: 'helvi-406c',      name: 'Helvi Compact 406C',       type: 'SMAW / MIG' },
    { id: 'jasic-630',       name: 'Jasic ARC 630 Z321',       type: 'SMAW' },
    { id: 'kemppi-200',      name: 'Kemppi MinarcMig Evo 200', type: 'MIG' },
    { id: 'btt-fox-189',     name: 'BTT FOX 189',              type: 'MIG / SMAW' },
    { id: 'zika-i200c',      name: 'Zika i-200C Premium',      type: 'MMA' },
    { id: 'jasic-cut100',    name: 'Jasic CUT-100',            type: 'Plasma' },
  ],

  REPAIR_TYPES: [
    'Structural steel (general)',
    'Structural steel (critical / thick)',
    'Hardox / wear plate',
    'Tooth holder repair (Wirtgen)',
    'Drum frame repair (Wirtgen)',
    'Skid loader frame repair',
    'Skid loader bucket repair',
    'Fillet weld (light)',
    'Root pass (pipe / tube)',
    'Stainless steel 304/316',
    'Carbon to stainless (dissimilar)',
    'Aluminum 6061',
    'Cast iron repair',
    'Hard-facing overlay',
    'Thin sheet (< 3mm)',
  ],

  // [machineId][repairType] → {electrode, diameter, ampRange, hotStart, arcForce, gas, notes}
  SETTINGS_DB: {
    'helvi-406c': {
      'Structural steel (general)': {
        electrode: 'E7018 (Zika Z-4)', diameter: '3.2mm (1/8")', ampRange: '100–140A',
        hotStart: '20–30%', arcForce: '15–25%',
        notes: 'Low hydrogen. Keep electrodes dry. Clean base metal required.'
      },
      'Structural steel (critical / thick)': {
        electrode: 'E8018-G (Zika Z-3)', diameter: '3.2–4.0mm', ampRange: '100–170A',
        hotStart: '25–35%', arcForce: '20–30%',
        notes: 'Preheat 75–100°C for t > 20mm. Low hydrogen mandatory. Store in oven.'
      },
      'Hardox / wear plate': {
        electrode: 'E8018-G (Zika Z-3)', diameter: '3.2mm', ampRange: '100–140A',
        hotStart: '20–30%', arcForce: '20–30%',
        notes: 'Preheat 100–150°C. Slow cooling — wrap in blanket. Small beads, low heat input.'
      },
      'Tooth holder repair (Wirtgen)': {
        electrode: 'E8018-G (Zika Z-3)', diameter: '3.2mm', ampRange: '100–130A',
        hotStart: '20–30%', arcForce: '25–35%',
        notes: 'Preheat 120–150°C mandatory. Weld in short beads (max 50mm). Allow interpass cooling to < 200°C.'
      },
      'Drum frame repair (Wirtgen)': {
        electrode: 'E7018 (Zika Z-4) / E8018-G (Zika Z-3)', diameter: '4.0mm', ampRange: '140–170A',
        hotStart: '25–35%', arcForce: '20–30%',
        notes: 'Preheat 75–100°C. Use E8018 on high-stress zones. Full penetration on cracks — gouge and clean first.'
      },
      'Skid loader frame repair': {
        electrode: 'E7018 (Zika Z-4)', diameter: '3.2mm', ampRange: '100–140A',
        hotStart: '20–30%', arcForce: '15–25%',
        notes: 'Check for cracks before repairing. Full penetration on boom arms. Preheat if section > 20mm.'
      },
      'Skid loader bucket repair': {
        electrode: 'E8018-G (Zika Z-3)', diameter: '3.2mm', ampRange: '100–140A',
        hotStart: '20–30%', arcForce: '20–30%',
        notes: 'If Hardox bucket: preheat 100°C. Standard mild steel bucket: E7018 is fine.'
      },
      'Fillet weld (light)': {
        electrode: 'E6013 (Zika Z-11)', diameter: '2.5–3.2mm', ampRange: '70–120A',
        hotStart: '10–20%', arcForce: '10–15%',
        notes: 'Easy drag rod. Clean surfaces. Good for ornamental and non-structural work.'
      },
      'Root pass (pipe / tube)': {
        electrode: 'E6010 (Zika Z-610) / E6011', diameter: '3.2mm', ampRange: '90–120A',
        hotStart: '30–50%', arcForce: '40–60%',
        notes: 'E6010 preferred for root (DC+ only). E6011 if AC required. Aggressive arc — controlled whip technique.'
      },
      'Stainless steel 304/316': {
        electrode: 'E308L-16 (if SMAW)', diameter: '2.5–3.2mm', ampRange: '70–110A',
        hotStart: '10–15%', arcForce: '10–15%',
        notes: 'Keep interpass below 150°C. Use MIG (ER308L) or TIG for best results on this machine.'
      },
      'Carbon to stainless (dissimilar)': {
        electrode: 'E309L-16', diameter: '2.5–3.2mm', ampRange: '70–110A',
        hotStart: '10–15%', arcForce: '10–15%',
        notes: 'E309L bridges carbon steel to stainless. Prefer MIG/TIG over SMAW for cleaner results.'
      },
      'Aluminum 6061': {
        electrode: '—', diameter: '—', ampRange: '—',
        hotStart: '—', arcForce: '—',
        notes: 'This machine supports Lift-TIG and MIG. Use MIG with ER4043 (0.8mm) + 100% Argon, or TIG setup.'
      },
      'Cast iron repair': {
        electrode: 'ENi-1 / ENiFe-CI (Nickel rod)', diameter: '2.5–3.2mm', ampRange: '60–100A',
        hotStart: '0–10%', arcForce: '0–10%',
        notes: 'Preheat 250°C minimum. Short beads (25mm max). Peen immediately after each bead. Wrap and slow cool.'
      },
      'Hard-facing overlay': {
        electrode: 'Stoody 31 or equivalent hard-facing rod', diameter: '3.2–4.0mm', ampRange: '120–160A',
        hotStart: '20–30%', arcForce: '20–30%',
        notes: 'First pass: build-up layer with E7018. Second pass: hard-face overlay. Max 2 hard-face layers.'
      },
      'Thin sheet (< 3mm)': {
        electrode: 'E6013 (Zika Z-11)', diameter: '2.0–2.5mm', ampRange: '50–80A',
        hotStart: '10–15%', arcForce: '10–15%',
        notes: 'Use smallest dia possible. Short bead runs to control heat. Tack frequently. Or switch to MIG for thinner sheet.'
      },
    },
    'jasic-630': {
      'Structural steel (general)': {
        electrode: 'E7018 (Zika Z-4)', diameter: '4.0–5.0mm', ampRange: '160–220A',
        hotStart: '25–40%', arcForce: '20–30%',
        notes: 'This machine excels on large electrodes. Use larger dia for faster deposition on thick plate.'
      },
      'Structural steel (critical / thick)': {
        electrode: 'E8018-G (Zika Z-3)', diameter: '4.0–5.0mm', ampRange: '160–220A',
        hotStart: '30–45%', arcForce: '25–35%',
        notes: 'Preheat 75–100°C. The 630A capacity handles very large sections without duty cycle concern.'
      },
      'Hardox / wear plate': {
        electrode: 'E8018-G (Zika Z-3)', diameter: '4.0mm', ampRange: '160–190A',
        hotStart: '25–35%', arcForce: '25–35%',
        notes: 'Preheat 100–150°C. Low heat input despite large capacity — control bead size and interpass temp.'
      },
      'Tooth holder repair (Wirtgen)': {
        electrode: 'E8018-G (Zika Z-3)', diameter: '4.0mm', ampRange: '155–180A',
        hotStart: '25–35%', arcForce: '25–35%',
        notes: 'Full capacity available. Control heat input carefully on small sections. Preheat 120–150°C.'
      },
      'Drum frame repair (Wirtgen)': {
        electrode: 'E8018-G (Zika Z-3)', diameter: '4.0–5.0mm', ampRange: '170–220A',
        hotStart: '30–40%', arcForce: '25–35%',
        notes: 'High deposition for structural drum repairs. Ideal for thick section builds. Preheat 75–100°C.'
      },
      'Skid loader frame repair': {
        electrode: 'E7018 (Zika Z-4)', diameter: '4.0mm', ampRange: '160–200A',
        hotStart: '25–35%', arcForce: '20–30%',
        notes: 'Capable but often overkill for skid loader repairs. Use if needing high deposition.'
      },
      'Skid loader bucket repair': {
        electrode: 'E8018-G (Zika Z-3)', diameter: '4.0mm', ampRange: '160–190A',
        hotStart: '25–35%', arcForce: '20–30%',
        notes: 'Good for thick bucket sections. Preheat if Hardox.'
      },
      'Fillet weld (light)': {
        electrode: 'E7018 (Zika Z-4)', diameter: '3.2–4.0mm', ampRange: '120–170A',
        hotStart: '20–30%', arcForce: '15–25%',
        notes: 'Use smaller electrodes on this machine for light work. Bottom of its range but works fine.'
      },
      'Root pass (pipe / tube)': {
        electrode: 'E6010 (Zika Z-610) / E6011', diameter: '3.2–4.0mm', ampRange: '100–150A',
        hotStart: '40–60%', arcForce: '50–70%',
        notes: 'High OCV (80V) of this machine is excellent for cellulosic rods. Good arc strike on E6010.'
      },
      'Hard-facing overlay': {
        electrode: 'Stoody 31 or equivalent hard-facing rod', diameter: '4.0–5.0mm', ampRange: '160–220A',
        hotStart: '25–35%', arcForce: '25–35%',
        notes: 'High deposition hard-facing. Use for large drum wear surfaces. Build-up first with E7018/E8018.'
      },
      'Cast iron repair': {
        electrode: 'ENi-1 / ENiFe-CI (Nickel rod)', diameter: '3.2mm', ampRange: '80–110A',
        hotStart: '0–10%', arcForce: '0–10%',
        notes: 'Use low end of machine range. Preheat 250°C. Short beads, peen, slow cool.'
      },
      'Stainless steel 304/316': {
        electrode: 'E308L-16', diameter: '3.2mm', ampRange: '85–120A',
        hotStart: '10–15%', arcForce: '10–15%',
        notes: 'Machine can do it but MIG/TIG preferred for stainless. Control interpass temp carefully.'
      },
      'Carbon to stainless (dissimilar)': {
        electrode: 'E309L-16', diameter: '3.2mm', ampRange: '85–120A',
        hotStart: '10–15%', arcForce: '10–15%',
        notes: 'Adequate for dissimilar joints. Keep heat input low.'
      },
      'Thin sheet (< 3mm)': {
        electrode: 'E6013 (Zika Z-11)', diameter: '2.5mm', ampRange: '70–90A',
        hotStart: '10–15%', arcForce: '10–15%',
        notes: 'This machine is overkill for thin sheet. Use Helvi or BTT FOX for better control on thin material.'
      },
      'Aluminum 6061': {
        electrode: '—', diameter: '—', ampRange: '—',
        hotStart: '—', arcForce: '—',
        notes: 'Not recommended for aluminum. Use Kemppi MinarcMig or TIG setup.'
      },
    },
    'kemppi-200': {
      'Structural steel (general)': {
        electrode: 'ER70S-6', diameter: '0.8mm', ampRange: '100–160A',
        hotStart: '—', arcForce: '—', gas: '75% Ar / 25% CO₂ at 12–15 L/min',
        notes: 'Standard MIG setting. Voltage 18–22V, WFS 5–8 m/min. Clean base metal required for MIG.'
      },
      'Fillet weld (light)': {
        electrode: 'ER70S-6', diameter: '0.8mm', ampRange: '80–130A',
        hotStart: '—', arcForce: '—', gas: '75% Ar / 25% CO₂ at 10–12 L/min',
        notes: 'Voltage 17–20V. Short arc for thin material. Use synergic mode if available.'
      },
      'Thin sheet (< 3mm)': {
        electrode: 'ER70S-6', diameter: '0.6–0.8mm', ampRange: '30–90A',
        hotStart: '—', arcForce: '—', gas: '75% Ar / 25% CO₂ at 10 L/min',
        notes: 'Voltage 14–17V. Short circuit transfer mode. Tack frequently, use skip-weld sequence for distortion control.'
      },
      'Stainless steel 304/316': {
        electrode: 'ER308L', diameter: '0.8mm', ampRange: '70–130A',
        hotStart: '—', arcForce: '—', gas: '98% Ar / 2% CO₂ at 10–12 L/min',
        notes: 'Change to stainless gas mix. Stainless-only contact tip and liner. Keep interpass below 150°C.'
      },
      'Carbon to stainless (dissimilar)': {
        electrode: 'ER309L', diameter: '0.8mm', ampRange: '70–130A',
        hotStart: '—', arcForce: '—', gas: '98% Ar / 2% CO₂',
        notes: 'ER309L for carbon-to-stainless joints. Keep heat input low to minimize dilution.'
      },
      'Aluminum 6061': {
        electrode: 'ER4043', diameter: '0.8mm', ampRange: '60–140A',
        hotStart: '—', arcForce: '—', gas: '100% Argon at 12–15 L/min',
        notes: 'Spool gun or Teflon-lined gun required. Push technique only. Clean oxide immediately before welding.'
      },
      'Root pass (pipe / tube)': {
        electrode: 'ER70S-2', diameter: '0.8mm', ampRange: '80–140A',
        hotStart: '—', arcForce: '—', gas: '75% Ar / 25% CO₂',
        notes: 'ER70S-2 (triple deox) preferred for root pass. Tight fit-up essential for MIG root.'
      },
    },
    'btt-fox-189': {
      'Structural steel (general)': {
        electrode: 'ER70S-6 (MIG) / E7018 (Zika Z-4) (SMAW)', diameter: '0.8mm / 3.2mm', ampRange: '100–160A',
        hotStart: '—', arcForce: '—', gas: '75% Ar / 25% CO₂ at 12 L/min (MIG)',
        notes: 'Dual-mode unit. Use MIG for clean work, SMAW for dirty or rusty surfaces.'
      },
      'Fillet weld (light)': {
        electrode: 'ER70S-6', diameter: '0.8mm', ampRange: '80–140A',
        hotStart: '—', arcForce: '—', gas: '75% Ar / 25% CO₂',
        notes: 'Good portable option for light fillet welds. Single-phase supply.'
      },
      'Thin sheet (< 3mm)': {
        electrode: 'ER70S-6', diameter: '0.8mm', ampRange: '30–80A',
        hotStart: '—', arcForce: '—', gas: '75% Ar / 25% CO₂',
        notes: 'Lowest end of range. Short circuit transfer. Voltage 14–17V.'
      },
      'Structural steel (critical / thick)': {
        electrode: 'E7018 (Zika Z-4) (SMAW mode)', diameter: '3.2mm', ampRange: '100–140A',
        hotStart: '20–30%', arcForce: '15–25%',
        notes: 'Switch to SMAW mode for low-hydrogen work on thicker sections.'
      },
      'Root pass (pipe / tube)': {
        electrode: 'E6011 (SMAW mode)', diameter: '3.2mm', ampRange: '90–120A',
        hotStart: '30–45%', arcForce: '40–55%',
        notes: 'E6011 works on AC — versatile for field conditions where DC quality varies.'
      },
    },
    'zika-i200c': {
      'Structural steel (general)': {
        electrode: 'E7018 (Zika Z-4)', diameter: '3.2mm (1/8")', ampRange: '100–140A',
        hotStart: '20–30%', arcForce: '15–25%',
        notes: 'Low hydrogen. Keep electrodes dry. Max 3.2mm rod recommended — 4.0mm possible at top of range.'
      },
      'Structural steel (critical / thick)': {
        electrode: 'E8018-G (Zika Z-3)', diameter: '3.2mm', ampRange: '100–140A',
        hotStart: '25–35%', arcForce: '20–30%',
        notes: 'Preheat 75–100°C for t > 20mm. 200A limit means max ~3.2mm electrode on this machine.'
      },
      'Hardox / wear plate': {
        electrode: 'E8018-G (Zika Z-3)', diameter: '3.2mm', ampRange: '100–130A',
        hotStart: '20–30%', arcForce: '20–30%',
        notes: 'Preheat 100–150°C. Small beads, control heat input. Machine capacity suits lighter Hardox repairs.'
      },
      'Tooth holder repair (Wirtgen)': {
        electrode: 'E8018-G (Zika Z-3)', diameter: '3.2mm', ampRange: '100–125A',
        hotStart: '20–30%', arcForce: '25–35%',
        notes: 'Preheat 120–150°C mandatory. Short beads. This machine is adequate for light holder repairs.'
      },
      'Skid loader frame repair': {
        electrode: 'E7018 (Zika Z-4)', diameter: '3.2mm', ampRange: '100–140A',
        hotStart: '20–30%', arcForce: '15–25%',
        notes: 'Good portable option for on-machine repairs. Single-phase socket or generator (10kVA min).'
      },
      'Skid loader bucket repair': {
        electrode: 'E8018-G (Zika Z-3)', diameter: '3.2mm', ampRange: '100–130A',
        hotStart: '20–30%', arcForce: '20–30%',
        notes: 'If Hardox bucket: preheat 100°C. Adequate for moderate bucket repairs at this current range.'
      },
      'Fillet weld (light)': {
        electrode: 'E6013 (Zika Z-11)', diameter: '2.5–3.2mm', ampRange: '70–120A',
        hotStart: '10–20%', arcForce: '10–15%',
        notes: 'Easy arc, clean results. Good fit for this compact machine on light work.'
      },
      'Root pass (pipe / tube)': {
        electrode: 'E6011', diameter: '3.2mm', ampRange: '90–115A',
        hotStart: '30–45%', arcForce: '40–55%',
        notes: '70V OCV is sufficient for E6011. E6010 also works (DC+). Controlled whip technique.'
      },
      'Cast iron repair': {
        electrode: 'ENi-1 / ENiFe-CI (Nickel rod)', diameter: '2.5–3.2mm', ampRange: '60–95A',
        hotStart: '0–10%', arcForce: '0–10%',
        notes: 'Preheat 250°C. Short beads (25mm), peen after each pass. Wrap and slow cool. Low amps required.'
      },
      'Hard-facing overlay': {
        electrode: 'Stoody 31 or equivalent hard-facing rod', diameter: '3.2mm', ampRange: '120–160A',
        hotStart: '20–30%', arcForce: '20–30%',
        notes: 'Build-up layer with E7018 first, then hard-face. Machine handles single-layer hard-face well.'
      },
      'Thin sheet (< 3mm)': {
        electrode: 'E6013 (Zika Z-11)', diameter: '2.0–2.5mm', ampRange: '50–80A',
        hotStart: '10–15%', arcForce: '10–15%',
        notes: 'Use 2.5mm or smaller. Skip-weld technique to control heat. Good fit for this portable machine.'
      },
      'Drum frame repair (Wirtgen)': {
        electrode: 'E8018-G (Zika Z-3)', diameter: '3.2mm', ampRange: '110–140A',
        hotStart: '25–35%', arcForce: '20–30%',
        notes: 'Adequate for lighter drum frame sections. For heavy sections (>30mm) prefer the Jasic 630.'
      },
      'Stainless steel 304/316': {
        electrode: 'E308L-16', diameter: '2.5mm', ampRange: '65–100A',
        hotStart: '10–15%', arcForce: '10–15%',
        notes: 'Possible but prefer MIG (Kemppi) for stainless. Control interpass carefully. Low amps on 2.5mm rod.'
      },
      'Carbon to stainless (dissimilar)': {
        electrode: 'E309L-16', diameter: '2.5mm', ampRange: '65–100A',
        hotStart: '10–15%', arcForce: '10–15%',
        notes: 'Use E309L. Prefer MIG for this application — SMAW is a fallback if MIG not available.'
      },
      'Aluminum 6061': {
        electrode: '—', diameter: '—', ampRange: '—',
        hotStart: '—', arcForce: '—',
        notes: 'Not suitable for aluminum. Use Kemppi MinarcMig with ER4043 and 100% Argon.'
      },
    },
    'jasic-cut100': {
      'Structural steel (general)': {
        electrode: '—', diameter: '—', ampRange: '50–80A',
        hotStart: '—', arcForce: '—', gas: 'Compressed air 5.0 bar',
        notes: 'Cut speed: 700–900mm/min on 10mm mild steel at 80A. Stand-off 1.5–2mm nozzle height.'
      },
    },
  },

  render() {
    document.getElementById('main-content').innerHTML = `
    <div class="fade-up" style="max-width:860px;">
      <div class="page-header">
        <div class="page-title">Weld <span>Settings</span></div>
        <div class="page-sub">Recommended electrode, amperage, Hot Start, and Arc Force by machine and repair type</div>
      </div>

      <div class="settings-selectors">
        <div class="form-row">
          <label class="form-label">Machine</label>
          <select id="st-machine" onchange="SettingsModule.update()">
            <option value="">— Select Machine —</option>
            ${this.MACHINES.map(m => `<option value="${m.id}">${m.name} (${m.type})</option>`).join('')}
          </select>
        </div>
        <div class="form-row">
          <label class="form-label">Repair / Joint Type</label>
          <select id="st-repair" onchange="SettingsModule.update()">
            <option value="">— Select Repair Type —</option>
            ${this.REPAIR_TYPES.map(r => `<option value="${r}">${r}</option>`).join('')}
          </select>
        </div>
      </div>

      <div id="st-result">
        <div class="empty-state"><div class="big">⚡</div><p>Select a machine and repair type to see recommended settings.</p></div>
      </div>

      <div class="module-footer">Settings are starting-point recommendations. Always test on scrap first. Actual settings vary with electrode brand, material condition, and position.</div>
    </div>`;
  },

  update() {
    const machineId = document.getElementById('st-machine').value;
    const repairType = document.getElementById('st-repair').value;
    if (!machineId || !repairType) return;

    const machine = this.MACHINES.find(m => m.id === machineId);
    const db = this.SETTINGS_DB[machineId];
    if (!db) {
      document.getElementById('st-result').innerHTML =
        '<div class="error-msg">No settings data for this machine yet.</div>';
      return;
    }
    const s = db[repairType];
    if (!s) {
      document.getElementById('st-result').innerHTML =
        '<div class="error-msg">No settings entry for this combination. Consult machine manual or electrode datasheet.</div>';
      return;
    }

    const params = [
      { label: 'Electrode / Wire', value: s.electrode, unit: '' },
      { label: 'Diameter',         value: s.diameter,  unit: '' },
      { label: 'Amperage Range',   value: s.ampRange,  unit: 'A' },
      { label: 'Hot Start',        value: s.hotStart || '—', unit: '' },
      { label: 'Arc Force',        value: s.arcForce || '—', unit: '' },
    ];
    if (s.gas) params.push({ label: 'Gas / Flow', value: s.gas, unit: '' });

    document.getElementById('st-result').innerHTML = `
    <div class="settings-result" style="animation:fadeUp .25s ease;">
      <div class="settings-result-header">
        <div class="settings-result-machine">${machine.name}</div>
        <div class="settings-result-type">${repairType}</div>
      </div>
      <div class="settings-params-grid">
        ${params.map(p => `
          <div class="settings-param">
            <div class="settings-param-label">${p.label}</div>
            <div class="settings-param-value" style="font-size:${p.value.length > 10 ? '18px' : '26px'}">${p.value}</div>
            ${p.unit ? `<div class="settings-param-unit">${p.unit}</div>` : ''}
          </div>
        `).join('')}
      </div>
      ${s.notes ? `
        <div style="padding:16px 20px;border-top:1px solid var(--border);">
          <div style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;">Notes</div>
          <div style="font-size:13px;color:#ccc;line-height:1.6;">${s.notes}</div>
        </div>
      ` : ''}
    </div>`;
  }
};
