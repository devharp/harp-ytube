const express = require("express");
const path = require('path');
const ytsearch = require('./modules/youtubesearch');
const HTTP_PORT = 3000;

const app = express();
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.text());

app.post('/query', (req, res) => {
    const payload = req.body;
    console.log('user requested: ', payload);
    ytsearch.getResults(payload)
        .then((results) => {
            res.send(results).end();
            return;
        })
        .catch((error) => {
            console.error(error);
            res.sendStatus(500).end();
            return;
        });

});

app.listen(HTTP_PORT, () => {
    console.log('Server started on port: ', HTTP_PORT);
});