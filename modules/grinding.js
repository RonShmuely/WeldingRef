// ═══════════════════════════════════════════
// GRINDING DISC INVENTORY MODULE
// ═══════════════════════════════════════════

const GrindingModule = {

  KEY: 'weldref_grinding_inventory',
  LOW_STOCK: 5, // discs

  TYPES: [
    { value: 'grinding',  label: 'Grinding Disc',  badge: 'badge-red' },
    { value: 'cutting',   label: 'Cutting Disc',   badge: 'badge-blue' },
    { value: 'flap',      label: 'Flap Disc',      badge: 'badge-gold' },
    { value: 'wire',      label: 'Wire Cup/Brush',  badge: 'badge-green' },
  ],

  SIZES: ['115mm (4.5")', '125mm (5")', '150mm (6")', '180mm (7")', '230mm (9")'],

  getAll() {
    const raw = localStorage.getItem(this.KEY);
    return raw ? JSON.parse(raw) : [];
  },

  save(items) { localStorage.setItem(this.KEY, JSON.stringify(items)); },

  add(entry) {
    const items = this.getAll();
    entry.id = Date.now().toString();
    items.push(entry);
    this.save(items);
  },

  remove(id) { this.save(this.getAll().filter(i => i.id !== id)); },

  adjustQty(id, delta) {
    const items = this.getAll();
    const item = items.find(i => i.id === id);
    if (!item) return;
    item.qty = Math.max(0, (item.qty || 0) + delta);
    this.save(items);
  },

  render() {
    const items = this.getAll();
    const total = items.reduce((a, b) => a + (b.qty || 0), 0);
    const lowItems = items.filter(i => (i.qty || 0) <= this.LOW_STOCK);

    document.getElementById('main-content').innerHTML = `
    <div class="fade-up" style="max-width:1060px;">
      <div class="page-header">
        <div class="page-title">Grinding <span>Discs</span></div>
        <div class="page-sub">${items.length} item types · ${total} total discs</div>
      </div>

      ${lowItems.length > 0 ? `
        <div class="error-msg" style="margin-bottom:20px;">
          ⚠️ Low stock: ${lowItems.map(i => `${i.size} ${i.label}`).join(', ')}
        </div>
      ` : ''}

      <!-- ADD FORM -->
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:18px 20px;margin-bottom:24px;">
        <div class="form-title">Add Disc Type</div>
        <div style="display:grid;grid-template-columns:1fr 1fr auto auto;gap:10px;align-items:end;">
          <div class="form-row" style="margin-bottom:0;">
            <label class="form-label">Type</label>
            <select id="gr-type">
              ${this.TYPES.map(t => `<option value="${t.value}">${t.label}</option>`).join('')}
            </select>
          </div>
          <div class="form-row" style="margin-bottom:0;">
            <label class="form-label">Size</label>
            <select id="gr-size">
              ${this.SIZES.map(s => `<option>${s}</option>`).join('')}
            </select>
          </div>
          <div class="form-row" style="margin-bottom:0;">
            <label class="form-label">Qty</label>
            <input type="text" id="gr-qty" placeholder="0" style="width:70px;" />
          </div>
          <div>
            <button class="btn btn-primary" style="height:42px;" onclick="GrindingModule.addItem()">+ Add</button>
          </div>
        </div>
        <div id="gr-msg" style="margin-top:8px;"></div>
      </div>

      <!-- DISC GRID -->
      <div class="inventory-grid" id="gr-grid">
        ${items.length === 0
          ? '<div class="empty-state" style="grid-column:1/-1;"><div class="big">💿</div><p>No grinding discs tracked yet.</p></div>'
          : items.map(i => this.discCard(i)).join('')
        }
      </div>

      <div class="module-footer">Quantities are individual disc counts. Stored in browser localStorage.</div>
    </div>`;
  },

  discCard(item) {
    const low = (item.qty || 0) <= this.LOW_STOCK;
    const typeObj = this.TYPES.find(t => t.value === item.type) || { label: item.type, badge: 'badge-teal' };
    return `
    <div class="inv-card ${low ? 'low-stock' : ''}" id="gr-card-${item.id}">
      <div class="inv-card-header">
        <div>
          <div class="inv-name">${item.size}</div>
          <span class="badge ${typeObj.badge}" style="margin-top:4px;display:inline-block;">${typeObj.label}</span>
        </div>
        <button class="repair-delete" onclick="GrindingModule.removeItem('${item.id}')">✕</button>
      </div>
      <div class="inv-qty-row">
        <span class="inv-qty ${low ? 'low' : ''}" id="gr-qty-${item.id}">${item.qty || 0}</span>
        <span class="inv-qty-label">pcs</span>
        ${low ? '<span class="badge badge-red" style="margin-left:4px;">Low</span>' : ''}
      </div>
      <div class="inv-actions">
        <button class="inv-btn" onclick="GrindingModule.adjust('${item.id}', -1)">−</button>
        <button class="inv-btn" onclick="GrindingModule.adjust('${item.id}', +1)">+</button>
        <button class="inv-btn" onclick="GrindingModule.adjustMany('${item.id}', -5)" style="font-size:10px;width:auto;padding:0 6px;">−5</button>
        <button class="inv-btn" onclick="GrindingModule.adjustMany('${item.id}', +5)" style="font-size:10px;width:auto;padding:0 6px;">+5</button>
      </div>
    </div>`;
  },

  addItem() {
    const typeVal = document.getElementById('gr-type').value;
    const size    = document.getElementById('gr-size').value;
    const qty     = parseInt(document.getElementById('gr-qty').value) || 0;
    const msg     = document.getElementById('gr-msg');
    const typeObj = this.TYPES.find(t => t.value === typeVal);

    this.add({ type: typeVal, label: typeObj?.label || typeVal, size, qty });
    msg.innerHTML = '<div class="success-msg">✓ Added.</div>';
    document.getElementById('gr-qty').value = '';
    this.refreshGrid();
    setTimeout(() => { if (msg) msg.innerHTML = ''; }, 2000);
  },

  adjust(id, delta) {
    this.adjustQty(id, delta);
    const items = this.getAll();
    const item = items.find(i => i.id === id);
    if (!item) return;
    const qtyEl = document.getElementById(`gr-qty-${id}`);
    const card  = document.getElementById(`gr-card-${id}`);
    if (qtyEl) qtyEl.textContent = item.qty;
    const low = (item.qty || 0) <= this.LOW_STOCK;
    if (qtyEl) qtyEl.classList.toggle('low', low);
    if (card)  card.classList.toggle('low-stock', low);
  },

  adjustMany(id, delta) { this.adjust(id, delta); },

  removeItem(id) {
    if (!confirm('Remove this item?')) return;
    this.remove(id);
    this.refreshGrid();
  },

  refreshGrid() {
    const items = this.getAll();
    const total = items.reduce((a, b) => a + (b.qty || 0), 0);
    document.getElementById('gr-grid').innerHTML = items.length === 0
      ? '<div class="empty-state" style="grid-column:1/-1;"><div class="big">💿</div><p>No grinding discs tracked yet.</p></div>'
      : items.map(i => this.discCard(i)).join('');
    const sub = document.querySelector('.page-sub');
    if (sub) sub.textContent = `${items.length} item types · ${total} total discs`;
  }
};
