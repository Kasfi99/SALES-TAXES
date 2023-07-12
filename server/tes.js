function calculateOrderTax(product) {
  const products = product;
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
  return result;
}

// Example usage:
const input1 = [
  {
    id: 1,
    name: "book",
    price: 12.49,
    quantity: 1,
    origin: "",
    category: "Books",
  },
  {
    id: 2,
    name: "music CD",
    price: 14.99,
    quantity: 1,
    origin: "",
    category: "",
  },
  {
    id: 3,
    name: "chocolate bar",
    price: 0.85,
    quantity: 1,
    origin: "",
    category: "",
  },
];
const input2 = [
  {
    id: 1,
    name: "imported box of chocolates",
    price: 10.0,
    quantity: 1,
    origin: "imported",
    category: "",
  },
  {
    id: 2,
    name: "imported bottle of perfume",
    price: 47.5,
    quantity: 1,
    origin: "imported",
    category: "",
  },
];
const input3 = [
  {
    id: 1,
    name: "imported bottle of perfume",
    price: 27.99,
    quantity: 1,
    origin: "imported",
    category: "",
  },
  {
    id: 2,
    name: "bottle of perfume",
    price: 18.99,
    quantity: 1,
    origin: "",
    category: "",
  },
  {
    id: 3,
    name: "packet of headache pills",
    price: 9.75,
    quantity: 1,
    origin: "",
    category: "Medical products",
  },
  {
    id: 4,
    name: "box of imported chocolates",
    price: 11.25,
    quantity: 1,
    origin: "imported",
    category: "",
  },
];
const output1 = calculateOrderTax(input1);
console.log(output1);
const output2 = calculateOrderTax(input2);
console.log(output2);
const output3 = calculateOrderTax(input3);
console.log(output3);
