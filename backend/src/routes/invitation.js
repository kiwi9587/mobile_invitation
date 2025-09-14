const express = require('express');
const router = express.Router();
const Invitation = require('../models/Invitation');

// GET /api/wedding-info
router.get('/wedding-info', async (req, res) => {
  try {
    // 현재는 단일 문서만 사용한다고 가정
    const doc = await Invitation.findOne().lean();
    if (!doc) {
      // 샘플 데이터 반환
      return res.json({
        groom: { name: '홍길동', profileImg: '/groom.jpg', intro: '...' },
        bride: { name: '김영희', profileImg: '/bride.jpg', intro: '...' },
        wedding: {
          date: '2025-10-10T14:00:00.000Z',
          venue: '서울웨딩홀',
          address: '서울시 ...',
          mapUrl: ''
        }
      });
    }
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '서버 오류' });
  }
});

module.exports = router;
