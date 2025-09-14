const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');

// In-memory fallback for development without MongoDB
const inMemoryGallery = [];

// GET /api/gallery
router.get('/', async (req, res) => {
  try {
    const list = await Gallery.find().sort({ uploadedAt: -1 }).lean();
    res.json(list);
  } catch (err) {
    console.warn('Gallery DB unavailable, using in-memory store');
    const sorted = [...inMemoryGallery].sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
    res.json(sorted);
  }
});

// POST /api/gallery (simple, expects imgUrl and optional desc)
router.post('/', async (req, res) => {
  try {
    const { imgUrl, desc } = req.body;
    if (!imgUrl) return res.status(400).json({ error: 'imgUrl이 필요합니다.' });
    const doc = await Gallery.create({ imgUrl, desc });
    res.json(doc);
  } catch (err) {
    console.warn('Gallery DB unavailable, writing to in-memory store');
    const { imgUrl, desc } = req.body;
    if (!imgUrl) return res.status(400).json({ error: 'imgUrl이 필요합니다.' });
    const newItem = { _id: `mem_${Date.now()}_${Math.floor(Math.random()*1000)}`, imgUrl, desc, uploadedAt: new Date().toISOString() };
    inMemoryGallery.push(newItem);
    res.json(newItem);
  }
});

module.exports = router;
