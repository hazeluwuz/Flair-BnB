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
    options.tableName = "Bookings";
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate: "2022-10-19",
        endDate: "2022-10-26",
      },
      {
        spotId: 1,
        userId: 2,
        startDate: "2022-1-25",
        endDate: "2022-2-15",
      },
      {
        spotId: 1,
        userId: 1,
        startDate: "2022-11-19",
        endDate: "2022-11-19",
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
    options.tableName = "Bookings";
    await queryInterface.bulkDelete(options, { spotId: 1 });
  },
};
