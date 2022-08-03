"use strict";

const { faker } = require("@faker-js/faker");
const randomNumber = (num) => Math.floor(Math.random() * Math.floor(num) + 1);
module.exports = {
  async up(queryInterface, Sequelize) {
    const spots = [];
    let i = 0;
    while (i < 10) {
      const spot = {
        ownerId: 1,
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        country: faker.address.country(),
        lat: faker.address.latitude(),
        lng: faker.address.longitude(),
        name: `Random Spot ${i}`,
        description: faker.random.words(),
        price: faker.random.numeric(5),
      };
      spots.push(spot);
      i++;
    }
    await queryInterface.bulkInsert("Spots", spots);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const { Op } = require("sequelize");
    await queryInterface.bulkDelete(
      "Spots",
      {
        name: {
          [Op.like]: "Random Spot%",
        },
      },
      {}
    );
  },
};
