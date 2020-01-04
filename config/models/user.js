"use strict";
const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    "user",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      userName: DataTypes.STRING,
      email: DataTypes.STRING,
      isValid: DataTypes.BOOLEAN,
      createdAt: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {};

  return User;
};
