const express = require("express");
const router = express.Router();
import { protect, isAdmin } from "../middlewares/authMiddlewares";
const User = require("../models/User"); 

// dsec admin details
// route protected

router.get("/details", protect, isAdmin ,(req, res) => {
  // Assuming req.user is populated by the protect middleware
  const user = req.user;

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  res.json({
    message: "Welcome to the admin dashboard",
    user: {
      _id: user._id,
      //   name: user.name,
      //   email: user.email,
      role: user.role,
    },
  });
});

// Get all users
router.get("/users", (req, res) => {
  // Assuming req.user is populated by the protect middleware
  const user = req.user;

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  // Fetch all users from the database
  User.find({}, "-password")
    .then((users) => {
      res.json({
        message: "Users fetched successfully",
        users: users,
      });
    })
    .catch((err) => {
      console.error("Error fetching users:", err);
      res.status(500).json({ message: "Server error" });
    });
});

// get specific user results
router.get("/user/:id", protect, isAdmin, async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User data fetched successfully",
      user: {
        _id: user._id,
        //   name: user.name,
        //   email: user.email,
        
      },
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a user
router.delete("/user/:id", protect, isAdmin, async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Update user role
router.put("/user/:id/role", protect, isAdmin, async (req, res) => {
  const userId = req.params.id;
  const { role } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.role = role; // Update the user's role
    await user.save();
    res.json({ message: "User role updated successfully", user: { _id: user._id, role: user.role } });  
    } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Server error" });  
    }
});


// create a  quiz
router.post("/create-quiz", protect, isAdmin, async (req, res) => {
  const { title, description, questions } = req.body;

  try {
    // Validate input
    if (!title || !description || !questions || questions.length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new quiz object
    const quiz = {
      title,
      description,
      questions,
      createdBy: req.user._id,
      createdAt: new Date(),
    };

    // saving questions

    res.status(201).json({ message: "Quiz created successfully", quiz });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// create a question bank after quiz is completed
router.post("/create-question-bank", protect, isAdmin, async (req, res) => {
  const { quizId, questions } = req.body;

  try {
    // Validate input
    if (!quizId || !questions || questions.length === 0) {
      return res.status(400).json({ message: "Quiz ID and questions are required" });
    }

    // we will save the quiz id to the question data base 
    const questionBank = {
      quizId,
      questions,
      createdBy: req.user._id,
      createdAt: new Date(),
    };

    res.status(201).json({ message: "Question bank created successfully", questionBank });
  } catch (error) {
    console.error("Error creating question bank:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
