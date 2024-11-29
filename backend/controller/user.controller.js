import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import asyncHandler from "express-async-handler";

const signin = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;
  if ([username, email, password, role].some((field) => field?.trim() == "")) {
    throw new Error("All fields are required!");
  }

  // to check  username unique constrain
  const userByusername = await User.findOne({ username: username });
  if (userByusername) {
    throw new Error("Username is alredy acquired please try diffrent!");
  }

  // to check email unique constrain
  const userByEmail = await User.findOne({ email: email });
  if (userByusername) {
    throw new Error("Email is alredy register!");
  }

  const newUser = await User.create({
    username,
    email,
    password,
    role,
  });

  if (!newUser) {
    throw new Error("User is not created !");
  }

  return res.status(201).json({ message: "User is Created Successfully!" });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Email and Password are required!");
  }
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new Error("Email is not register with us!");
  }

  const passwordCheck = await user.isPasswordMatch(password);

  if (!passwordCheck) {
    throw new Error(401, "Invalid user credential");
  }

  const accessToken = await user.generateAccessToken();

  const loggedInUser = await User.findById(user._id).select("-password");

  const userTosend = loggedInUser._doc;

  return res.status(200).json({
    data: {
      ...loggedInUser._doc,
      accessToken,
    },
    message: "User logged in successfully",
  });
});

const getAlluser = asyncHandler(async (req, res) => {
  const users = await User.find({});

  return res.status(200).json({
    data: users,
    message: "Fetched all users!",
  });
});

const changeUserRole = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  if (role != "admin") {
    throw new Error("role shopuld be in enunm");
  }

  const user = await User.findOne({
    _id: new mongoose.Types.ObjectId(userId),
  });

  if (!user) {
    throw new Error("user is not exist!");
  }

  if (user.role == "admin") {
    throw new Error("User is also admin you can not change role of it!");
  }

  const updateUser = await User.updateOne(
    {
      _id: new mongoose.Types.ObjectId(userId),
    },
    {
      $set: {
        role: role,
      },
    }
  );

  return res.status(200).json({
    message: "Role is Changed!",
  });
});

export { signin, login, getAlluser, changeUserRole };
