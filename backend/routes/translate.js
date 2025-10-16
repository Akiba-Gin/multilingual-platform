import { Router } from 'express';
import axios from 'axios';

const router = Router();

// MyMemory API language mapping
const langMap = {
  'auto': 'auto',
  'en': 'en',
  'hi': 'hi',
  'es': 'es',
  'fr': 'fr',
  'de': 'de',
  'it': 'it',
  'pt': 'pt',
  'ru': 'ru',
  'ja': 'ja',
  'ko': 'ko',
  'zh': 'zh-CN',
  'ar': 'ar'
};

// Get available languages
router.get('/languages', async (req, res) => {
  res.json({
    success: true,
    languages: [
      { code: 'en', name: 'English' },
      { code: 'hi', name: 'Hindi' },
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

// Translate text
router.post('/', async (req, res) => {
  try {
    const { text, from, to } = req.body;
    
    console.log('Translation request:', { text, from, to });

    // Validate input
    if (!text || !to) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: text and to' 
      });
    }

    // Map language codes
    const sourceLang = from && from !== 'auto' ? (langMap[from] || from) : '';
    const targetLang = langMap[to] || to;
    
    // Build language pair for MyMemory
    const langPair = sourceLang ? `${sourceLang}|${targetLang}` : targetLang;

    console.log('Calling MyMemory API with langpair:', langPair);

    // Call MyMemory API
    const response = await axios.get('https://api.mymemory.translated.net/get', {
      params: {
        q: text,
        langpair: langPair
      },
      timeout: 15000
    });

    console.log('MyMemory response:', response.data);

    // Check response
    if (response.data && response.data.responseData && response.data.responseData.translatedText) {
      return res.json({ 
        success: true, 
        translatedText: response.data.responseData.translatedText 
      });
    } else {
      return res.status(500).json({ 
        success: false, 
        message: 'Translation API returned invalid response' 
      });
    }

  } catch (error) {
    console.error('Translation error:', error.message);
    console.error('Error details:', error.response?.data || error);
    
    return res.status(500).json({ 
      success: false, 
      message: 'Translation service error: ' + error.message 
    });
  }
});

export default router;
