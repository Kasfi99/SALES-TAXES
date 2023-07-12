const bcrypt = require("bcryptjs");

const hashedPassword = (password) => {
  return bcrypt.hashSync(password);
};

module.exports = { hashedPassword };
