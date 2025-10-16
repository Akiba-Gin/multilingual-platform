import React, { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function App() {
  const [src, setSrc] = useState('en');
  const [dst, setDst] = useState('hi');
  const [text, setText] = useState('');
  const [out, setOut] = useState('');
  const [langs, setLangs] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/translate/languages`)
      .then(r => r.json())
      .then(d => setLangs(d.languages || []))
      .catch(() => setLangs([{ code: 'en', name: 'English' }, { code: 'hi', name: 'Hindi' }]));
  }, []);

  const translate = async () => {
    setOut('Translating...');
    const r = await fetch(`${API_BASE}/api/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, from: src, to: dst })
    });
    const d = await r.json();
    setOut(d.translatedText || d.message || 'Failed');
  };

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', fontFamily: 'system-ui, sans-serif', padding: 20 }}>
      <h2>🌍 Multilingual Assistance Platform</h2>
      <p style={{ color: '#666', marginBottom: 30 }}>Breaking Language Barriers</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>From</label>
          <select value={src} onChange={e => setSrc(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 10 }}>
            <option value="auto">Auto Detect</option>
            {langs.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
          </select>
          <textarea 
            rows={8} 
            value={text} 
            onChange={e => setText(e.target.value)} 
            placeholder="Enter text to translate..." 
            style={{ width: '100%', padding: 10, fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>To</label>
          <select value={dst} onChange={e => setDst(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 10 }}>
            {langs.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
          </select>
          <textarea 
            rows={8} 
            value={out} 
            readOnly 
            placeholder="Translation will appear here..." 
            style={{ width: '100%', padding: 10, fontSize: 14, fontFamily: 'inherit', background: '#f5f5f5', resize: 'vertical' }}
          />
        </div>
      </div>
      
      <button 
        onClick={translate} 
        disabled={!text.trim()}
        style={{ 
          padding: '12px 30px', 
          fontSize: 16, 
          background: '#667eea', 
          color: 'white', 
          border: 'none', 
          borderRadius: 6, 
          cursor: text.trim() ? 'pointer' : 'not-allowed',
          opacity: text.trim() ? 1 : 0.5
        }}
      >
        Translate
      </button>
    </div>
  );
}
