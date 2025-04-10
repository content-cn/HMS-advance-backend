// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const path = require('path');  

const authRoutes = require('./Routes/authroutes');
const formRoute = require('./Routes/registrationformRoute')
const doctorlistRoutes = require("./Routes/doctorlistRoutes")
const adminlogin= require('./Routes/adminAuthRoutes')
const rateLimit = require('express-rate-limit');
const helmet = require("helmet")
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet()); 
// Define rate limit settings
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 2, 
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});


// Apply rate limiting to all API routes
app.use('/api/', limiter);

app.use(express.static(path.join(__dirname, 'frontend')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
    
}).catch(err => {
    console.error('Could not connect to MongoDB:', err);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
})
app.get('/admin-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'admin-dashboard', 'adminDashboard.html'));
})

app.use('/api/auth',authRoutes)
app.use('/api/form',formRoute)
app.use('/api/adminauth',adminlogin)
app.use('/api/admin/doctorlist',doctorlistRoutes)

// Define the port
const PORT = process.env.PORT || 5000;


