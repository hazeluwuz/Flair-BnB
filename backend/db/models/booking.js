"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Spot, { foreignKey: "spotId" });
      Booking.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Booking.init(
    {
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isDate: true,
          dateChecker(value) {
            if (new Date(value) <= new Date(this.startDate)) {
              throw new Error("endDate cannot be on or before startDate");
            }
          },
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        get() {
          const date = new Date(this.dataValues.createdAt);
          return `${date.toISOString().split("T")[0]} ${date.toLocaleTimeString(
            [],
            { hour12: false }
          )}`;
        },
      },
      updatedAt: {
        type: DataTypes.DATE,
        get() {
          const date = new Date(this.dataValues.updatedAt);
          return `${date.toISOString().split("T")[0]} ${date.toLocaleTimeString(
            [],
            { hour12: false }
          )}`;
        },
      },
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
