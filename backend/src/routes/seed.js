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
        groom: {
          name: "김신랑",
          profileImg: "https://source.unsplash.com/300x300/?groom",
          intro: "신랑측 혼주 김O현 · 이O자의 아들 김신랑"
        },
        bride: {
          name: "이신부",
          profileImg: "https://source.unsplash.com/300x300/?bride",
          intro: "신부측 혼주 이O수 · 박O미의 딸 이신부"
        },
        wedding: {
          date: new Date("2025-12-25T13:00:00"),
          venue: "아름다운 웨딩홀",
          address: "서울시 강남구 사랑로 123",
          mapUrl: "https://maps.google.com/?q=서울시+강남구+사랑로+123"
        }
      });
    }

    // Gallery samples
    const galleryImages = [
      { imgUrl: "https://source.unsplash.com/800x600/?wedding", desc: "웨딩 스냅 1" },
      { imgUrl: "https://source.unsplash.com/800x600/?bride,wedding", desc: "웨딩 스냅 2" },
      { imgUrl: "https://source.unsplash.com/800x600/?groom,wedding", desc: "웨딩 스냅 3" },
      { imgUrl: "https://source.unsplash.com/800x600/?couple,love", desc: "웨딩 스냅 4" }
    ];

    for (const image of galleryImages) {
      const exists = await Gallery.findOne({ imgUrl: image.imgUrl });
      if (!exists) {
        await Gallery.create(image);
      }
    }

    // Guestbook samples
    const guestbookMessages = [
      { name: "김하객", message: "두 분의 결혼을 진심으로 축하드립니다! 행복한 가정 이루세요 ♥" },
      { name: "이축하", message: "아름다운 예식 축하드립니다. 늘 행복하시길 바랍니다." },
      { name: "박친구", message: "결혼 축하해! 오래오래 행복하게 살아!" }
    ];

    for (const message of guestbookMessages) {
      const exists = await Guestbook.findOne({ message: message.message });
      if (!exists) {
        await Guestbook.create(message);
      }
    }

    // Account samples
    const accounts = [
      { owner: "신랑", bank: "국민", number: "123-456-7890" },
      { owner: "신부", bank: "신한", number: "098-765-4321" }
    ];

    for (const account of accounts) {
      const exists = await Account.findOne({ number: account.number });
      if (!exists) {
        await Account.create(account);
      }
    }

    return res.json({ success: true, message: '샘플 데이터 생성 완료' });
  } catch (err) {
    console.error('Seed error:', err);
    return res.status(500).json({ success: false, error: err.message || err });
  }
});

module.exports = router;
