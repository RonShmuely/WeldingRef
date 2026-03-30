// ═══════════════════════════════════════════
// H-PLUS MODULE
// Hydraulic fluid / grease reference for Wirtgen machines
// ═══════════════════════════════════════════

const HPlusModule = {

  REMINDER_KEY: 'hplus_reminder_dismissed',

  DB: [
    {
      machine: 'W200i',
      fluids: [
        { name: 'H-Plus 46', type: 'Hydraulic Oil', location: 'Hydraulic system tank', capacity: '110 L', interval: 'Change every 500 h', note: 'Wirtgen approved synthetic hydraulic oil. Check level daily.' },
        { name: 'H-Plus Gear 220', type: 'Gear Oil', location: 'Drum drive gearbox', capacity: '8 L', interval: 'Change every 1000 h', note: 'Heavy-duty EP gear oil. Check level every 250 h.' },
        { name: 'H-Plus Grease EP2', type: 'Grease', location: 'Drum bearing (main)', capacity: '400g/point', interval: 'Grease every 50 h', note: 'Lithium-complex EP2 grease. High-temperature rated. Multiple grease nipples.' },
        { name: 'H-Plus Grease EP2', type: 'Grease', location: 'Conveyor pivot bearings', capacity: '100g/point', interval: 'Grease every 100 h', note: '4× pivot points on primary conveyor.' },
        { name: 'H-Plus 46', type: 'Hydraulic Oil', location: 'Drum belt tensioner hydraulic', capacity: '0.5 L', interval: 'Check every 50 h', note: 'Small auxiliary circuit — use same H-Plus 46.' },
        { name: 'Engine Oil 15W-40', type: 'Engine Oil', location: 'Diesel engine', capacity: '28 L', interval: 'Change every 250 h', note: 'DEUTZ / Cummins spec. Check daily before start-up.' },
        { name: 'Coolant 50/50', type: 'Coolant', location: 'Engine cooling system', capacity: '38 L', interval: 'Check weekly / Change every 2000 h', note: 'Pre-mixed OAT coolant. Do not mix types.' },
      ]
    },
    {
      machine: 'W50ri',
      fluids: [
        { name: 'H-Plus 46', type: 'Hydraulic Oil', location: 'Hydraulic tank', capacity: '55 L', interval: 'Change every 500 h', note: 'Same spec as W200i. Check level daily.' },
        { name: 'H-Plus Gear 220', type: 'Gear Oil', location: 'Drum gearbox', capacity: '4 L', interval: 'Change every 1000 h', note: 'Check level every 250 h. Drain when warm.' },
        { name: 'H-Plus Grease EP2', type: 'Grease', location: 'Drum bearings', capacity: '200g/point', interval: 'Grease every 50 h', note: '2× bearing points each side.' },
        { name: 'H-Plus Grease EP2', type: 'Grease', location: 'Track drive sprockets', capacity: '100g/point', interval: 'Grease every 100 h', note: 'Left/right track assembly grease nipples.' },
        { name: 'Engine Oil 15W-40', type: 'Engine Oil', location: 'Diesel engine', capacity: '14 L', interval: 'Change every 250 h', note: 'Check daily. Compact machine — smaller sump.' },
        { name: 'Coolant 50/50', type: 'Coolant', location: 'Engine cooling', capacity: '18 L', interval: 'Check weekly / Change 2000 h', note: 'OAT pre-mixed coolant.' },
      ]
    },
    {
      machine: 'W50i',
      fluids: [
        { name: 'H-Plus 46', type: 'Hydraulic Oil', location: 'Hydraulic tank', capacity: '55 L', interval: 'Change every 500 h', note: 'Check level daily before start.' },
        { name: 'H-Plus Gear 220', type: 'Gear Oil', location: 'Drum gearbox', capacity: '4 L', interval: 'Change every 1000 h', note: '' },
        { name: 'H-Plus Grease EP2', type: 'Grease', location: 'Drum bearings + auger shaft', capacity: '200g/point', interval: 'Grease every 50 h', note: 'Multiple grease points — see machine decal map.' },
        { name: 'Engine Oil 15W-40', type: 'Engine Oil', location: 'Diesel engine', capacity: '14 L', interval: 'Change every 250 h', note: '' },
        { name: 'Coolant 50/50', type: 'Coolant', location: 'Engine cooling', capacity: '18 L', interval: 'Check weekly', note: '' },
      ]
    },
  ],

  shouldShowReminder() {
    const dismissed = localStorage.getItem(this.REMINDER_KEY);
    if (!dismissed) return true;
    return dismissed !== new Date().toISOString().slice(0, 10);
  },

  dismissReminder() {
    localStorage.setItem(this.REMINDER_KEY, new Date().toISOString().slice(0, 10));
    const el = document.getElementById('hplus-reminder');
    if (el) el.style.display = 'none';
  },

  render() {
    const showReminder = this.shouldShowReminder();

    document.getElementById('main-content').innerHTML = `
    <div class="fade-up" style="max-width:1060px;">
      <div class="page-header">
        <div class="page-title">H-Plus <span>Database</span></div>
        <div class="page-sub">Hydraulic fluids, gear oils, and greases for Wirtgen road milling machines</div>
      </div>

      ${showReminder ? `
      <div class="hplus-reminder" id="hplus-reminder">
        <div>
          <div class="hplus-reminder-text">🛢 Daily Fluid Check Reminder</div>
          <div class="hplus-reminder-sub">Check hydraulic oil levels and top up before starting machines.</div>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="HPlusModule.dismissReminder()">Dismiss for today</button>
      </div>
      ` : ''}

      ${this.DB.map(machine => `
        <div class="hplus-table-wrap" style="margin-bottom:20px;">
          <div class="hplus-table-title">🛣️ ${machine.machine}</div>
          <div style="overflow-x:auto;">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Capacity</th>
                  <th>Service Interval</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                ${machine.fluids.map(f => `
                  <tr>
                    <td class="mono">${f.name}</td>
                    <td><span class="badge ${
                      f.type.includes('Hydraulic') ? 'badge-blue' :
                      f.type.includes('Gear') ? 'badge-gold' :
                      f.type.includes('Grease') ? 'badge-green' :
                      f.type.includes('Engine') ? 'badge-red' :
                      'badge-teal'
                    }">${f.type}</span></td>
                    <td style="font-size:12px;">${f.location}</td>
                    <td class="mono">${f.capacity}</td>
                    <td style="font-size:12px;color:var(--gold);">${f.interval}</td>
                    <td style="font-size:11px;color:var(--muted);">${f.note}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `).join('')}

      <div style="background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:20px;margin-top:8px;">
        <div class="form-title" style="margin-bottom:12px;">H-Plus Product Specs</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;">
          <div>
            <div style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--accent);margin-bottom:8px;">H-Plus 46 (Hydraulic)</div>
            <div style="font-size:13px;color:#ccc;line-height:1.8;">
              Viscosity: ISO VG 46<br>
              Type: Synthetic / mineral blend<br>
              Operating range: −25°C to +90°C<br>
              Approval: Wirtgen Group
            </div>
          </div>
          <div>
            <div style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--gold);margin-bottom:8px;">H-Plus Gear 220 (Gearbox)</div>
            <div style="font-size:13px;color:#ccc;line-height:1.8;">
              Viscosity: ISO VG 220<br>
              Type: EP (Extreme Pressure)<br>
              API: GL-5 rated<br>
              Operating range: −10°C to +100°C
            </div>
          </div>
          <div>
            <div style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--green);margin-bottom:8px;">H-Plus Grease EP2</div>
            <div style="font-size:13px;color:#ccc;line-height:1.8;">
              NLGI grade: 2<br>
              Thickener: Lithium complex<br>
              Drop point: >260°C<br>
              Operating range: −20°C to +140°C
            </div>
          </div>
        </div>
      </div>

      <div class="module-footer">Always use Wirtgen-approved fluids. Substitutions void warranty. Cross-contamination between fluid types can cause damage.</div>
    </div>`;
  }
};
