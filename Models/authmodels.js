// models/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

// Define the User Schema
const authSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

// Pre-save hook to hash the password before saving
authSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Create a User Model
const User = mongoose.model('Auth', authSchema);
module.exports = User; // Export the User model
