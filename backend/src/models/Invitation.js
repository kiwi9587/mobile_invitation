// 모바일 청첩장 데이터 모델 (MongoDB/Mongoose with in-memory fallback)
const mongoose = require('mongoose');
const inMemoryStore = require('./InMemoryStore');

// MongoDB Schema
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

const MongoInvitation = mongoose.model('Invitation', InvitationSchema);

// Default data for in-memory store
const defaultInvitation = {
  id: 1,
  groom: {
    name: "김신랑",
    profileImg: "https://source.unsplash.com/300x300/?groom",
    intro: "신랑을 소개합니다"
  },
  bride: {
    name: "이신부",
    profileImg: "https://source.unsplash.com/300x300/?bride",
    intro: "신부를 소개합니다"
  },
  wedding: {
    date: new Date("2025-12-25T13:00:00"),
    venue: "아름다운 웨딩홀",
    address: "서울시 강남구 사랑로 123",
    mapUrl: "https://maps.google.com"
  },
  gallery: [],
  guestbook: [],
  accounts: []
};

// Initialize in-memory store with default data
if (!inMemoryStore.collections.invitations.length) {
  inMemoryStore.collections.invitations.push(defaultInvitation);
}

// Wrapper that falls back to in-memory store if MongoDB is not available
class Invitation {
  static async find() {
    try {
      return await MongoInvitation.find();
    } catch (error) {
      return inMemoryStore.find('invitations');
    }
  }

  static async findOne(query) {
    try {
      return await MongoInvitation.findOne(query);
    } catch (error) {
      return inMemoryStore.findOne('invitations', query);
    }
  }

  static async create(data) {
    try {
      return await MongoInvitation.create(data);
    } catch (error) {
      return inMemoryStore.create('invitations', data);
    }
  }
}

module.exports = Invitation;
