"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
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
    options.tableName = "Reviews";
    await queryInterface.bulkInsert(options, [
      {
        review: "DemoReview",
        stars: 5,
        userId: 1,
        spotId: 1,
      },
      {
        review: "DemoReview",
        stars: 3,
        userId: 1,
        spotId: 2,
      },
      {
        review: "DemoReview",
        stars: 1,
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
    options.tableName = "Reviews";
    await queryInterface.bulkDelete(options, {
      review: "DemoReview",
    });
  },
};
