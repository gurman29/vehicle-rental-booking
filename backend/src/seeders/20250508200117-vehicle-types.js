module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First insert VehicleTypes
    await queryInterface.bulkInsert('VehicleTypes', [
      { 
        name: 'Hatchback', 
        wheels: 4,  // Must match model exactly
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        name: 'SUV', 
        wheels: 4, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        name: 'Sedan', 
        wheels: 4, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        name: 'Sports Bike', 
        wheels: 2, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      }
    ], {});

    // Get the inserted types
    const types = await queryInterface.sequelize.query(
      `SELECT id from "VehicleTypes";`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Then insert Vehicles
    await queryInterface.bulkInsert('Vehicles', [
      { 
        name: 'Toyota Yaris',  // Must match model exactly
        vehicleTypeId: types[0].id,  // Must match model exactly
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        name: 'Honda Jazz', 
        vehicleTypeId: types[0].id, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        name: 'Toyota RAV4', 
        vehicleTypeId: types[1].id, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        name: 'Ford Explorer', 
        vehicleTypeId: types[1].id, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        name: 'Honda Accord', 
        vehicleTypeId: types[2].id, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        name: 'Toyota Camry', 
        vehicleTypeId: types[2].id, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        name: 'Yamaha R1', 
        vehicleTypeId: types[3].id, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        name: 'Kawasaki Ninja', 
        vehicleTypeId: types[3].id, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      }
    ], {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Vehicles', null, {});
    await queryInterface.bulkDelete('VehicleTypes', null, {});
  }
};