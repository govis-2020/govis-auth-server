"use strict";
const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  var CampusFacility = sequelize.define(
    "campus_facility",
    {
      campusFacilityId: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      name: DataTypes.STRING,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
      content: DataTypes.STRING
    },
    {}
  );
  CampusFacility.associate = function(models) {};

  return CampusFacility;
};
