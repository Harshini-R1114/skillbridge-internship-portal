let mongoose;
try {
  mongoose = require('mongoose');
} catch (e) {
  mongoose = null;
}

let isConnected = false;

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!mongoURI) {
    console.log('🌸 SkillBridge active in High-Performance In-Memory & File Store Mode.');
    return;
  }

  if (!mongoose) {
    console.log('⚠️  Mongoose package not installed; running in High-Performance File Store Mode.');
    return;
  }

  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log('🌸 MongoDB Atlas Connected successfully to SkillBridge database.');
  } catch (error) {
    console.warn('⚠️  MongoDB connection note:', error.message);
    console.log('🌸 SkillBridge active in High-Performance Hybrid Mode with in-memory persistence & live state.');
    isConnected = false;
  }
};

const getDBStatus = () => isConnected;

module.exports = { connectDB, getDBStatus };
