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
        validate: {
          isDate: true,
          dateChecker(value) {
            if (value < this.startDate) {
              throw new Error("startDate must be before endDate");
            }
          },
        },
      },
      endDate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isDate: true,
          dateChecker(value) {
            if (value < this.startDate) {
              throw new Error("endDate must be after startDate");
            }
          },
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
