const { User, Product, Order } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { hashedPassword } = require("../helpers/jwt");

class Controller {
  static async SignUp(req, res, next) {
    try {
      let password = hashedPassword(req.body.password);
      let user = await User.create({
        email: req.body.email,
        password: password,
      });
      var token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.SECRETKEY
      );
      res.status(200).json({
        access_token: token,
        email: user.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async SignIn(req, res, next) {
    try {
      let user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!user) {
        throw { name: `Email Not Authentic` };
      } else {
        let validPassword = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!validPassword) {
          throw { name: `Password Not Authentic` };
        } else {
          var token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.SECRETKEY
          );
          res.status(200).json({
            access_token: token,
            email: user.email,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  static async getMyOrder(req, res, next) {
    try {
      const order = await Order.findAll({
        include: [
          {
            model: User,
            attributes: ["email"],
          },
          {
            model: Product,
          },
        ],
      });

      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }

  static async getOrderDetail(req, res, next) {
    try {
      const { id, UserId } = req.body;

      if (UserId === req.user.id) {
        const myOrder = await Order.findByPk({
          where: { id },
          include: Product,
        });

        if (myOrder) {
          res.status(200).json(myOrder);
        }
      } else {
        throw { name: `Unauthorized` };
      }
    } catch (error) {
      next(error);
    }
  }

  static async downloadMyReceipt(req, res, next) {
    try {
      const { id, UserId } = req.body;

      if (UserId === req.user.id) {
        const Receipt = await Order.findByPk(id);

        const link = Receipt.receiptLink;

        res.status(200).json(link);
      } else {
        throw { name: `Unauthorized` };
      }
    } catch (error) {
      next(error);
    }
  }

  static async calculateOrderTax(req, res, next) {
    try {
      const { products } = req.body;

      const basicSalesTaxRate = 10;
      const importDutyRate = 5;
      let totalSalesTax = 0;
      const productSales = [];
      let totalPrice = 0;

      for (const product of products) {
        // Check if the product is imported.
        const isImported = product.origin === "imported";

        // Check if the product is exempt from sales tax.
        const isExempt =
          product.category === "Books" ||
          product.category === "Food" ||
          product.category === "Medical products";

        // Calculate the sales tax for the product.
        let salesTax = 0;
        if (!isExempt) {
          if (!isImported) {
            // The product is not imported, so only apply the basic sales tax.
            salesTax = (product.price * basicSalesTaxRate) / 100;
          } else {
            // The product is imported, so apply both the basic sales tax and the import duty.
            salesTax =
              (product.price * basicSalesTaxRate) / 100 +
              (product.price * importDutyRate) / 100;
          }
        }

        // Add the sales tax for the product to the total sales tax.
        totalSalesTax += salesTax;

        totalPrice += product.price + salesTax;
        // Add the product details to the product sales array.
        product.salesTax = salesTax;
        productSales.push({
          name: product.name,
          price: product.price,
          salesTax: salesTax,
          productPriceAfterTax: product.price + salesTax,
        });
      }

      const result = {
        productSales: productSales,
        salesTaxes: totalSalesTax,
        totalPrice,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async confirmMyOrder(req, res, next) {
    try {
      const { products } = req.body;

      for (const product of products) {
        await this.reduceQuantity(product.quantity, product.id);
      }

      //Need to add receipt printable prove
      res.status(200).json("success");
    } catch (error) {
      next(error);
    }
  }

  static async reduceQuantity(quantity, id) {
    try {
      const reduceQuantity = Product.decrement("quantity", {
        by: quantity,
        where: { id },
      });
    } catch (error) {
      next(error);
    }
  }

  static async MakeMyOrder(req, res, next) {
    try {
      const { name, quantity, price } = req.body;

      const id = req.user.id;

      const product = await Product.create({
        name,
        quantity,
        price,
      });

      if (!product) {
        throw { msg: `Product can't be registered` };
      } else {
        const order = await Order.create({
          UserId: id,
          ProductId: product.id,
        });

        res.status(201).json({ product, order });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
