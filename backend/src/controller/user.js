const { Router } = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userModel = require("../models/userSchema");

const userRouter = Router();

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
    } catch (error) {
        console.log(error);
        response.status(500).json({
            message: "Failed to create user",
            error: error.message,
        });
    }
});

module.exports = userRouter;
