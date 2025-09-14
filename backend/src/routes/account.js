const express = require('express');
const router = express.Router();
const Account = require('../models/Account');

// In-memory fallback for development without MongoDB
const inMemoryAccounts = [];

// GET /api/account-info
router.get('/account-info', async (req, res) => {
  try {
    const list = await Account.find().lean();
    res.json(list);
  } catch (err) {
    console.warn('Account DB unavailable, using in-memory store');
    res.json(inMemoryAccounts);
  }
});

// POST /api/account-info
router.post('/account-info', async (req, res) => {
  try {
    const { owner, bank, number } = req.body;
    if (!owner || !bank || !number) return res.status(400).json({ error: '모든 필드가 필요합니다.' });
    const doc = await Account.create({ owner, bank, number });
    res.json(doc);
  } catch (err) {
    console.warn('Account DB unavailable, writing to in-memory store');
    const { owner, bank, number } = req.body;
    if (!owner || !bank || !number) return res.status(400).json({ error: '모든 필드가 필요합니다.' });
    const newItem = { _id: `mem_${Date.now()}_${Math.floor(Math.random()*1000)}`, owner, bank, number };
    inMemoryAccounts.push(newItem);
    res.json(newItem);
  }
});

module.exports = router;
