import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import translateRoutes from './routes/translate.js';
import topicRoutes from './routes/topics.js';

const app = express();

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN?.split(',') || '*'
}));
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'Multilingual API' });
});

app.use('/api/translate', translateRoutes);
app.use('/api/topics', topicRoutes);

const PORT = process.env.PORT || 10000;

const start = async () => {
  if (process.env.MONGODB_URI) {
    await connectDB(process.env.MONGODB_URI);
  } else {
    console.warn('MONGODB_URI not set; topics endpoints will fail to connect');
  }
  app.listen(PORT, () => console.log(`API on :${PORT}`));
};

start();
