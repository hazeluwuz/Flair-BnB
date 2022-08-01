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
    await queryInterface.bulkInsert("Bookings", [
      {
        spotId: 1,
        userId: 1,
        startDate: "10-19-2022",
        endDate: "10-26-2022",
      },
      {
        spotId: 1,
        userId: 2,
        startDate: "1-19-2022",
        endDate: "1-26-2022",
      },
      {
        spotId: 1,
        userId: 1,
        startDate: "11-19-2022",
        endDate: "11-26-2022",
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
    await queryInterface.bulkDelete("Bookings", { spotId: 1 });
  },
};
