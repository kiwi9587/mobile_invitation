const express = require('express');
const router = express.Router();
const Guestbook = require('../models/Guestbook');

// In-memory fallback for development without MongoDB
const inMemoryGuestbook = [];

// GET /api/guestbook
router.get('/', async (req, res) => {
  try {
    const list = await Guestbook.find().sort({ createdAt: -1 }).lean();
    return res.json(list);
  } catch (err) {
    // Fall back to in-memory data
    console.warn('Guestbook DB unavailable, using in-memory store');
    const sorted = [...inMemoryGuestbook].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return res.json(sorted);
  }
});

// POST /api/guestbook
router.post('/', async (req, res) => {
  try {
    const { name, message } = req.body;
    if (!name || !message) return res.status(400).json({ error: '이름과 메시지를 모두 입력하세요.' });
    const doc = await Guestbook.create({ name, message });
    return res.json(doc);
  } catch (err) {
    // Fall back to in-memory store
    console.warn('Guestbook DB unavailable, writing to in-memory store');
    const { name, message } = req.body;
    if (!name || !message) return res.status(400).json({ error: '이름과 메시지를 모두 입력하세요.' });
    const newItem = { _id: `mem_${Date.now()}_${Math.floor(Math.random()*1000)}`, name, message, createdAt: new Date().toISOString() };
    inMemoryGuestbook.push(newItem);
    return res.json(newItem);
  }
});

module.exports = router;
