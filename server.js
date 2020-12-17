const express = require('express');

const app = express();

const rooms = {
    rooms: [],
    messages: ['hello1'],
};


app.get('/rooms', (req, res) => {
    res.json(rooms);
});

app.listen(9999, (err) => {
    if (err) {
        throw err;
    }
    console.log('Server started')
});