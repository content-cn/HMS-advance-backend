const User = require('../Models/authmodels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { signupMessage } = require("../config/email");
// const {signupMessage} = r
// const nodemailer = require('nodemailer');

// Secret key for JWT
const SECRET_KEY = process.env.JWT_SECRET;


// User Signup Controller
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash password before saving
        // const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password });
        await newUser.save();
        await signupMessage(email,name)
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Something went wrong", error });
    }
};

// User Signin Controller
const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Received Body:", req.body);

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the required fields!" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log("userfound",user)
        console.log("Comparing password:", password, "with hash:", user.password);
        // Compare hashed password
        const isPasswordValid = await bcrypt.compare(password.toString(), user.password);
        console.log("Password comparison result:", isPasswordValid);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        console.log("password match")

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
        console.log("token generated")

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { signup, signin };
