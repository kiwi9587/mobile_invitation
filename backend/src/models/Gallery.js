// 갤러리 이미지 데이터 모델 (MongoDB/Mongoose)
const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  imgUrl: { type: String, required: true },
  desc: { type: String },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gallery', GallerySchema);
