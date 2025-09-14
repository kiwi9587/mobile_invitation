// 갤러리 이미지 데이터 모델 (MongoDB/Mongoose with in-memory fallback)
const mongoose = require('mongoose');
const inMemoryStore = require('./InMemoryStore');

// MongoDB Schema
const GallerySchema = new mongoose.Schema({
  imgUrl: { type: String, required: true },
  desc: { type: String },
  uploadedAt: { type: Date, default: Date.now }
});

const MongoGallery = mongoose.model('Gallery', GallerySchema);

// Wrapper that falls back to in-memory store if MongoDB is not available
class Gallery {
  static async find() {
    try {
      return await MongoGallery.find();
    } catch (error) {
      return inMemoryStore.find('galleries');
    }
  }

  static async findOne(query) {
    try {
      return await MongoGallery.findOne(query);
    } catch (error) {
      return inMemoryStore.findOne('galleries', query);
    }
  }

  static async create(data) {
    try {
      return await MongoGallery.create(data);
    } catch (error) {
      return inMemoryStore.create('galleries', data);
    }
  }
}

module.exports = Gallery;
