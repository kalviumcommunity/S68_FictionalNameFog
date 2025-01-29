const express = require('express');
const app = express();

require("dotenv").config();

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/ping', (request, response) => {
    response.send('Hello there');
});

