 // server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const { syncDatabase } = require('./models');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

dotenv.config({ path: path.join(__dirname, 'config.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:5177'],
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// Auth routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Static hosting (if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Basic root response
app.get('/', (req, res) => {
  res.json({ message: 'Catering API server' });
});

async function start() {
  try {
    await syncDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
