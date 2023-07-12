const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Token is Invalid" };
    } else {
      const decodeToken = jwt.verify(access_token, process.env.SECRETKEY);
      const user = await User.findByPk(decodeToken.id);
      if (!user) {
        throw { name: "Token is Invalid" };
      } else {
        req.user = user;
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { authentication };
