"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.hasMany(models.Image, {
        foreignKey: "reviewId",
        onDelete: "CASCADE",
        hooks: true,
      });
      Review.belongsTo(models.User, { foreignKey: "userId" });
      Review.belongsTo(models.Spot, { foreignKey: "spotId" });
    }
  }
  Review.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      review: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        get() {
          const date = new Date(this.dataValues.createdAt);
          return `${date.toISOString().split("T")[0]} ${date.toLocaleTimeString(
            [],
            { timeStyle: "medium", hour12: false }
          )}`;
        },
      },
      updatedAt: {
        type: DataTypes.DATE,
        get() {
          const date = new Date(this.dataValues.updatedAt);
          return `${date.toISOString().split("T")[0]} ${date.toLocaleTimeString(
            [],
            { timeStyle: "medium", hour12: false }
          )}`;
        },
      },
    },
    {
      sequelize,
      modelName: "Review",
      indexes: [
        {
          unique: true,
          fields: ["userId", "spotId"],
        },
      ],
    }
  );
  return Review;
};
