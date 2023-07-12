const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const dotenv = require("dotenv");

const router = require("./routers");

dotenv.config();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`We are in the planet no... ${port}`);
});
