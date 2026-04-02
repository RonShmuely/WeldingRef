// ═══════════════════════════════════════════
// WELD LOG MODULE
// ═══════════════════════════════════════════

const WeldLogModule = {

  API: '/api/weld-log.php',
  activeTab: 'repairs',
  entries: [],

  async render() {
    document.getElementById('main-content').innerHTML = `
    <div class="fade-up" style="max-width:860px;">
      <div class="page-header">
        <div class="page-title">${t('Weld', 'יומן')} <span>${t('Log', 'ריתוך')}</span></div>
      </div>

      <div class="wl-tabs">
        <button class="wl-tab ${this.activeTab === 'repairs' ? 'active' : ''}"
                onclick="WeldLogModule.switchTab('repairs')">
          ${t('Repairs', 'תיקונים')}
        </button>
        <button class="wl-tab ${this.activeTab === 'projects' ? 'active' : ''}"
                onclick="WeldLogModule.switchTab('projects')">
          ${t('Projects', 'פרויקטים')}
        </button>
      </div>

      <div id="wl-form-area"></div>
      <div id="wl-entries-area"></div>
    </div>`;

    await this.loadEntries();
    this.renderForm();
    this.renderEntries();
  },

  switchTab(tab) {
    this.activeTab = tab;
    this.render();
  },

  async loadEntries() {
    try {
      const res = await fetch(this.API);
      this.entries = await res.json();
    } catch (e) {
      this.entries = [];
    }
  },

  todayStr() {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yy = String(d.getFullYear()).slice(-2);
    return `${dd}/${mm}/${yy}`;
  },

  renderForm() {
    const area = document.getElementById('wl-form-area');
    if (this.activeTab === 'repairs') {
      area.innerHTML = `
      <form class="wl-form" id="wl-repair-form" onsubmit="WeldLogModule.submitRepair(event)">
        <div class="wl-row">
          <label>${t('Date', 'תאריך')} (dd/mm/yy)
            <input type="text" name="date" value="${this.todayStr()}" placeholder="dd/mm/yy" required>
          </label>
          <label>${t('Machine', 'מכונה')}
            <select name="machine_type" onchange="WeldLogModule.onMachineChange(this)">
              <option value="gadola">${t('Large Miller W200i', 'גדולה W200i')}</option>
              <option value="ktana">${t('Small Miller W50ri', 'קטנה W50ri')}</option>
              <option value="bobcat">${t('Skidsteer Gehl/Mustang', 'בובקט')}</option>
              <option value="misc">${t('Misc', 'שונות')}</option>
            </select>
          </label>
        </div>
        <div class="wl-row" id="wl-machine-detail">
          <label>${t('Vehicle number', 'מספר רכב')}
            <input type="text" name="machine_detail" placeholder="${t('e.g. 10', 'לדוגמה 10')}">
          </label>
        </div>
        <div class="wl-row">
          <label>${t('Electrodes used', 'אלקטרודות')}
            <input type="text" name="electrodes" placeholder="${t('e.g. E6013 3.2mm', 'לדוגמה E6013 3.2mm')}">
          </label>
          <label>${t('Amp settings', 'הגדרת אמפר')}
            <input type="text" name="amps" placeholder="${t('e.g. 110A', 'לדוגמה 110A')}">
          </label>
        </div>
        <div class="wl-row">
          <label style="flex:1">${t('What was repaired', 'מה תוקן')}
            <textarea name="description" rows="3" placeholder="${t('Describe the repair...', 'תאר את התיקון...')}"></textarea>
          </label>
        </div>
        <div class="wl-row">
          <label style="flex:1">${t('Images', 'תמונות')}
            <input type="file" name="images" accept="image/*" multiple>
          </label>
        </div>
        <button type="submit" class="wl-submit">${t('Save Repair', 'שמור תיקון')}</button>
        <div id="wl-status"></div>
      </form>`;
    } else {
      area.innerHTML = `
      <form class="wl-form" id="wl-project-form" onsubmit="WeldLogModule.submitProject(event)">
        <div class="wl-row">
          <label style="flex:1">${t('Project name', 'שם פרויקט')}
            <input type="text" name="project_name" required placeholder="${t('e.g. Gate fabrication', 'לדוגמה שער')}">
          </label>
          <label>${t('Date', 'תאריך')} (dd/mm/yy)
            <input type="text" name="date" value="${this.todayStr()}" placeholder="dd/mm/yy" required>
          </label>
        </div>
        <div class="wl-row">
          <label style="flex:1">${t('Notes', 'הערות')}
            <textarea name="notes" rows="3" placeholder="${t('Project notes...', 'הערות...')}"></textarea>
          </label>
        </div>
        <div class="wl-row">
          <label style="flex:1">${t('Images', 'תמונות')}
            <input type="file" name="images" accept="image/*" multiple>
          </label>
        </div>
        <button type="submit" class="wl-submit">${t('Save Project', 'שמור פרויקט')}</button>
        <div id="wl-status"></div>
      </form>`;
    }
  },

  onMachineChange(sel) {
    const detail = document.getElementById('wl-machine-detail');
    detail.style.display = sel.value === 'misc' ? 'none' : '';
    const label = detail.querySelector('label');
    const input = detail.querySelector('input');
    const labels = {
      gadola: t('גדולה number', 'מספר גדולה'),
      ktana:  t('קטנה number',  'מספר קטנה'),
      bobcat: t('בובקט number', 'מספר בובקט'),
    };
    if (label && labels[sel.value]) label.firstChild.textContent = labels[sel.value] + '\n';
    if (input) input.value = '';
  },

  buildMachineLabel(form) {
    const type   = form.machine_type.value;
    const detail = form.machine_detail ? form.machine_detail.value.trim() : '';
    const map = {
      gadola: `גדולה ${detail}`,
      ktana:  `קטנה ${detail}`,
      bobcat: `בובקט ${detail}`,
      misc:   detail || 'Misc',
    };
    return map[type] || type;
  },

  async submitRepair(e) {
    e.preventDefault();
    const form   = e.target;
    const status = document.getElementById('wl-status');
    status.textContent = t('Saving...', 'שומר...');

    const fd = new FormData();
    fd.append('type',        'repair');
    fd.append('date',        form.date.value);
    fd.append('machine',     this.buildMachineLabel(form));
    fd.append('electrodes',  form.electrodes.value);
    fd.append('amps',        form.amps.value);
    fd.append('description', form.description.value);
    for (const file of form.images.files) fd.append('images[]', file);

    try {
      const res = await fetch(this.API, { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Server error');
      status.textContent = t('Saved!', 'נשמר!');
      form.reset();
      form.date.value = this.todayStr();
      await this.loadEntries();
      this.renderEntries();
      setTimeout(() => { status.textContent = ''; }, 2000);
    } catch (err) {
      status.textContent = t('Error saving. Check server.', 'שגיאה בשמירה.');
    }
  },

  async submitProject(e) {
    e.preventDefault();
    const form   = e.target;
    const status = document.getElementById('wl-status');
    status.textContent = t('Saving...', 'שומר...');

    const fd = new FormData();
    fd.append('type',         'project');
    fd.append('date',         form.date.value);
    fd.append('project_name', form.project_name.value);
    fd.append('notes',        form.notes.value);
    for (const file of form.images.files) fd.append('images[]', file);

    try {
      const res = await fetch(this.API, { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Server error');
      status.textContent = t('Saved!', 'נשמר!');
      form.reset();
      form.date.value = this.todayStr();
      await this.loadEntries();
      this.renderEntries();
      setTimeout(() => { status.textContent = ''; }, 2000);
    } catch (err) {
      status.textContent = t('Error saving. Check server.', 'שגיאה בשמירה.');
    }
  },

  // ── RENDER ENTRIES ────────────────────────────────────────
  renderEntries() {
    const area     = document.getElementById('wl-entries-area');
    const tab      = this.activeTab;
    const filtered = this.entries.filter(e => {
      if (tab === 'repairs')  return e.type === 'repair';
      if (tab === 'projects') return e.type === 'project';
      return false;
    });

    if (!filtered.length) {
      area.innerHTML = `<p class="wl-empty">${t('No entries yet.', 'אין רשומות עדיין.')}</p>`;
      return;
    }

    area.innerHTML = filtered.map(entry => this.entryHTML(entry)).join('');
  },

  entryHTML(entry) {
    const actions = `
      <div class="wl-entry-actions">
        <button class="wl-action-btn" onclick="WeldLogModule.startEdit('${entry.id}')" title="${t('Edit','ערוך')}">✏️</button>
        <button class="wl-action-btn wl-delete-btn" onclick="WeldLogModule.deleteEntry('${entry.id}')" title="${t('Delete','מחק')}">🗑️</button>
      </div>`;

    const thumbs = entry.images && entry.images.length ? `
      <div class="wl-thumbs">
        ${entry.images.map(img => `
          <img src="/weld-log-data/images/${img}"
               class="wl-thumb"
               onclick="WeldLogModule.openImage('/weld-log-data/images/${img}')"
               alt="weld photo">
        `).join('')}
      </div>` : '';

    if (entry.type === 'repair') {
      return `
      <div class="wl-entry" id="wl-entry-${entry.id}">
        <div class="wl-entry-header">
          <span class="wl-entry-date">${entry.date}</span>
          <span class="wl-entry-machine">${entry.machine}</span>
          ${actions}
        </div>
        <div class="wl-entry-meta">
          ${entry.electrodes ? `<span>⚡ ${entry.electrodes}</span>` : ''}
          ${entry.amps       ? `<span>🔌 ${entry.amps}</span>` : ''}
        </div>
        ${entry.description ? `<div class="wl-entry-desc">${entry.description}</div>` : ''}
        ${thumbs}
      </div>`;
    } else {
      return `
      <div class="wl-entry" id="wl-entry-${entry.id}">
        <div class="wl-entry-header">
          <span class="wl-entry-date">${entry.date}</span>
          <span class="wl-entry-machine">${entry.project_name}</span>
          ${actions}
        </div>
        ${entry.notes ? `<div class="wl-entry-desc">${entry.notes}</div>` : ''}
        ${thumbs}
      </div>`;
    }
  },

  // ── INLINE EDIT ───────────────────────────────────────────
  startEdit(id) {
    const entry = this.entries.find(e => e.id === id);
    if (!entry) return;
    const card = document.getElementById(`wl-entry-${id}`);
    if (!card) return;

    const removedImages = [];

    const thumbsEdit = entry.images && entry.images.length ? `
      <div class="wl-thumbs wl-thumbs-edit" id="wl-thumbs-edit-${id}">
        ${entry.images.map(img => `
          <div class="wl-thumb-wrap" id="wl-tw-${img.replace(/\./g,'_')}">
            <img src="/weld-log-data/images/${img}" class="wl-thumb" alt="weld photo">
            <button type="button" class="wl-thumb-remove"
                    onclick="WeldLogModule.removeThumb('${id}','${img}')">✕</button>
          </div>
        `).join('')}
      </div>` : `<div class="wl-thumbs wl-thumbs-edit" id="wl-thumbs-edit-${id}"></div>`;

    if (entry.type === 'repair') {
      card.innerHTML = `
        <form class="wl-inline-form" onsubmit="WeldLogModule.saveEdit(event,'${id}')">
          <div class="wl-row">
            <label>${t('Date','תאריך')}
              <input type="text" name="date" value="${entry.date}" required>
            </label>
            <label>${t('Machine','מכונה')}
              <input type="text" name="machine" value="${entry.machine}">
            </label>
          </div>
          <div class="wl-row">
            <label>${t('Electrodes','אלקטרודות')}
              <input type="text" name="electrodes" value="${entry.electrodes || ''}">
            </label>
            <label>${t('Amps','אמפר')}
              <input type="text" name="amps" value="${entry.amps || ''}">
            </label>
          </div>
          <div class="wl-row">
            <label style="flex:1">${t('What was repaired','מה תוקן')}
              <textarea name="description" rows="3">${entry.description || ''}</textarea>
            </label>
          </div>
          ${thumbsEdit}
          <div class="wl-row">
            <label style="flex:1">${t('Add images','הוסף תמונות')}
              <input type="file" name="images" accept="image/*" multiple>
            </label>
          </div>
          <div class="wl-inline-actions">
            <button type="submit" class="wl-submit">${t('Save','שמור')}</button>
            <button type="button" class="wl-cancel-btn" onclick="WeldLogModule.cancelEdit('${id}')">${t('Cancel','ביטול')}</button>
          </div>
        </form>`;
    } else {
      card.innerHTML = `
        <form class="wl-inline-form" onsubmit="WeldLogModule.saveEdit(event,'${id}')">
          <div class="wl-row">
            <label style="flex:1">${t('Project name','שם פרויקט')}
              <input type="text" name="project_name" value="${entry.project_name || ''}" required>
            </label>
            <label>${t('Date','תאריך')}
              <input type="text" name="date" value="${entry.date}" required>
            </label>
          </div>
          <div class="wl-row">
            <label style="flex:1">${t('Notes','הערות')}
              <textarea name="notes" rows="3">${entry.notes || ''}</textarea>
            </label>
          </div>
          ${thumbsEdit}
          <div class="wl-row">
            <label style="flex:1">${t('Add images','הוסף תמונות')}
              <input type="file" name="images" accept="image/*" multiple>
            </label>
          </div>
          <div class="wl-inline-actions">
            <button type="submit" class="wl-submit">${t('Save','שמור')}</button>
            <button type="button" class="wl-cancel-btn" onclick="WeldLogModule.cancelEdit('${id}')">${t('Cancel','ביטול')}</button>
          </div>
        </form>`;
    }

    // Store pending removals on the card element
    card._removedImages = [];
  },

  removeThumb(id, img) {
    const card = document.getElementById(`wl-entry-${id}`);
    if (card) {
      card._removedImages = card._removedImages || [];
      card._removedImages.push(img);
    }
    const wrap = document.getElementById(`wl-tw-${img.replace(/\./g,'_')}`);
    if (wrap) wrap.remove();
  },

  cancelEdit(id) {
    const entry = this.entries.find(e => e.id === id);
    if (!entry) return;
    const card = document.getElementById(`wl-entry-${id}`);
    if (card) card.outerHTML = this.entryHTML(entry);
  },

  async saveEdit(e, id) {
    e.preventDefault();
    const form = e.target;
    const card = document.getElementById(`wl-entry-${id}`);
    const entry = this.entries.find(e => e.id === id);
    if (!entry) return;

    const fd = new FormData();
    fd.append('id', id);

    if (entry.type === 'repair') {
      fd.append('date',        form.date.value);
      fd.append('machine',     form.machine.value);
      fd.append('electrodes',  form.electrodes.value);
      fd.append('amps',        form.amps.value);
      fd.append('description', form.description.value);
    } else {
      fd.append('date',         form.date.value);
      fd.append('project_name', form.project_name.value);
      fd.append('notes',        form.notes.value);
    }

    const removed = card._removedImages || [];
    if (removed.length) fd.append('remove_images', JSON.stringify(removed));

    for (const file of form.images.files) fd.append('images[]', file);

    try {
      const res = await fetch(this.API, { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Server error');
      await this.loadEntries();
      this.renderEntries();
    } catch (err) {
      alert(t('Error saving. Check server.', 'שגיאה בשמירה.'));
    }
  },

  // ── DELETE ────────────────────────────────────────────────
  async deleteEntry(id) {
    if (!confirm(t('Delete this entry?', 'למחוק רשומה זו?'))) return;
    try {
      await fetch(this.API, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${encodeURIComponent(id)}`,
      });
      await this.loadEntries();
      this.renderEntries();
    } catch (err) {
      alert(t('Error deleting. Check server.', 'שגיאה במחיקה.'));
    }
  },

  // ── LIGHTBOX ──────────────────────────────────────────────
  openImage(src) {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;';
    overlay.innerHTML = `<img src="${src}" style="max-width:95vw;max-height:95vh;border-radius:4px;">`;
    overlay.onclick = () => overlay.remove();
    document.body.appendChild(overlay);
  },
};
