import express from 'express';
import searchHistory from '../models/searchHistory.js';

const router = express.Router();


router.get('/history/all', async (req, res) => {
  try {
    const history = await searchHistory.find().sort({ timestamp: -1 });
    console.log('Fetched data:', history);
    res.json(history);
  } catch (err) {
    console.error('Error fetching history: ', err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/history/save', async (req, res) => {
    const { query, result } = req.body;
  
    console.log('Received query:', query, 'Output:', result);

    if (!query || typeof query !== 'string' ) {
      return res.status(400).send('Invalid data: "query" and "result" are required and should be strings.');
    }
    const resultString = typeof result === 'string' ? result : JSON.stringify(result);
    try {
     
      const newQuery = new searchHistory({
        query,
        result: resultString,
        timestamp: new Date(),
      });
  
    
      const savedSearch = await newQuery.save();
  
   
      res.status(201).json(savedSearch);
    } catch (error) {
      console.error('Error saving search query: ', error);
      res.status(500).json({ error: error.message });
    }
  });
  

export default router;