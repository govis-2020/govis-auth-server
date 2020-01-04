"use strict";
const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  var Keyword = sequelize.define(
    "keyword",
    {
      name: DataTypes.STRING
    },
    { timestamps: false }
  );
  Keyword.associate = function(models) {};

  return Keyword;
};
