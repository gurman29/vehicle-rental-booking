'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Define associations with consistent aliases
db.VehicleType.hasMany(db.Vehicle, {
  foreignKey: 'vehicleTypeId',
  as: 'Vehicles' // Plural for hasMany
});

db.Vehicle.belongsTo(db.VehicleType, {
  foreignKey: 'vehicleTypeId',
  as: 'VehicleType' // Singular for belongsTo
});

db.Booking.belongsTo(db.User, {
  foreignKey: 'userId',
  as: 'User'
});

db.Booking.belongsTo(db.Vehicle, {
  foreignKey: 'vehicleId',
  as: 'Vehicle'
});

db.User.hasMany(db.Booking, {
  foreignKey: 'userId',
  as: 'Bookings'
});

db.Vehicle.hasMany(db.Booking, {
  foreignKey: 'vehicleId',
  as: 'Bookings'
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;