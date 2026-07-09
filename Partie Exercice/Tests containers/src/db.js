const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || `mongodb://${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 27017}/${process.env.DB_NAME || 'testdb'}`;
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
