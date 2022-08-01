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
    await queryInterface.bulkInsert("Reviews", [
      {
        review: "DemoReview",
        stars: 5,
        userId: 1,
        spotId: 1,
      },
      {
        review: "DemoReview",
        stars: 5,
        userId: 1,
        spotId: 2,
      },
      {
        review: "DemoReview",
        stars: 5,
        userId: 2,
        spotId: 1,
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
    await queryInterface.bulkDelete("Reviews", {
      review: "DemoReview",
    });
  },
};
