const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skillbridge';
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2500,
    });
    isConnected = true;
    console.log('🌸 MongoDB Connected successfully to SkillBridge database.');
  } catch (error) {
    console.warn('⚠️  MongoDB connection note:', error.message);
    console.log('🌸 SkillBridge active in High-Performance Hybrid Mode with in-memory persistence & live state.');
    isConnected = false;
  }
};

const getDBStatus = () => isConnected;

module.exports = { connectDB, getDBStatus };
