import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'; // Ensure the file extension is .js
import { Client } from '@gradio/client';
import dotenv from 'dotenv';
import searchHistoryRoutes from './routes/searchHistoryRoute.js';
// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // This is necessary to parse JSON request bodies

app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
  res.send('Backend server is running.');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/search', searchHistoryRoutes);


// Search route using Gradio client
app.post('/api/search', async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    // Connect to Gradio Space
    const client = await Client.connect('rish13/polymers', {
      headers: {
        'Authorization': `Bearer ${process.env.LLM_API_KEY}`
      }
    });

    // Send prompt to Gradio Space
    const result = await client.predict('/predict', { prompt: query });

    res.json({ result: result.data });
  } catch (error) {
    console.error('Error fetching data from Gradio:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from Gradio' });
  }
});

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
