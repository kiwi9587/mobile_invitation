// 모바일 청첩장 데이터 모델 (MongoDB/Mongoose)
const mongoose = require('mongoose');

const InvitationSchema = new mongoose.Schema({
  groom: {
    name: String,
    profileImg: String,
    intro: String
  },
  bride: {
    name: String,
    profileImg: String,
    intro: String
  },
  wedding: {
    date: Date,
    venue: String,
    address: String,
    mapUrl: String
  },
  gallery: [
    {
      imgUrl: String,
      desc: String,
      uploadedAt: Date
    }
  ],
  guestbook: [
    {
      name: String,
      message: String,
      createdAt: Date
    }
  ],
  accounts: [
    {
      owner: String,
      bank: String,
      number: String
    }
  ]
});

module.exports = mongoose.model('Invitation', InvitationSchema);
