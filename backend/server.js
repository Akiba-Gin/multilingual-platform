import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import translateRoutes from './routes/translate.js';
import topicsRoutes from './routes/topics.js';

const app = express();

// CORS - Allow ALL origins (simplest solution)
app.use(cors());

// Or if you want to be specific, use this instead:
// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type']
// }));

app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'API is running', timestamp: new Date() });
});

// Routes
app.use('/api/translate', translateRoutes);
app.use('/api/topics', topicsRoutes);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`API on :${PORT}`);
});
