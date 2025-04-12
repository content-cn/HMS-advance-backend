// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fs= require('fs')
const path = require('path');  
// const {isAdminAuthenticated} = require("./middleware/authMiddleware")
const authRoutes = require('./Routes/authroutes');
const formRoute = require('./Routes/registrationformRoute')
const doctorlistRoutes = require("./Routes/doctorlistRoutes")
const adminlogin= require('./Routes/adminAuthRoutes')

const app = express();
app.use(express.json());
app.use(cors());



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
app.use('/api/doctorlist',doctorlistRoutes)

// Define the port
const PORT = process.env.PORT || 5000;


