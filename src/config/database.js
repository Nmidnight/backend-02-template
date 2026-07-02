const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
    });
};

module.exports = connectDB;
