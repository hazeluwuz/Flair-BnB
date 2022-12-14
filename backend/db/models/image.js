"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.Review, { foreignKey: "reviewId" });
      Image.belongsTo(models.User, { foreignKey: "userId" });
      Image.belongsTo(models.Spot, { foreignKey: "spotId" });
    }
  }
  Image.init(
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isUrl: true,
        },
      },
      previewImage: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      spotId: {
        type: DataTypes.INTEGER,
      },
      reviewId: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      modelName: "Image",
      scopes: {
        reviews: {
          attributes: ["id", "spotId", "userId", "url"],
        },
      },
    }
  );

  return Image;
};
