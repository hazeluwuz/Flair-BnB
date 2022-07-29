"use strict";
const bcrypt = require("bcryptjs");

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
    await queryInterface.bulkInsert("Users", [
      {
        email: "demo@user.io",
        username: "demo1",
        hashedPassword: bcrypt.hashSync("password"),
      },
      {
        email: "demo2@user.io",
        username: "demo2",
        hashedPassword: bcrypt.hashSync("password2"),
      },
      {
        email: "demo3@user.io",
        username: "demo3",
        hashedPassword: bcrypt.hashSync("password3"),
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
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      "Users",
      {
        username: {
          [Op.in]: ["demo1", "demo2", "demo3"],
        },
      },
      {}
    );
  },
};
