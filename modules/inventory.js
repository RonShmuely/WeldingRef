// ═══════════════════════════════════════════
// ELECTRODE INVENTORY MODULE
// ═══════════════════════════════════════════

const InventoryModule = {

  KEY: 'weldref_electrode_inventory',
  LOW_STOCK: 2, // boxes

  COMMON_ELECTRODES: [
    { name: 'E6010', brand: 'Lincoln', diameter: '3.2mm' },
    { name: 'E6011', brand: 'Various', diameter: '3.2mm' },
    { name: 'E6013', brand: 'Various', diameter: '3.2mm' },
    { name: 'E7018', brand: 'Lincoln / ESAB', diameter: '3.2mm' },
    { name: 'E7018', brand: 'Lincoln / ESAB', diameter: '4.0mm' },
    { name: 'E8018', brand: 'Lincoln', diameter: '3.2mm' },
    { name: 'E8018', brand: 'Lincoln', diameter: '4.0mm' },
    { name: 'ENi-1', brand: 'Various', diameter: '3.2mm' },
    { name: 'E308L-16', brand: 'ESAB', diameter: '2.5mm' },
    { name: 'E309L-16', brand: 'ESAB', diameter: '2.5mm' },
  ],

  getAll() {
    const raw = localStorage.getItem(this.KEY);
    return raw ? JSON.parse(raw) : [];
  },

  save(items) {
    localStorage.setItem(this.KEY, JSON.stringify(items));
  },

  add(entry) {
    const items = this.getAll();
    entry.id = Date.now().toString();
    items.push(entry);
    this.save(items);
    return entry;
  },

  remove(id) {
    this.save(this.getAll().filter(i => i.id !== id));
  },

  adjustQty(id, delta) {
    const items = this.getAll();
    const item = items.find(i => i.id === id);
    if (!item) return;
    item.qty = Math.max(0, (item.qty || 0) + delta);
    this.save(items);
  },

  render() {
    const items = this.getAll();
    const lowItems = items.filter(i => (i.qty || 0) <= this.LOW_STOCK);

    document.getElementById('main-content').innerHTML = `
    <div class="fade-up" style="max-width:1060px;">
      <div class="page-header">
        <div class="page-title">Electrode <span>Stock</span></div>
        <div class="page-sub">${items.length} item types · ${items.reduce((a,b)=>a+(b.qty||0),0)} total boxes/packs</div>
      </div>

      ${lowItems.length > 0 ? `
        <div class="error-msg" style="margin-bottom:20px;">
          ⚠️ Low stock: ${lowItems.map(i=>`${i.name} ${i.diameter}`).join(', ')}
        </div>
      ` : ''}

      <!-- ADD FORM -->
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:18px 20px;margin-bottom:24px;">
        <div class="form-title">Add Electrode Type</div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr auto auto;gap:10px;align-items:end;flex-wrap:wrap;">
          <div class="form-row" style="margin-bottom:0;">
            <label class="form-label">AWS Class</label>
            <input type="text" id="inv-name" placeholder="e.g. E7018" list="inv-suggestions" />
            <datalist id="inv-suggestions">
              ${this.COMMON_ELECTRODES.map(e => `<option value="${e.name}">`).join('')}
            </datalist>
          </div>
          <div class="form-row" style="margin-bottom:0;">
            <label class="form-label">Brand</label>
            <input type="text" id="inv-brand" placeholder="e.g. Lincoln" />
          </div>
          <div class="form-row" style="margin-bottom:0;">
            <label class="form-label">Diameter</label>
            <input type="text" id="inv-dia" placeholder="e.g. 3.2mm" />
          </div>
          <div class="form-row" style="margin-bottom:0;">
            <label class="form-label">Qty (boxes)</label>
            <input type="text" id="inv-qty" placeholder="0" style="width:70px;" />
          </div>
          <div>
            <button class="btn btn-primary" style="height:42px;" onclick="InventoryModule.addItem()">+ Add</button>
          </div>
        </div>
        <div id="inv-msg" style="margin-top:8px;"></div>
      </div>

      <!-- INVENTORY GRID -->
      <div class="inventory-grid" id="inv-grid">
        ${items.length === 0
          ? '<div class="empty-state" style="grid-column:1/-1;"><div class="big">📦</div><p>No electrode stock tracked yet.</p></div>'
          : items.map(i => this.invCard(i)).join('')
        }
      </div>

      <div class="module-footer">Quantities are tracked in boxes/packs. Counts stored in browser localStorage.</div>
    </div>`;
  },

  invCard(item) {
    const low = (item.qty || 0) <= this.LOW_STOCK;
    return `
    <div class="inv-card ${low ? 'low-stock' : ''}" id="inv-card-${item.id}">
      <div class="inv-card-header">
        <div>
          <div class="inv-name">${item.name} <span style="font-size:13px;color:var(--muted);">${item.diameter || ''}</span></div>
          <div class="inv-brand">${item.brand || '—'}</div>
        </div>
        <button class="repair-delete" onclick="InventoryModule.removeItem('${item.id}')">✕</button>
      </div>
      <div class="inv-qty-row">
        <span class="inv-qty ${low ? 'low' : ''}" id="inv-qty-${item.id}">${item.qty || 0}</span>
        <span class="inv-qty-label">boxes</span>
        ${low ? '<span class="badge badge-red" style="margin-left:4px;">Low</span>' : ''}
      </div>
      <div class="inv-actions">
        <button class="inv-btn" onclick="InventoryModule.adjust('${item.id}', -1)" title="Remove 1">−</button>
        <button class="inv-btn" onclick="InventoryModule.adjust('${item.id}', +1)" title="Add 1">+</button>
        <button class="inv-btn" onclick="InventoryModule.setQty('${item.id}')" title="Set quantity" style="font-size:11px;width:auto;padding:0 8px;">Set</button>
      </div>
    </div>`;
  },

  addItem() {
    const name  = document.getElementById('inv-name').value.trim().toUpperCase();
    const brand = document.getElementById('inv-brand').value.trim();
    const dia   = document.getElementById('inv-dia').value.trim();
    const qty   = parseInt(document.getElementById('inv-qty').value) || 0;
    const msg   = document.getElementById('inv-msg');

    if (!name) { msg.innerHTML = '<div class="error-msg">Enter an electrode class name.</div>'; return; }

    this.add({ name, brand, diameter: dia, qty });
    msg.innerHTML = '<div class="success-msg">✓ Added.</div>';
    ['inv-name','inv-brand','inv-dia','inv-qty'].forEach(id => {
      document.getElementById(id).value = '';
    });
    this.refreshGrid();
    setTimeout(() => { if (msg) msg.innerHTML = ''; }, 2000);
  },

  adjust(id, delta) {
    this.adjustQty(id, delta);
    const items = this.getAll();
    const item = items.find(i => i.id === id);
    if (!item) return;
    const qtyEl = document.getElementById(`inv-qty-${id}`);
    const card  = document.getElementById(`inv-card-${id}`);
    if (qtyEl) qtyEl.textContent = item.qty;
    const low = (item.qty || 0) <= this.LOW_STOCK;
    if (qtyEl) qtyEl.classList.toggle('low', low);
    if (card)  card.classList.toggle('low-stock', low);
  },

  setQty(id) {
    const items = this.getAll();
    const item = items.find(i => i.id === id);
    if (!item) return;
    const val = prompt(`Set quantity for ${item.name} ${item.diameter}:`, item.qty);
    if (val === null) return;
    const n = parseInt(val);
    if (isNaN(n) || n < 0) { alert('Enter a valid number.'); return; }
    item.qty = n;
    this.save(items);
    this.refreshGrid();
  },

  removeItem(id) {
    if (!confirm('Remove this item from inventory?')) return;
    this.remove(id);
    this.refreshGrid();
  },

  refreshGrid() {
    const items = this.getAll();
    document.getElementById('inv-grid').innerHTML = items.length === 0
      ? '<div class="empty-state" style="grid-column:1/-1;"><div class="big">📦</div><p>No electrode stock tracked yet.</p></div>'
      : items.map(i => this.invCard(i)).join('');
    // update header count
    const sub = document.querySelector('.page-sub');
    if (sub) sub.textContent = `${items.length} item types · ${items.reduce((a,b)=>a+(b.qty||0),0)} total boxes/packs`;
  }
};
