// ═══════════════════════════════════════════
// COMPARE MODULE — Standalone electrode compare
// ═══════════════════════════════════════════

const CompareModule = {

  selected: [], // [{id, proc}]

  render() {
    // Build flat list of all electrodes for dropdowns
    const allElectrodes = [];
    for (const proc of Object.keys(ElectrodesModule.DB)) {
      for (const id of Object.keys(ElectrodesModule.DB[proc])) {
        allElectrodes.push({ id, proc, name: ElectrodesModule.DB[proc][id].name });
      }
    }

    const makeSelect = (idx) => `
      <div style="flex:1;min-width:150px;">
        <label class="form-label">Electrode ${idx + 1}</label>
        <select id="cmp-sel-${idx}" onchange="CompareModule.updateSelection()" style="width:100%;">
          <option value="">— Select —</option>
          ${['SMAW','MIG','TIG','FCAW'].map(proc => `
            <optgroup label="${proc}">
              ${Object.keys(ElectrodesModule.DB[proc]).map(id => {
                const e = ElectrodesModule.DB[proc][id];
                return `<option value="${proc}:${id}">${e.name}</option>`;
              }).join('')}
            </optgroup>
          `).join('')}
        </select>
      </div>`;

    document.getElementById('main-content').innerHTML = `
    <div class="fade-up" style="max-width:1060px;">
      <div class="page-header">
        <div class="page-title">Electrode <span>Compare</span></div>
        <div class="page-sub">Side-by-side comparison of up to 4 electrodes across all processes</div>
      </div>

      <div style="background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:20px;margin-bottom:24px;">
        <div class="form-title">Select Electrodes to Compare</div>
        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;">
          ${[0,1,2,3].map(i => makeSelect(i)).join('')}
        </div>
        <div style="display:flex;gap:10px;">
          <button class="btn btn-primary" onclick="CompareModule.runCompare()">⊗ Compare</button>
          <button class="btn btn-ghost" onclick="CompareModule.clearAll()">✕ Clear</button>
        </div>
      </div>

      <div id="cmp-results">
        <div class="empty-state"><div class="big">⊗</div><p>Select at least 2 electrodes above to compare.</p></div>
      </div>

      <div class="module-footer">Always verify specifications with manufacturer datasheets · AWS A5.1 / A5.5 / A5.18 / A5.9 / A5.10 / A5.20 / A5.22</div>
    </div>`;
  },

  updateSelection() {
    // just track, run on button press
  },

  getSelected() {
    const result = [];
    for (let i = 0; i < 4; i++) {
      const sel = document.getElementById(`cmp-sel-${i}`);
      if (sel && sel.value) {
        const [proc, id] = sel.value.split(':');
        result.push(ElectrodesModule.DB[proc][id]);
      }
    }
    return result;
  },

  runCompare() {
    const electrodes = this.getSelected();
    if (electrodes.length < 2) {
      document.getElementById('cmp-results').innerHTML =
        '<div class="error-msg">Select at least 2 electrodes to compare.</div>';
      return;
    }
    this.renderTable(electrodes);
  },

  clearAll() {
    for (let i = 0; i < 4; i++) {
      const sel = document.getElementById(`cmp-sel-${i}`);
      if (sel) sel.value = '';
    }
    document.getElementById('cmp-results').innerHTML =
      '<div class="empty-state"><div class="big">⊗</div><p>Select at least 2 electrodes above to compare.</p></div>';
  },

  renderTable(electrodes) {
    const EL = ElectrodesModule.EL;
    const hdr = electrodes.map(e =>
      `<th class="elec-col">${e.name}<br><span style="font-size:9px;opacity:0.6;font-weight:400;">${e.process}</span></th>`
    ).join('');

    const rows = [
      {label:'Process',         fn:e=>e.process},
      {label:'Type / Coating',  fn:e=>e.type},
      {label:'Tensile Strength',fn:e=>e.tensile},
      {label:'Welding Current', fn:e=>e.current},
      {label:'AC Compatible',   fn:e=>e.acCompatible?'✓ Yes':'✗ No'},
      {label:'Positions',       fn:e=>e.positions},
      {label:'Arc Properties',  fn:e=>e.arcType},
      {label:'Penetration',     fn:e=>e.penetration},
      {label:'Spatter',         fn:e=>e.spatter},
      {label:'Slag',            fn:e=>e.slag},
      {label:'Weld Appearance', fn:e=>e.weldAppearance},
      {label:'Hydrogen Content',fn:e=>e.hydrogenContent},
      {label:'Contamination',   fn:e=>e.burnContamination},
      {label:'Shielding Gas',   fn:e=>e.shieldingGas||'—'},
      {label:'Skill Level',     fn:e=>e.skillLevel},
      {label:'Best For',        fn:e=>e.uses.slice(0,3).join('; ')},
    ].map(r =>
      `<tr><td class="row-label">${r.label}</td>${electrodes.map(e=>`<td>${r.fn(e)}</td>`).join('')}</tr>`
    ).join('');

    const allEls = [...new Set(electrodes.flatMap(e => e.chem.map(c => c.el)))];
    const chemRows = allEls.map(el => `<tr>
      <td class="row-label">${el} — ${EL[el]||el}</td>
      ${electrodes.map(e => { const f = e.chem.find(c=>c.el===el); return `<td class="mono">${f?f.val:'—'}</td>`; }).join('')}
    </tr>`).join('');

    document.getElementById('cmp-results').innerHTML = `
    <div class="compare-view" style="animation:fadeUp .3s ease;">
      <div class="compare-view-header">
        <h2>⊗ Comparison</h2>
        <span style="color:var(--muted);font-size:11px;margin-left:8px;">${electrodes.map(e=>e.name).join(' vs ')}</span>
      </div>
      <div class="compare-table-wrap">
        <table class="compare-table">
          <thead><tr><th class="row-label">Property</th>${hdr}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div style="padding:0 22px;"><div class="section-divider"><span>Chemical Composition</span></div></div>
      <div class="compare-table-wrap" style="padding-bottom:22px;">
        <table class="compare-table">
          <thead><tr><th class="row-label">Element</th>${hdr}</tr></thead>
          <tbody>${chemRows}</tbody>
        </table>
      </div>
    </div>`;
  }
};
