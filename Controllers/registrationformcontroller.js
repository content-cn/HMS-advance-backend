const RegistrationForm = require('../Models/registrationformModel');
const { updateMessage } = require("../config/email");
// Create a new appointment
exports.createAppointment = async (req, res) => {
    try {
        const newAppointment = new RegistrationForm(req.body);
        await newAppointment.save();
        res.status(201).json({ message: 'Appointment created successfully!', data: newAppointment });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Fetch all appointments
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await RegistrationForm.find();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch a single appointment by ID
exports.getAppointmentById = async (req, res) => {
    try {
        const appointment = await RegistrationForm.findById(req.params.id);
        if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an appointment by ID
exports.updateAppointment = async (req, res) => {
    const {email , status} = req.body
    console.log(email,status)
    try {
        const updatedAppointment = await RegistrationForm.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true, runValidators: true }
        );
        if (!updatedAppointment) return res.status(404).json({ error: 'Appointment not found' });
        await updateMessage(email, status);
        res.status(200).json({ message: 'Appointment status updated successfully!', data: updatedAppointment });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an appointment by ID
exports.deleteAppointment = async (req, res) => {
    try {
        const appointment = await RegistrationForm.findByIdAndDelete(req.params.id);
        if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
        res.status(200).json({ message: 'Appointment deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
