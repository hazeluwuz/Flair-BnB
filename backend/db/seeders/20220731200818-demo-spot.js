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
        name: "Blue Breeze - Spacious lakefront w/ private beach",
        description:
          "This huge lakeside house is a great experience for all of your friends and family to enjoy all the New Hampshire lakes region has to offer. There is incredible nature all around!",
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
        name: "SkyView Treehouse- Luxury Waterfront Retreat",
        description:
          "With direct access to Belgrade stream & Messalonskee lake, this treehouse is nestled within the pine trees on the waterfront of Belgrade Stream.",
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
        name: "Lakefront home │3BR 2BA│Gameroom │ Firepit│ Garage",
        description:
          "Want that 'Ahh' feeling that only comes from kicking back by the lake? This is just the right place to give you that: beautiful views, your own private beach and dock, abundant wildlife, fishing, boating, swimming and more!",
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
        name: "Lake or Ski Condo, close to Gunstock and the Lake",
        description:
          "Location and Amenities! 10 min from Gunstock, couple hundred yards from the Lake, 50 yards from Gilford concert stage and the back entrance.",
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
        name: "MoonLight Treehouse- Luxury Waterfront Escape",
        description:
          "The luxurious MoonLight treehouse a stunning retreat nestled within the pine trees just behind the waterfront of Belgrade Stream. ",
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
        name: "SWE175Wfa - Great Lake Winni Waterfront Home",
        description:
          "Spend a week at 'WeSeekANook' and you'll never want to go home! This awesome water front vacation home on Lake Winnipesaukee has all the charm and modern updates you could wish for.",
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
        name: "Sunset Chalet- Stylish Waterfront Gem",
        description:
          "This lakefront rustic chalet with direct access to Messalonskee Lake, features Knotty Pine, gas fireplace, room enough for 4 adults and high beamed ceilings. ",
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
        name: "Luxury Lakefront Home on gated 155 Private Acres",
        description:
          "Stay where Country Music Star Luke Bryan chose to spend his 40th Birthday! Year-round vacation home. Great for Families, Friends, and Office Retreats!",
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
        name: "Nicest Lake House in Maine. Private Beach!",
        description:
          "Crescent Lake is situated in the beautiful Sebago Lakes Region and this elegant, modern home is located on the desirable northern shore of the lake. This smaller, quieter lake is suitable for children of all ages.",
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
        name: "Cozy and Quiet Cottage on Lake Arrowhead",
        description:
          "Enjoy your stay in North Waterboro, Maine on Lake Arrowhead! A perfect destination for adventure seekers and outdoor enthusiasts!",
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
