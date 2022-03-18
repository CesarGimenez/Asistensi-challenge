const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generatejwt");

const userCtrl = {};

userCtrl.addUser = async (req, res) => {
  try {
    const { first_name, last_name, dni, sex, phone, status, email, password } =
      req.body;

    const newUser = new User({
      first_name,
      last_name,
      dni,
      sex,
      phone,
      status,
      email,
    });

    const salt = bcryptjs.genSaltSync(10);
    newUser.password = bcryptjs.hashSync(password, salt);

    await newUser.save();
    return res.json({ newUser });
  } catch (error) {
    return res.status(500).json({
      msg: "Error in server",
    });
  }
};

userCtrl.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json({ users });
  } catch (error) {
    return res.status(500).json({
      msg: "Error in server",
    });
  }
};

userCtrl.getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const userDetail = await User.findById(id);
    if (!userDetail)
      return res.json({
        msg: "User not found",
      });
    return res.json({ userDetail });
  } catch (error) {
    return res.status(500).json({
      msg: "Error in server",
    });
  }
};

userCtrl.editUser = async (req, res) => {
  try {
    const { first_name, last_name, dni, sex, phone, status, email, password } =
      req.body;
    const { id } = req.params;
    const updateUser = {
      first_name,
      last_name,
      dni,
      sex,
      phone,
      status,
      email,
    };

    const salt = bcryptjs.genSaltSync(10);
    updateUser.password = bcryptjs.hashSync(password, salt);

    const userEdit = await User.findByIdAndUpdate(
      id,
      { $set: updateUser },
      { new: true }
    );
    if (!userEdit) return res.json({ msg: "User not found" });
    return res.json({ userEdit });
  } catch (error) {
    return res.status(500).json({
      msg: "Error in server",
    });
  }
};

userCtrl.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userDelete = await User.findByIdAndDelete(id);
    if (!userDelete)
      return (
        res,
        json({
          msg: "User not found",
        })
      );
    return res.json({ userDelete });
  } catch (error) {
    return res.status(500).json({
      msg: "Error in server",
    });
  }
};

userCtrl.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        msg: "Error in email or password",
      });
    }
    const validPass = bcryptjs.compareSync(password, user.password);
    if (!validPass) {
      return res.status(400).json({
        msg: "Error in email or password",
      });
    }
    const token = await generateJWT(user);
    return res.json({
      token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error in server",
    });
  }
};

userCtrl.filterUsersBySexAndStatus = async (req, res) => {
  try {
    const body = {
      status: "Pending",
      sex: "Male",
    };
    const usersFound = await User.find(body);
    if (!usersFound) {
      return res.json({
        msg: "Users not found",
      });
    }
    return res.json({
      usersFound,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Error in server" });
  }
};

module.exports = userCtrl;
