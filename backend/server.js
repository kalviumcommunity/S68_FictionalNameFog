const express = require('express');
const app = express();
const connectDatabase = require("./src/database/database")

require("dotenv").config({
    path: "./src/config/.env"
});

const port = process.env.port || 3000;
const url = process.env.url;
let status = "Database not connected";

app.listen(port, async() => {
    try {
        await connectDatabase(url);
        console.log(`Server is running on port ${port}`);
        status = "Database connected successfully"
    }
    catch(error) {
        console.log(error)
    }
})

app.get("/", (request, response) => {
    response.send(status);
})

app.get('/ping', (request, response) => {
    response.send('Hello there');
});

