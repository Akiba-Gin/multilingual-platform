import { Router } from 'express';
import axios from 'axios';

const router = Router();

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

    // Validate
    if (!text || !to) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // Build langpair for MyMemory (format: "en|hi" or just "hi" for auto-detect)
    const langPair = from && from !== 'auto' ? `${from}|${to}` : to;

    console.log('Calling MyMemory with langpair:', langPair);

    // Call MyMemory API
    const response = await axios.get('https://api.mymemory.translated.net/get', {
      params: {
        q: text,
        langpair: langPair
      },
      timeout: 15000
    });

    console.log('MyMemory response status:', response.data.responseStatus);

    // Check response
    if (response.data && response.data.responseData && response.data.responseData.translatedText) {
      return res.json({ 
        success: true, 
        translatedText: response.data.responseData.translatedText 
      });
    } else {
      console.error('Invalid MyMemory response:', response.data);
      return res.status(500).json({ 
        success: false, 
        message: 'Translation failed' 
      });
    }

  } catch (error) {
    console.error('Translation error:', error.message);
    console.error('Error response:', error.response?.data);
    
    return res.status(500).json({ 
      success: false, 
      message: error.response?.data?.responseDetails || 'Translation service error'
    });
  }
});

export default router;
