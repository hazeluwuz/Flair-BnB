"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Images", [
      {
        url: "https://imgur.com/4231.png",
        previewImage: true,
        spotId: 1,
        userId: 1,
      },
      {
        url: "https://imgur.com/5136.png",
        previewImage: false,
        reviewId: 1,
        userId: 1,
      },
      {
        url: "https://imgur.com/6198.png",
        previewImage: true,
        spotId: 2,
        userId: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Images", {
      userId: 1,
    });
  },
};
