const DoctorList = require("../Models/doctorlistModel");

// Create a new doctor
exports.createDoctor = async (req, res) => {

    const {email} = req.body;
    const existingDoctor = await DoctorList.findOne({email});
    if (existingDoctor) {
        return res.status(409).json({ error: 'Email already exists' });
    }
    
    try {
        const doctor = await DoctorList.create(req.body);
        res.status(201).json({ message: 'Doctor added successfully', data: doctor });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all doctors
exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await DoctorList.find();
        res.status(200).json({ data: doctors });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a doctor by ID
exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await DoctorList.findById(req.params.id);
        if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
        res.status(200).json({ data: doctor });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a doctor's details by ID
exports.updateDoctor = async (req, res) => {
    try {
        const doctor = await DoctorList.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
        res.status(200).json({ message: 'Doctor updated successfully', data: doctor });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a doctor by ID
exports.deleteDoctor = async (req, res) => {
    try {
        const doctor = await DoctorList.findByIdAndDelete(req.params.id);
        if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
