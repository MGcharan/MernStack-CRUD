import express from "express";
import User from "../models/model.js";
import { verifyUser } from "./authRouter.js";
const router = express.Router();

router.post("/createUser", verifyUser, async (req, res) => {
  try {
    const userData = new User(req.body);
    await userData.save();
    res
      .status(201)
      .json({ message: " user details added successfully", userData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get method
router.get("/getUser", async (req, res) => {
  try {
    const userData = await User.find({});
    res.status(201).json(userData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// router.get("/phoneID/:id", async (req, res) => {
//   try {
//     const userDataId = await User.findById(req.params.id);
//     res.status(201).json(userDataId);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

router.put("/updateUser/:id", async (req, res) => {
  try {
    const updatedData = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json(updatedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const deleteData = await User.findByIdAndDelete(req.params.id);
    if (!deleteData) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User delete successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
