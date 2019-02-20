"use strict";
module.exports = (sequelize, DataTypes) => {
  const Shorten = sequelize.define(
    "Shorten",
    {
      original_url: DataTypes.STRING
    },
    {}
  );
  Shorten.associate = function(models) {
    // associations can be defined here
  };
  return Shorten;
};
