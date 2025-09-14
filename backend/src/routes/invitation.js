const express = require('express');
const router = express.Router();
const Invitation = require('../models/Invitation');

// GET /api/wedding-info
router.get('/wedding-info', async (req, res) => {
  try {
    const doc = await Invitation.findOne();
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
