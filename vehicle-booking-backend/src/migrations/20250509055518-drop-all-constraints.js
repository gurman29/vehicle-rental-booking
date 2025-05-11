'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // No action needed in up direction
    return Promise.resolve();
  },

  async down(queryInterface, Sequelize) {
    // No action needed in down direction
    return Promise.resolve();
  },

  async removeAllConstraints(queryInterface) {
    try {
      await queryInterface.removeConstraint('Bookings', 'bookings_vehicle_id_fkey');
    } catch (e) { /* ignore if doesn't exist */ }
    
    try {
      await queryInterface.removeConstraint('Bookings', 'bookings_user_id_fkey');
    } catch (e) { /* ignore if doesn't exist */ }
    
    try {
      await queryInterface.removeConstraint('Vehicles', 'Vehicles_vehicleTypeId_fkey');
    } catch (e) { /* ignore if doesn't exist */ }
  }
};