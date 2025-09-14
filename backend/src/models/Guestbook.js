// 방명록 데이터 모델 (MongoDB/Mongoose)
const mongoose = require('mongoose');

const GuestbookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Guestbook', GuestbookSchema);
