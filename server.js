const express = require('express');

const app = express();

const rooms = {
    'rooms': [],
    'messages': ['hello']
};

let users = [{ id: 1, name: 'viktor' }, { id: 2, name: 'vladimir' }];

app.get('/rooms', function (req, res) {
    res.json(rooms);
});

app.listen(9999);