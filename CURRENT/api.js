const express = require('express');
const cors = require('cors');

const { Database } = require('./database').Database;

const app = express();

app.use(cors());

const port = 3001;

app.get('/', (req, res) => {
    res.send({
        message: 'Hello World from Express API backend!',
    });
});

app.get('/save-map', (req, res) => {
    res.send({
        message: 'Saving Map!',
    });
});

app.get('/update-path', (req, res) => {
    res.send({
        message: 'Updating Path!',
    });
});

app.get('/get-path', (req, res) => {
    res.send({
        message: 'Getting Path!',
    });
});

app.get('/delete-path', (req, res) => {
    res.sendFile({
        message: 'Hello World from Express API backend!',
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
