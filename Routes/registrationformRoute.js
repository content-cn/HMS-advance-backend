const express = require('express');
const {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
} = require('../Controllers/registrationformcontroller');
const { isAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

// Routes
router.post('/', createAppointment);
router.get('/', getAllAppointments);
router.get('/:id', getAppointmentById);
router.put('/:id', updateAppointment);
router.delete('/:id',  deleteAppointment);

module.exports = router;
