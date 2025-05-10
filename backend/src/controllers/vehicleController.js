const { VehicleType, Vehicle, Booking, User } = require('../models');
const { Op } = require('sequelize');

exports.getVehicleTypes = async (req, res) => {
  try {
    const { wheels } = req.query;
    const whereClause = wheels ? { wheels: parseInt(wheels) } : {};
    
    const vehicleTypes = await VehicleType.findAll({
      where: whereClause,
      include: [{
        model: Vehicle,
        as: 'Vehicles' // Must match association alias
      }]
    });
    res.json(vehicleTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// NEW METHOD FOR VEHICLES BY TYPE
exports.getVehiclesByType = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({
      where: { vehicleTypeId: req.params.id },
      include: [{
        model: VehicleType,
        as: 'VehicleType'
      }]
    });
    res.json({ vehicles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { userId, vehicleId, startDate, endDate } = req.body;
    
    const overlappingBooking = await Booking.findOne({
      where: {
        vehicleId,
        [Op.or]: [
          { startDate: { [Op.between]: [startDate, endDate] } },
          { endDate: { [Op.between]: [startDate, endDate] } }
        ]
      }
    });

    if (overlappingBooking) {
      return res.status(400).json({ error: 'Vehicle already booked' });
    }

    const booking = await Booking.create({ userId, vehicleId, startDate, endDate });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};