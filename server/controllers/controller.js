const { User, Product, Order } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { hashedPassword } = require("../helpers/jwt");
var easyinvoice = require("easyinvoice");
var fs = require("fs");
var path = require("path");

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
      const order = await Product.findAll();

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
      const filePath = req.query.file;
      res.download(filePath, function (err) {
        if (err) {
          console.error("Failed to download file:", err);
        } else {
          console.log("File downloaded successfully:", filePath);
          // Delete the file after it has been downloaded
          // fs.unlink(filePath, function (err) {
          //   if (err) {
          //     console.error("Failed to delete file:", err);
          //   } else {
          //     console.log("File deleted successfully:", filePath);
          //   }
          // });
        }
      });
    } catch (error) {
      console.log(`Error in function downloadMyReceipt:`, error);
      next(error);
    }
  }

  static async calculateOrderTax(req, res, next) {
    try {
      const products = req.body;

      const basicSalesTaxRate = 10;
      const importDutyRate = 5;

      let totalSalesTax = 0;
      let totalPrice = 0;

      const productSales = [];

      function roundToNearest0_05(value) {
        return Math.ceil(value * 20) / 20;
      }

      for (const product of products) {
        const { id, name, price, quantity, origin, category } = product;

        let isImported = false;
        if (origin === "imported") {
          isImported = true;
        }

        let isExempt = false;
        if (
          category === "Books" ||
          category === "Food" ||
          category === "Medical products"
        ) {
          isExempt = true;
        }

        let salesTax = 0;
        if (!isExempt) {
          salesTax += (price * basicSalesTaxRate) / 100;
        }
        if (isImported) {
          salesTax += (price * importDutyRate) / 100;
        }
        salesTax = roundToNearest0_05(salesTax);

        const productPriceAfterTax = price + salesTax;
        const itemTotal = productPriceAfterTax * quantity;
        totalSalesTax += salesTax * quantity;
        totalPrice += itemTotal;

        const productSale = {
          id,
          name,
          price: productPriceAfterTax.toFixed(2),
          quantity,
          salesTax: salesTax.toFixed(2),
          productPriceAfterTax: (productPriceAfterTax * quantity).toFixed(2),
        };
        productSales.push(productSale);
      }

      const result = {
        productSales,
        salesTaxes: totalSalesTax.toFixed(2),
        totalPrice: totalPrice.toFixed(2),
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async confirmMyOrder(req, res, next) {
    try {
      const { productSales, salesTaxes, totalPrice } = req.body;

      const products = [];

      for (const productSale of productSales) {
        const product = {
          ...productSale,
          description: productSale.name,
          price: Number(productSale.price),
          "tax-rate": Number(productSale.salesTax),
          productPriceAfterTax: Number(productSale.productPriceAfterTax),
        };

        products.push(product);
      }

      const fileName = await Controller.makeAndDownloadPDF(
        products,
        req.user.email
      );
      // for (const product of productSales) {
      //   await Controller.reduceQuantity(product.quantity, product.id);
      // }
      console.log("========berhasil=======");
      res.status(200).json({ success: true, fileName });
    } catch (error) {
      console.log(`Error in function confirmMyOrder : `, error);

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
      console.log(`Error in function reduceQuantity : `, error);
      next(error);
    }
  }

  static async makeAndDownloadPDF(products, email) {
    try {
      console.log(products, email);
      return new Promise((resolve, reject) => {
        var data = {
          customize: {
            //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
          },
          images: {
            // The logo on top of your invoice
            logo: "https://cdn-icons-png.flaticon.com/512/3190/3190628.png",
          },
          // Your own data
          sender: {
            company: "Home Device",
            address: "Sample Street 123",
            zip: "1234 AB",
            city: "Sampletown",
            country: "Samplecountry",
          },
          // Your recipient
          client: {
            company: `${email}`,
            address: "Clientstreet 456",
            zip: "4567 CD",
            city: "Clientcity",
            country: "Clientcountry",
          },
          information: {
            // Invoice number
            number: "2021.0001",
            // Invoice data
            date: "12-07-2023",
            // Invoice due date
            "due-date": "15-07-2023",
          },
          // The products you would like to see on your invoice
          // Total values are being calculated automatically
          products: products,
          // The message you would like to display on the bottom of your invoice
          "bottom-notice": "Kindly pay your invoice within 15 days.",
          // Settings to customize your invoice
          settings: {
            currency: "USD", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
          },
          // Translate your invoice to your preferred language
          translate: {
            // "invoice": "FACTUUR",  // Default to 'INVOICE'
            // "number": "Nummer", // Defaults to 'Number'
          },
        };

        // Generate a dynamic file name based on the current date and time
        var currentDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
        var currentTime = new Date().getTime(); // Current timestamp
        var fileName = `invoice_${currentDate}_${currentTime}.pdf`; // Example: invoice_2023-07-12_1626114759000.pdf

        console.log(`Creating PDF.....`);
        easyinvoice.createInvoice(data, function (result) {
          var pdfData = result.pdf;

          // Save the PDF file on the server
          var filePath = path.join(__dirname, "pdfs", fileName);
          fs.writeFile(filePath, pdfData, "base64", function (err) {
            if (err) {
              console.error("Failed to save PDF file:", err);
              reject(err);
            } else {
              console.log("PDF file saved successfully:", filePath);
              // Send the file path back to the client
              resolve(filePath);
            }
          });
        });

        // console.log(`PDF Created Successfully`);

        // Helper function to convert base64 to Blob
        function b64toBlob(b64Data, contentType) {
          console.log(`Converting base64 to Blob....`);
          contentType = contentType || "";
          var sliceSize = 512;
          var byteCharacters = atob(b64Data);
          var byteArrays = [];

          for (
            var offset = 0;
            offset < byteCharacters.length;
            offset += sliceSize
          ) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
          }

          var blob = new Blob(byteArrays, { type: contentType });
          console.log(`Converting Success!`);
          return blob;
        }
        // console.log(`PDF Converted, ready to sent....`);
      });
    } catch (error) {
      console.log(`Error in function makeAndDownloadPDF : `, error);
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
