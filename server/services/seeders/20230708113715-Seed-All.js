"use strict";
const { hashedPassword } = require("../helpers/jwt");
/** @type {import('sequelize-cli').Migration} */
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
    const mockData = require("../database/mockData.json");

    const users = mockData.Users.map((user) => {
      const hashed = hashedPassword(user.password);
      return {
        email: user.email,
        password: hashed,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    const products = mockData.Products.map((product) => {
      return {
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        origin: product.origin,
        category: product.category,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    const orders = mockData.Orders.map((order) => {
      return {
        UserId: order.UserId,
        ProductId: order.ProductId,
        receiptLink: order.ReceiptLink,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert("Users", users, {});
    await queryInterface.bulkInsert("Products", products, {});
    await queryInterface.bulkInsert("Orders", orders, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Products", null, {});
    await queryInterface.bulkDelete("Orders", null, {});
  },
};
