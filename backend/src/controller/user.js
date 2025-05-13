const { Router } = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userSchema");
const cookieParser = require("cookie-parser");

const userRouter = Router();
userRouter.use(cookieParser());

require("dotenv").config({
    path: "../config/.env"
})

const JWT_SECRET = process.env.JWT_SECRET;

userRouter.post("/auth/register", async (request, response) => {
    const { name, email, password } = request.body;

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
        return response.status(400).json({
            message: "Missing fields found, user cannot be created."
        });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return response.status(409).json({ message: "user already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();

        response.status(201).json({
            message: "User registered successfully",
            user: { name: savedUser.name, email: savedUser.email },
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            message: "Failed to register user",
            error: error.message,
        });
    }
});

userRouter.post("/auth/login", async (request, response) => {
    const { email, password } = request.body;

    if (!email?.trim() || !password?.trim()) {
        return response.status(400).json({ message: "Missing email or password" });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return response.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        response.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000, // Is one day
        });

        response.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Login failed", error: error.message });
    }
});

// Logout
userRouter.post("/auth/logout", (request, response) => {
    response.clearCookie("token");
    response.status(200).json({ message: "Logout successful" });
});

module.exports = userRouter;
