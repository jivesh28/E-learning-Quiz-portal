import express from "express";
import { protect } from "../middlewares/authMiddlewares";
import Results from "../models/Results";
const router = express.Router();

// user details
router.get("/details", protect, async (req, res) => {
  try {
    // Assuming req.user is populated by the protect middleware
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
        _id: user._id,
        message: "User details fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update user details
router.put("/update", protect, async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, email } = req.body;

    // Update user details
    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.json({
      message: "User details updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        message: "User details updated successfully",
      },
    });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// see result of past quizes, results are stored in the Results 
router.get("/results", protect, async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //  results are stored in a Results  and linked to the user
    const results = await Results.find({ userId: user._id });

    res.json({
      message: "User results fetched successfully",
      results,
    });
  } catch (error) {
    console.error("Error fetching user results:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//most missed questions by students in a quiz
router.get("/most-missed", protect, async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // have to create  get most missed questions
    

    res.json({
      message: "Most missed questions fetched successfully",
      questions: mostMissedQuestions,
    });
  } catch (error) {
    console.error("Error fetching most missed questions:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// avg score of all students in a quiz


module.exports = router;