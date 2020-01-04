"use strict";
const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  var CrowlData = sequelize.define(
    "crowl_data",
    {
      article_id: DataTypes.INTEGER,
      nickname: DataTypes.STRING,
      boardTypeId: DataTypes.INTEGER,
      up: DataTypes.INTEGER,
      down: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      view: DataTypes.INTEGER,
      images: DataTypes.JSON,
      youtubeUrl: DataTypes.STRING,
      deleted: DataTypes.BOOLEAN,
      point: DataTypes.DOUBLE,
      commentCount: DataTypes.INTEGER
    },
    { freezeTableName: true }
  );
  CrowlData.associate = function(models) {};

  return CrowlData;
};
