const express = require('express');
const app = express();
const connectDatabase = require("./src/database/database")

require("dotenv").config({
    path: "./src/config/.env"
});

const port = process.env.port || 3000;
const url = process.env.url;

app.listen(port, async() => {
    try {
        await connectDatabase(url);
        console.log(`Server is running on port ${port}`);
    }
    catch(error) {
        console.log(error)
    }
})

app.get('/ping', (request, response) => {
    response.send('Hello there');
});

