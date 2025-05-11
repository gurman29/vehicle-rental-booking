const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// Vehicle type routes
router.get('/vehicle-types', vehicleController.getVehicleTypes);
router.get('/vehicles/:typeId', vehicleController.getVehiclesByType);
router.post('/bookings', vehicleController.createBooking);

module.exports = router;