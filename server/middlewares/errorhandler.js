const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ msg: err.errors[0].message });
      break;
    case "SequelizeValidationError":
      res.status(400).json({ msg: err.errors[0].message });
      break;
    case "Token is Invalid":
      res
        .status(401)
        .json({ message: "Error : Invalid Login or User did not exist" });
      break;
    case "Forbidden":
      res
        .status(403)
        .json({ message: "Error : Forbidden, Can't let you pass, sorry!" });
      break;
    case "Email Not Authentic":
      res.status(401).json({ msg: `Error : Invalid Email` });
      break;
    case "Password Not Authentic":
      res.status(401).json({ msg: `Error : Invalid Password` });
      break;
    case "Error Validated":
      res
        .status(400)
        .json({ msg: `Seems like there's something wrong with your input` });
      break;
    case "JsonWebTokenError":
      res.status(401).json({ msg: `Error : Invalid Sign-in, Web Token Error` });
      break;
    case "Mothersip are currently empty":
      res.status(500).json({ msg: `Error : Database Error, Still Empty` });
      break;
    default:
      res.status(500).json({ msg: `Error : ${err}` });
      break;
  }
};

module.exports = errorHandler;
