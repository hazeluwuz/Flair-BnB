"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const spots = [
      {
        ownerId: 1,
        address: "1235 Stefanie Highway",
        city: "Middleton",
        state: "New Hampshire",
        country: "United States",
        lat: -34.8344,
        lng: 26.4944,
        name: "Random Spot 0",
        description: "hacking",
        price: 360,
      },
      {
        ownerId: 2,
        address: "21741 Satterfield Glen",
        city: "Belgrade",
        state: "Maine",
        country: "Cyprus",
        lat: 37.1393,
        lng: 79.4899,
        name: "Random Spot 1",
        description: "Rubber",
        price: 541,
      },
      {
        ownerId: 2,
        address: "397 Schroeder Crossroad",
        city: "Barnstead",
        state: "New Hampshire",
        country: "Jersey",
        lat: -74.1759,
        lng: -76.8594,
        name: "Random Spot 2",
        description: "virtual Lanka",
        price: 393,
      },
      {
        ownerId: 2,
        address: "371 Ondricka Haven",
        city: "Gilford",
        state: "New Hampshire",
        country: "Hungary",
        lat: 86.4034,
        lng: 94.4609,
        name: "Random Spot 3",
        description: "transmitter Architect",
        price: 125,
      },
      {
        ownerId: 2,
        address: "2828 Rita Isle",
        city: "Belgrade",
        state: "Maine",
        country: "Equatorial Guinea",
        lat: -47.7604,
        lng: -167.0376,
        name: "Random Spot 4",
        description: "panel scale",
        price: 569,
      },
      {
        ownerId: 2,
        address: "62927 Gislason Club",
        city: "Meredith",
        state: "New Hampshire",
        country: "Kuwait",
        lat: 50.8287,
        lng: 124.844,
        name: "Random Spot 5",
        description: "impactful",
        price: 670,
      },
      {
        ownerId: 2,
        address: "83944 Jeromy Isle",
        city: "Belgrade",
        state: "Maine",
        country: "Botswana",
        lat: -47.5909,
        lng: -63.9005,
        name: "Random Spot 6",
        description: "Rial yellow",
        price: 391,
      },
      {
        ownerId: 2,
        address: "6330 Schaden Roads",
        city: "Otisfield",
        state: "Maine",
        country: "Taiwan",
        lat: 68.2095,
        lng: -14.0116,
        name: "Random Spot 7",
        description: "Bedfordshire",
        price: 1000,
      },
      {
        ownerId: 2,
        address: "2471 Estella Inlet",
        city: "Casco",
        state: "Maine",
        country: "Uganda",
        lat: 69.6015,
        lng: -87.2652,
        name: "Random Spot 8",
        description: "Forward",
        price: 1149,
      },
      {
        ownerId: 1,
        address: "880 Ernser Square",
        city: "Lake Arrowhead",
        state: "Maine",
        country: "Angola",
        lat: -39.2543,
        lng: -90.2581,
        name: "Random Spot 9",
        description: "reboot SAS wireless",
        price: 334,
      },
    ];
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
