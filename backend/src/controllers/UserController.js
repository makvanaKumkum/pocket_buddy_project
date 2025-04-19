const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailUtil = require("../utils/MailUtil");

const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const foundUserFromEmail = await userModel
      .findOne({ email: email })
      .populate("roleId");

    if (foundUserFromEmail != null) {
      const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);

      if (isMatch) {
        res.status(200).json({
          message: "login success",
          data: foundUserFromEmail,
        });
      } else {
        res.status(400).json({
          message: "invalid credentials",
        });
      }
    } else {
      res.status(404).json({
        message: "Email not found..",
      });
    }
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const signup = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;
    const createdUser = await userModel.create(req.body);

    await mailUtil.sendingMail(
      createdUser.email,
      "welcome to pocket buddy",
      "this is welcome mail"
    );

    res.status(201).json({
      message: "user created..",
      data: createdUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "error",
      data: err,
    });
  }
};

const addUser = async (req, res) => {
  const savedUser = await userModel.create(req.body);
  res.json({
    message: "User Saved Successfully",
    data: savedUser,
  });
};

const getAllUsers = async (req, res) => {
  const users = await userModel.find().populate("roleId");
  res.status(200).json({
    message: "User fetched successfully..",
    data: users,
  });
};

const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const foundUser = await userModel.findById(id);
    if (!foundUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User fetched successfully..",
      data: foundUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching user",
    });
  }
};

const deleteUserById = async (req, res) => {
  const deletedUser = await userModel.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "user deleted Successfully..",
    data: deletedUser,
  });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const foundUser = await userModel.findOne({ email });

    if (!foundUser) {
      return res.status(404).json({
        message: "User not found. Please register first.",
      });
    }

    const mailContent = `
      <html>
        <body>
          <p>Please contact support to reset your password.</p>
        </body>
      </html>`;

    await mailUtil.sendingMail(
      foundUser.email,
      "Reset Your Pocket Buddy Password",
      mailContent
    );

    res.status(200).json({
      message: "Reset password instructions sent to your email.",
    });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};

const resetPassword = async (req, res) => {
  const { userId, password } = req.body;

  try {
    if (!userId || !password) {
      return res.status(400).json({
        message: "User ID and new password are required.",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const updatedUser = await userModel.findByIdAndUpdate(userId, {
      password: hashedPassword,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "Password updated successfully.",
    });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  signup,
  loginUser,
  forgotPassword,
  resetPassword,
};
