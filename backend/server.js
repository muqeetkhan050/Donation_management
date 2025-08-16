
const dotenv = require('dotenv');
const express = require('express');

const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB(); // connect to MongoDB

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/causes', require('./routes/causeRoutes')); // Causes routes
app.use('/uploads', express.static('uploads'));




const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

module.exports = app;
