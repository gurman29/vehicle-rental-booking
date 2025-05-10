'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // No action needed in up direction
  },

  async down(queryInterface, Sequelize) {
    // No action needed in down direction
  },

  async removeConstraints(queryInterface) {
    await queryInterface.removeConstraint('Bookings', 'bookings_vehicle_id_fkey');
    await queryInterface.removeConstraint('Bookings', 'bookings_user_id_fkey');
    await queryInterface.removeConstraint('Vehicles', 'Vehicles_vehicleTypeId_fkey');
  }
};