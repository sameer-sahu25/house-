const mongoose = require('mongoose');

const connectDB = async () => {
  let uri = process.env.MONGODB_URI;

  if (uri) {
    try {
      console.log('Connecting to MongoDB provided in environment...');
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
      console.log('MongoDB database connected successfully.');
      return;
    } catch (error) {
      console.error('Failed to connect to provided MONGODB_URI. Falling back to in-memory database. Error:', error.message);
    }
  }

  try {
    console.log('Initializing in-memory MongoDB server...');
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongoServer = await MongoMemoryServer.create();
    const fallbackUri = mongoServer.getUri();
    console.log(`In-memory MongoDB started at: ${fallbackUri}`);
    global.__MONGO_SERVER__ = mongoServer;

    await mongoose.connect(fallbackUri);
    console.log('Fallback in-memory MongoDB database connected successfully.');
  } catch (error) {
    console.error('Fatal: Database connection failed completely:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
