const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

const rooms = new Map();
rooms.set(
  "1",
  new Map([
    ['users', new Map()],
    ['messages', []],
  ]),
);
rooms.set(
  "2",
  new Map([
    ['users', new Map()],
    ['messages', []],
  ]),
);
app.use(express.json());

app.get('/rooms/:id', (req, res) => {
  const { id: roomId } = req.params;
  const obj = rooms.has(roomId)
    ? {
      users: [...rooms.get(roomId).get('users').values()],
      messages: [...rooms.get(roomId).get('messages').values()],
    }
    : { users: [], messages: [] };
  res.json(obj);
});


app.get('/get_rooms', (req, res) => {
  res.json([...rooms.keys()]);
});


app.post('/rooms', (req, res) => {
  const { roomId, userName } = req.body;
  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ['users', new Map()],
        ['messages', []],
      ]),
    );
  }
  res.send();
})

io.on('connection', (socket) => {
  socket.on('ROOM:JOIN', ({ roomId, userName }) => {
    socket.join(roomId);
    rooms.get(roomId).get('users').set(socket.id, userName);
    const users = [...rooms.get(roomId).get('users').values()];
    const messages = [...rooms.get(roomId).get('messages').values()]
    socket.to(roomId).broadcast.emit('ROOM:JOINED', users);
    socket.emit('ROOM:SET_USERS', users);
  })
  socket.on('ROOM:NEW_MESSAGE', ({ roomId, userName, text, time }) => {
    const obj = {
      userName,
      text,
      time,
    };
    rooms.get(roomId).get('messages').push(obj);
    socket.to(roomId).broadcast.emit('ROOM:NEW_MESSAGE', obj);
  });
  socket.on('ROOM:REFRESH', (roomarr) => (
    roomarr.map((room) => {
      const users = [...rooms.get(room).get('users').values()];
      socket.to(room).broadcast.emit('ROOM:USERS_REFRESH', users);
    }
  )))

  socket.on('disconnect', () => {
    rooms.forEach((value, roomId) => {
      if (value.get('users').delete(socket.id)) {
        const users = [...value.get('users').values()];
        socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users);
      }
    });
  });

  console.log('user connected', socket.id);
})


server.listen(9999, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log('Server started')
});