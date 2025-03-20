const { Router } = require('express');
const mongoose = require("mongoose");
const routerModel = require("../models/schema");

const routerMain = Router();

routerMain.post("/", async (request, response) => {
    const {
        name,
        source,
        creator,
        createdBy,
    } = request.body;

    if (!name?.trim() || !source?.trim() || !creator?.trim()) {
        return response.status(400).json({
            message: "missing fields found, information cannot be added."
        })
    }

    try {
        const newItem = new routerModel({
            name,
            source,
            creator,
            createdBy,
        })

        const savedItem = await newItem.save();

        response.status(201).json({
            message: "item created successfully",
            item: savedItem,
        });
    }
    catch (error) {
        console.log(error)

        response.status(500).json({
            message: "failed to create item",
            error: error.message,
        });
    }
})

routerMain.get("/", async (request, response) => {
    try {
        const itemsMain = await routerModel.find();

        response.status(200).json(itemsMain);
    } 
    catch (error) {
        console.log(error);
        response.status(500).json({
            message: "failed to fetch items",
            error: error.message,
        });
    }
});

routerMain.put("/:id", async (request, response) => {
    const { id } = request.params;
    const { name, source, creator, createdBy } = request.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(400).json({
            message: "invalid ID format.",
        });
    }

    if (!name?.trim() && !source?.trim() && !creator?.trim()) {
        return response.status(400).json({
            message: "at least one valid field (name, source, creator) is required to update.",
        });
    }

    try {
        const updatedItem = await routerModel.findByIdAndUpdate(
            id, { name, source, creator, createdBy },
        );

        if (!updatedItem) {
            return response.status(404).json({
                message: "item not found.",
            });
        }

        response.status(200).json({
            message: "item updated successfully",
            item: updatedItem,
        });
    } 
    catch (error) {
        console.log(error);
        response.status(500).json({
            message: "failed to update item",
            error: error.message,
        });
    }
});

routerMain.delete("/:id", async (request, response) => {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(400).json({
            message: "invalid ID format.",
        });
    }

    try {
        const deletedItem = await routerModel.findByIdAndDelete(id);

        if (!deletedItem) {
            return response.status(404).json({
                message: "item not found.",
            });
        }

        response.status(200).json({
            message: "item deleted successfully",
        });
    } 
    catch (error) {
        console.log(error);
        response.status(500).json({
            message: "failed to delete item",
            error: error.message,
        });
    }
});

routerMain.get("/user/:createdBy", async (request, response) => {

    const { createdBy } = request.params;

    try {
        const userEntities = await routerModel.find({ createdBy });
        response.status(200).json(userEntities);
    } 
    catch (error) {
        console.log(error);
        response.status(500).json({
            message: "failed to fetch user's entities",
            error: error.message,
        });
    }
});


module.exports = routerMain;