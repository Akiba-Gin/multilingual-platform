import { Router } from 'express';
import Topic from '../models/Topic.js';

const router = Router();

router.get('/', async (_req, res) => {
  const items = await Topic.find().lean();
  res.json({ success: true, data: items });
});

router.post('/', async (req, res) => {
  try {
    const item = await Topic.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
});

export default router;
