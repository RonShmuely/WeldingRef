import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const COLUMNS = [
  { key: 'date',        label: 'תאריך' },
  { key: 'category',    label: 'קטגוריה' },
  { key: 'machine',     label: 'מכונה' },
  { key: 'part',        label: 'חלק / רכיב' },
  { key: 'description', label: 'תיאור העבודה' },
  { key: 'electrode',   label: 'אלקטרודה / חוט' },
  { key: 'amperage',    label: 'אמפר' },
  { key: 'welder',      label: 'מכונת ריתוך' },
  { key: 'notes',       label: 'הערות' },
];

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function exportXlsx(entries) {
  const rows = entries.map(e => {
    const row = {};
    COLUMNS.forEach(({ key, label }) => { row[label] = e[key] || ''; });
    return row;
  });
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Weld Log');
  XLSX.writeFile(wb, `weldlog-${todayStr()}.xlsx`);
}

export function exportPdf(entries) {
  const doc = new jsPDF({ orientation: 'landscape' });
  const headers = COLUMNS.map(c => c.label);
  const rows = entries.map(e => COLUMNS.map(({ key }) => e[key] || ''));

  autoTable(doc, {
    head: [headers],
    body: rows,
    styles: { fontSize: 8, cellPadding: 3 },
    headStyles: { fillColor: [20, 20, 20], textColor: [245, 158, 11] },
    alternateRowStyles: { fillColor: [18, 18, 18] },
    bodyStyles: { fillColor: [14, 14, 14], textColor: [200, 200, 200] },
  });

  doc.save(`weldlog-${todayStr()}.pdf`);
}
