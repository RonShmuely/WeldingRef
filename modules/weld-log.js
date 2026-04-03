// ═══════════════════════════════════════════
// WELD LOG MODULE
// ═══════════════════════════════════════════

const WeldLogModule = {

  API: '/api/weld-log.php',
  activeTab: 'repairs',
  entries: [],
  archived: [],
  searchQuery: '',
  machineFilter: null,
  CACHE_KEY: 'weldref_entries',
  CACHE_KEY_ARCHIVE: 'weldref_archived',

  // ── Welder slug → display name mapping (for old entries) ──
  WELDER_NAMES: {
    'helvi-406c':       'Helvi Compact 406C',
    'jasic-630':        'Jasic ARC 630',
    'kemppi-minarcmig': 'Kemppi MinarcMig Evo 200',
    'btt-fox-189':      'BTT FOX 189',
    'zika-i200c':       'Zika i-200C Premium',
    'jasic-cut100':     'Jasic CUT-100',
  },

  welderDisplay(val) {
    return this.WELDER_NAMES[val] || val;
  },

  isVideo(filename) {
    return /\.(mp4|mov|webm|avi)$/i.test(filename);
  },

  // ── Image path helper (per-entry folder or legacy fallback) ──
  imgPath(entry, img) {
    if (entry.folder) return `/weld-log-data/entries/${entry.folder}/${img}`;
    return `/weld-log-data/images/${img}`;
  },

  async render() {
    document.getElementById('main-content').innerHTML = `
    <div class="fade-up" style="max-width:860px;">
      <div class="page-header">
        <div class="page-title">${t('Repair', 'יומן')} <span>${t('Log', 'תיקונים')}</span></div>
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
        <button class="wl-tab ${this.activeTab === 'archived' ? 'active' : ''}"
                onclick="WeldLogModule.switchTab('archived')">
          ${t('Archived', 'ארכיון')}
        </button>
      </div>

      <div class="wl-toolbar">
        <div class="wl-search">
          <input type="text" id="wl-search-input"
                 placeholder="${t('Search entries...', 'חיפוש רשומות...')}"
                 value="${this.searchQuery}"
                 oninput="WeldLogModule.onSearch(this.value)">
        </div>
        <button class="wl-folder-btn" onclick="window.open('/weld-log-data/', '_blank')" title="${t('Open data folder','פתח תיקיית נתונים')}">
          📂 ${t('Open Folder', 'פתח תיקייה')}
        </button>
      </div>

      <div id="wl-filter-area"></div>
      <div id="wl-form-area"></div>
      <div id="wl-entries-area"></div>
    </div>`;

    // Show cached data instantly
    this.loadCache();
    this.renderFilterBadge();
    if (this.activeTab !== 'archived') this.renderForm();

    if (this.entries.length || this.archived.length) {
      this.renderEntries();
    } else {
      document.getElementById('wl-entries-area').innerHTML = `<p class="wl-empty" style="opacity:.5">${t('Loading...','טוען...')}</p>`;
    }

    // Refresh from server in background
    await this.loadEntries();
    this.renderEntries();
  },

  switchTab(tab) {
    this.activeTab = tab;
    this.render();
  },

  loadCache() {
    try {
      const e = localStorage.getItem(this.CACHE_KEY);
      const a = localStorage.getItem(this.CACHE_KEY_ARCHIVE);
      if (e) this.entries = JSON.parse(e);
      if (a) this.archived = JSON.parse(a);
    } catch {}
  },

  saveCache() {
    try {
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(this.entries));
      localStorage.setItem(this.CACHE_KEY_ARCHIVE, JSON.stringify(this.archived));
    } catch {}
  },

  async loadEntries() {
    const [entries, archived] = await Promise.all([
      fetch(this.API).then(r => r.json()).catch(() => null),
      fetch(this.API + '?archive=1').then(r => r.json()).catch(() => null),
    ]);
    if (entries) this.entries = entries;
    if (archived) this.archived = archived;
    this.saveCache();
  },

  todayStr() {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yy = String(d.getFullYear()).slice(-2);
    return `${dd}/${mm}/${yy}`;
  },

  todayISO() {
    return new Date().toISOString().slice(0, 10);
  },

  dateInputHTML(value, required = true, fieldName = 'date') {
    const iso = this.ddmmyyToISO(value);
    return `<div class="wl-date-wrap">
      <input type="text" name="${fieldName}" inputmode="numeric" maxlength="8"
        value="${value}" placeholder="DD/MM/YY" ${required ? 'required' : ''}
        pattern="\\d{2}/\\d{2}/\\d{2}"
        oninput="WeldLogModule.maskDate(this)"
        onkeydown="WeldLogModule.maskDateKey(event, this)"
        onblur="WeldLogModule.maskDate(this)">
      <input type="date" class="wl-date-hidden" value="${iso}" onchange="WeldLogModule.onDatePick(this)">
      <button type="button" class="wl-date-btn" onclick="this.previousElementSibling.showPicker()" title="${t('Pick date','בחר תאריך')}">📅</button>
    </div>`;
  },

  onDatePick(picker) {
    if (!picker.value) return;
    const [y, m, d] = picker.value.split('-');
    const input = picker.closest('.wl-date-wrap').querySelector('input[type="text"]');
    if (input) input.value = `${d}/${m}/${y.slice(-2)}`;
  },

  onProjectStatusChange(sel) {
    const form = sel.closest('form');
    const endLabel = form.querySelector('.wl-end-date-label');
    if (endLabel) endLabel.style.display = sel.value === 'completed' ? '' : 'none';
  },

  maskDate(el) {
    // Strip non-digits
    let digits = el.value.replace(/\D/g, '');
    if (digits.length > 6) digits = digits.slice(0, 6);
    // Auto-insert slashes
    let formatted = '';
    for (let i = 0; i < digits.length; i++) {
      if (i === 2 || i === 4) formatted += '/';
      formatted += digits[i];
    }
    el.value = formatted;
  },

  maskDateKey(e, el) {
    // Allow backspace to delete through slashes naturally
    if (e.key === 'Backspace' && (el.value.length === 3 || el.value.length === 6)) {
      el.value = el.value.slice(0, -1);
    }
  },

  syncDate(form) { /* date is now directly in the input */ },

  ddmmyyToISO(str) {
    if (!str) return this.todayISO();
    const parts = str.split('/');
    if (parts.length !== 3) return this.todayISO();
    const [d, m, y] = parts;
    const year = y.length === 2 ? '20' + y : y;
    return `${year}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`;
  },

  // ── SEARCH ─────────────────────────────────────────────────
  onSearch(query) {
    this.searchQuery = query;
    this.renderEntries();
  },

  matchesSearch(entry) {
    if (!this.searchQuery) return true;
    const q = this.searchQuery.toLowerCase();
    const fields = entry.type === 'repair'
      ? [entry.machine, entry.welder, entry.electrodes, entry.description, entry.date, entry.amps]
      : [entry.project_name, entry.notes, entry.date];
    return fields.some(f => f && f.toLowerCase().includes(q));
  },

  // ── MACHINE FILTER ─────────────────────────────────────────
  filterByMachine(machine) {
    this.machineFilter = machine;
    if (this.activeTab !== 'repairs') {
      this.activeTab = 'repairs';
      this.render();
    } else {
      this.renderFilterBadge();
      this.renderEntries();
    }
  },

  clearMachineFilter() {
    this.machineFilter = null;
    this.renderFilterBadge();
    this.renderEntries();
  },

  renderFilterBadge() {
    const area = document.getElementById('wl-filter-area');
    if (!area) return;
    if (this.machineFilter) {
      area.innerHTML = `
        <div class="wl-filter-badge">
          <span>${t('Showing','מציג')}: <strong>${this.machineFilter}</strong></span>
          <button onclick="WeldLogModule.clearMachineFilter()" title="${t('Clear filter','נקה סינון')}">✕</button>
        </div>`;
    } else {
      area.innerHTML = '';
    }
  },

  renderForm() {
    const area = document.getElementById('wl-form-area');
    if (this.activeTab === 'repairs') {
      area.innerHTML = `
      <form class="wl-form" id="wl-repair-form" onsubmit="WeldLogModule.submitRepair(event)">
        <div class="wl-row">
          <label>${t('Date', 'תאריך')} (dd/mm/yy)
            ${this.dateInputHTML(this.todayStr())}
          </label>
          <label>${t('Machine', 'מכונה')}
            <select name="machine_type" onchange="WeldLogModule.onMachineChange(this)">
              <option value="gadola">${t('W200i גדולה', 'W200i גדולה')}</option>
              <option value="ktana">${t('W50ri קטנה', 'W50ri קטנה')}</option>
              <option value="bobcat-gehl">${t('Skidsteer Gehl בובקט', 'בובקט Gehl')}</option>
              <option value="bobcat-mustang">${t('Mustang 1900r בובקט', 'בובקט Mustang 1900r')}</option>
              <option value="other">${t('Other', 'מסגרייה')}</option>
            </select>
          </label>
        </div>
        <div class="wl-row" id="wl-machine-detail">
          <label>${t('Vehicle number', 'מספר רכב')}
            <input type="text" name="machine_detail" placeholder="${t('e.g. 10', 'לדוגמה 10')}">
          </label>
        </div>
        <div class="wl-row">
          <label>${t('Welder used', 'מכונת ריתוך')}
            <select name="welder">
              <option value="">${t('-- Select --', '-- בחר --')}</option>
              <option value="Helvi Compact 406C">Helvi Compact 406C</option>
              <option value="Jasic ARC 630">Jasic ARC 630</option>
              <option value="Kemppi MinarcMig Evo 200">Kemppi MinarcMig Evo 200</option>
              <option value="BTT FOX 189">BTT FOX 189</option>
              <option value="Zika i-200C Premium">Zika i-200C Premium</option>
              <option value="Jasic CUT-100">Jasic CUT-100</option>
            </select>
          </label>
        </div>
        <div class="wl-row">
          <label>${t('Electrodes/wire used', 'אלקטרודות/חוט')}
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
            <div class="wl-file-upload" onclick="WeldLogModule.pickFiles(this)">
              <div class="wl-file-upload-icon">📷</div>
              <div class="wl-file-upload-text">${t('Tap to add photos', 'לחץ להוספת תמונות')}</div>
              <input type="file" name="images" accept="image/*,video/*" multiple onchange="WeldLogModule.onFileChange(this)">
            </div>
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
          <label>${t('Status', 'סטטוס')}
            <select name="status" onchange="WeldLogModule.onProjectStatusChange(this)">
              <option value="ongoing">${t('Ongoing', 'בביצוע')}</option>
              <option value="completed">${t('Completed', 'הושלם')}</option>
            </select>
          </label>
        </div>
        <div class="wl-row">
          <label>${t('Start date', 'תאריך התחלה')}
            ${this.dateInputHTML(this.todayStr(), true, 'start_date')}
          </label>
          <label class="wl-end-date-label" style="display:none">${t('End date', 'תאריך סיום')}
            ${this.dateInputHTML(this.todayStr(), false, 'end_date')}
          </label>
        </div>
        <div class="wl-row">
          <label style="flex:1">${t('Notes', 'הערות')}
            <textarea name="notes" rows="3" placeholder="${t('Project notes...', 'הערות...')}"></textarea>
          </label>
        </div>
        <div class="wl-row">
          <label style="flex:1">${t('Images', 'תמונות')}
            <div class="wl-file-upload" onclick="WeldLogModule.pickFiles(this)">
              <div class="wl-file-upload-icon">📷</div>
              <div class="wl-file-upload-text">${t('Tap to add photos', 'לחץ להוספת תמונות')}</div>
              <input type="file" name="images" accept="image/*,video/*" multiple onchange="WeldLogModule.onFileChange(this)">
            </div>
          </label>
        </div>
        <button type="submit" class="wl-submit">${t('Save Project', 'שמור פרויקט')}</button>
        <div id="wl-status"></div>
      </form>`;
    }
  },

  onMachineChange(sel) {
    const detail = document.getElementById('wl-machine-detail');
    detail.style.display = sel.value === 'other' ? 'none' : '';
    const label = detail.querySelector('label');
    const input = detail.querySelector('input');
    const labels = {
      gadola:          t('גדולה number', 'מספר גדולה'),
      ktana:           t('קטנה number',  'מספר קטנה'),
      'bobcat-gehl':   t('Gehl number',  'מספר Gehl'),
      'bobcat-mustang': t('Mustang number', 'מספר Mustang'),
    };
    if (label && labels[sel.value]) label.firstChild.textContent = labels[sel.value] + '\n';
    if (input) input.value = '';
  },

  _pickLock: false,
  pickFiles(el) {
    if (this._pickLock) return;
    this._pickLock = true;
    const input = el.querySelector('input[type="file"]');
    if (input) input.click();
    setTimeout(() => { this._pickLock = false; }, 500);
  },

  onFileChange(input) {
    const wrapper = input.closest('.wl-file-upload');
    const textEl = wrapper.querySelector('.wl-file-upload-text');
    const count = input.files.length;
    if (count > 0) {
      textEl.textContent = count === 1
        ? input.files[0].name
        : t(`${count} photos selected`, `${count} תמונות נבחרו`);
      wrapper.style.borderColor = 'var(--accent)';
    } else {
      textEl.textContent = t('Tap to add photos', 'לחץ להוספת תמונות');
      wrapper.style.borderColor = '';
    }
  },

  buildMachineLabel(form) {
    const type   = form.machine_type.value;
    const detail = form.machine_detail ? form.machine_detail.value.trim() : '';
    const map = {
      gadola:          `גדולה ${detail}`,
      ktana:           `קטנה ${detail}`,
      'bobcat-gehl':   `בובקט Gehl ${detail}`,
      'bobcat-mustang': `בובקט Mustang 1900r ${detail}`,
      other:           detail || 'Other',
    };
    return map[type] || type;
  },

  async submitRepair(e) {
    e.preventDefault();
    const form   = e.target;
    this.syncDate(form);
    const status = document.getElementById('wl-status');
    status.textContent = t('Saving...', 'שומר...');

    const fd = new FormData();
    fd.append('type',        'repair');
    fd.append('date',        form.date.value);
    fd.append('machine',     this.buildMachineLabel(form));
    fd.append('welder',      form.welder.value);
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
    this.syncDate(form);
    const status = document.getElementById('wl-status');
    status.textContent = t('Saving...', 'שומר...');

    const fd = new FormData();
    fd.append('type',         'project');
    fd.append('date',         form.start_date.value);
    fd.append('start_date',   form.start_date.value);
    fd.append('end_date',     form.end_date ? form.end_date.value : '');
    fd.append('project_name', form.project_name.value);
    fd.append('notes',        form.notes.value);
    fd.append('status',       form.status.value);
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
    const area = document.getElementById('wl-entries-area');
    const tab  = this.activeTab;

    if (tab === 'archived') {
      let list = this.archived.filter(e => this.matchesSearch(e));
      if (!list.length) {
        area.innerHTML = `<p class="wl-empty">${t('No archived entries.', 'אין רשומות בארכיון.')}</p>`;
        return;
      }
      area.innerHTML = list.map(entry => this.entryHTML(entry, true)).join('');
      return;
    }

    let filtered = this.entries.filter(e => {
      if (tab === 'repairs')  return e.type === 'repair';
      if (tab === 'projects') return e.type === 'project';
      return false;
    });

    // Apply machine filter
    if (this.machineFilter && tab === 'repairs') {
      filtered = filtered.filter(e => e.machine === this.machineFilter);
    }

    // Apply search
    filtered = filtered.filter(e => this.matchesSearch(e));

    if (!filtered.length) {
      area.innerHTML = `<p class="wl-empty">${t('No entries yet.', 'אין רשומות עדיין.')}</p>`;
      return;
    }

    if (tab === 'projects') {
      const ongoing   = filtered.filter(e => (e.status || 'ongoing') === 'ongoing');
      const completed = filtered.filter(e => e.status === 'completed');
      let html = '';
      if (ongoing.length) {
        html += `<div class="wl-section-label">${t('Ongoing', 'בביצוע')} (${ongoing.length})</div>`;
        html += ongoing.map(entry => this.entryHTML(entry, false)).join('');
      }
      if (completed.length) {
        html += `<div class="wl-section-label wl-section-completed">${t('Completed', 'הושלם')} (${completed.length})</div>`;
        html += completed.map(entry => this.entryHTML(entry, false)).join('');
      }
      area.innerHTML = html;
      return;
    }

    area.innerHTML = filtered.map(entry => this.entryHTML(entry, false)).join('');
  },

  entryHTML(entry, isArchived = false) {
    const actions = isArchived ? `
      <div class="wl-entry-actions">
        <button class="wl-action-btn" onclick="WeldLogModule.unarchiveEntry('${entry.id}')" title="${t('Unarchive','שחזר')}">📤</button>
        <button class="wl-action-btn wl-delete-btn" onclick="WeldLogModule.deleteEntry('${entry.id}', true)" title="${t('Delete','מחק')}">🗑️</button>
      </div>` : `
      <div class="wl-entry-actions">
        <button class="wl-action-btn" onclick="WeldLogModule.startEdit('${entry.id}')" title="${t('Edit','ערוך')}">✏️</button>
        <button class="wl-action-btn" onclick="WeldLogModule.archiveEntry('${entry.id}')" title="${t('Archive','העבר לארכיון')}">📦</button>
        <button class="wl-action-btn wl-delete-btn" onclick="WeldLogModule.deleteEntry('${entry.id}', false)" title="${t('Delete','מחק')}">🗑️</button>
      </div>`;

    const self = this;
    const thumbs = entry.images && entry.images.length ? `
      <div class="wl-thumbs">
        ${entry.images.map(img => {
          const src = self.imgPath(entry, img);
          const idx = entry.images.indexOf(img);
          const entryId = entry.id;
          if (self.isVideo(img)) {
            return `
            <div class="wl-thumb-vid-wrap" onclick="WeldLogModule.openGallery('${entryId}', ${idx})">
              <video src="${src}" class="wl-thumb wl-thumb-video"
                     muted preload="metadata"></video>
              <span class="wl-vid-badge">▶</span>
            </div>`;
          }
          return `
          <img src="${src}"
               class="wl-thumb"
               onclick="WeldLogModule.openGallery('${entryId}', ${idx})"
               alt="weld photo">`;
        }).join('')}
      </div>` : '';

    if (entry.type === 'repair') {
      const escapedMachine = (entry.machine || '').replace(/'/g, "\\'");
      return `
      <div class="wl-entry" id="wl-entry-${entry.id}">
        <div class="wl-entry-header">
          <span class="wl-entry-date">${entry.date}</span>
          <span class="wl-entry-machine wl-machine-link" dir="auto" onclick="event.stopPropagation(); WeldLogModule.filterByMachine('${escapedMachine}')">${entry.machine}</span>
          ${actions}
        </div>
        <div class="wl-entry-meta">
          ${entry.welder     ? `<span dir="auto">🔧 ${this.welderDisplay(entry.welder)}</span>` : ''}
          ${entry.electrodes ? `<span dir="auto">⚡ ${entry.electrodes}</span>` : ''}
          ${entry.amps       ? `<span dir="auto">🔌 ${entry.amps}</span>` : ''}
        </div>
        ${entry.description ? `<div class="wl-entry-desc" dir="auto">${entry.description}</div>` : ''}
        ${thumbs}
      </div>`;
    } else {
      const status = entry.status || 'ongoing';
      const statusLabel = status === 'completed' ? t('Completed','הושלם') : t('Ongoing','בביצוע');
      const startDate = entry.start_date || entry.date;
      const dateDisplay = (status === 'completed' && entry.end_date)
        ? `${startDate} → ${entry.end_date}`
        : startDate;
      return `
      <div class="wl-entry" id="wl-entry-${entry.id}">
        <div class="wl-entry-header">
          <span class="wl-entry-date">${dateDisplay}</span>
          <span class="wl-entry-machine" dir="auto">${entry.project_name}</span>
          <span class="wl-status-badge wl-status-${status}">${statusLabel}</span>
          ${actions}
        </div>
        ${entry.notes ? `<div class="wl-entry-desc" dir="auto">${entry.notes}</div>` : ''}
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

    const self = this;
    const thumbsEdit = entry.images && entry.images.length ? `
      <div class="wl-thumbs wl-thumbs-edit" id="wl-thumbs-edit-${id}">
        ${entry.images.map(img => {
          const src = self.imgPath(entry, img);
          const media = self.isVideo(img)
            ? `<video src="${src}" class="wl-thumb wl-thumb-video" muted preload="metadata"></video>`
            : `<img src="${src}" class="wl-thumb" alt="weld photo">`;
          return `
          <div class="wl-thumb-wrap" id="wl-tw-${img.replace(/\./g,'_')}">
            ${media}
            <button type="button" class="wl-thumb-remove"
                    onclick="WeldLogModule.removeThumb('${id}','${img}')">✕</button>
          </div>`;
        }).join('')}
      </div>` : `<div class="wl-thumbs wl-thumbs-edit" id="wl-thumbs-edit-${id}"></div>`;

    if (entry.type === 'repair') {
      card.innerHTML = `
        <form class="wl-inline-form" onsubmit="WeldLogModule.saveEdit(event,'${id}')">
          <div class="wl-row">
            <label>${t('Date','תאריך')}
              ${this.dateInputHTML(entry.date)}
            </label>
            <label>${t('Machine','מכונה')}
              <input type="text" name="machine" value="${entry.machine}">
            </label>
          </div>
          <div class="wl-row">
            <label>${t('Welder','מכונת ריתוך')}
              <input type="text" name="welder" value="${entry.welder || ''}">
            </label>
          </div>
          <div class="wl-row">
            <label>${t('Electrodes/wire','אלקטרודות/חוט')}
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
              <div class="wl-file-upload" onclick="WeldLogModule.pickFiles(this)">
                <div class="wl-file-upload-icon">📷</div>
                <div class="wl-file-upload-text">${t('Tap to add photos', 'לחץ להוספת תמונות')}</div>
                <input type="file" name="images" accept="image/*,video/*" multiple onchange="WeldLogModule.onFileChange(this)">
              </div>
            </label>
          </div>
          <div class="wl-inline-actions">
            <button type="submit" class="wl-submit">${t('Save','שמור')}</button>
            <button type="button" class="wl-cancel-btn" onclick="WeldLogModule.cancelEdit('${id}')">${t('Cancel','ביטול')}</button>
          </div>
        </form>`;
    } else {
      const editStartDate = entry.start_date || entry.date;
      const editEndDate = entry.end_date || this.todayStr();
      const editStatus = entry.status || 'ongoing';
      card.innerHTML = `
        <form class="wl-inline-form" onsubmit="WeldLogModule.saveEdit(event,'${id}')">
          <div class="wl-row">
            <label style="flex:1">${t('Project name','שם פרויקט')}
              <input type="text" name="project_name" value="${entry.project_name || ''}" required>
            </label>
            <label>${t('Status','סטטוס')}
              <select name="status" onchange="WeldLogModule.onProjectStatusChange(this)">
                <option value="ongoing" ${editStatus === 'ongoing' ? 'selected' : ''}>${t('Ongoing','בביצוע')}</option>
                <option value="completed" ${editStatus === 'completed' ? 'selected' : ''}>${t('Completed','הושלם')}</option>
              </select>
            </label>
          </div>
          <div class="wl-row">
            <label>${t('Start date','תאריך התחלה')}
              ${this.dateInputHTML(editStartDate, true, 'start_date')}
            </label>
            <label class="wl-end-date-label" style="${editStatus === 'completed' ? '' : 'display:none'}">${t('End date','תאריך סיום')}
              ${this.dateInputHTML(editEndDate, false, 'end_date')}
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
              <div class="wl-file-upload" onclick="WeldLogModule.pickFiles(this)">
                <div class="wl-file-upload-icon">📷</div>
                <div class="wl-file-upload-text">${t('Tap to add photos', 'לחץ להוספת תמונות')}</div>
                <input type="file" name="images" accept="image/*,video/*" multiple onchange="WeldLogModule.onFileChange(this)">
              </div>
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
    if (card) card.outerHTML = this.entryHTML(entry, false);
  },

  async saveEdit(e, id) {
    e.preventDefault();
    const form = e.target;
    this.syncDate(form);
    const card = document.getElementById(`wl-entry-${id}`);
    const entry = this.entries.find(e => e.id === id);
    if (!entry) return;

    const fd = new FormData();
    fd.append('id', id);

    if (entry.type === 'repair') {
      fd.append('date',        form.date.value);
      fd.append('machine',     form.machine.value);
      fd.append('welder',      form.welder.value);
      fd.append('electrodes',  form.electrodes.value);
      fd.append('amps',        form.amps.value);
      fd.append('description', form.description.value);
    } else {
      fd.append('date',         form.start_date.value);
      fd.append('start_date',   form.start_date.value);
      fd.append('end_date',     form.end_date ? form.end_date.value : '');
      fd.append('project_name', form.project_name.value);
      fd.append('notes',        form.notes.value);
      fd.append('status',       form.status.value);
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

  // ── ARCHIVE ───────────────────────────────────────────────
  async archiveEntry(id) {
    try {
      await fetch(this.API, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${encodeURIComponent(id)}&action=archive`,
      });
      await this.loadEntries();
      this.renderEntries();
    } catch (err) {
      alert(t('Error archiving. Check server.', 'שגיאה בארכיון.'));
    }
  },

  async unarchiveEntry(id) {
    try {
      await fetch(this.API, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${encodeURIComponent(id)}&action=unarchive`,
      });
      await this.loadEntries();
      this.renderEntries();
    } catch (err) {
      alert(t('Error unarchiving. Check server.', 'שגיאה בשחזור.'));
    }
  },

  // ── DELETE ────────────────────────────────────────────────
  async deleteEntry(id, fromArchive = false) {
    if (!confirm(t('Delete this entry?', 'למחוק רשומה זו?'))) return;
    try {
      await fetch(this.API, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${encodeURIComponent(id)}&action=delete${fromArchive ? '&archive=1' : ''}`,
      });
      await this.loadEntries();
      this.renderEntries();
    } catch (err) {
      alert(t('Error deleting. Check server.', 'שגיאה במחיקה.'));
    }
  },

  // ── GALLERY (PhotoSwipe) ─────────────────────────────────
  openGallery(entryId, startIdx) {
    const entry = [...this.entries, ...this.archived].find(e => e.id === entryId);
    if (!entry || !entry.images?.length) return;

    const self = this;

    // Use viewport as initial size — PhotoSwipe will resize once image loads
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const items = entry.images.map(img => {
      const src = self.imgPath(entry, img);
      if (self.isVideo(img)) {
        return { html: `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%"><video src="${src}" controls autoplay playsinline style="max-width:100%;max-height:90vh;"></video></div>` };
      }
      return { src, w: vw, h: vh, msrc: src };
    });

    history.pushState({ gallery: true }, '');

    const pswp = new PhotoSwipe({
      dataSource: items,
      index: startIdx || 0,
      bgOpacity: 1,
      showHideAnimationType: 'fade',
      closeOnVerticalDrag: true,
      pinchToClose: true,
    });

    // Auto-detect real image dimensions when slide loads
    pswp.on('contentLoad', (e) => {
      const { content } = e;
      if (content.data.src && !content.data._sizeDetected) {
        const img = new Image();
        img.onload = () => {
          content.data.w = img.naturalWidth;
          content.data.h = img.naturalHeight;
          content.data._sizeDetected = true;
          pswp.refreshSlideContent(content.index);
        };
        img.src = content.data.src;
        content.data._sizeDetected = true; // prevent re-trigger
      }
    });

    pswp.on('close', () => {
      if (!pswp._closedByBack) history.back();
    });

    const popHandler = () => { pswp._closedByBack = true; pswp.close(); };
    window.addEventListener('popstate', popHandler, { once: true });
    pswp.on('destroy', () => window.removeEventListener('popstate', popHandler));

    pswp.init();
  },
};
