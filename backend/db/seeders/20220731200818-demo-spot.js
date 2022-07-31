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
    await queryInterface.bulkInsert("Spots", [
      {
        ownerId: 1,
        address: "123 Example Lane",
        city: "Demo",
        state: "Connecticut",
        country: "United States of America",
        lat: 23.7645358,
        lng: -1252.4730327,
        name: "Town Hall",
        description: "Center of town",
        price: 200,
      },
      {
        ownerId: 1,
        address: "531 Wooster Street",
        city: "Demo",
        state: "Connecticut",
        country: "United States of America",
        lat: 223.7645358,
        lng: -12.4730327,
        name: "Example House",
        description: "Example description",
        price: 250,
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
    await queryInterface.bulkDelete(
      "Spots",
      {
        city: "Demo",
      },
      {}
    );
  },
};
