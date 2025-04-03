
const mongoose = require('mongoose');

// Define the Schema
const doctorList = new mongoose.Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    phonenumber: { type: Number, required: true },
    dateOfBirth: { type: Date, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    availability: { type: String, required: true },
    degree:{type : String , required: true }

},{ timestamps: true });



// Create a  Model
const DoctorList = mongoose.model('DoctorList', doctorList);
module.exports = DoctorList; // Export the  model
