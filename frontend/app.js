// Configuration
const API_BASE = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://multilingual-api-wxrv.onrender.com'; // Replace with your Render URL

// Language data
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

let selectedTargetLang = 'hi';
let translationTimeout = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populateLanguages();
    setupTranslationPage();
    checkAPIStatus();
});

function populateLanguages() {
    const grid = document.getElementById('language-grid');
    grid.innerHTML = languages.map(lang => `
        <div class="language-card" onclick="selectLanguage('${lang.code}')">
            <div class="language-flag">${lang.flag}</div>
            <div class="language-name">${lang.name}</div>
            <div class="language-native">${lang.native}</div>
        </div>
    `).join('');
}

function setupTranslationPage() {
    const sourceLangSelect = document.getElementById('source-lang');
    const targetLangSelect = document.getElementById('target-lang');
    
    // Populate source dropdown (with Auto Detect)
    sourceLangSelect.innerHTML = '<option value="auto">Auto Detect</option>' +
        languages.map(l => `<option value="${l.code}">${l.flag} ${l.name}</option>`).join('');
    
    // Populate target dropdown (without Auto Detect)
    targetLangSelect.innerHTML = languages.map(l => 
        `<option value="${l.code}">${l.flag} ${l.name}</option>`
    ).join('');
    
    // Set up auto-translate on input
    document.getElementById('source-text').addEventListener('input', () => {
        clearTimeout(translationTimeout);
        translationTimeout = setTimeout(translate, 1000);
    });
    
    // Handle language change
    sourceLangSelect.addEventListener('change', translate);
    targetLangSelect.addEventListener('change', translate);
}

function showLanguageSelect() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('language-page').classList.add('active');
}

function selectLanguage(langCode) {
    selectedTargetLang = langCode;
    document.getElementById('target-lang').value = langCode;
    showTranslatePage();
}

function showTranslatePage() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('translate-page').classList.add('active');
}

async function translate() {
    const sourceText = document.getElementById('source-text').value.trim();
    const targetText = document.getElementById('target-text');
    
    if (!sourceText || sourceText.length < 2) {
        targetText.value = '';
        return;
    }
    
    targetText.value = 'Translating...';
    
    const sourceLang = document.getElementById('source-lang').value;
    const targetLang = document.getElementById('target-lang').value;
    
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
            targetText.value = data.translatedText;
        } else {
            targetText.value = 'Translation failed: ' + (data.message || 'Unknown error');
        }
    } catch (error) {
        targetText.value = 'Error: ' + error.message;
        console.error('Translation error:', error);
    }
}

function swapLanguages() {
    const sourceLang = document.getElementById('source-lang');
    const targetLang = document.getElementById('target-lang');
    const sourceText = document.getElementById('source-text');
    const targetText = document.getElementById('target-text');
    
    if (sourceLang.value === 'auto') return;
    
    // Swap language selections
    const tempLang = sourceLang.value;
    sourceLang.value = targetLang.value;
    targetLang.value = tempLang;
    
    // Swap text content
    const tempText = sourceText.value;
    sourceText.value = targetText.value;
    targetText.value = tempText;
    
    translate();
}

function speak(type) {
    const text = type === 'source' 
        ? document.getElementById('source-text').value 
        : document.getElementById('target-text').value;
    
    if (!text || !('speechSynthesis' in window)) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}

function copy(type) {
    const text = type === 'source'
        ? document.getElementById('source-text').value
        : document.getElementById('target-text').value;
    
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    });
}

async function checkAPIStatus() {
    const statusEl = document.getElementById('api-status');
    try {
        const response = await fetch(`${API_BASE}/api/translate/languages`);
        const data = await response.json();
        statusEl.textContent = data.success ? '✅ Connected' : '❌ Error';
        statusEl.style.color = data.success ? 'green' : 'red';
    } catch (error) {
        statusEl.textContent = '❌ Cannot connect to API';
        statusEl.style.color = 'red';
        console.error('API check failed:', error);
    }
}
