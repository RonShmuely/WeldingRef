import { useState, useEffect, useCallback } from 'react';
import { pb } from './pb.js';
import Header from './components/Header.jsx';
import LogView from './components/LogView.jsx';
import EntryForm from './components/EntryForm.jsx';
import Dashboard from './components/Dashboard.jsx';

export default function App() {
  const [view, setView] = useState('log');
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editEntry, setEditEntry] = useState(null);
  const [exportEntries, setExportEntries] = useState([]);

  const fetchEntries = useCallback(async () => {
    try {
      const records = await pb.collection('entries').getFullList({
        sort: '-created',
        requestKey: null,
      });
      setEntries(records);
      setError(null);
    } catch {
      setError('לא ניתן להתחבר לשרת');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
    pb.collection('entries').subscribe('*', () => fetchEntries());
    return () => pb.collection('entries').unsubscribe('*');
  }, [fetchEntries]);

  const handleEdit = (entry) => {
    setEditEntry(entry);
    setView('edit');
  };

  const handleDelete = async (id) => {
    if (!confirm('מחק רשומה זו?')) return;
    await pb.collection('entries').delete(id);
  };

  const handleSaved = () => {
    setView('log');
    setEditEntry(null);
  };

  if (loading) return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      height: '100vh', background: '#0a0a0a', color: '#e0e0e0',
      fontFamily: 'Arial, sans-serif', fontSize: '18px',
    }}>
      טוען...
    </div>
  );

  if (error) return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      height: '100vh', background: '#0a0a0a', color: '#f87171',
      fontFamily: 'Arial, sans-serif', fontSize: '18px',
    }}>
      {error}
    </div>
  );

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', direction: 'rtl' }}>
      <Header
        view={view}
        setView={(v) => { setView(v); if (v !== 'edit') setEditEntry(null); }}
        exportEntries={exportEntries.length ? exportEntries : entries}
      />
      {view === 'log' && (
        <LogView
          entries={entries}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onExportChange={setExportEntries}
          onRefresh={fetchEntries}
        />
      )}
      {(view === 'add' || view === 'edit') && (
        <EntryForm
          entry={view === 'edit' ? editEntry : null}
          onSaved={handleSaved}
          onCancel={() => { setView('log'); setEditEntry(null); }}
        />
      )}
      {view === 'dashboard' && <Dashboard entries={entries} />}
    </div>
  );
}
