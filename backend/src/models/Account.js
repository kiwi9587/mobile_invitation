// 계좌 정보 데이터 모델 (MongoDB/Mongoose)
const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  owner: { type: String, required: true }, // 신랑/신부
  bank: { type: String, required: true },
  number: { type: String, required: true }
});

module.exports = mongoose.model('Account', AccountSchema);
