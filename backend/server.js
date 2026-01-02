const express = require('express');
const cors = require('cors');
const { connectMongoDB, initMySQL } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables early
// First try .env, then env.sample
const envPath = path.join(__dirname, '.env');
const samplePath = path.join(__dirname, 'env.sample');
const fs = require('fs');
if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
} else if (fs.existsSync(samplePath)) {
    dotenv.config({ path: samplePath });
}

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Database Connections
connectMongoDB();
initMySQL();

app.get('/', (req, res) => {
    res.send('API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
