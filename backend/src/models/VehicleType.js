'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class VehicleType extends Model {
    static associate(models) {
      // Association is defined in index.js
    }
  }
  VehicleType.init({
    name: DataTypes.STRING,
    wheels: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'VehicleType',
  });
  return VehicleType;
};