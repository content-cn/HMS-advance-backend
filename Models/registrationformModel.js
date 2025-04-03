// models/userModel.js
const mongoose = require('mongoose');


// Define the User Schema
const registrationFormSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phonenumber: { type: Number, required: true },
    dateOfBirth: { type: Date, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    doctorname: { type: String, required: true },
    status: { type: String, default: 'Pending', required: true }
},{ timestamps: true });



// Create a  Model
const RegistrationForm = mongoose.model('RegistrationForm', registrationFormSchema);
module.exports = RegistrationForm; // Export the  model
