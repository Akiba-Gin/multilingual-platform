import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/languages', async (_req, res) => {
  try {
    const base = process.env.LIBRETRANSLATE_URL || 'https://libretranslate.com';
    const { data } = await axios.get(`${base}/languages`, { timeout: 20000 });
    res.json({ success: true, languages: data });
  } catch (err) {
    res.status(200).json({
      success: true,
      languages: [
        { code: 'en', name: 'English' },
        { code: 'hi', name: 'Hindi' },
        { code: 'bn', name: 'Bengali' }
      ]
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { text, from, to } = req.body;
    if (!text || !to) {
      return res.status(400).json({ success: false, message: 'text and to are required' });
    }
    const source = from && from !== 'auto' ? from : 'auto';
    const base = process.env.LIBRETRANSLATE_URL || 'https://libretranslate.com';
    const { data } = await axios.post(`${base}/translate`, {
      q: text, source, target: to, format: 'text'
    }, { timeout: 20000 });
    res.json({ success: true, translatedText: data.translatedText });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Translation failed' });
  }
});

export default router;
