// ═══════════════════════════════════════════
// REPAIR TRACKING MODULE
// ═══════════════════════════════════════════

const RepairsModule = {

  KEY: 'weldref_repairs',

  MACHINES: [
    'Wirtgen W200i', 'Wirtgen W50ri', 'Wirtgen W50i',
    'Mustang 1900r', 'Gehl r165',
    'Other / מסגרייה'
  ],

  REPAIR_TYPES: [
    'Crack repair', 'Broken tooth holder', 'Worn drum shell',
    'Frame crack', 'Bucket repair', 'Structural weld',
    'Hard-facing', 'Hydraulic bracket', 'Root pass',
    'Sheet metal', 'Cast iron repair', 'Stainless repair', 'Other'
  ],

  getAll() {
    const raw = localStorage.getItem(this.KEY);
    return raw ? JSON.parse(raw) : [];
  },

  save(repairs) {
    localStorage.setItem(this.KEY, JSON.stringify(repairs));
  },

  add(entry) {
    const repairs = this.getAll();
    entry.id = Date.now().toString();
    entry.createdAt = new Date().toISOString();
    repairs.unshift(entry);
    this.save(repairs);
  },

  remove(id) {
    const repairs = this.getAll().filter(r => r.id !== id);
    this.save(repairs);
  },

  render() {
    const repairs = this.getAll();

    document.getElementById('main-content').innerHTML = `
    <div class="fade-up" style="max-width:1060px;">
      <div class="page-header">
        <div class="page-title">Repair <span>Log</span></div>
        <div class="page-sub">${repairs.length} repair${repairs.length !== 1 ? 's' : ''} logged · Stored locally</div>
      </div>

      <div class="repairs-layout">
        <!-- FORM -->
        <div class="repair-form-card">
          <div class="form-title">Log New Repair</div>

          <div class="form-row">
            <label class="form-label">Date</label>
            <input type="date" id="rf-date" value="${new Date().toISOString().slice(0,10)}" />
          </div>
          <div class="form-row">
            <label class="form-label">Machine</label>
            <select id="rf-machine">
              <option value="">— Select —</option>
              ${this.MACHINES.map(m => `<option>${m}</option>`).join('')}
            </select>
          </div>
          <div class="form-row">
            <label class="form-label">Repair Type</label>
            <select id="rf-type">
              <option value="">— Select —</option>
              ${this.REPAIR_TYPES.map(t => `<option>${t}</option>`).join('')}
            </select>
          </div>
          <div class="form-row">
            <label class="form-label">Electrode / Wire Used</label>
            <input type="text" id="rf-electrode" placeholder="e.g. E7018 3.2mm, ER70S-6 0.8mm" />
          </div>
          <div class="form-row">
            <label class="form-label">Notes</label>
            <textarea id="rf-notes" placeholder="Describe the repair, location, condition, approach…"></textarea>
          </div>

          <div style="display:flex;gap:8px;margin-top:4px;">
            <button class="btn btn-primary" style="flex:1;" onclick="RepairsModule.submitForm()">+ Log Repair</button>
            <button class="btn btn-ghost" onclick="RepairsModule.clearForm()">Clear</button>
          </div>
          <div id="rf-msg" style="margin-top:10px;"></div>
        </div>

        <!-- LOG LIST -->
        <div class="repair-log-list" id="repairs-list">
          ${repairs.length === 0
            ? '<div class="empty-state"><div class="big">📋</div><p>No repairs logged yet.<br>Use the form to add your first entry.</p></div>'
            : repairs.map(r => this.repairEntry(r)).join('')
          }
        </div>
      </div>

      <div class="module-footer">Repair data is stored in your browser's localStorage.</div>
    </div>`;
  },

  repairEntry(r) {
    const date = r.date || r.createdAt?.slice(0,10) || '—';
    return `
    <div class="repair-entry" id="re-${r.id}">
      <div class="repair-entry-header">
        <div>
          <div class="repair-machine">${r.machine || '—'}</div>
          <div class="repair-date">${date}</div>
        </div>
        <button class="repair-delete" onclick="RepairsModule.deleteEntry('${r.id}')">✕</button>
      </div>
      <div class="repair-type">${r.type || '—'}</div>
      ${r.electrode ? `<div class="repair-electrode">${r.electrode}</div>` : ''}
      ${r.notes    ? `<div class="repair-notes">${r.notes}</div>` : ''}
    </div>`;
  },

  submitForm() {
    const date     = document.getElementById('rf-date').value;
    const machine  = document.getElementById('rf-machine').value;
    const type     = document.getElementById('rf-type').value;
    const electrode= document.getElementById('rf-electrode').value.trim();
    const notes    = document.getElementById('rf-notes').value.trim();
    const msg      = document.getElementById('rf-msg');

    if (!machine || !type) {
      msg.innerHTML = '<div class="error-msg">Select machine and repair type.</div>';
      return;
    }

    this.add({ date, machine, type, electrode, notes });
    msg.innerHTML = '<div class="success-msg">✓ Repair logged.</div>';
    this.clearForm();
    // refresh list
    const repairs = this.getAll();
    document.getElementById('repairs-list').innerHTML =
      repairs.map(r => this.repairEntry(r)).join('');
    setTimeout(() => { if (msg) msg.innerHTML = ''; }, 3000);
  },

  clearForm() {
    document.getElementById('rf-date').value = new Date().toISOString().slice(0,10);
    document.getElementById('rf-machine').value = '';
    document.getElementById('rf-type').value = '';
    document.getElementById('rf-electrode').value = '';
    document.getElementById('rf-notes').value = '';
  },

  deleteEntry(id) {
    if (!confirm('Delete this repair entry?')) return;
    this.remove(id);
    const el = document.getElementById(`re-${id}`);
    if (el) el.remove();
    const repairs = this.getAll();
    if (repairs.length === 0) {
      document.getElementById('repairs-list').innerHTML =
        '<div class="empty-state"><div class="big">📋</div><p>No repairs logged yet.</p></div>';
    }
  }
};
