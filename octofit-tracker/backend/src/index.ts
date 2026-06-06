import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

async function start() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Connected to MongoDB at', MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
