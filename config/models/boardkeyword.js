"use strict";
const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  var BoardKeyword = sequelize.define(
    "board_keyword",
    {
      boardId: DataTypes.INTEGER,
      keywordId: DataTypes.INTEGER,
    },
    { timestamps: false }
  );
  BoardKeyword.associate = function(models) {};

  return BoardKeyword;
};
