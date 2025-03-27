const { Router } = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userModel = require("../models/userSchema");
const cookieParser = require("cookie-parser");

const userRouter = Router();
userRouter.use(cookieParser());

// User Registration
userRouter.post("/user", async (request, response) => {
    const { name, email, password } = request.body;

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
        return response.status(400).json({
            message: "Missing fields found, user cannot be created."
        });
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        response.status(201).json({
            message: "User created successfully",
            user: savedUser,
        });
    } 
    catch (error) {
        console.log(error);
        response.status(500).json({
            message: "Failed to create user",
            error: error.message,
        });
    }
});

// Login Endpoint
userRouter.post("/login", async (request, response) => {
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

        response.cookie("username", user.name, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000,
        });

        response.status(200).json({ message: "Login successful" });
    } 
    catch (error) {
        console.log(error);
        response.status(500).json({ message: "Login failed", error: error.message });
    }
});

// Logout Endpoint
userRouter.post("/logout", (request, response) => {
    response.clearCookie("username");
    response.status(200).json({ message: "Logout successful" });
});

module.exports = userRouter;
