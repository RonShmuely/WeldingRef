// ═══════════════════════════════════════════
// END-OF-DAY CHECKLIST MODULE
// Resets daily via localStorage date key
// ═══════════════════════════════════════════

const ChecklistModule = {

  ITEM_IDS: ['batteries','cart','machines','generator','oven'],

  getItems() {
    return [
      { id: 'batteries',  label: t('Charge Batteries',             'טען סוללות'),              icon: '🔋', note: t('All battery-powered tools on charge',   'כל הכלים על טעינה') },
      { id: 'cart',       label: t('Fold & Organize Welding Cart', 'קפל וסדר עגלת ריתוך'),     icon: '🛒', note: t('Cart folded, cables coiled, in position', 'עגלה קפולה, כבלים מגולגלים, במיקום') },
      { id: 'machines',   label: t('Organize Welding Machines',    'סדר מכונות ריתוך'),        icon: '⚙️',  note: t('Machines stored, cables stowed',          'מכונות מאוחסנות, כבלים מסודרים') },
      { id: 'generator',  label: t('Close Generator Switch 24',   'סגור מתג גנרטור 24'),      icon: '⚡',  note: t('Verify switch 24 is OFF',                 'וודא שמתג 24 כבוי') },
      { id: 'oven',       label: t('Fill Electrode Drying Oven',  'מלא תנור ייבוש אלקטרודות'), icon: '🔥',  note: t('Restock oven with 7018 / 8018 for tomorrow', 'מלא תנור ב-7018 / 8018 למחר') },
    ];
  },

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
    const items = this.getItems();
    const done = items.filter(i => state[i.id]).length;
    return { done, total: items.length, percent: Math.round((done / items.length) * 100) };
  },

  updateUI(state) {
    const summary = this.getSummary();
    // Update progress bar
    const bar = document.getElementById('cl-progress-fill');
    const lbl = document.getElementById('cl-progress-label');
    if (bar) bar.style.width = summary.percent + '%';
    if (lbl) lbl.textContent = `${summary.done} / ${this.getItems().length} ${t('complete', 'הושלמו')}`;

    // Update each item
    this.getItems().forEach(item => {
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
        <div class="page-title">${t('End-of-Day', 'סוף יום')} <span>${t('Checklist', 'רשימת סיום')}</span></div>
        <div class="page-sub">${t('Resets automatically at midnight · State saved locally', 'מתאפס אוטומטית בחצות · מצב נשמר מקומית')}</div>
      </div>

      <div class="checklist-date">${today}</div>

      <div class="checklist-progress-row">
        <div class="progress-bar" style="flex:1;">
          <div class="progress-fill" id="cl-progress-fill" style="width:${summary.percent}%"></div>
        </div>
        <span class="checklist-progress-label" id="cl-progress-label">${summary.done} / ${this.getItems().length} ${t('complete', 'הושלמו')}</span>
      </div>

      <div id="cl-items">
        ${this.getItems().map(item => `
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

      ${summary.done === this.getItems().length ? `
        <div class="success-msg" style="margin-top:20px;text-align:center;font-size:15px;font-family:'Barlow Condensed',sans-serif;letter-spacing:1px;font-weight:700;">
          ✓ ${t('All done — great shift! See you tomorrow.', 'הכל בוצע — משמרת מעולה! להתראות מחר.')}
        </div>
      ` : ''}

      <div style="margin-top:20px;">
        <button class="btn btn-ghost btn-sm" onclick="ChecklistModule.resetToday()">${t('Reset Today', 'אפס היום')}</button>
      </div>

      <div class="module-footer">${t('Checklist resets automatically each day at midnight.', 'רשימת הסיום מתאפסת אוטומטית בכל יום בחצות.')}</div>
    </div>`;
  },

  resetToday() {
    if (!confirm(t('Reset all checklist items for today?', 'לאפס את כל פריטי הרשימה להיום?'))) return;
    localStorage.removeItem(this.getTodayKey());
    this.render();
  }
};
