const jwt = require("jsonwebtoken");
const messageHelper = require("../helper/message");

const generateToken = (token_params) => {
  //process.env.JWT_SECRET_KEY
  return jwt.sign(token_params, "bezkoder-secret-key", {
    expiresIn: 86400, // 24 hours
  });
};

const validateJwt = (req, res, next) => {
  let response = messageHelper.errorMsgFormat();
  response.data.error = "Unauthorize Access";
  try {
    // console.log('req.headers.authorization ',req.headers.authorization);
    let authHeader = req.headers.authorization;
    if (authHeader) {
      let token = authHeader.split(" ")[1];
      console.log(token);
      jwt.verify(token, "bezkoder-secret-key", function (err, decoded) {
        if (err) {
          return res
            .status(messageHelper.errorCode.unauthorizeAccess)
            .json(messageHelper.preResponse(response));
        } else {
          req.user = decoded;
          console.log("decoded ", decoded);
          next();
        }
      });
    } else {
      return res
        .status(messageHelper.errorCode.unauthorizeAccess)
        .json(messageHelper.preResponse(response));
    }
  } catch (e) {
    response.data.message = e.message;
    return res
      .status(messageHelper.errorCode.unauthorizeAccess)
      .json(messageHelper.preResponse(response));
  }
};

module.exports = { generateToken, validateJwt };
