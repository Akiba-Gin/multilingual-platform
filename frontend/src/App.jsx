import React, { useState, useEffect } from 'react';
import { Globe, ArrowLeft, Volume2, Copy, RotateCcw, Mic, MicOff } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

const languages = [
  { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', native: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', native: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', native: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦' }
];

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'language-select', 'translate'
  const [selectedLanguage, setSelectedLanguage] = useState('hi');
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('hi');
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [availableLanguages, setAvailableLanguages] = useState(languages);

  // Fetch available languages on mount
  useEffect(() => {
    if (API_BASE) {
      fetch(`${API_BASE}/api/translate/languages`)
        .then(r => r.json())
        .then(d => {
          if (d.success && d.languages) {
            setAvailableLanguages(d.languages.map(l => ({
              code: l.code,
              name: l.name,
              native: l.name,
              flag: languages.find(lang => lang.code === l.code)?.flag || '🌐'
            })));
          }
        })
        .catch(() => console.log('Using default languages'));
    }
  }, []);

  // Auto-translate as user types
  useEffect(() => {
    if (currentView === 'translate' && sourceText.trim() && sourceText.length > 2) {
      const timeoutId = setTimeout(() => handleTranslate(), 1000);
      return () => clearTimeout(timeoutId);
    } else {
      setTranslatedText('');
    }
  }, [sourceText, sourceLang, targetLang, currentView]);

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    setIsTranslating(true);
    
    try {
      const response = await fetch(`${API_BASE}/api/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: sourceText,
          from: sourceLang,
          to: targetLang
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setTranslatedText(data.translatedText);
      } else {
        setTranslatedText('Translation failed. Please try again.');
      }
    } catch (error) {
      setTranslatedText('Error connecting to translation service.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleSwap = () => {
    if (sourceLang === 'auto') return;
    const tempLang = sourceLang;
    const tempText = sourceText;
    setSourceLang(targetLang);
    setTargetLang(tempLang);
    setSourceText(translatedText);
    setTranslatedText(tempText);
  };

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window && text) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  // Landing Page
  if (currentView === 'landing') {
    return (
      <div style={styles.container}>
        <div style={styles.landingContent}>
          <div style={styles.landingHeader}>
            <Globe size={64} color="#667eea" />
            <h1 style={styles.landingTitle}>Language & Legal Assistant</h1>
            <p style={styles.landingSubtitle}>
              Break language barriers with instant translation and get legal help based on Indian Constitution
            </p>
          </div>

          <div style={styles.featureGrid}>
            {[
              { icon: '🌐', title: 'Instant Translation', desc: 'Translate text between 12+ languages' },
              { icon: '🎤', title: 'Voice Support', desc: 'Speak naturally and get instant translations' },
              { icon: '⚡', title: 'Real-time', desc: 'See translations as you type' },
              { icon: '📱', title: 'Simple & Fast', desc: 'No registration required' }
            ].map((feature, i) => (
              <div key={i} style={styles.featureCard}>
                <div style={styles.featureIcon}>{feature.icon}</div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDesc}>{feature.desc}</p>
              </div>
            ))}
          </div>

          <button onClick={() => setCurrentView('language-select')} style={styles.primaryButton}>
            Get Started - Select Your Language
          </button>
          <p style={styles.guestText}>No registration required - Start instantly</p>
        </div>
      </div>
    );
  }

  // Language Selection Page
  if (currentView === 'language-select') {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.header}>
            <div style={styles.badge}>
              <Globe size={24} />
              <span style={styles.badgeText}>MultiLingual Assistant</span>
            </div>
            <h2 style={styles.title}>Choose Your Preferred Language</h2>
            <p style={styles.subtitle}>
              Select your primary language to personalize your experience
            </p>
          </div>

          <div style={styles.languageGrid}>
            {availableLanguages.map(lang => (
              <button
                key={lang.code}
                onClick={() => {
                  setSelectedLanguage(lang.code);
                  setTargetLang(lang.code);
                  setCurrentView('translate');
                }}
                style={{
                  ...styles.languageCard,
                  ...(selectedLanguage === lang.code ? styles.languageCardSelected : {})
                }}
              >
                <div style={styles.languageFlag}>{lang.flag}</div>
                <div style={styles.languageName}>{lang.name}</div>
                <div style={styles.languageNative}>{lang.native}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Translation Page
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <button onClick={() => setCurrentView('language-select')} style={styles.backButton}>
          <ArrowLeft size={20} /> Back to Language Selection
        </button>

        <div style={styles.header}>
          <h2 style={styles.title}>🌍 Translation Tool</h2>
          <p style={styles.subtitle}>Translate instantly as you type</p>
        </div>

        <div style={styles.translationCard}>
          <div style={styles.translationGrid}>
            {/* Source */}
            <div style={styles.translationColumn}>
              <div style={styles.selectWrapper}>
                <label style={styles.label}>From</label>
                <select value={sourceLang} onChange={e => setSourceLang(e.target.value)} style={styles.select}>
                  <option value="auto">Auto Detect</option>
                  {availableLanguages.map(l => (
                    <option key={l.code} value={l.code}>{l.flag} {l.name}</option>
                  ))}
                </select>
              </div>
              <textarea
                value={sourceText}
                onChange={e => setSourceText(e.target.value)}
                placeholder="Enter text to translate..."
                style={styles.textarea}
                rows={10}
              />
              <div style={styles.actions}>
                <button onClick={() => handleSpeak(sourceText)} style={styles.iconButton} disabled={!sourceText}>
                  <Volume2 size={18} />
                </button>
                <button onClick={() => handleCopy(sourceText)} style={styles.iconButton} disabled={!sourceText}>
                  <Copy size={18} />
                </button>
              </div>
            </div>

            {/* Swap Button */}
            <div style={styles.swapWrapper}>
              <button onClick={handleSwap} style={styles.swapButton} disabled={sourceLang === 'auto'}>
                <RotateCcw size={20} />
              </button>
            </div>

            {/* Target */}
            <div style={styles.translationColumn}>
              <div style={styles.selectWrapper}>
                <label style={styles.label}>To</label>
                <select value={targetLang} onChange={e => setTargetLang(e.target.value)} style={styles.select}>
                  {availableLanguages.map(l => (
                    <option key={l.code} value={l.code}>{l.flag} {l.name}</option>
                  ))}
                </select>
              </div>
              <textarea
                value={isTranslating ? 'Translating...' : translatedText}
                placeholder="Translation will appear here..."
                style={{...styles.textarea, ...styles.textareaReadonly}}
                rows={10}
                readOnly
              />
              <div style={styles.actions}>
                <button onClick={() => handleSpeak(translatedText)} style={styles.iconButton} disabled={!translatedText}>
                  <Volume2 size={18} />
                </button>
                <button onClick={() => handleCopy(translatedText)} style={styles.iconButton} disabled={!translatedText}>
                  <Copy size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  content: {
    maxWidth: 1200,
    margin: '0 auto'
  },
  landingContent: {
    maxWidth: 900,
    margin: '0 auto',
    textAlign: 'center'
  },
  landingHeader: {
    marginBottom: 60
  },
  landingTitle: {
    fontSize: 48,
    fontWeight: 700,
    color: 'white',
    marginTop: 20,
    marginBottom: 16
  },
  landingSubtitle: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.9)',
    maxWidth: 600,
    margin: '0 auto'
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 24,
    marginBottom: 48
  },
  featureCard: {
    background: 'white',
    borderRadius: 16,
    padding: 32,
    textAlign: 'center'
  },
  featureIcon: {
    fontSize: 48,
    marginBottom: 16
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 8,
    color: '#333'
  },
  featureDesc: {
    fontSize: 14,
    color: '#666'
  },
  primaryButton: {
    background: 'white',
    color: '#667eea',
    border: 'none',
    padding: '16px 48px',
    borderRadius: 12,
    fontSize: 18,
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
  },
  guestText: {
    color: 'rgba(255,255,255,0.8)',
    marginTop: 16,
    fontSize: 14
  },
  header: {
    textAlign: 'center',
    marginBottom: 40
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 12,
    background: 'white',
    padding: '12px 24px',
    borderRadius: 50,
    marginBottom: 24,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  badgeText: {
    fontSize: 18,
    fontWeight: 600,
    color: '#667eea'
  },
  title: {
    fontSize: 36,
    fontWeight: 700,
    color: 'white',
    marginBottom: 12
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)'
  },
  languageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: 20
  },
  languageCard: {
    background: 'white',
    border: '2px solid transparent',
    borderRadius: 16,
    padding: '24px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  languageCardSelected: {
    borderColor: '#667eea',
    transform: 'scale(1.05)'
  },
  languageFlag: {
    fontSize: 32,
    marginBottom: 12
  },
  languageName: {
    fontSize: 16,
    fontWeight: 600,
    color: '#333',
    marginBottom: 4
  },
  languageNative: {
    fontSize: 14,
    color: '#666'
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: 8,
    marginBottom: 30,
    cursor: 'pointer',
    fontSize: 14
  },
  translationCard: {
    background: 'white',
    borderRadius: 16,
    padding: 30,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  translationGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    gap: 20,
    alignItems: 'start'
  },
  translationColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  selectWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  label: {
    fontSize: 14,
    fontWeight: 600,
    color: '#333'
  },
  select: {
    padding: 10,
    borderRadius: 8,
    border: '2px solid #E0E0E0',
    fontSize: 14
  },
  textarea: {
    padding: 12,
    borderRadius: 8,
    border: '2px solid #E0E0E0',
    fontSize: 14,
    fontFamily: 'inherit',
    resize: 'vertical'
  },
  textareaReadonly: {
    background: '#F5F5F5'
  },
  actions: {
    display: 'flex',
    gap: 8
  },
  iconButton: {
    background: '#F0F0F0',
    border: 'none',
    padding: 10,
    borderRadius: 8,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  swapWrapper: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 60
  },
  swapButton: {
    background: '#667eea',
    color: 'white',
    border: 'none',
    padding: 12,
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};
