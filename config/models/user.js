"use strict";
const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    "user",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },

      user_name: DataTypes.STRING,
      email: DataTypes.STRING,
      is_valid: DataTypes.BOOLEAN,
      is_enabled: DataTypes.BOOLEAN,
      created_at: DataTypes.STRING
    },
    { freezeTableName: true }
  );
  User.associate = function(models) {};

  return User;
};
