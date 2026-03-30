// ═══════════════════════════════════════════
// ELECTRODES MODULE
// Extracted from electrode_lookup.html
// ═══════════════════════════════════════════

const ElectrodesModule = {

// ── ELEMENT NAMES ──────────────────────────
EL: {
  C:'Carbon', Mn:'Manganese', Si:'Silicon', S:'Sulfur', P:'Phosphorus',
  Cr:'Chromium', Ni:'Nickel', Mo:'Molybdenum', V:'Vanadium', Cu:'Copper',
  Ti:'Titanium', Zr:'Zirconium', Al:'Aluminum', Fe:'Iron', W:'Tungsten',
  Mg:'Magnesium', Zn:'Zinc', 'ThO₂':'Thorium Dioxide', 'La₂O₃':'Lanthanum Oxide',
  'Other':'Other Impurities'
},

// ── DATABASE ───────────────────────────────
DB: {
  SMAW:{
    "6010":{id:"6010",process:"SMAW",name:"E6010",nickname:'Deep Penetration — "Dirty Rods"',tensile:"62,000 psi min",type:"High-cellulose sodium",current:"DC+",acCompatible:false,positions:"All-position",coatingType:"High-cellulose sodium",arcType:"Aggressive, deep-penetrating arc",penetration:"Deep — ideal for root passes",spatter:"High",slag:"Fast-freezing, thin",weldAppearance:"Rough, rippled beads — needs cleanup",hydrogenContent:"High to medium",burnContamination:"Burns through rust, paint, and dirt",skillLevel:"Requires skill; troublesome on inverters",badges:[{label:"DC+ Only",type:"red"},{label:"All Position",type:"green"},{label:"Deep Penetration",type:"blue"}],strengths:["Aggressive deep-penetrating arc","Welds through rust, paint, and dirt","Fast-freezing slag ideal for vertical/overhead","Excellent for pipeline root passes","Strong arc force in tight joints"],drawbacks:["DC only — will not run on AC","More spatter than low-hydrogen rods","Difficult on some inverter welders","Higher hydrogen risk on crack-sensitive steels","Rougher bead needs grinding"],uses:["Pipeline root-pass welding","Field repairs on dirty/rusty steel","Structural steel erection","Ship maintenance and hull repair","Vertical and overhead passes"],chem:[{el:"C",val:"≤0.20"},{el:"Mn",val:"≤1.20"},{el:"Si",val:"≤1.00"},{el:"S",val:"≤0.035"},{el:"P",val:"≤0.040"},{el:"Cr",val:"≤0.20"},{el:"Ni",val:"≤0.30"},{el:"Mo",val:"≤0.30"},{el:"V",val:"≤0.08"}],ampTable:[{dia_in:"3/32",dia_mm:"2.4",amp:"40–80"},{dia_in:"1/8",dia_mm:"3.2",amp:"75–125"},{dia_in:"5/32",dia_mm:"4.0",amp:"110–170"},{dia_in:"3/16",dia_mm:"4.8",amp:"140–215"}]},
    "6011":{id:"6011",process:"SMAW",name:"E6011",nickname:'AC-Capable Cellulosic — "The AC 6010"',tensile:"62,000 psi min",type:"High-cellulose potassium",current:"AC / DC+",acCompatible:true,positions:"All-position",coatingType:"High-cellulose potassium",arcType:"Aggressive arc, slightly softer than 6010",penetration:"Deep — good for root passes",spatter:"Moderate to high",slag:"Fast-freezing, thin",weldAppearance:"Rippled — adequate for field work",hydrogenContent:"High to medium",burnContamination:"Burns through moderate contamination",skillLevel:"Easier than 6010 on AC; still needs technique",badges:[{label:"AC / DC+",type:"green"},{label:"All Position",type:"green"},{label:"Deep Penetration",type:"blue"}],strengths:["Works on AC and DC+ — very versatile","Deep arc good for root passes","Fast-freezing slag for out-of-position work","Burns through light contamination","Widely available and affordable"],drawbacks:["More spatter than low-hydrogen rods","Rougher bead needs cleanup","Higher hydrogen — risk on crack-sensitive steels","Less aggressive than 6010 on very dirty surfaces","Limited to lower-strength applications"],uses:["Field repairs where only AC available","Root pass on pipe and structural steel","Maintenance on rusty/painted steel","Vertical and overhead welding","General construction with basic equipment"],chem:[{el:"C",val:"≤0.20"},{el:"Mn",val:"≤1.20"},{el:"Si",val:"≤1.00"},{el:"S",val:"≤0.035"},{el:"P",val:"≤0.040"},{el:"Cr",val:"≤0.20"},{el:"Ni",val:"≤0.30"},{el:"Mo",val:"≤0.30"},{el:"V",val:"≤0.08"}],ampTable:[{dia_in:"3/32",dia_mm:"2.4",amp:"40–80"},{dia_in:"1/8",dia_mm:"3.2",amp:"75–125"},{dia_in:"5/32",dia_mm:"4.0",amp:"110–165"},{dia_in:"3/16",dia_mm:"4.8",amp:"140–210"}]},
    "6013":{id:"6013",process:"SMAW",name:"E6013",nickname:'Beginner-Friendly — "The Easy Rod"',tensile:"62,000 psi min",type:"High-titania potassium",current:"AC / DC+ / DC−",acCompatible:true,positions:"All-position (best flat/horizontal)",coatingType:"High-titania potassium",arcType:"Soft, stable, easy-starting arc",penetration:"Shallow to medium",spatter:"Low",slag:"Heavy, easily removed",weldAppearance:"Smooth, attractive bead — minimal cleanup",hydrogenContent:"Medium",burnContamination:"Needs relatively clean surfaces",skillLevel:"Very easy — excellent for beginners",badges:[{label:"AC / DC",type:"green"},{label:"All Position",type:"green"},{label:"Beginner Friendly",type:"blue"}],strengths:["Easy arc starting and re-striking","Soft stable arc — very forgiving","Smooth, attractive beads","Low spatter — minimal cleanup","Works on AC, DC+, and DC−"],drawbacks:["Shallow penetration — poor for root passes","Not for dirty, rusty, or painted surfaces","Lower strength than 7018","Heavy slag must be cleaned between passes","Poor on thin sheet — risk of burn-through"],uses:["Sheet metal fabrication","Auto body and light structural repair","General hobby and DIY welding","Ornamental ironwork","Training and beginner practice"],chem:[{el:"C",val:"≤0.20"},{el:"Mn",val:"≤1.20"},{el:"Si",val:"≤1.00"},{el:"S",val:"≤0.040"},{el:"P",val:"≤0.040"},{el:"Cr",val:"≤0.20"},{el:"Ni",val:"≤0.30"},{el:"Mo",val:"≤0.30"},{el:"V",val:"≤0.08"}],ampTable:[{dia_in:"3/32",dia_mm:"2.4",amp:"40–85"},{dia_in:"1/8",dia_mm:"3.2",amp:"80–130"},{dia_in:"5/32",dia_mm:"4.0",amp:"105–180"},{dia_in:"3/16",dia_mm:"4.8",amp:"150–230"}]},
    "7014":{id:"7014",process:"SMAW",name:"E7014",nickname:'Iron Powder — "The Smooth Runner"',tensile:"70,000 psi min",type:"Iron powder titania",current:"AC / DC+ / DC−",acCompatible:true,positions:"Flat and horizontal preferred",coatingType:"Iron powder titania",arcType:"Smooth, stable — easier than 7018",penetration:"Medium",spatter:"Low to medium",slag:"Heavy, easily peeled",weldAppearance:"Smooth, consistent bead",hydrogenContent:"Medium",burnContamination:"Needs reasonably clean surfaces",skillLevel:"Easy — less critical technique than 7018",badges:[{label:"AC / DC",type:"green"},{label:"High Deposition",type:"gold"},{label:"70 ksi",type:"blue"}],strengths:["70,000 psi tensile — stronger than 6013","High deposition rate with iron powder","Smooth arc — easier to run than 7018","Works on AC and DC","Clean bead appearance"],drawbacks:["Not truly all-position — limited overhead","Requires cleaner surfaces","Medium hydrogen — not for HIC-sensitive steels","Lower penetration than 7018","Less common than 6013 or 7018"],uses:["Flat and horizontal groove welds","General fabrication requiring higher strength","Fillet welds on structural steel","Production welding for deposition rate","Bridge and structural (non-critical)"],chem:[{el:"C",val:"≤0.15"},{el:"Mn",val:"≤1.25"},{el:"Si",val:"≤0.90"},{el:"S",val:"≤0.035"},{el:"P",val:"≤0.035"},{el:"Cr",val:"≤0.20"},{el:"Ni",val:"≤0.30"},{el:"Mo",val:"≤0.30"},{el:"V",val:"≤0.08"}],ampTable:[{dia_in:"3/32",dia_mm:"2.4",amp:"80–125"},{dia_in:"1/8",dia_mm:"3.2",amp:"110–165"},{dia_in:"5/32",dia_mm:"4.0",amp:"150–210"},{dia_in:"3/16",dia_mm:"4.8",amp:"200–275"}]},
    "7018":{id:"7018",process:"SMAW",name:"E7018",nickname:"High-Strength, Structural Rods",tensile:"70,000 psi min",type:"Low-hydrogen, iron-powder",current:"AC / DC+",acCompatible:true,positions:"All-position (V/OH requires more skill)",coatingType:"Low-hydrogen, iron powder",arcType:"Smooth, soft, stable arc",penetration:"Medium to shallow — fill and cap passes",spatter:"Low",slag:"Thick, easily peels off",weldAppearance:"Smooth, visually appealing — less cleanup",hydrogenContent:"Low-hydrogen",burnContamination:"Requires clean surfaces — sensitive to moisture",skillLevel:"Forgiving arc; vertical/overhead needs more skill",badges:[{label:"AC / DC+",type:"green"},{label:"Low Hydrogen",type:"blue"},{label:"70 ksi",type:"gold"}],strengths:["70,000 psi tensile minimum","Smooth, stable arc — easy to control","Low hydrogen reduces cracking risk","High deposition with iron powder","Clean, smooth bead appearance"],drawbacks:["Lower penetration than E6010","Sensitive to contamination — needs clean metal","Requires dry storage to prevent porosity","More skill for vertical/overhead positions","Cannot burn through rust or paint"],uses:["Structural fabrication and construction","Pressure vessels and boiler work","Heavy equipment repair","Shipbuilding and offshore structures","General carbon and low-alloy steel welding"],chem:[{el:"C",val:"≤0.15"},{el:"Mn",val:"≤1.60"},{el:"Si",val:"≤0.75"},{el:"S",val:"≤0.035"},{el:"P",val:"≤0.040"},{el:"Cr",val:"≤0.20"},{el:"Ni",val:"≤0.30"},{el:"Mo",val:"≤0.30"},{el:"V",val:"≤0.08"}],ampTable:[{dia_in:"3/32",dia_mm:"2.5",amp_fh:"70–110",amp_vo:"60–70"},{dia_in:"1/8",dia_mm:"3.2",amp_fh:"100–140",amp_vo:"80–110"},{dia_in:"5/32",dia_mm:"4.0",amp_fh:"140–170",amp_vo:"130–150"},{dia_in:"3/16",dia_mm:"5.0",amp_fh:"190–240",amp_vo:"—"}],ampType:"dual"},
    "7024":{id:"7024",process:"SMAW",name:"E7024",nickname:'Iron Powder — "Drag Rod" / High Deposition',tensile:"70,000 psi min",type:"Iron powder titania (heavy)",current:"AC / DC+ / DC−",acCompatible:true,positions:"Flat and horizontal ONLY",coatingType:"Iron powder titania (heavy coat)",arcType:"Smooth — can be dragged along the joint",penetration:"Shallow — fill passes on flat joints",spatter:"Very low",slag:"Heavy, easily removed",weldAppearance:"Very smooth, consistent — excellent cosmetics",hydrogenContent:"Medium",burnContamination:"Requires clean surfaces",skillLevel:"Very easy — literally drag the rod",badges:[{label:"AC / DC",type:"green"},{label:"Flat/Horiz Only",type:"red"},{label:"Drag Rod",type:"gold"}],strengths:["Highest deposition rate of common SMAW rods","Can be dragged along the joint (contact welding)","Very smooth, attractive bead","Works on AC and DC","Best for high-production flat welding"],drawbacks:["Flat and horizontal ONLY","Shallow penetration — poor for root passes","Requires clean base metal","Medium hydrogen","Heavy slag means more cleaning between passes"],uses:["High-production flat groove welds","Horizontal fillet welds on large structures","Shipbuilding flat deck welding","Manufacturing and fabrication shops","Anywhere speed matters on flat work"],chem:[{el:"C",val:"≤0.15"},{el:"Mn",val:"≤1.25"},{el:"Si",val:"≤0.90"},{el:"S",val:"≤0.035"},{el:"P",val:"≤0.035"},{el:"Cr",val:"≤0.20"},{el:"Ni",val:"≤0.30"},{el:"Mo",val:"≤0.30"},{el:"V",val:"≤0.08"}],ampTable:[{dia_in:"3/16",dia_mm:"4.8",amp:"180–240"},{dia_in:"7/32",dia_mm:"5.6",amp:"230–300"},{dia_in:"1/4",dia_mm:"6.4",amp:"300–400"},{dia_in:"5/16",dia_mm:"8.0",amp:"400–525"}]},
    "8018":{id:"8018",process:"SMAW",name:"E8018",nickname:"High-Strength Low-Alloy — 80 ksi",tensile:"80,000 psi min",type:"Low-hydrogen, iron-powder",current:"AC / DC+",acCompatible:true,positions:"All-position (V/OH requires skill)",coatingType:"Low-hydrogen, iron powder",arcType:"Smooth, stable — similar to 7018 but higher strength",penetration:"Medium",spatter:"Low",slag:"Thick, easily peeled",weldAppearance:"Smooth, clean bead",hydrogenContent:"Low-hydrogen",burnContamination:"Requires clean surfaces",skillLevel:"Similar to 7018 — needs dry storage and clean metal",badges:[{label:"AC / DC+",type:"green"},{label:"Low Hydrogen",type:"blue"},{label:"80 ksi",type:"gold"}],strengths:["80,000 psi tensile for high-strength applications","Low hydrogen reduces cracking on alloy steels","Smooth, stable arc like 7018","Good all-position with proper technique","Matches higher-strength base metal requirements"],drawbacks:["More expensive than 7018","Requires strict dry storage (oven or sealed)","Preheat often required on thicker sections","Cannot burn through contamination","Overkill for mild steel — use 7018 instead"],uses:["High-strength structural steel (A514, A572 Gr.65)","Pressure vessels and critical weldments","Heavy machinery and crane fabrication","High-strength pipeline fill and cap passes","Military and aerospace structural repairs"],chem:[{el:"C",val:"≤0.10"},{el:"Mn",val:"≤1.60"},{el:"Si",val:"≤0.80"},{el:"S",val:"≤0.030"},{el:"P",val:"≤0.030"},{el:"Cr",val:"≤0.20"},{el:"Ni",val:"≤0.30"},{el:"Mo",val:"≤0.30"},{el:"V",val:"≤0.08"}],ampTable:[{dia_in:"3/32",dia_mm:"2.4",amp_fh:"70–100",amp_vo:"60–80"},{dia_in:"1/8",dia_mm:"3.2",amp_fh:"100–150",amp_vo:"80–110"},{dia_in:"5/32",dia_mm:"4.0",amp_fh:"140–190",amp_vo:"130–160"},{dia_in:"3/16",dia_mm:"4.8",amp_fh:"190–250",amp_vo:"—"}],ampType:"dual"}
  },
  MIG:{
    "ER70S-2":{id:"ER70S-2",process:"MIG",name:"ER70S-2",nickname:"Triple-Deoxidized Mild Steel Wire",tensile:"70,000 psi min",type:"Copper-coated solid wire",current:"DC+",acCompatible:false,positions:"All-position",coatingType:"Solid copper-coated — no flux",arcType:"Smooth, stable arc with excellent deoxidation",penetration:"Medium",spatter:"Very low",slag:"None (shielding gas required)",weldAppearance:"Excellent — smooth, bright bead",hydrogenContent:"Low",burnContamination:"Best GMAW wire for contaminated surfaces (triple deox)",skillLevel:"Easy — excellent arc control; needs gas supply",badges:[{label:"DC+",type:"blue"},{label:"All Position",type:"green"},{label:"Triple Deox",type:"gold"}],strengths:["Triple-deoxidized (Al, Ti, Zr) for contaminated base metal","Best GMAW wire for rusty or dirty steel","Excellent on pipe root passes","Very low spatter","Bright, clean bead appearance"],drawbacks:["Requires external shielding gas","More expensive than ER70S-6","Not for outdoor use in wind without protection","Slightly lower deposition than ER70S-6","Requires clean gas line and equipment"],uses:["Root pass welding on carbon steel pipe","Welding on mill scale or light rust","Pressure piping and vessel work","Power generation and refinery applications","Any application requiring maximum deoxidation"],shieldingGas:"75% Ar / 25% CO₂ or 100% CO₂",wireGauge:[{gauge:"0.030 in (0.8mm)",amp:"60–150 A"},{gauge:"0.035 in (0.9mm)",amp:"100–200 A"},{gauge:"0.045 in (1.2mm)",amp:"150–280 A"}],chem:[{el:"C",val:"≤0.07"},{el:"Mn",val:"0.90–1.40"},{el:"Si",val:"0.45–0.75"},{el:"S",val:"≤0.025"},{el:"P",val:"≤0.025"},{el:"Cu",val:"≤0.50"},{el:"Ti",val:"0.05–0.15"},{el:"Zr",val:"0.02–0.12"},{el:"Al",val:"0.05–0.15"}]},
    "ER70S-6":{id:"ER70S-6",process:"MIG",name:"ER70S-6",nickname:"High Deoxidation Mild Steel — Most Common MIG Wire",tensile:"70,000 psi min",type:"Copper-coated solid wire",current:"DC+",acCompatible:false,positions:"All-position",coatingType:"Solid copper-coated wire",arcType:"Smooth, stable — higher Si gives fluid puddle",penetration:"Medium",spatter:"Low",slag:"None (shielding gas required)",weldAppearance:"Smooth, glossy bead — excellent cosmetics",hydrogenContent:"Low",burnContamination:"Good on light rust and mill scale",skillLevel:"Easy — most forgiving common GMAW wire",badges:[{label:"DC+",type:"blue"},{label:"All Position",type:"green"},{label:"Most Common",type:"gold"}],strengths:["Most widely available MIG wire","High Si and Mn — handles light contamination","Excellent bead appearance","Low spatter","Versatile — automotive to structural"],drawbacks:["Requires shielding gas — no wind tolerance","Silicon islands on bead surface (must grind before painting)","Not ideal on heavy rust — use ER70S-2","DC+ only","Slightly less deox than ER70S-2"],uses:["General fabrication and manufacturing","Automotive body and frame work","Structural steel welding","Home shop and hobbyist welding","Thin to medium gauge sheet metal"],shieldingGas:"75% Ar / 25% CO₂ (best) or 100% CO₂",wireGauge:[{gauge:"0.023 in (0.6mm)",amp:"30–90 A"},{gauge:"0.030 in (0.8mm)",amp:"60–150 A"},{gauge:"0.035 in (0.9mm)",amp:"100–200 A"},{gauge:"0.045 in (1.2mm)",amp:"150–300 A"}],chem:[{el:"C",val:"≤0.07"},{el:"Mn",val:"1.40–1.85"},{el:"Si",val:"0.80–1.15"},{el:"S",val:"≤0.035"},{el:"P",val:"≤0.025"},{el:"Cu",val:"≤0.50"}]},
    "ER308L":{id:"ER308L",process:"MIG",name:"ER308L",nickname:"Stainless MIG Wire — 304/308 Base Metal",tensile:"80,000 psi min",type:"Solid stainless wire",current:"DC+",acCompatible:false,positions:"All-position",coatingType:"Solid bare wire — no coating",arcType:"Stable; requires Ar-rich shielding",penetration:"Medium",spatter:"Low to moderate",slag:"None",weldAppearance:"Bright, smooth — excellent for sanitary welds",hydrogenContent:"Low",burnContamination:"Requires clean, contamination-free base metal",skillLevel:"Moderate — parameter control important for stainless",badges:[{label:"DC+",type:"blue"},{label:"Stainless",type:"teal"},{label:"304 / 308",type:"green"}],strengths:["Matches 304, 308, and 321 stainless base metal","Excellent corrosion resistance","Low carbon reduces carbide precipitation","Smooth, bright, clean bead","FDA/food-grade approved welds"],drawbacks:["Requires 98% Ar / 2% CO₂ or tri-mix shielding","Expensive compared to carbon steel wire","Stainless distortion control is critical","Sensitization risk above 350°F interpass temp","Requires stainless-only tooling"],uses:["Welding 304 and 316 stainless fabrications","Food processing and dairy equipment","Chemical processing tanks","Kitchen and restaurant equipment","Pharmaceutical piping"],shieldingGas:"98% Ar / 2% CO₂ or Tri-Mix (90/7.5/2.5 He/Ar/CO₂)",wireGauge:[{gauge:"0.030 in (0.8mm)",amp:"60–130 A"},{gauge:"0.035 in (0.9mm)",amp:"90–180 A"},{gauge:"0.045 in (1.2mm)",amp:"140–250 A"}],chem:[{el:"C",val:"≤0.03"},{el:"Mn",val:"1.0–2.5"},{el:"Si",val:"0.30–0.65"},{el:"S",val:"≤0.030"},{el:"P",val:"≤0.030"},{el:"Cr",val:"19.5–22.0"},{el:"Ni",val:"9.0–11.0"},{el:"Mo",val:"≤0.75"}]},
    "ER309L":{id:"ER309L",process:"MIG",name:"ER309L",nickname:"Dissimilar Metal MIG Wire — Carbon to Stainless",tensile:"80,000 psi min",type:"Solid stainless wire (high Cr/Ni)",current:"DC+",acCompatible:false,positions:"All-position",coatingType:"Solid bare wire",arcType:"Stable arc — higher alloy content than 308L",penetration:"Medium",spatter:"Low to moderate",slag:"None",weldAppearance:"Smooth, bright",hydrogenContent:"Low",burnContamination:"Requires clean surfaces",skillLevel:"Moderate — parameter control for dissimilar metals",badges:[{label:"DC+",type:"blue"},{label:"Dissimilar",type:"gold"},{label:"High Alloy",type:"teal"}],strengths:["Designed for carbon steel to stainless steel joints","Higher Cr and Ni than 308L — handles dilution","Can be used as a buffer layer or cladding","Good corrosion resistance in dissimilar joints","Works for overlay welding on mild steel"],drawbacks:["More expensive than 308L","Overkill for stainless-to-stainless joints (use 308L)","High ferrite content may affect some applications","Requires stainless shielding gas","Cross contamination risk without proper tooling"],uses:["Joining carbon steel to stainless steel","Cladding and overlay on carbon steel","Stainless exhaust systems on mild steel flanges","Transition joints in dissimilar piping","Repair welding on stainless with diluted base metal"],shieldingGas:"98% Ar / 2% CO₂ or Tri-Mix",wireGauge:[{gauge:"0.030 in (0.8mm)",amp:"60–130 A"},{gauge:"0.035 in (0.9mm)",amp:"90–180 A"},{gauge:"0.045 in (1.2mm)",amp:"140–250 A"}],chem:[{el:"C",val:"≤0.03"},{el:"Mn",val:"1.0–2.5"},{el:"Si",val:"0.30–0.65"},{el:"S",val:"≤0.030"},{el:"P",val:"≤0.030"},{el:"Cr",val:"23.0–25.0"},{el:"Ni",val:"12.0–14.0"},{el:"Mo",val:"≤0.75"}]},
    "ER4043":{id:"ER4043",process:"MIG",name:"ER4043",nickname:"Aluminum Silicon MIG Wire — Most Common Aluminum MIG",tensile:"27,000 psi (as-welded)",type:"Aluminum alloy wire (Al-Si)",current:"DC+",acCompatible:false,positions:"All-position",coatingType:"Solid aluminum wire — no coating",arcType:"Fluid puddle, very easy to run",penetration:"Medium",spatter:"Low",slag:"None",weldAppearance:"Bright silver, smooth",hydrogenContent:"N/A — aluminum",burnContamination:"Clean metal required — oxide removal critical",skillLevel:"Moderate — push-only; feed issues require setup care",badges:[{label:"DC+",type:"blue"},{label:"Aluminum",type:"teal"},{label:"Al-Si",type:"green"}],strengths:["Most common aluminum MIG wire","Low melting point — good flow and wetting","Excellent crack resistance","Works on 6000-series aluminum","Bright, cosmetically pleasing weld"],drawbacks:["Lower tensile than 5356","Do not use on 2xxx or 7xxx alloys","Anodizes gray — cosmetic mismatch on bright anodize","Wire feed issues — use Teflon-lined gun","Lower shear strength under cyclic load"],uses:["6061, 6063 aluminum fabrication","Automotive and bicycle frames","Marine aluminum repair","Architectural aluminum structures","General aluminum MIG welding"],shieldingGas:"100% Argon",wireGauge:[{gauge:"0.030 in (0.8mm)",amp:"60–120 A"},{gauge:"0.035 in (0.9mm)",amp:"90–160 A"},{gauge:"3/64 in (1.2mm)",amp:"130–220 A"}],chem:[{el:"Si",val:"4.5–6.0"},{el:"Fe",val:"≤0.80"},{el:"Cu",val:"≤0.30"},{el:"Mn",val:"≤0.05"},{el:"Mg",val:"≤0.05"},{el:"Zn",val:"≤0.10"},{el:"Ti",val:"≤0.20"},{el:"Al",val:"Balance"}]},
    "ER5356":{id:"ER5356",process:"MIG",name:"ER5356",nickname:"Aluminum Magnesium MIG Wire — High Strength",tensile:"40,000 psi min (as-welded)",type:"Aluminum alloy wire (Al-Mg)",current:"DC+",acCompatible:false,positions:"All-position",coatingType:"Solid aluminum wire",arcType:"Slightly stiffer puddle than 4043",penetration:"Medium",spatter:"Low",slag:"None",weldAppearance:"Bright silver — anodizes better than 4043",hydrogenContent:"N/A — aluminum",burnContamination:"Clean metal required — oxide removal critical",skillLevel:"Moderate — same care as 4043 for feed system",badges:[{label:"DC+",type:"blue"},{label:"Aluminum",type:"teal"},{label:"High Strength",type:"gold"}],strengths:["Higher tensile strength than ER4043","Better corrosion resistance in marine environments","Anodizes to a closer match to base metal","Works on 5xxx and some 6xxx alloys","Preferred for marine and structural aluminum"],drawbacks:["Do not use on 2xxx or 7xxx alloys","More prone to cracking than 4043 on hot-crack-sensitive alloys","Slightly stiffer puddle — harder out-of-position","Requires clean, well-maintained wire feed system","Not for base metals with stress-corrosion cracking concerns"],uses:["Marine aluminum (5086, 5052, 5083)","High-strength aluminum structures","Toolboxes, trailers, and truck bodies","Aluminum tanks holding chemicals","Welding where anodized finish must match"],shieldingGas:"100% Argon",wireGauge:[{gauge:"0.030 in (0.8mm)",amp:"60–120 A"},{gauge:"0.035 in (0.9mm)",amp:"90–160 A"},{gauge:"3/64 in (1.2mm)",amp:"130–230 A"}],chem:[{el:"Si",val:"≤0.25"},{el:"Fe",val:"≤0.40"},{el:"Cu",val:"≤0.10"},{el:"Mn",val:"0.05–0.20"},{el:"Mg",val:"4.5–5.5"},{el:"Cr",val:"0.05–0.20"},{el:"Zn",val:"≤0.10"},{el:"Ti",val:"0.06–0.20"},{el:"Al",val:"Balance"}]}
  },
  TIG:{
    "EWTh-2":{id:"EWTh-2",process:"TIG",name:"EWTh-2",nickname:'2% Thoriated Tungsten — "Red Tip"',tensile:"N/A — Non-consumable electrode",type:"Thoriated tungsten electrode",current:"DC−",acCompatible:false,positions:"All-position (torch angle varies)",coatingType:"Thorium oxide (ThO₂) 1.7–2.2%",arcType:"Excellent arc starting; handles high amperage",penetration:"Deep — high current capacity",spatter:"None (non-consumable)",slag:"None",weldAppearance:"Excellent — depends on filler rod",hydrogenContent:"N/A",burnContamination:"Clean metal required for TIG always",skillLevel:"Intermediate — best all-around DC TIG tungsten",badges:[{label:"DC− Only",type:"red"},{label:"Non-Consumable",type:"blue"},{label:"Red Band",type:"red"}],strengths:["Best overall arc starting and stability","Highest current-carrying capacity of common tungstens","Long electrode life","Sharp point stays sharp longer on DC−","Industry standard for DC TIG on steel and stainless"],drawbacks:["Slightly radioactive — requires careful handling and disposal","Not for AC welding (aluminum)","Restricted or regulated in some countries","Grinding produces radioactive dust — use wet grinder","Must verify color code — no cross-contamination"],uses:["TIG welding carbon and stainless steel","TIG welding on nickel alloys and titanium","Precision root passes on pipe","Aerospace and nuclear fabrication","Any DC TIG application requiring maximum stability"],shieldingGas:"100% Argon (or Ar/He mix for more heat)",fillerRod:"ER70S-2, ER308L, ER4043 depending on base metal",tipPrep:"Sharp point ground longitudinally — no ball end",chem:[{el:"W",val:"Balance"},{el:"ThO₂",val:"1.7–2.2%"},{el:"Other",val:"≤0.50%"}],ampTable:[{dia_in:"1/16 in",dia_mm:"1.6 mm",amp:"2–100 A"},{dia_in:"3/32 in",dia_mm:"2.4 mm",amp:"40–200 A"},{dia_in:"1/8 in",dia_mm:"3.2 mm",amp:"100–300 A"},{dia_in:"5/32 in",dia_mm:"4.0 mm",amp:"200–400 A"}]},
    "EWP":{id:"EWP",process:"TIG",name:"EWP",nickname:'Pure Tungsten — "Green Tip" for AC Aluminum',tensile:"N/A — Non-consumable electrode",type:"Pure tungsten electrode",current:"AC",acCompatible:true,positions:"All-position",coatingType:"Pure tungsten — no additives",arcType:"Balling tip on AC — wide arc cone for aluminum",penetration:"Shallow on AC — broad, cleaning arc",spatter:"None (non-consumable)",slag:"None",weldAppearance:"Good for aluminum with proper ball end",hydrogenContent:"N/A",burnContamination:"Clean metal required",skillLevel:"Easy to use on AC — tip balls naturally",badges:[{label:"AC",type:"green"},{label:"Aluminum",type:"teal"},{label:"Green Band",type:"green"}],strengths:["Best choice for AC aluminum TIG welding","Tip balls up naturally on AC — stable arc","No radioactive material","Lowest cost tungsten","Wide cleaning zone for aluminum oxide removal"],drawbacks:["AC only — do not use on DC (unstable arc)","Lower current capacity than thoriated","Ball end limits current range","Shorter electrode life than thoriated or ceriated","Less versatile — aluminum/magnesium on AC only"],uses:["AC TIG welding on aluminum (5052, 6061)","AC TIG welding on magnesium alloys","Hobby and light industrial aluminum TIG","Where radioactive tungsten is prohibited","Entry-level AC TIG setups"],shieldingGas:"100% Argon",fillerRod:"ER4043 or ER5356 for aluminum",tipPrep:"Ball end — form on AC before welding",chem:[{el:"W",val:"≥99.5%"},{el:"Other",val:"≤0.50%"}],ampTable:[{dia_in:"1/16 in",dia_mm:"1.6 mm",amp:"AC: 20–60 A"},{dia_in:"3/32 in",dia_mm:"2.4 mm",amp:"AC: 40–110 A"},{dia_in:"1/8 in",dia_mm:"3.2 mm",amp:"AC: 80–180 A"}]},
    "EWLa-1.5":{id:"EWLa-1.5",process:"TIG",name:"EWLa-1.5",nickname:'1.5% Lanthanated — "Gold Tip" — Best All-Rounder',tensile:"N/A — Non-consumable electrode",type:"Lanthanated tungsten electrode",current:"AC / DC+ / DC−",acCompatible:true,positions:"All-position",coatingType:"Lanthanum oxide (La₂O₃) 1.3–1.7%",arcType:"Excellent arc starting on AC and DC; no balling on AC",penetration:"Medium to deep depending on polarity",spatter:"None (non-consumable)",slag:"None",weldAppearance:"Excellent — sharp point maintained on AC and DC",hydrogenContent:"N/A",burnContamination:"Clean metal required",skillLevel:"Easy — works on all metals and polarities",badges:[{label:"AC / DC",type:"green"},{label:"Non-Radioactive",type:"teal"},{label:"All-Rounder",type:"gold"}],strengths:["Works on AC AND DC — truly all-purpose","Non-radioactive — safe to grind and dispose","Excellent arc starting on both AC and DC","Point stays sharp on AC (unlike pure tungsten)","Lower burn-off rate — longer electrode life"],drawbacks:["More expensive than pure or thoriated tungsten","Gold band can fade — label clearly","Less well-known — harder to source at some suppliers","Not as common in older reference standards","Slightly lower peak current vs EWTh-2 at extremes"],uses:["All-metal TIG shop — steel, stainless, aluminum, titanium","AC TIG aluminum without radioactive tungsten","Shops requiring one tungsten type for all applications","Medical and food-grade fabrication","Training environments"],shieldingGas:"100% Argon (or Ar/He mix)",fillerRod:"Match to base metal — ER70S-2, ER308L, ER4043 etc.",tipPrep:"Sharp point for DC / flat taper for AC",chem:[{el:"W",val:"Balance"},{el:"La₂O₃",val:"1.3–1.7%"},{el:"Other",val:"≤0.50%"}],ampTable:[{dia_in:"1/16 in",dia_mm:"1.6 mm",amp:"DC: 5–80 A / AC: 10–70 A"},{dia_in:"3/32 in",dia_mm:"2.4 mm",amp:"DC: 50–170 A / AC: 40–130 A"},{dia_in:"1/8 in",dia_mm:"3.2 mm",amp:"DC: 100–280 A / AC: 80–200 A"}]},
    "TIG-ER70S-2":{id:"TIG-ER70S-2",process:"TIG",name:"ER70S-2 (TIG Rod)",nickname:"Carbon Steel TIG Filler — Triple Deox",tensile:"70,000 psi min",type:"Solid carbon steel filler rod",current:"N/A (filler — fed manually)",acCompatible:true,positions:"All-position (with EWTh-2 or EWLa-1.5 tungsten)",coatingType:"No coating — bare solid rod",arcType:"N/A — dipped filler rod",penetration:"Controlled by welder technique",spatter:"None when fed correctly",slag:"None",weldAppearance:"Excellent — bright, clean bead",hydrogenContent:"Low",burnContamination:"Best on contaminated carbon steel for TIG",skillLevel:"Intermediate — requires correct dip technique",badges:[{label:"TIG Filler",type:"blue"},{label:"Steel",type:"green"},{label:"Triple Deox",type:"gold"}],strengths:["Triple-deoxidized — best for contaminated or pipe carbon steel","Excellent for root pass TIG on pipe","Low porosity risk","Bright, clean weld bead","Standard for power plant and refinery pipe TIG"],drawbacks:["Requires clean tungsten and shielding gas","Manual dip feeding requires practice","Not for stainless or aluminum","Must keep rod out of arc zone to avoid tungsten contamination","Limited to DC− tungsten"],uses:["TIG root pass on carbon steel pipe","Power plant and boiler tube welding","Critical structural TIG joints","Process piping (ASME B31.3)","Where x-ray quality welds are required"],shieldingGas:"100% Argon",tipPrep:"N/A — filler rod, not tungsten",chem:[{el:"C",val:"≤0.07"},{el:"Mn",val:"0.90–1.40"},{el:"Si",val:"0.45–0.75"},{el:"S",val:"≤0.025"},{el:"P",val:"≤0.025"},{el:"Ti",val:"0.05–0.15"},{el:"Zr",val:"0.02–0.12"},{el:"Al",val:"0.05–0.15"}]},
    "TIG-ER308L":{id:"TIG-ER308L",process:"TIG",name:"ER308L (TIG Rod)",nickname:"Stainless TIG Filler — 304/308 Base Metal",tensile:"80,000 psi min",type:"Solid stainless steel filler rod",current:"N/A (filler)",acCompatible:true,positions:"All-position",coatingType:"No coating — bare solid rod",arcType:"N/A — dipped filler rod",penetration:"Controlled by technique",spatter:"None",slag:"None",weldAppearance:"Bright, smooth — mirror-quality possible",hydrogenContent:"Low",burnContamination:"Clean stainless required — no cross-contamination",skillLevel:"Intermediate to advanced — tight temp control required",badges:[{label:"TIG Filler",type:"blue"},{label:"Stainless",type:"teal"},{label:"304 / 308",type:"green"}],strengths:["Standard filler for 304 and 316 stainless TIG","Low carbon — prevents sensitization","Excellent corrosion resistance","Mirror-finish welds possible","FDA/food-grade approved"],drawbacks:["Stainless warps easily — heat input control critical","Interpass temperature must stay below 350°F","Requires stainless-only brushes and tooling","Higher cost than carbon steel rods","Back purge gas required on pipe for full corrosion resistance"],uses:["304/316 stainless pipe and tube TIG","Food, dairy, and pharmaceutical equipment","Chemical processing vessels","Sanitary fittings and valves","Architectural stainless fabrication"],shieldingGas:"100% Argon (back purge with Argon for pipe)",tipPrep:"N/A — filler rod",chem:[{el:"C",val:"≤0.03"},{el:"Mn",val:"1.0–2.5"},{el:"Si",val:"0.30–0.65"},{el:"S",val:"≤0.030"},{el:"P",val:"≤0.030"},{el:"Cr",val:"19.5–22.0"},{el:"Ni",val:"9.0–11.0"},{el:"Mo",val:"≤0.75"}]},
    "TIG-ER4043":{id:"TIG-ER4043",process:"TIG",name:"ER4043 (TIG Rod)",nickname:"Aluminum TIG Filler — Most Common",tensile:"27,000 psi (as-welded)",type:"Aluminum-silicon filler rod",current:"N/A (filler — AC tungsten)",acCompatible:true,positions:"All-position with AC TIG setup",coatingType:"No coating — bare solid rod",arcType:"N/A — dipped filler rod",penetration:"Controlled by technique",spatter:"None",slag:"None",weldAppearance:"Bright silver — excellent for anodized applications",hydrogenContent:"N/A",burnContamination:"Clean aluminum required — oxide removal is critical",skillLevel:"Intermediate — aluminum TIG requires good puddle control",badges:[{label:"TIG Filler",type:"blue"},{label:"Aluminum",type:"teal"},{label:"Al-Si",type:"green"}],strengths:["Most common aluminum TIG filler","Low cracking sensitivity","Good fluidity and wetting","Works on 6061, 6063, 3003 aluminum","Bright, clean bead"],drawbacks:["Lower strength than ER5356","Anodizes dark gray — cosmetic mismatch","Not for 2xxx or 7xxx alloys","Oxide removal before welding is non-negotiable","AC setup requires dedicated TIG welder"],uses:["6061 and 6063 aluminum TIG fabrication","Bicycle frames and tubing","Automotive aluminum TIG repair","Aerospace aluminum components (general)","Architectural aluminum welding"],shieldingGas:"100% Argon",tipPrep:"N/A — filler rod (use EWP or EWLa-1.5 tungsten)",chem:[{el:"Si",val:"4.5–6.0"},{el:"Fe",val:"≤0.80"},{el:"Cu",val:"≤0.30"},{el:"Mn",val:"≤0.05"},{el:"Mg",val:"≤0.05"},{el:"Zn",val:"≤0.10"},{el:"Ti",val:"≤0.20"},{el:"Al",val:"Balance"}]}
  },
  FCAW:{
    "E71T-1C":{id:"E71T-1C",process:"FCAW",name:"E71T-1C",nickname:"Gas-Shielded FCAW — Most Common Structural Wire",tensile:"70,000 psi min",type:"Gas-shielded flux-cored wire",current:"DC+",acCompatible:false,positions:"All-position",coatingType:"Flux-cored — external shielding gas required",arcType:"Smooth, stable arc; high deposition",penetration:"Good — better than solid wire at high parameters",spatter:"Low to moderate",slag:"Removable slag",weldAppearance:"Smooth, slightly convex bead",hydrogenContent:"Low to medium (H8 or H16 designation)",burnContamination:"Moderate — not as forgiving as self-shielded",skillLevel:"Easy to intermediate — high deposition focused",badges:[{label:"DC+",type:"blue"},{label:"Gas Shielded",type:"green"},{label:"All Position",type:"green"}],strengths:["High deposition rate — 2–3× solid wire","All-position capability","Good mechanical properties","Slag protects weld during solidification","Widely used on structural steel fabrication"],drawbacks:["Requires external shielding gas","No outdoor use in wind without protection","Slag must be removed between passes","More expensive than solid wire","Two consumables (wire + gas) to manage"],uses:["Structural steel fabrication shops","Bridge and building construction","Heavy equipment manufacturing","Shipbuilding fill and cap passes","Multi-pass groove welds on thick plate"],shieldingGas:"100% CO₂ or 75% Ar / 25% CO₂",wireGauge:[{gauge:"0.035 in (0.9mm)",amp:"100–200 A"},{gauge:"0.045 in (1.2mm)",amp:"150–280 A"},{gauge:"1/16 in (1.6mm)",amp:"200–400 A"}],chem:[{el:"C",val:"≤0.12"},{el:"Mn",val:"1.0–1.75"},{el:"Si",val:"0.50–0.90"},{el:"S",val:"≤0.030"},{el:"P",val:"≤0.030"},{el:"Ni",val:"≤0.50"},{el:"Mo",val:"≤0.30"}]},
    "E71T-8":{id:"E71T-8",process:"FCAW",name:"E71T-8",nickname:"Self-Shielded FCAW — Outdoor / No Gas Needed",tensile:"70,000 psi min",type:"Self-shielded flux-cored wire",current:"DC−",acCompatible:false,positions:"All-position",coatingType:"Flux-cored — self-shielded (no external gas)",arcType:"Aggressive, good penetration — handles wind",penetration:"Good",spatter:"Moderate to high",slag:"Heavy slag — easy to peel",weldAppearance:"Adequate — slightly rougher than gas-shielded",hydrogenContent:"Low-hydrogen (H8 classification)",burnContamination:"Good — handles moderate contamination",skillLevel:"Easy — portable, no gas cylinder needed",badges:[{label:"DC−",type:"red"},{label:"Self-Shielded",type:"gold"},{label:"All Position",type:"green"}],strengths:["No shielding gas required — fully portable","Excellent for outdoor and windy conditions","All-position capability","Low-hydrogen designation","High deposition vs SMAW"],drawbacks:["DC− (electrode negative) — less common setup","More spatter than gas-shielded","Heavy slag must be removed","Smoke and fumes — ventilation critical","More expensive wire than E71T-1C"],uses:["Outdoor structural steel construction","Bridge decks and field erection","Pipeline coating repairs","Rural and remote field welding","Construction where gas supply is impractical"],shieldingGas:"None — self-shielded",wireGauge:[{gauge:"0.035 in (0.9mm)",amp:"80–160 A"},{gauge:"0.045 in (1.2mm)",amp:"120–220 A"},{gauge:"5/64 in (2.0mm)",amp:"180–300 A"}],chem:[{el:"C",val:"≤0.15"},{el:"Mn",val:"0.50–1.50"},{el:"Si",val:"≤0.50"},{el:"S",val:"≤0.030"},{el:"P",val:"≤0.030"},{el:"Al",val:"≤1.80"}]},
    "E70T-5":{id:"E70T-5",process:"FCAW",name:"E70T-5",nickname:"Basic-Slag FCAW — Low Hydrogen Structural",tensile:"70,000 psi min",type:"Gas-shielded flux-cored (basic slag)",current:"DC+",acCompatible:false,positions:"Flat and horizontal (1F, 2F, 1G, 2G)",coatingType:"Flux-cored — basic slag system, CO₂ shielded",arcType:"Stiff puddle — positional limited but excellent impact toughness",penetration:"Deep",spatter:"Moderate",slag:"Easily removed basic slag",weldAppearance:"Good — slightly rougher than E71T-1C",hydrogenContent:"Low-hydrogen",burnContamination:"Moderate contamination tolerance",skillLevel:"Intermediate — flat/horiz only; good for thick plate",badges:[{label:"DC+",type:"blue"},{label:"Low Hydrogen",type:"blue"},{label:"Flat/Horiz",type:"red"}],strengths:["Low hydrogen — reduces cracking risk on high-strength steels","Excellent impact toughness (Charpy values)","Deep penetration on thick plate","Good on steels requiring preheat","Basic slag resists moisture pickup"],drawbacks:["Flat and horizontal only — not all-position","Requires CO₂ shielding gas","Stiff puddle — harder to control","More spatter than E71T-1C","Less commonly stocked"],uses:["High-strength structural steel (A572, A514)","Offshore and marine structural welding","Heavy plate groove welds","Applications requiring Charpy impact values","Pressure vessels requiring low hydrogen"],shieldingGas:"100% CO₂",wireGauge:[{gauge:"0.045 in (1.2mm)",amp:"150–280 A"},{gauge:"1/16 in (1.6mm)",amp:"200–400 A"}],chem:[{el:"C",val:"≤0.12"},{el:"Mn",val:"0.75–1.75"},{el:"Si",val:"≤0.60"},{el:"S",val:"≤0.030"},{el:"P",val:"≤0.030"},{el:"Ni",val:"≤0.50"},{el:"Mo",val:"≤0.30"}]},
    "E308LT1-1":{id:"E308LT1-1",process:"FCAW",name:"E308LT1-1",nickname:"Stainless FCAW Wire — 304/308 Base Metal",tensile:"80,000 psi min",type:"Gas-shielded stainless flux-cored wire",current:"DC+",acCompatible:false,positions:"All-position",coatingType:"Stainless flux-cored — external Ar/CO₂ gas",arcType:"Smooth, stable — higher deposition than TIG/MIG solid wire",penetration:"Medium",spatter:"Low",slag:"Light, easily removed",weldAppearance:"Smooth, consistent — good for production stainless",hydrogenContent:"Low",burnContamination:"Requires clean stainless — no cross-contamination",skillLevel:"Intermediate — stainless distortion and parameter control required",badges:[{label:"DC+",type:"blue"},{label:"Stainless",type:"teal"},{label:"Gas Shielded",type:"green"}],strengths:["Higher deposition than solid ER308L wire","All-position stainless FCAW","Low carbon — prevents sensitization","Good slag detachability","Production-efficient for thick stainless"],drawbacks:["Expensive — stainless FCAW is premium cost","Requires 98% Ar / 2% CO₂","Stainless-only tooling mandatory","Heat management critical to prevent warping","Slag must be removed completely between passes"],uses:["Production stainless fabrication","Heavy stainless plate joining","Chemical and petrochemical vessels","Stainless structural sections","Where deposition rate on stainless matters"],shieldingGas:"98% Ar / 2% CO₂",wireGauge:[{gauge:"0.035 in (0.9mm)",amp:"100–180 A"},{gauge:"0.045 in (1.2mm)",amp:"150–260 A"}],chem:[{el:"C",val:"≤0.04"},{el:"Mn",val:"0.5–2.5"},{el:"Si",val:"≤1.0"},{el:"S",val:"≤0.030"},{el:"P",val:"≤0.040"},{el:"Cr",val:"18.0–21.0"},{el:"Ni",val:"9.0–11.0"},{el:"Mo",val:"≤0.50"}]},
    "E71T-GS":{id:"E71T-GS",process:"FCAW",name:"E71T-GS",nickname:'Self-Shielded FCAW — "No Gas" Single-Pass Wire',tensile:"70,000 psi min",type:"Self-shielded flux-cored wire (single-pass)",current:"DC−",acCompatible:false,positions:"Flat and horizontal (single-pass only)",coatingType:"Flux-cored — self-shielded, single-pass only",arcType:"Easy arc, smooth for thin material",penetration:"Medium to shallow",spatter:"Moderate",slag:"Light-moderate slag",weldAppearance:"Good for single-pass — degrades on multi-pass",hydrogenContent:"Not rated for critical welds",burnContamination:"Some tolerance to contamination",skillLevel:"Very easy — MIG-like with no gas",badges:[{label:"DC−",type:"red"},{label:"Self-Shielded",type:"gold"},{label:"Single-Pass",type:"red"}],strengths:["No gas required — portable and cheap","Easiest flux-cored wire to start with","Compatible with most MIG machines (no gas needed)","Good for home shop and light fabrication","Affordable and widely available"],drawbacks:["SINGLE PASS ONLY — multi-pass causes porosity and poor fusion","Not for structural or critical welds","Lower mechanical properties than E71T-1C or E71T-8","DC− — some machines need polarity reversal","Heavy fumes — ventilation critical"],uses:["Hobby and home shop fabrication","Light trailer and farm equipment repair","Tack welds and single-pass fillets","Non-structural sheet metal joining","Field quick-repair with no gas supply"],shieldingGas:"None — self-shielded",wireGauge:[{gauge:"0.030 in (0.8mm)",amp:"50–120 A"},{gauge:"0.035 in (0.9mm)",amp:"80–170 A"}],chem:[{el:"C",val:"≤0.18"},{el:"Mn",val:"≤0.80"},{el:"Si",val:"≤0.50"},{el:"S",val:"≤0.030"},{el:"P",val:"≤0.030"},{el:"Al",val:"≤1.80"}]}
  }
},

PROCESS_META: {
  SMAW:{label:"SMAW — Stick Electrodes",sub:"Shielded Metal Arc Welding · AWS A5.1 / A5.5"},
  MIG: {label:"MIG / GMAW — Wire & Filler Metals",sub:"Gas Metal Arc Welding · AWS A5.18 / A5.9 / A5.10"},
  TIG: {label:"TIG / GTAW — Tungsten & Filler Rods",sub:"Gas Tungsten Arc Welding · AWS A5.12 / A5.18 / A5.9"},
  FCAW:{label:"FCAW — Flux-Cored Wires",sub:"Flux-Cored Arc Welding · AWS A5.20 / A5.22"}
},

// ── STATE ──────────────────────────────────
currentProcess: null,
compareMode: false,
compareList: [],
_clickListenerAdded: false,

// ── RENDER ─────────────────────────────────
render() {
  document.getElementById('main-content').innerHTML = `
  <div id="e-module" class="fade-up" style="max-width:1060px;">

    <!-- PROCESS HOME -->
    <div id="e-page-home">
      <div class="page-header">
        <div class="page-title">Filler Metal <span>Database</span></div>
        <div class="page-sub">SMAW · MIG / GMAW · TIG / GTAW · FCAW — AWS A5.1 / A5.5 / A5.18 / A5.9 / A5.10 / A5.20 / A5.22</div>
      </div>
      <div class="process-grid">
        <div class="process-card pc-smaw" onclick="eGoProcess('SMAW')">
          <span class="process-icon">🔥</span>
          <div class="process-label">SMAW</div>
          <div class="process-full">Shielded Metal Arc Welding</div>
          <div class="process-desc">Stick welding with coated electrodes. Versatile, portable, works on dirty or rusty metal.</div>
          <div class="process-count">7 electrodes · E6010, E6011, E6013, E7014, E7018, E7024, E8018</div>
        </div>
        <div class="process-card pc-mig" onclick="eGoProcess('MIG')">
          <span class="process-icon">🌀</span>
          <div class="process-label">MIG / GMAW</div>
          <div class="process-full">Gas Metal Arc Welding</div>
          <div class="process-desc">Wire-feed welding with shielding gas. Fast, clean, ideal for production and light fabrication.</div>
          <div class="process-count">6 wires · ER70S-2, ER70S-6, ER308L, ER309L, ER4043, ER5356</div>
        </div>
        <div class="process-card pc-tig" onclick="eGoProcess('TIG')">
          <span class="process-icon">⚙️</span>
          <div class="process-label">TIG / GTAW</div>
          <div class="process-full">Gas Tungsten Arc Welding</div>
          <div class="process-desc">Precision welding with non-consumable tungsten electrode. Cleanest welds across all metals.</div>
          <div class="process-count">6 items · EWTh-2, EWP, EWLa-1.5, ER70S-2, ER308L, ER4043</div>
        </div>
        <div class="process-card pc-fcaw" onclick="eGoProcess('FCAW')">
          <span class="process-icon">🏭</span>
          <div class="process-label">FCAW</div>
          <div class="process-full">Flux-Cored Arc Welding</div>
          <div class="process-desc">High-deposition flux-cored wire. Self-shielded or gas-shielded for structural and outdoor work.</div>
          <div class="process-count">5 wires · E71T-1C, E71T-8, E70T-5, E308LT1-1, E71T-GS</div>
        </div>
      </div>
    </div>

    <!-- PROCESS SEARCH PAGE -->
    <div id="e-page-process" style="display:none;">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px;flex-wrap:wrap;">
        <button class="btn btn-ghost btn-sm" onclick="eGoHome()">← Back</button>
        <div>
          <div class="page-title" id="e-process-title" style="font-size:clamp(20px,3vw,32px);margin-bottom:2px;"></div>
          <div class="page-sub" id="e-process-sub"></div>
        </div>
      </div>

      <div class="search-section">
        <div class="search-wrap">
          <span class="search-icon">⌕</span>
          <input type="text" class="e-search-input" id="e-search-input" placeholder="e.g. 6010, 7018, ER70S-6, EWTh-2…" autocomplete="off"
            oninput="eShowSuggestions(this.value)" onfocus="eShowSuggestions(this.value)" />
          <div id="e-search-suggestions"></div>
        </div>
        <button class="btn btn-primary" onclick="eDoSearch()">Search</button>
        <button class="btn btn-ghost" onclick="eClearResults()">✕ Clear</button>
        <button class="btn-compare-toggle" id="e-compare-toggle-btn" onclick="eToggleCompareMode()">⊕ Compare</button>
      </div>

      <div class="quick-tags" id="e-quick-tags"></div>

      <div id="e-compare-bar">
        <span class="compare-label">⊕ Queue</span>
        <div class="compare-items" id="e-compare-items"></div>
        <button class="btn-run-compare" onclick="eRunCompare()">Compare Now</button>
        <button class="btn-clear-compare" onclick="eClearCompare()">Clear</button>
      </div>

      <div id="e-results">
        <div class="empty-state"><div class="big">—</div><p>Search an electrode or click a quick tag above.</p></div>
      </div>
    </div>

    <div class="module-footer">WeldRef — Reference based on AWS A5.1 / A5.5 / A5.18 / A5.9 / A5.10 / A5.20 / A5.22. Always verify with manufacturer datasheets.</div>
  </div>`;

  this.init();
},

init() {
  const input = document.getElementById('e-search-input');
  if (input) {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') this.doSearch(); });
  }
  if (!this._clickListenerAdded) {
    document.addEventListener('click', e => {
      if (!e.target.closest('.search-wrap')) {
        const s = document.getElementById('e-search-suggestions');
        if (s) s.style.display = 'none';
      }
    });
    this._clickListenerAdded = true;
  }
},

// ── NAVIGATION ────────────────────────────
goHome() {
  this.currentProcess = null;
  this.compareList = [];
  this.compareMode = false;
  document.getElementById('e-page-home').style.display = 'block';
  document.getElementById('e-page-process').style.display = 'none';
},

goProcess(proc) {
  this.currentProcess = proc;
  this.compareList = [];
  this.compareMode = false;
  document.getElementById('e-page-home').style.display = 'none';
  document.getElementById('e-page-process').style.display = 'block';
  const meta = this.PROCESS_META[proc];
  document.getElementById('e-process-title').textContent = meta.label;
  document.getElementById('e-process-sub').textContent = meta.sub;
  const db = this.DB[proc];
  document.getElementById('e-quick-tags').innerHTML =
    '<span class="quick-label">Quick:</span>' +
    Object.keys(db).map(k => `<span class="tag" onclick="eQuickSearch('${k}')">${db[k].name}</span>`).join('');
  this.resetResults();
  document.getElementById('e-compare-bar').classList.remove('visible');
  const btn = document.getElementById('e-compare-toggle-btn');
  if (btn) { btn.classList.remove('active'); btn.textContent = '⊕ Compare'; }
},

resetResults() {
  const inp = document.getElementById('e-search-input');
  if (inp) inp.value = '';
  document.getElementById('e-results').innerHTML =
    '<div class="empty-state"><div class="big">—</div><p>Search an electrode or click a quick tag above.</p></div>';
},

// ── SEARCH ────────────────────────────────
findElectrode(raw) {
  const up = raw.toUpperCase().replace(/\s+/g, '');
  const stripped = up.replace(/^E/, '');
  if (this.currentProcess) {
    const r = this._searchInDB(this.DB[this.currentProcess], up, stripped);
    if (r) return r;
  }
  for (const proc of Object.keys(this.DB)) {
    if (proc === this.currentProcess) continue;
    const r = this._searchInDB(this.DB[proc], up, stripped);
    if (r) return r;
  }
  return null;
},

_searchInDB(db, up, stripped) {
  for (const k of Object.keys(db)) {
    const kn = k.toUpperCase();
    const ks = kn.replace(/^E/, '');
    if (kn===up || ks===stripped || kn===stripped || ks===up) return db[k];
    if (kn.replace(/-/g,'')===up.replace(/-/g,'')) return db[k];
    if (db[k].name.toUpperCase().replace(/[^A-Z0-9]/g,'').includes(stripped.replace(/-/g,''))) return db[k];
  }
  return null;
},

showSuggestions(val) {
  const c = document.getElementById('e-search-suggestions');
  if (!c) return;
  if (!val || val.length < 1) { c.style.display = 'none'; return; }
  const q = val.toUpperCase().replace(/\s+/g, '');
  const matches = [];
  for (const proc of Object.keys(this.DB)) {
    for (const id in this.DB[proc]) {
      const e = this.DB[proc][id];
      if (e.name.toUpperCase().includes(q) || e.id.toUpperCase().includes(q)) matches.push({...e, proc});
    }
  }
  if (!matches.length) { c.style.display = 'none'; return; }
  c.innerHTML = matches.slice(0,8).map(m =>
    `<div class="suggestion-item" onclick="eSelectSuggestion('${m.id}','${m.proc}')">
      <span class="suggestion-name">${m.name}</span>
      <span class="suggestion-proc">${m.proc}</span>
    </div>`).join('');
  c.style.display = 'block';
},

selectSuggestion(id, proc) {
  const s = document.getElementById('e-search-suggestions');
  if (s) s.style.display = 'none';
  const e = this.DB[proc][id];
  const inp = document.getElementById('e-search-input');
  if (inp) inp.value = e.name;
  this.renderSingleCard(e);
},

doSearch() {
  const inp = document.getElementById('e-search-input');
  if (!inp) return;
  const raw = inp.value.trim();
  if (!raw) return;
  const s = document.getElementById('e-search-suggestions');
  if (s) s.style.display = 'none';
  if (/\bvs\.?\b|\bversus\b|\band\b|[&,]/.test(raw.toLowerCase())) {
    const tokens = raw.split(/\s+(?:vs\.?|versus|and|&|,)\s*|\s*[,&]\s*|\s+/i).filter(Boolean);
    const els = tokens.map(t => this.findElectrode(t)).filter(Boolean);
    if (els.length >= 2) { this.renderCompareView(els); return; }
  }
  const e = this.findElectrode(raw);
  e ? this.renderSingleCard(e) : this.renderNotFound(raw);
},

quickSearch(val) {
  const inp = document.getElementById('e-search-input');
  if (inp) inp.value = val;
  this.doSearch();
},

clearResults() {
  this.compareList = [];
  this.compareMode = false;
  const bar = document.getElementById('e-compare-bar');
  if (bar) bar.classList.remove('visible');
  const btn = document.getElementById('e-compare-toggle-btn');
  if (btn) { btn.classList.remove('active'); btn.textContent = '⊕ Compare'; }
  this.resetResults();
  this.updateAddButtons();
},

// ── COMPARE ───────────────────────────────
toggleCompareMode() {
  this.compareMode = !this.compareMode;
  const btn = document.getElementById('e-compare-toggle-btn');
  if (btn) {
    btn.classList.toggle('active', this.compareMode);
    btn.textContent = this.compareMode ? '✕ Cancel' : '⊕ Compare';
  }
  if (!this.compareMode) this.clearCompare();
},

addToCompare(id, proc) {
  if (!proc) {
    for (const p of Object.keys(this.DB)) { if (this.DB[p][id]) { proc = p; break; } }
  }
  const gid = `${proc}:${id}`;
  if (this.compareList.some(x => x.globalId === gid)) { this.removeFromCompare(gid); return; }
  if (this.compareList.length >= 4) { alert('Max 4 electrodes.'); return; }
  this.compareList.push({globalId: gid, id, proc});
  this.renderCompareBar();
  this.updateAddButtons();
},

removeFromCompare(gid) {
  this.compareList = this.compareList.filter(x => x.globalId !== gid);
  this.renderCompareBar();
  this.updateAddButtons();
},

clearCompare() { this.compareList = []; this.renderCompareBar(); this.updateAddButtons(); },

renderCompareBar() {
  const bar = document.getElementById('e-compare-bar');
  if (!bar) return;
  if (!this.compareList.length) { bar.classList.remove('visible'); return; }
  bar.classList.add('visible');
  document.getElementById('e-compare-items').innerHTML = this.compareList.map(item => {
    const e = this.DB[item.proc][item.id];
    return `<div class="compare-pill">${e.name} <span style="font-size:8px;opacity:0.6;margin-left:4px;">[${item.proc}]</span> <button onclick="eRemoveFromCompare('${item.globalId}')">×</button></div>`;
  }).join('');
},

updateAddButtons() {
  document.querySelectorAll('.btn-add-compare').forEach(btn => {
    const gid = `${btn.dataset.proc}:${btn.dataset.id}`;
    const added = this.compareList.some(x => x.globalId === gid);
    btn.classList.toggle('added', added);
    btn.textContent = added ? '✓ Added' : '⊕ Add to Compare';
  });
},

runCompare() {
  if (this.compareList.length < 2) { alert('Add at least 2 to compare.'); return; }
  this.renderCompareView(this.compareList.map(x => this.DB[x.proc][x.id]).filter(Boolean));
},

// ── RENDER SINGLE CARD ────────────────────
chemTable(e) {
  return `<table>
    <thead><tr><th>El.</th><th>Full Name</th><th>Composition</th></tr></thead>
    <tbody>${e.chem.map(c=>`<tr>
      <td class="mono">${c.el}</td>
      <td class="el-name">${this.EL[c.el]||c.el}</td>
      <td class="mono">${c.val}</td>
    </tr>`).join('')}</tbody>
  </table>`;
},

ampTableHTML(e) {
  if (!e.ampTable) return '';
  if (e.ampType==='dual') return `<table>
    <thead><tr><th>Dia (in)</th><th>Dia (mm)</th><th>Flat/Horiz</th><th>Vert/OH</th></tr></thead>
    <tbody>${e.ampTable.map(r=>`<tr><td class="mono">${r.dia_in}</td><td>${r.dia_mm}</td><td class="mono">${r.amp_fh}</td><td class="mono">${r.amp_vo}</td></tr>`).join('')}</tbody>
  </table>`;
  return `<table>
    <thead><tr><th>Diameter</th><th>Dia (mm)</th><th>Amperage</th></tr></thead>
    <tbody>${e.ampTable.map(r=>`<tr><td class="mono">${r.dia_in}</td><td>${r.dia_mm}</td><td class="mono">${r.amp}</td></tr>`).join('')}</tbody>
  </table>`;
},

wireTable(e) {
  if (!e.wireGauge) return '';
  return `<table>
    <thead><tr><th>Wire Gauge</th><th>Amperage Range</th></tr></thead>
    <tbody>${e.wireGauge.map(r=>`<tr><td class="mono">${r.gauge}</td><td class="mono">${r.amp}</td></tr>`).join('')}</tbody>
  </table>`;
},

renderSingleCard(e) {
  const gid = `${e.process}:${e.id}`;
  const added = this.compareList.some(x => x.globalId === gid);
  const badges = e.badges.map(b=>`<span class="badge badge-${b.type}">${b.label}</span>`).join('');
  const leftTable = e.ampTable
    ? `<div class="table-block"><div class="table-title">Amperage Reference</div>${this.ampTableHTML(e)}</div>`
    : e.wireGauge
    ? `<div class="table-block"><div class="table-title">Wire Gauge / Amperage</div>${this.wireTable(e)}</div>`
    : '';
  const extraRows = [
    e.shieldingGas ? `<li><strong>Shielding Gas:</strong> ${e.shieldingGas}</li>` : '',
    e.fillerRod    ? `<li><strong>Filler Rod:</strong> ${e.fillerRod}</li>` : '',
    e.tipPrep      ? `<li><strong>Tip Prep:</strong> ${e.tipPrep}</li>` : ''
  ].join('');

  document.getElementById('e-results').innerHTML = `
  <div class="electrode-card">
    <div class="card-header">
      <div class="card-designation">${e.name.replace(/^(E[WR]?)/,'<span>$1</span>')}</div>
      <div class="card-meta">
        <div class="card-nickname">${e.nickname}</div>
        <div class="card-type">${badges} <span class="badge" style="background:rgba(255,255,255,0.05);border:1px solid var(--border);color:var(--muted);">${e.process}</span></div>
      </div>
      <button class="btn-add-compare ${added?'added':''}" data-id="${e.id}" data-proc="${e.process}"
        onclick="eAddToCompare('${e.id}','${e.process}')">
        ${added?'✓ Added':'⊕ Add to Compare'}
      </button>
    </div>
    <div class="card-body">
      <div class="info-grid">
        <div class="info-block"><div class="info-block-label">Strengths</div><ul>${e.strengths.map(s=>`<li>${s}</li>`).join('')}</ul></div>
        <div class="info-block"><div class="info-block-label">Drawbacks</div><ul>${e.drawbacks.map(s=>`<li>${s}</li>`).join('')}</ul></div>
        <div class="info-block"><div class="info-block-label">Common Uses</div><ul>${e.uses.map(s=>`<li>${s}</li>`).join('')}</ul></div>
      </div>
      <div class="section-divider"><span>Technical Specs</span></div>
      <div class="info-grid">
        <div class="info-block"><div class="info-block-label">Process & Current</div><ul>
          <li><strong>Type:</strong> ${e.type}</li>
          <li><strong>Current:</strong> ${e.current}</li>
          <li><strong>Positions:</strong> ${e.positions}</li>
          <li><strong>Arc:</strong> ${e.arcType}</li>
          ${extraRows}
        </ul></div>
        <div class="info-block"><div class="info-block-label">Weld Quality</div><ul>
          <li><strong>Penetration:</strong> ${e.penetration}</li>
          <li><strong>Spatter:</strong> ${e.spatter}</li>
          <li><strong>Slag:</strong> ${e.slag}</li>
          <li><strong>Appearance:</strong> ${e.weldAppearance}</li>
        </ul></div>
        <div class="info-block"><div class="info-block-label">Material & Storage</div><ul>
          <li><strong>Tensile:</strong> ${e.tensile}</li>
          <li><strong>Hydrogen:</strong> ${e.hydrogenContent}</li>
          <li><strong>Contamination:</strong> ${e.burnContamination}</li>
          <li><strong>Skill Level:</strong> ${e.skillLevel}</li>
        </ul></div>
      </div>
      <div class="section-divider"><span>Amperage & Chemical Composition</span></div>
      <div class="tables-row">
        ${leftTable}
        <div class="table-block"><div class="table-title">Chemical Composition</div>${this.chemTable(e)}</div>
      </div>
    </div>
  </div>`;
},

// ── RENDER COMPARE VIEW ───────────────────
renderCompareView(electrodes) {
  const hdr = electrodes.map(e=>`<th class="elec-col">${e.name}<br><span style="font-size:9px;opacity:0.6;font-weight:400;">${e.process}</span></th>`).join('');
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
  ].map(r=>`<tr><td class="row-label">${r.label}</td>${electrodes.map(e=>`<td>${r.fn(e)}</td>`).join('')}</tr>`).join('');

  const allEls = [...new Set(electrodes.flatMap(e=>e.chem.map(c=>c.el)))];
  const chemRows = allEls.map(el=>`<tr>
    <td class="row-label">${el} — ${this.EL[el]||el}</td>
    ${electrodes.map(e=>{const f=e.chem.find(c=>c.el===el);return`<td class="mono">${f?f.val:'—'}</td>`;}).join('')}
  </tr>`).join('');

  document.getElementById('e-results').innerHTML = `
  <div class="compare-view">
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
  </div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;">
    ${electrodes.map(e=>{
      const bh = e.badges.map(b=>`<span class="badge badge-${b.type}">${b.label}</span>`).join('');
      return `<div class="electrode-card">
        <div class="card-header" style="padding:13px 18px;">
          <div class="card-designation" style="font-size:30px;">${e.name.replace(/^(E[WR]?)/,'<span>$1</span>')}</div>
          <div class="card-meta">
            <div class="card-nickname" style="font-size:12px;">${e.nickname.split('—')[0].trim()}</div>
            <div class="card-type">${bh} <span class="badge" style="background:rgba(255,255,255,0.05);border:1px solid var(--border);color:var(--muted);">${e.process}</span></div>
          </div>
        </div>
        <div class="card-body" style="padding:13px 18px;">
          <div class="info-block" style="margin-bottom:10px;"><div class="info-block-label">Top Strengths</div><ul>${e.strengths.slice(0,3).map(s=>`<li>${s}</li>`).join('')}</ul></div>
          <div class="info-block"><div class="info-block-label">Key Drawbacks</div><ul>${e.drawbacks.slice(0,3).map(s=>`<li>${s}</li>`).join('')}</ul></div>
        </div>
      </div>`;
    }).join('')}
  </div>`;
},

renderNotFound(raw) {
  const db = this.DB[this.currentProcess] || {};
  const avail = Object.keys(db).map(k=>`<span class="tag" onclick="eQuickSearch('${k}')">${db[k].name}</span>`).join(' ');
  document.getElementById('e-results').innerHTML = `
  <div class="error-msg">
    <strong>No data found for "${raw.toUpperCase()}"</strong>
    <div style="margin-top:10px;font-size:13px;">Available in this process:<br>
      <div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:6px;">${avail}</div>
    </div>
  </div>`;
}

}; // end ElectrodesModule

// ── GLOBAL DELEGATES (for onclick= in templates) ──
function eGoProcess(p)            { ElectrodesModule.goProcess(p); }
function eGoHome()                { ElectrodesModule.goHome(); }
function eDoSearch()              { ElectrodesModule.doSearch(); }
function eQuickSearch(v)          { ElectrodesModule.quickSearch(v); }
function eClearResults()          { ElectrodesModule.clearResults(); }
function eToggleCompareMode()     { ElectrodesModule.toggleCompareMode(); }
function eAddToCompare(id, proc)  { ElectrodesModule.addToCompare(id, proc); }
function eRemoveFromCompare(gid)  { ElectrodesModule.removeFromCompare(gid); }
function eClearCompare()          { ElectrodesModule.clearCompare(); }
function eRunCompare()            { ElectrodesModule.runCompare(); }
function eSelectSuggestion(id, p) { ElectrodesModule.selectSuggestion(id, p); }
function eShowSuggestions(v)      { ElectrodesModule.showSuggestions(v); }
