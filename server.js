const express = require('express');

const app = express();

const rooms = {
    'rooms': [],
    'messages': ['hello']
};

let users = [{ id: 1, name: 'viktor1' }, { id: 2, name: 'vladimir1' }];

app.get('/rooms', function (req, res) {
    res.json(rooms);
});

app.listen(9999);