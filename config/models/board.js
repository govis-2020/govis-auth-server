"use strict";
const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  var Board = sequelize.define(
    "board",
    {
      articleId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      type: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      check: DataTypes.BOOLEAN
    },
    { updatedAt: false }
  );
  Board.associate = function(models) {};

  return Board;
};
