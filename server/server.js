const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contact.routes');
const { errorHandler } = require('./middleware/errorHandler');

// Load .env
dotenv.config();

const PORT = process.env.PORT || 3030;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/contactapp';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Contact API 🚀. Try /ping or /api/contacts');
});


// Simple health route
app.get('/ping', (req, res) => res.send('pong 🏓'));

// Routes
app.use('/api/contacts', contactRoutes);

// Error handler
app.use(errorHandler);

// Connect DB & start server
connectDB(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err.message || err);
    process.exit(1);
  });
