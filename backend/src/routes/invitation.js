const express = require('express');
const router = express.Router();
const Invitation = require('../models/Invitation');

// GET /api/wedding-info
router.get('/wedding-info', async (req, res) => {
  try {
    console.log('Fetching wedding info...');
    const doc = await Invitation.findOne();
    console.log('Found document:', doc);
    if (!doc) {
      console.log('No wedding info found');
      return res.status(404).json({ error: 'Wedding info not found' });
    }
    res.json(doc);
  } catch (err) {
    console.error('Error fetching wedding info:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
