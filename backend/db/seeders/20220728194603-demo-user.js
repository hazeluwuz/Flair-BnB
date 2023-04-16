"use strict";
const bcrypt = require("bcryptjs");
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

    options.tableName = "Users";

    await queryInterface.bulkInsert(options, [
      {
        firstName: "First1",
        lastName: "Last1",
        email: "demo@user.io",
        username: "demo1",
        hashedPassword: bcrypt.hashSync("password"),
      },
      {
        firstName: "First2",
        lastName: "Last2",
        email: "demo2@user.io",
        username: "demo2",
        hashedPassword: bcrypt.hashSync("password2"),
      },
      {
        firstName: "First3",
        lastName: "Last3",
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
    options.tableName = "Users";
    await queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: ["demo1", "demo2", "demo3"],
        },
      },
      {}
    );
  },
};
