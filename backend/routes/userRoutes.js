import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { errorHandler } from "../middleware/errorMiddleware.js";

const router = express.Router();

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
router.get("/", protect, admin, (req, res) =>
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);

//@desc     Auth the user and get a token
//@route    Post /api/users/login
//@access   Public
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  })
);

//@desc     Get user Profile
//@route    Get /api/users/profile
//@access   Private
router.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = req.user;
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
  })
);

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc     Register a new user
//@route    Post /api/users
//@access   Public
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExits = await User.findOne({ email: email });
    if (userExits) {
      res.status(400);
      throw new Error("User already exists");
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      res.status(401).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  })
);

//@desc     Update user Profile
//@route     /api/users/profile
//@access   Private
router.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || req.user.name;
      user.email = req.body.email || req.user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
  })
);

export default router;
