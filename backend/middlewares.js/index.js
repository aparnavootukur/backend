const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { ACCESS_TOKEN_SECRET } = process.env;


exports.verifyAccessToken = async (req, res, next) => {

  const auth_token = req.header("Authorization");
  const token=auth_token
  if (!token) return res.status(400).json({ status: false, msg: "Token not found" });
  let user;
  try {
    user = jwt.verify(token, "jwt_secret_key");
    console.log(user,'555')
  }
  catch (err) {
    return res.status(401).json({ status: false, msg: "Invalid token" });
  }

  try {
    user = await User.findOne({where:{id:user.id}});
    if (!user) {
      return res.status(401).json({ status: false, msg: "User not found" });
    }

    req.user = user;
    next();
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}