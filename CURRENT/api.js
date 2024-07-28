const express = require('express');
const cors = require('cors');

const { Database } = require('./database');
const { searchLinder } = require('./new_graph');

const app = express();

var corsOptions = {
    origin: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost'); // update to match the domain you will make the request from
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept'
//     );
//     next();
// });

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

app.post('/update-map', async (req, res) => {
    const result = await db.updateMap(req.body.uuid, req.body.updatedMap);

    if (result.ok) {
        res.send({ ok: true, uuid: result.uuid });
    } else {
        res.send({ ok: false });
    }
});

app.post('/find-map', async (req, res) => {
    const result = await db.updateMap(req.body.uuid);

    if (result.ok) {
        res.send({ ok: true, uuid: result.uuid });
    } else {
        res.send({ ok: false });
    }
});

app.post('/delete-map', (req, res) => {
    res.send({
        ok: true,
    });
});

app.get('/get-path', async (req, res) => {
    const result = await db.findMap({ uuid: req.query.uuid });
    res.send({
        path: searchLinder(result.res.data, req.query.start, req.query.finish),
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
