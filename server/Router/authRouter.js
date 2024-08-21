import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { auth } from "../models/auth.js";
import secretToken from "../controller/SecretToken.js";
const app = express.Router();

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const user = await auth.create({ name, email, password: hashedPassword });

    // generate token
    const token = secretToken(user._id);
    res.cookie("token", token, {
      httpOnly: false,
    });

    res.status(201).json({ message: "User signed up successfully", user });
  } catch (err) {
    console.error("Error during user registration:", err);
    res.status(500).json({ message: err.message });
  }
});
// Login

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await auth.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const token = secretToken(user._id);
    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "An error occurred" });
  }
});

// verify user  in token
export const verifyUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      try {
        const user = await auth.findById(data.id);
        if (user) {
          req.user = user; // Attach user data to the request object
          next(); // Continue to the next middleware or route handler
        } else {
          return res.status(404).json({ message: "User not found" });
        }
      } catch (err) {
        return res.status(500).json({ message: "Server error" });
      }
    }
  });
};
export { app as useRouter };
