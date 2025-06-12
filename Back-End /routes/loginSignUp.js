import express from "express";
import User from "../models/User";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
    }
    // If the user is already verified
    return res.status(400).json({
      message: "User already exists.",
    });

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // console.log("Login attempt:", email, password);

  try {
    const user = await User.findOne({ email });
    // console.log("User found:", user);

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (!user) {
      return res
        .status(403)
        .json({ message: "User note found" });
    }
    res.json({
      _id: user._id,
    //   name: user.name,
    //   email: user.email,
    //   token: generateToken(user._id),
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
