const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./database');
const fundRoutes = require('./Routes/fund.router')
const authRoutes = require('./Routes/auth.router');

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get('/a1', (req, res) => {
    res.send('Hello World!')
})

// Routes
app.use('/api/mutualfunds', fundRoutes);
app.use('/api/auth', authRoutes);

// Server startup
const port = process.env.PORT || 8000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer();
