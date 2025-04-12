// models/userModel.js
const mongoose = require('mongoose');

// Define the User Schema
const registrationFormSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required'], 
        trim: true 
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'], 
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    phonenumber: { 
        type: String, // Storing phone number as a string to preserve leading zeros
        required: [true, 'Phone number is required'], 
        trim: true,
        match: [/^\d{10,15}$/, 'Phone number must be between 10 to 15 digits']
    },
    dateOfBirth: { 
        type: Date, 
        required: [true, 'Date of birth is required'],
        validate: {
            validator: function (value) {
                return value < new Date(); // DOB must be in the past
            },
            message: 'Date of birth must be a past date'
        }
    },
    address: { 
        type: String, 
        required: [true, 'Address is required'], 
        trim: true 
    },
    description: { 
        type: String, 
        required: [true, 'Description is required'], 
        trim: true 
    },
    doctorname: { 
        type: String, 
        required: [true, 'Doctor name is required'], 
        trim: true 
    },
    status: { 
        type: String, 
        enum: ['Pending', 'Approved', 'Rejected'], 
        default: 'Pending', 
        required: true 
    }
}, { timestamps: true });

// Create a Model
const RegistrationForm = mongoose.model('RegistrationForm', registrationFormSchema);
module.exports = RegistrationForm; // Export the model
