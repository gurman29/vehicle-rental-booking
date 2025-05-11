const { VehicleType, Vehicle, Booking } = require('../models');
const { Op } = require('sequelize');

exports.getVehicleTypes = async (req, res) => {
  try {
    const { wheels } = req.query;
    
    // Validate wheels parameter
    if (wheels && !['2', '4'].includes(wheels)) {
      return res.status(400).json({ error: 'Wheels must be either 2 or 4' });
    }

    const whereClause = wheels ? { wheels: parseInt(wheels) } : {};
    
    const vehicleTypes = await VehicleType.findAll({
      where: whereClause,
      include: [{
        model: Vehicle,
        as: 'Vehicles',
        attributes: ['id', 'name']
      }],
      attributes: ['id', 'name', 'wheels']
    });

    res.json(vehicleTypes);
  } catch (error) {
    console.error('Error fetching vehicle types:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getVehiclesByType = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({
      where: { vehicleTypeId: req.params.typeId },
      attributes: ['id', 'name']
    });
    res.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles by type:', error);
    res.status(500).json({ error: 'Internal server error' });
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
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};