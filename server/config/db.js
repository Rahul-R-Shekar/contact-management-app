const mongoose = require('mongoose');

const connectDB = async (mongoUri) => {
  if (!mongoUri) throw new Error('No MongoDB URI provided');
  return mongoose.connect(mongoUri);
};

module.exports = connectDB;
