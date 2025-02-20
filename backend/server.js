const express = require('express');
const app = express();
const connectDatabase = require("./src/database/database");
const routerMain = require("./src/controller/routes");

require("dotenv").config({
    path: "./src/config/.env"
});

const port = process.env.port || 3000;
const url = process.env.databaseURL;
let status;

app.listen(port, async() => {
    try {
        await connectDatabase(url);
        console.log(`Server is running on port ${port}`);
        status = "Database connected successfully"
    }
    catch(error) {
        status = "Database not connected"
        console.log(error)
    }
})

// app.get("/", (request, response) => {
//     response.send(status);
// })

app.get('/ping', (request, response) => {
    response.send('Hello there');
});

app.use(express.json());

app.use("/", routerMain);