const express = require('express');
const cors = require('cors');

const { Database } = require('./database').Database;

const app = express();

app.use(cors());

const port = 3001;

app.post('/', (req, res) => {
    console.log(req.body);
    res.send({
        message: 'Hello World from Express API backend!',
    });
});

app.post('/save-map', (req, res) => {
    res.send({
        message: 'Saving Map!',
    });
});

app.post('/update-map', (req, res) => {
    res.send({
        message: 'Updating Map!',
    });
});

app.post('/delete-map', (req, res) => {
    res.sendFile({
        message: 'Deleting Map!',
    });
});

app.get('/get-path', (req, res) => {
    res.send({
        message: 'Getting Path!',
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
