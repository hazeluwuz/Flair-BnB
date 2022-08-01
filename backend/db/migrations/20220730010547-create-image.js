"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Images", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      previewImage: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      spotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Spots" },
      },
      reviewId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Reviews" },
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Images");
  },
};
