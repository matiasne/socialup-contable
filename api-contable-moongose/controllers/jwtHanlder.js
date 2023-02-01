var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "SocialUp";

exports.createToken = function (user) {
  var payload = {
    sub: user._id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
    iat: moment().unix(),
    exp: moment().add(30, "days").unix,
  };

  return jwt.encode(payload, secret);
};

exports.getDataToken = function (token) {
  return jwt.decode(token, secret);
};
