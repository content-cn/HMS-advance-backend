const RegistrationForm = require('../Models/registrationformModel');
const { updateMessage } = require("../config/email");
const { checkSchema, validationResult } = require('express-validator'); // Import express-validator for route validation

// Validation schema for appointment creation
const appointmentCreationValidationSchema = checkSchema({
    email: {
        notEmpty: { errorMessage: 'Email is required' },
        isEmail: { errorMessage: 'Please enter a valid email' }
    },
    phonenumber: {
        notEmpty: { errorMessage: 'Phone number is required' },
        isLength: { options: { min: 10, max: 15 }, errorMessage: 'Phone number must be between 10 to 15 digits' }
    },
    dateOfBirth: {
        notEmpty: { errorMessage: 'Date of birth is required' },
        custom: {
            options: (value) => {
                const inputDate = new Date(value)
                return inputDate < new Date()
            },
            errorMessage: 'Date of birth must be a past date'
        }
    },
    address: {
        notEmpty: { errorMessage: 'Address is required' }
    },
    description: {
        notEmpty: { errorMessage: 'Description is required' }
    },
    doctorname: {
        notEmpty: { errorMessage: 'Doctor name is required' }
    },
});

// Validation schema for appointment update
const appointmentUpdateValidationSchema = checkSchema({
    id: {
        isMongoId: { errorMessage: 'Invalid ID' }
    },
    status: {
        notEmpty: { errorMessage: 'Status is required' },
        isIn: { options: [['Pending', 'Approved', 'Rejected']], errorMessage: 'Invalid status option' }
    }
});

// Validation schema for appointment deletion
const appointmentDeletionValidationSchema = checkSchema({
    id: {
        isMongoId: { errorMessage: 'Invalid ID' }
    }
});

// Middleware to handle validation errors
const validateAppointmentCreation = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array())
        return res.status(400).json({ errors: errors.array() });
    }

    next(); // Proceed to the controller if validation passes
};

const validateAppointmentUpdate = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next(); // Proceed to the controller if validation passes
};

const validateAppointmentDeletion = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next(); // Proceed to the controller if validation passes
};

// Create a new appointment
exports.createAppointment = [appointmentCreationValidationSchema, validateAppointmentCreation, async (req, res) => {
    try {
        const newAppointment = new RegistrationForm(req.body);
        console.log(req.body)
        await newAppointment.save();
        res.status(201).json({ message: 'Appointment created successfully!', data: newAppointment });
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
}];

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
exports.getAppointmentById = [appointmentUpdateValidationSchema, validateAppointmentUpdate, async (req, res) => {
    try {
        const appointment = await RegistrationForm.findById(req.params.id);
        if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}];

// Update an appointment by ID
exports.updateAppointment = [appointmentUpdateValidationSchema, validateAppointmentUpdate, async (req, res) => {
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
}];

// Delete an appointment by ID
exports.deleteAppointment = [appointmentDeletionValidationSchema, validateAppointmentDeletion, async (req, res) => {
    try {
        const appointment = await RegistrationForm.findByIdAndDelete(req.params.id);
        if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
        res.status(200).json({ message: 'Appointment deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}];
