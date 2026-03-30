// ═══════════════════════════════════════════
// MACHINES MODULE
// ═══════════════════════════════════════════

const MachinesModule = {

  DB: [
    {
      id: 'helvi-406c',
      name: 'Helvi Compact 406C',
      icon: '⚡',
      type: 'MMA / MIG / TIG (Lift)',
      color: 'red',
      specs: [
        { label: 'Input Voltage',    value: '400V 3-phase / 50Hz' },
        { label: 'Input Current',    value: '32A' },
        { label: 'Welding Current',  value: '20 – 400A' },
        { label: 'Duty Cycle',       value: '60% @ 400A / 100% @ 310A' },
        { label: 'OCV',              value: '68V' },
        { label: 'Weight',           value: '~18 kg' },
        { label: 'IP Rating',        value: 'IP23S' },
      ],
      processes: ['SMAW', 'MIG', 'TIG'],
      notes: 'Primary MMA workhorse. Handles E6010–E8018. Inverter-based — check Hot Start / Arc Force settings for cellulosic rods. Also capable of MIG and Lift-TIG.',
      settings: {
        hotStart: '20–40%',
        arcForce: '15–30% (E7018) / 40–60% (E6010/E6011)',
      }
    },
    {
      id: 'jasic-630',
      name: 'Jasic ARC 630 Z321',
      icon: '🔥',
      type: 'MMA (Heavy Duty)',
      color: 'gold',
      specs: [
        { label: 'Input Voltage',    value: '380/415V 3-phase / 50Hz' },
        { label: 'Input Current',    value: '67A' },
        { label: 'Welding Current',  value: '30 – 630A' },
        { label: 'Duty Cycle',       value: '60% @ 630A / 100% @ 490A' },
        { label: 'OCV',              value: '80V' },
        { label: 'Weight',           value: '~62 kg' },
        { label: 'IP Rating',        value: 'IP21S' },
      ],
      processes: ['SMAW'],
      notes: 'Heavy-duty stick welder for thick plate and large electrodes (up to 8mm). Use for structural repairs on Wirtgen drums and skid loader frames. High OCV ensures reliable arc starts.',
      settings: {
        hotStart: '30–50%',
        arcForce: '20–35% (E7018) / 50–70% (E6010)',
      }
    },
    {
      id: 'kemppi-minarcmig',
      name: 'Kemppi MinarcMig Evo 200',
      icon: '🌀',
      type: 'MIG / MAG',
      color: 'blue',
      specs: [
        { label: 'Input Voltage',    value: '230V 1-phase / 50Hz' },
        { label: 'Input Current',    value: '16A' },
        { label: 'Welding Current',  value: '25 – 200A' },
        { label: 'Duty Cycle',       value: '35% @ 200A / 100% @ 100A' },
        { label: 'Wire Diameter',    value: '0.6 – 1.0mm' },
        { label: 'Weight',           value: '~10 kg (unit only)' },
        { label: 'IP Rating',        value: 'IP23' },
      ],
      processes: ['MIG'],
      notes: 'Compact single-phase MIG for light to medium fabrication. Best with ER70S-6 at 0.8mm wire. Use 75/25 Ar/CO₂ gas mix. Excellent for thin sheet (1–5mm). 230V — runs on site socket.',
      settings: {
        wire: '0.8mm ER70S-6',
        gas: '75% Ar / 25% CO₂ at 12–15 L/min',
      }
    },
    {
      id: 'btt-fox-189',
      name: 'BTT FOX 189',
      icon: '🦊',
      type: 'MIG / MAG / MMA',
      color: 'green',
      specs: [
        { label: 'Input Voltage',    value: '230V 1-phase / 50Hz' },
        { label: 'Input Current',    value: '16A' },
        { label: 'Welding Current',  value: '20 – 185A' },
        { label: 'Duty Cycle',       value: '40% @ 185A / 100% @ 90A' },
        { label: 'Wire Diameter',    value: '0.6 – 0.9mm' },
        { label: 'Weight',           value: '~14 kg' },
        { label: 'IP Rating',        value: 'IP21' },
      ],
      processes: ['MIG', 'SMAW'],
      notes: 'Versatile portable MIG/MMA combo unit. Good for field repairs where single-phase supply is available. Handles E6013, E7018 (up to 4mm dia) in MMA mode. MIG mode best for thin plate.',
      settings: {
        wire: '0.8mm ER70S-6',
        gas: '75% Ar / 25% CO₂ at 10–12 L/min',
        hotStart: '10–25% (MMA mode)',
      }
    },
    {
      id: 'jasic-cut100',
      name: 'Jasic CUT-100',
      icon: '✂️',
      type: 'Plasma Cutter',
      color: 'teal',
      specs: [
        { label: 'Input Voltage',    value: '380/415V 3-phase / 50Hz' },
        { label: 'Input Current',    value: '22A' },
        { label: 'Cutting Current',  value: '20 – 100A' },
        { label: 'Duty Cycle',       value: '60% @ 100A' },
        { label: 'Max Cut (mild steel)', value: '35mm quality / 50mm severance' },
        { label: 'Air Pressure',     value: '4.5 – 6.0 bar' },
        { label: 'Air Flow',         value: '≥170 L/min' },
        { label: 'Weight',           value: '~12 kg' },
        { label: 'IP Rating',        value: 'IP21S' },
      ],
      processes: ['Plasma'],
      notes: 'Compressed-air plasma cutter for mild steel, stainless, and aluminum. Start cuts from the edge — avoid mid-plate piercing to preserve consumables. Ensure air supply is dry and filtered (moisture ruins torch tips). Clean cut height 1.5–2x nozzle diameter above work.',
      settings: {
        pressure: '5.0 bar recommended',
        cuttingHeight: '1.5–2.5mm above work surface',
        speed: 'Reduce speed on thick material for clean cut face',
      }
    },
  ],

  render() {
    document.getElementById('main-content').innerHTML = `
    <div class="fade-up" style="max-width:1060px;">
      <div class="page-header">
        <div class="page-title">Machine <span>Reference</span></div>
        <div class="page-sub">Specs, settings, and notes for your welding machines</div>
      </div>

      <div class="machine-grid">
        ${this.DB.map(m => this.machineCard(m)).join('')}
      </div>

      <div class="module-footer">Specs are reference values. Verify with machine manuals. Duty cycle varies with ambient temperature.</div>
    </div>`;
  },

  machineCard(m) {
    const colorMap = { red:'var(--accent)', gold:'var(--gold)', blue:'var(--blue)', green:'var(--green)', teal:'var(--teal)' };
    const color = colorMap[m.color] || 'var(--accent)';
    const processBadges = m.processes.map(p => `<span class="badge badge-${
      p==='SMAW'?'red': p==='MIG'?'blue': p==='TIG'?'teal': p==='Plasma'?'teal': 'green'
    }">${p}</span>`).join(' ');

    const settingRows = Object.entries(m.settings || {}).map(([k, v]) =>
      `<div class="machine-spec-row">
        <span class="spec-label">${k.replace(/([A-Z])/g,' $1').trim()}</span>
        <span class="spec-value" style="font-size:12px;font-family:'Barlow',sans-serif;">${v}</span>
      </div>`
    ).join('');

    return `
    <div class="machine-card">
      <div class="machine-card-header" style="border-left:3px solid ${color};">
        <span class="machine-icon">${m.icon}</span>
        <div>
          <div class="machine-name">${m.name}</div>
          <div class="machine-type">${m.type}</div>
          <div style="margin-top:6px;display:flex;gap:5px;flex-wrap:wrap;">${processBadges}</div>
        </div>
      </div>
      <div class="machine-card-body">
        ${m.specs.map(s => `
          <div class="machine-spec-row">
            <span class="spec-label">${s.label}</span>
            <span class="spec-value">${s.value}</span>
          </div>
        `).join('')}

        ${m.settings ? `
          <div style="margin-top:12px;padding-top:10px;border-top:1px solid var(--border);">
            <div style="font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--accent);margin-bottom:8px;">Quick Settings</div>
            ${settingRows}
          </div>
        ` : ''}

        <div style="margin-top:12px;padding-top:10px;border-top:1px solid var(--border);">
          <div style="font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;">Notes</div>
          <div style="font-size:12px;color:#aaa;line-height:1.6;">${m.notes}</div>
        </div>
      </div>
    </div>`;
  }
};
