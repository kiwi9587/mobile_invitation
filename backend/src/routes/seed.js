const express = require('express');
const router = express.Router();
const Invitation = require('../models/Invitation');
const Guestbook = require('../models/Guestbook');
const Gallery = require('../models/Gallery');
const Account = require('../models/Account');

// POST /api/seed
// Creates sample data for development. If documents already exist, it will not duplicate.
router.post('/', async (req, res) => {
  try {
    // Invitation (single doc)
    let invitation = await Invitation.findOne();
    if (!invitation) {
      invitation = await Invitation.create({
        groom: { name: '홍길동', profileImg: '/groom.jpg', intro: '신랑 소개입니다.' },
        bride: { name: '김영희', profileImg: '/bride.jpg', intro: '신부 소개입니다.' },
        wedding: {
          date: new Date('2025-10-10T14:00:00Z'),
          venue: '서울웨딩홀',
          address: '서울시 강남구 어딘가',
          mapUrl: ''
        },
        gallery: [],
        guestbook: [],
        accounts: []
      });
    }

    // Guestbook sample
    const guestExists = await Guestbook.findOne({ message: '축하합니다!' });
    if (!guestExists) {
      await Guestbook.create({ name: '테스터', message: '축하합니다!' });
    }

    // Gallery sample
    const galleryExists = await Gallery.findOne({ desc: '샘플 사진' });
    if (!galleryExists) {
      await Gallery.create({ imgUrl: '/sample1.jpg', desc: '샘플 사진' });
    }

    // Account sample
    const accountExists = await Account.findOne({ number: '123-456-7890' });
    if (!accountExists) {
      await Account.create({ owner: '신랑', bank: '국민', number: '123-456-7890' });
    }

    return res.json({ success: true, message: '샘플 데이터 생성 완료' });
  } catch (err) {
    console.error('Seed error:', err);
    return res.status(500).json({ success: false, error: err.message || err });
  }
});

module.exports = router;
