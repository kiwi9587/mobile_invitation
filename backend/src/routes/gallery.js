const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');

// GET /api/gallery
router.get('/', async (req, res) => {
  try {
    const list = await Gallery.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/gallery
router.post('/', async (req, res) => {
  try {
    const { imgUrl, desc } = req.body;
    if (!imgUrl) return res.status(400).json({ error: 'imgUrl이 필요합니다.' });
    const doc = await Gallery.create({ imgUrl, desc });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
