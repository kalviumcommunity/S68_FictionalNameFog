const { Router } = require("express");
const mongoose = require("mongoose");
const userModel = require("../models/userSchema");

const userRouter = Router();

userRouter.post("/user", async (request, response) => {
    const { name, email, password } = request.body;

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
        return response.status(400).json({
            message: "missing fields found, user cannot be created."
        })
    }

    try {
        const newUser = new userModel({
            name, email, password
        })

        const savedUser = await newUser.save();

        response.status(201).json({
            message: "user created successfully",
            user: savedUser,
        })
    }
    catch (error) {
        console.log(error);
        response.status(500).json({
            message: "failed to delete item",
            error: error.message,
        });
    }
})

userRouter.get("/user", async (request, response) => {
    try {
        const users = await userModel.find();

        response.status(200).json(users);
    } 
    catch (error) {
        console.log(error);
        response.status(500).json({
            message: "failed to fetch items",
            error: error.message,
        });
    }
});


module.exports = userRouter;