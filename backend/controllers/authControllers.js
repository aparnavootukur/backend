const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../utils/token");
const { validateEmail } = require("../utils/validation");


exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ 
        statusCose:400,
        msg: "Please fill all the fields" });
    }
    if (typeof username !== "string" || typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ 
        statusCose:400,
        msg: "Please send string values only" });
    }


    if (password.length < 4) {
      return res.status(400).json({ 
        statusCode:400,
        msg: "Password length must be atleast 4 characters" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        statusCose:400,
         msg: "Invalid Email" });
    }

    const user = await User.findOne({where:{ email }});
    if (user) {
      return res.status(400).json({ 
        statusCose:400,
        msg: "This email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });
    res.status(200).json({ 
      statusCose:200,
      msg: "Congratulations!! Account has been created for you.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: false, msg: "Please enter all details!!" });
    }

    const user = await User.findOne({where:{ email }});
    if (!user) return res.status(400).json({ status: false, msg: "This email is not registered!!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ status: false, msg: "Password incorrect!!" });

    const token = createAccessToken({ id: user.id });
    delete user.password;
    const {id,username}=user
    res.status(200).json({ id,username,token, status: true, msg: "Login successful" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}
