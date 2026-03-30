// ═══════════════════════════════════════════
// METAL TYPES MODULE
// ═══════════════════════════════════════════

const MetalsModule = {

  CATEGORIES: [
    {
      id: 'fab',
      label: 'מסגרייה — Fab Shop (General)',
      icon: '🏭',
      metals: [
        {
          name: 'Mild Steel',
          grade: 'S235 / S275 / A36',
          thickness: '2 – 50mm typical',
          details: 'Standard structural and fabrication steel. Low carbon, easily welded. No preheat required under 25mm. Most common material in the fab shop.',
          recs: [
            { label: 'SMAW', value: 'E6013, E7018', type: 'green' },
            { label: 'MIG',  value: 'ER70S-6', type: 'blue' },
          ]
        },
        {
          name: 'High-Strength Structural',
          grade: 'S355 / S460 / A572 Gr.65',
          thickness: '6 – 80mm',
          details: 'Higher yield strength. Requires low-hydrogen process. Preheat 75–100°C for sections over 25mm. Use E8018 or equivalent for critical joints.',
          recs: [
            { label: 'SMAW', value: 'E7018 / E8018', type: 'gold' },
            { label: 'MIG',  value: 'ER70S-6 (smaller sections)', type: 'blue' },
          ]
        },
        {
          name: 'Stainless Steel 304 / 316',
          grade: 'AISI 304L / 316L',
          thickness: '1.5 – 20mm',
          details: 'Austenitic stainless. Use ER308L for 304-to-304 joints. Use ER309L for 304-to-carbon steel joints. Keep interpass temperature below 150°C. Stainless-only tooling mandatory.',
          recs: [
            { label: 'MIG', value: 'ER308L / ER309L', type: 'teal' },
            { label: 'TIG', value: 'ER308L rod', type: 'teal' },
          ]
        },
        {
          name: 'Aluminum 6061 / 6063',
          grade: '6061-T6 / 6063-T5',
          thickness: '1.5 – 12mm',
          details: 'Common extrusion and plate alloy. Remove oxide with dedicated SS brush before welding. Push gun for MIG (never drag). Use AC TIG for best results.',
          recs: [
            { label: 'MIG', value: 'ER4043 / ER5356', type: 'teal' },
            { label: 'TIG', value: 'ER4043 rod (EWP or EWLa-1.5 tungsten)', type: 'teal' },
          ]
        },
        {
          name: 'Cast Iron',
          grade: 'Grey cast iron (GJL)',
          thickness: 'Variable — castings',
          details: 'High carbon content, very brittle. Must preheat to 200–300°C. Use nickel-based electrodes (ENi-1 / ENiFe-CI) for crack-resistant welds. Cool extremely slowly — wrap in insulating blanket. Do not quench.',
          recs: [
            { label: 'SMAW', value: 'ENi-1 (Nickel) or ENiFe-CI', type: 'gold' },
            { label: 'Tip', value: 'Preheat 250°C min · Slow cool', type: 'red' },
          ]
        },
      ]
    },
    {
      id: 'wirtgen',
      label: 'Wirtgen — Road Milling Machines (W200i, W50ri, W50i)',
      icon: '🛣️',
      metals: [
        {
          name: 'Drum Frame Steel',
          grade: 'S355 / High-strength low alloy',
          thickness: '10 – 40mm',
          details: 'Main structural frame of the milling drum assembly. Standard high-strength structural steel. Preheat 75–100°C for thick sections. Use E7018 or E8018 for critical repairs.',
          recs: [
            { label: 'SMAW', value: 'E7018 / E8018', type: 'gold' },
            { label: 'Preheat', value: '75–100°C for t > 20mm', type: 'red' },
          ]
        },
        {
          name: 'Tooth Holder (Block)',
          grade: 'Hardened alloy steel (similar to EN 10083)',
          thickness: '20 – 50mm wall sections',
          details: 'The holder that the cutting tooth (pick) sits in. High-carbon equivalent — always preheat 100–150°C. Use E8018 minimum. Weld in small passes, allow cooling between passes. Critical component — no skimping.',
          recs: [
            { label: 'SMAW', value: 'E8018 preferred', type: 'gold' },
            { label: 'Preheat', value: '100–150°C · Slow interpass', type: 'red' },
          ]
        },
        {
          name: 'Drum Shell / Wear Plate',
          grade: 'Hardox 400 / Hardox 450',
          thickness: '8 – 20mm',
          details: 'Abrasion-resistant wear plate on drum body. High hardness (~400–450 HBW). Must preheat 100°C minimum, 150°C for thicker sections. Use E8018 or equivalent. Do NOT use E7018 on thick Hardox — underbead cracking risk.',
          recs: [
            { label: 'SMAW', value: 'E8018 / Lincoln Jetweld LH-110M', type: 'gold' },
            { label: 'Preheat', value: '100–150°C mandatory', type: 'red' },
            { label: 'Note', value: 'PWHT not usually required but slow cool', type: 'blue' },
          ]
        },
        {
          name: 'Scrapers / Side Plates',
          grade: 'Hardox 400 / AR steel',
          thickness: '8 – 15mm',
          details: 'High-wear parts subject to severe abrasion. Repair or overlay with hard-facing rod after base metal build-up. Preheat required.',
          recs: [
            { label: 'Base build-up', value: 'E7018 / E8018', type: 'green' },
            { label: 'Hard-face',     value: 'Stoody 31 or equivalent', type: 'gold' },
          ]
        },
        {
          name: 'Hydraulic Component Brackets',
          grade: 'S355 / S460',
          thickness: '10 – 30mm',
          details: 'Brackets holding hydraulic cylinders and motors. High-strength steel, often under cyclic stress. Critical welds — use low hydrogen, preheat as needed, full penetration on load-bearing joints.',
          recs: [
            { label: 'SMAW', value: 'E8018 for critical / E7018 for light', type: 'gold' },
          ]
        },
      ]
    },
    {
      id: 'mustang',
      label: 'Mustang 1900r — Skid Loader',
      icon: '🚜',
      metals: [
        {
          name: 'Loader Frame / Boom Arms',
          grade: 'S355 / ASTM A572 Gr.50',
          thickness: '8 – 25mm',
          details: 'Main structural frame and lift arms. High-strength structural steel. Weld repairs must be full-penetration on load-bearing sections. Preheat 75°C for thick sections.',
          recs: [
            { label: 'SMAW', value: 'E7018 / E8018', type: 'gold' },
            { label: 'MIG',  value: 'ER70S-6 for smaller sections', type: 'blue' },
          ]
        },
        {
          name: 'Bucket / Cutting Edge',
          grade: 'Hardox 400 / Boron steel',
          thickness: '10 – 20mm',
          details: 'High-wear bucket body and bolt-on cutting edges. Hardox 400 — preheat 100°C. Cutting edges are often boron steel and may not be repairable (replace instead).',
          recs: [
            { label: 'SMAW', value: 'E8018', type: 'gold' },
            { label: 'Preheat', value: '100°C minimum for Hardox', type: 'red' },
          ]
        },
        {
          name: 'Pivot Pins / Bushings',
          grade: 'Medium carbon steel (C45 / 1045)',
          thickness: 'Solid — 40–80mm dia',
          details: 'High-strength pivot components. Often medium-carbon or alloy steel. Preheat 150–200°C. Use E8018 or low-hydrogen alloy rod. Do not hard-face without base metal build-up first.',
          recs: [
            { label: 'SMAW', value: 'E8018 / 9018', type: 'gold' },
            { label: 'Preheat', value: '150–200°C', type: 'red' },
          ]
        },
        {
          name: 'Hydraulic Cylinder Mounts',
          grade: 'S355 / A572',
          thickness: '10 – 20mm',
          details: 'Mounting flanges for hydraulic cylinders — cyclic load-bearing. Full penetration required. Use low hydrogen only.',
          recs: [
            { label: 'SMAW', value: 'E7018 / E8018', type: 'gold' },
          ]
        },
      ]
    },
    {
      id: 'gehl',
      label: 'Gehl r165 — Skid Loader',
      icon: '🚜',
      metals: [
        {
          name: 'Frame / Chassis',
          grade: 'S355 / HSLA steel',
          thickness: '6 – 20mm',
          details: 'Main chassis and loader frame. Similar to Mustang — standard high-strength structural steel. E7018 or E8018 depending on section thickness and criticality.',
          recs: [
            { label: 'SMAW', value: 'E7018 / E8018', type: 'gold' },
            { label: 'MIG',  value: 'ER70S-6', type: 'blue' },
          ]
        },
        {
          name: 'Lift Arm Wear Pads',
          grade: 'UHMW Poly / HDPE or mild steel overlay',
          thickness: '10–20mm plastic or 6mm steel',
          details: 'Sliding pads on lift arm. Plastic pads are not weldable (replace). Steel wear plates — build up with ER70S-6 or E7018, then overlay with hard-facing if needed.',
          recs: [
            { label: 'Steel pads', value: 'E7018 build-up + hard-face', type: 'green' },
          ]
        },
        {
          name: 'Quick-Attach Plate',
          grade: 'S355 high-strength',
          thickness: '10 – 15mm',
          details: 'Universal quick-attach interface. High load — full penetration welds only. Low hydrogen mandatory.',
          recs: [
            { label: 'SMAW', value: 'E7018 minimum / E8018 preferred', type: 'gold' },
          ]
        },
      ]
    },
  ],

  render() {
    document.getElementById('main-content').innerHTML = `
    <div class="fade-up" style="max-width:1060px;">
      <div class="page-header">
        <div class="page-title">Metal <span>Types</span></div>
        <div class="page-sub">Welding reference by equipment category — materials, preheat, and filler recommendations</div>
      </div>

      ${this.CATEGORIES.map(cat => `
        <div class="metals-category">
          <div class="metals-category-title">${cat.icon} ${cat.label}</div>
          ${cat.metals.map(m => this.metalCard(m)).join('')}
        </div>
      `).join('')}

      <div class="module-footer">Preheat and filler recommendations are field guidelines. For critical structural repairs, consult applicable welding procedure specifications (WPS).</div>
    </div>`;
  },

  metalCard(m) {
    const recBadges = m.recs.map(r =>
      `<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
        <span class="badge badge-${r.type}" style="white-space:nowrap;">${r.label}</span>
        <span style="font-size:12px;color:#ccc;">${r.value}</span>
      </div>`
    ).join('');

    return `
    <div class="metal-card">
      <div class="metal-card-header">
        <div>
          <div class="metal-name">${m.name}</div>
          <div class="metal-grade">${m.grade} · ${m.thickness}</div>
        </div>
      </div>
      <div class="metal-details">${m.details}</div>
      <div class="metal-recs" style="margin-top:12px;flex-direction:column;">
        ${recBadges}
      </div>
    </div>`;
  }
};
