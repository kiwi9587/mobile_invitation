const mongoose = require('mongoose');
const inMemoryStore = require('../models/InMemoryStore');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mobile_invitation';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    console.log('Falling back to in-memory store...');
    return false;
  }
};

// Handle MongoDB connection events
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err);
});

module.exports = {
  connectDB,
  getDB: () => mongoose.connection.db,
  isConnected: () => mongoose.connection.readyState === 1
};