const express = require('express');
const cors = require('cors');

const { Database } = require('./database');

const app = express();

app.use(cors());
app.use(express.json());

const port = 3001;

const db = new Database();

app.get('/', (req, res) => {
    res.send({
        message: 'Hello World from Express API backend!',
    });
});

app.post('/save-map', async (req, res) => {
    const result = await db.createMap(req.body);

    if (result.ok) {
        res.send({ ok: true, uuid: result.uuid });
    } else {
        res.send({ ok: false });
    }
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
