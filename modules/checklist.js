// ═══════════════════════════════════════════
// END-OF-DAY CHECKLIST MODULE
// Resets daily via localStorage date key
// ═══════════════════════════════════════════

const ChecklistModule = {

  ITEMS: [
    { id: 'batteries',  label: 'Charge Batteries',          icon: '🔋', note: 'All battery-powered tools on charge' },
    { id: 'cart',       label: 'Fold & Organize Welding Cart', icon: '🛒', note: 'Cart folded, cables coiled, in position' },
    { id: 'machines',   label: 'Organize Welding Machines',  icon: '⚙️',  note: 'Machines stored, cables stowed' },
    { id: 'generator',  label: 'Close Generator Switch 24',  icon: '⚡',  note: 'Verify switch 24 is OFF' },
    { id: 'oven',       label: 'Fill Electrode Drying Oven', icon: '🔥',  note: 'Restock oven with 7018 / 8018 for tomorrow' },
  ],

  getTodayKey() {
    return 'checklist_' + new Date().toISOString().slice(0, 10);
  },

  getState() {
    const raw = localStorage.getItem(this.getTodayKey());
    return raw ? JSON.parse(raw) : {};
  },

  saveState(state) {
    localStorage.setItem(this.getTodayKey(), JSON.stringify(state));
  },

  toggle(id) {
    const state = this.getState();
    state[id] = !state[id];
    this.saveState(state);
    this.updateUI(state);
  },

  getSummary() {
    const state = this.getState();
    const done = this.ITEMS.filter(i => state[i.id]).length;
    return { done, total: this.ITEMS.length, percent: Math.round((done / this.ITEMS.length) * 100) };
  },

  updateUI(state) {
    const summary = this.getSummary();
    // Update progress bar
    const bar = document.getElementById('cl-progress-fill');
    const lbl = document.getElementById('cl-progress-label');
    if (bar) bar.style.width = summary.percent + '%';
    if (lbl) lbl.textContent = `${summary.done} / ${this.ITEMS.length} complete`;

    // Update each item
    this.ITEMS.forEach(item => {
      const el = document.getElementById(`cl-item-${item.id}`);
      const box = document.getElementById(`cl-box-${item.id}`);
      if (!el || !box) return;
      const done = !!state[item.id];
      el.classList.toggle('done', done);
      box.innerHTML = done ? '✓' : '';
    });
  },

  render() {
    const state = this.getState();
    const summary = this.getSummary();
    const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    document.getElementById('main-content').innerHTML = `
    <div class="checklist-wrap fade-up">
      <div class="page-header">
        <div class="page-title">End-of-Day <span>Checklist</span></div>
        <div class="page-sub">Resets automatically at midnight · State saved locally</div>
      </div>

      <div class="checklist-date">${today}</div>

      <div class="checklist-progress-row">
        <div class="progress-bar" style="flex:1;">
          <div class="progress-fill" id="cl-progress-fill" style="width:${summary.percent}%"></div>
        </div>
        <span class="checklist-progress-label" id="cl-progress-label">${summary.done} / ${this.ITEMS.length} complete</span>
      </div>

      <div id="cl-items">
        ${this.ITEMS.map(item => `
          <div class="checklist-item ${state[item.id] ? 'done' : ''}" id="cl-item-${item.id}"
               onclick="ChecklistModule.toggle('${item.id}')">
            <div class="checklist-checkbox" id="cl-box-${item.id}">${state[item.id] ? '✓' : ''}</div>
            <span class="checklist-item-icon">${item.icon}</span>
            <div>
              <div class="checklist-item-label">${item.label}</div>
              <div style="font-size:12px;color:var(--muted);margin-top:2px;">${item.note}</div>
            </div>
          </div>
        `).join('')}
      </div>

      ${summary.done === this.ITEMS.length ? `
        <div class="success-msg" style="margin-top:20px;text-align:center;font-size:15px;font-family:'Barlow Condensed',sans-serif;letter-spacing:1px;font-weight:700;">
          ✓ All done — great shift! See you tomorrow.
        </div>
      ` : ''}

      <div style="margin-top:20px;">
        <button class="btn btn-ghost btn-sm" onclick="ChecklistModule.resetToday()">Reset Today</button>
      </div>

      <div class="module-footer">Checklist resets automatically each day at midnight.</div>
    </div>`;
  },

  resetToday() {
    if (!confirm('Reset all checklist items for today?')) return;
    localStorage.removeItem(this.getTodayKey());
    this.render();
  }
};
