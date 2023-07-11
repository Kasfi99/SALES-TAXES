function calculateSalesTax(products) {
  // Get the basic sales tax rate.
  const basicSalesTaxRate = 10;

  // Get the import duty rate.
  const importDutyRate = 5;

  // Initialize the total sales tax.
  let totalSalesTax = 0;

  // Initialize the product sales array.
  const productSales = [];

  // Initialize the total Price
  let totalPrice = 0;

  // Iterate over the products.
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
    product.salesTax = salesTax; // Store the sales tax as a property in the product object
    productSales.push({
      name: product.name,
      price: product.price,
      salesTax: salesTax,
      productPriceAfterTax: product.price + salesTax,
    });
  }

  // Create an object with the three returns.

  console.log(totalPrice, "NAN <<<<<<<<<<<");
  const result = {
    productSales: productSales,
    salesTaxes: totalSalesTax,
    totalPrice,
  };

  // Return the object.
  return result;
}

// Rest of the code remains the same...

// Rest of the code remains the same...

// Create an array of products.
const products = [
  {
    name: "book",
    price: 12.5,
    origin: "domestic",
    category: "Books",
  },
  {
    name: "music CD",
    price: 14.0,
    origin: "domestic",
    category: "Entertainment",
  },
  {
    name: "chocolate bar",
    price: 0.85,
    origin: "domestic",
    category: "Food",
  },
  {
    name: "imported box of chocolates",
    price: 10.0,
    origin: "imported",
    category: "Food",
  },
  {
    name: "imported bottle of perfume",
    price: 47.5,
    origin: "imported",
    category: "Personal care",
  },
  {
    name: "bottle of perfume",
    price: 20.0,
    origin: "domestic",
    category: "Personal care",
  },
  {
    name: "packet of headache pills",
    price: 9.75,
    origin: "domestic",
    category: "Medical products",
  },
  {
    name: "imported box of chocolates",
    price: 11.25,
    origin: "imported",
    category: "Food",
  },
];

// Calculate the sales tax and total price after taxes.
const result = calculateSalesTax(products);

// Print the product sales.
console.log("Product sales:", result.productSales);

// Print the sales taxes.
console.log("Sales taxes:", result.salesTaxes);

// Print the total price After taxes.
console.log("Total Price:", result.totalPrice);
