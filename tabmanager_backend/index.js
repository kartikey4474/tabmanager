const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
const db = require('./queries');
const app = express();
const port = 3000;
app.use(bodyParser.json());
const Pool = require('pg').Pool

db.pool.query("CREATE TABLE IF NOT EXISTS links (ID SERIAL PRIMARY KEY, title TEXT, category VARCHAR(30), link TEXT);")
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(express.static(path.join(__dirname, 'flutter_build')));

app.get('/', (req, res) => {
    res.send("online");
});

app.get('/links', db.getLinks);

app.get('/links/:id', db.getLinkById);

app.post('/links', db.createLink);

app.put('/links/:id', db.updateLink);

app.delete('/links/:id', db.deleteLink);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
