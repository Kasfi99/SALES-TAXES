var easyinvoice = require("easyinvoice");
var fs = require("fs");
var path = require("path");

var user = {
  id: 1,
  email: "Kasfi@mail.com",
};

var products = [
  {
    quantity: 2,
    description: "Product 1",
    "tax-rate": 6,
    price: 33.87,
  },
  {
    quantity: 4.1,
    description: "Product 2",
    "tax-rate": 6,
    price: 12.34,
  },
  {
    quantity: 4.5678,
    description: "Product 3",
    "tax-rate": 21,
    price: 6324.453456,
  },
];

var data = {
  // Customize enables you to provide your own templates
  // Please review the documentation for instructions and examples
  customize: {
    //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
  },
  images: {
    // The logo on top of your invoice
    logo: "https://png.pngtree.com/png-vector/20190405/ourmid/pngtree-tax-file-document-icon-png-image_913552.jpg",
    // The invoice background
    background: "https://public.easyinvoice.cloud/img/watermark-draft.jpg",
  },
  // Your own data
  sender: {
    company: "Home Device",
    address: "Somewhere in Jakarta",
    zip: "1234 AB",
    city: "Jakarta",
    country: "South Jakarta",
    //"custom1": "custom value 1",
    //"custom2": "custom value 2",
    //"custom3": "custom value 3"
  },
  // Your recipient
  client: {
    company: `${user.email}`,
    address: "Somewhere",
    zip: "4567 CD",
    city: "Depok",
    country: "Somewhere in Depok",
    // "custom1": "custom value 1",
    // "custom2": "custom value 2",
    // "custom3": "custom value 3"
  },
  information: {
    // Invoice number
    number: "2021.0001",
    // Invoice data
    date: "12-12-2021",
    // Invoice due date
    "due-date": "31-12-2021",
  },
  // The products you would like to see on your invoice
  // Total values are being calculated automatically
  products: products,
  // The message you would like to display on the bottom of your invoice
  "bottom-notice": "Kindly pay your invoice within 3 days.",
  // Settings to customize your invoice
  settings: {
    currency: "USD",
  },
  // Translate your invoice to your preferred language
  translate: {},
};

// Generate a dynamic file name based on the current date and time
var currentDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
var currentTime = new Date().getTime(); // Current timestamp
var fileName = `invoice_${currentDate}_${currentTime}.pdf`; // Example: invoice_2023-07-12_1626114759000.pdf
var filePath = path.join("./pdf", fileName); // Specify the path and dynamic file name

// Create your invoice! Easy!
easyinvoice.createInvoice(data, function (result) {
  // The response will contain a base64 encoded PDF file
  var pdfData = result.pdf;

  // Convert the base64 PDF data to a Blob object
  var blob = b64toBlob(pdfData, "application/pdf");

  // Create a temporary download link
  var link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;

  // Trigger the download
  link.click();

  // Cleanup: Revoke the object URL
  window.URL.revokeObjectURL(link.href);
});

// Helper function to convert base64 to Blob
function b64toBlob(b64Data, contentType) {
  contentType = contentType || "";
  var sliceSize = 512;
  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);
    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
}
