import { Router } from 'express';
import axios from 'axios';

const router = Router();

// Language mapping for MyMemory API
const langMap = {
  'auto': 'auto',
  'en': 'en-US',
  'hi': 'hi-IN',
  'bn': 'bn-BD',
  'es': 'es-ES',
  'fr': 'fr-FR',
  'de': 'de-DE',
  'it': 'it-IT',
  'pt': 'pt-PT',
  'ru': 'ru-RU',
  'ja': 'ja-JP',
  'ko': 'ko-KR',
  'zh': 'zh-CN',
  'ar': 'ar-SA'
};

router.get('/languages', async (_req, res) => {
  res.json({
    success: true,
    languages: [
      { code: 'en', name: 'English' },
      { code: 'hi', name: 'Hindi' },
      { code: 'bn', name: 'Bengali' },
      { code: 'es', name: 'Spanish' },
      { code: 'fr', name: 'French' },
      { code: 'de', name: 'German' },
      { code: 'it', name: 'Italian' },
      { code: 'pt', name: 'Portuguese' },
      { code: 'ru', name: 'Russian' },
      { code: 'ja', name: 'Japanese' },
      { code: 'ko', name: 'Korean' },
      { code: 'zh', name: 'Chinese' },
      { code: 'ar', name: 'Arabic' }
    ]
  });
});

router.post('/', async (req, res) => {
  try {
    const { text, from, to } = req.body;
    if (!text || !to) {
      return res.status(400).json({ success: false, message: 'text and to are required' });
    }

    const sourceLang = from && from !== 'auto' ? langMap[from] || from : 'auto';
    const targetLang = langMap[to] || to;
    const langPair = sourceLang === 'auto' ? targetLang : `${sourceLang}|${targetLang}`;

    const { data } = await axios.get('https://api.mymemory.translated.net/get', {
      params: {
        q: text,
        langpair: langPair
      },
      timeout: 15000
    });

    if (data.responseStatus === 200 && data.responseData) {
      res.json({ success: true, translatedText: data.responseData.translatedText });
    } else {
      res.status(500).json({ success: false, message: 'Translation failed' });
    }
  } catch (err) {
    console.error('Translation error:', err.message);
    res.status(500).json({ success: false, message: 'Translation service unavailable' });
  }
});

export default router;
