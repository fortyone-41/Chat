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

rooms.set(    //create room with name "1"
  "1",
  new Map([
    ['users', new Map()],
    ['messages', []],
  ]),
);
rooms.set(    //create room with name "2"
  "2",
  new Map([
    ['users', new Map()],
    ['messages', []],
  ]),
);
app.use(express.json());

app.get('/rooms/:id', (req, res) => {   //get request for taking data in current room, if such room have
  const { id: roomId } = req.params;
  const obj = rooms.has(roomId)
    ? {
      users: [...rooms.get(roomId).get('users')],
      messages: [...rooms.get(roomId).get('messages').values()],
    }
    : { users: [], messages: [] };
  res.json(obj);
});


app.get('/get_rooms', (req, res) => {  //get request for taking array rooms
  res.json([...rooms.keys()]);
});


app.post('/rooms', (req, res) => {  //post request for creating new room 
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
  socket.on('ROOM:JOIN', ({ roomId, userName }) => {   //event join in room
    socket.join(roomId);
    rooms.get(roomId).get('users').set(socket.id, userName);    //writing user in room
    const users1 = [...rooms.get(roomId).get('users')];  //get users in room
    const messages = [...rooms.get(roomId).get('messages').values()]    //get messages in room
    socket.to(roomId).broadcast.emit('ROOM:JOINED', users1);  //refresh users list for all 
    socket.emit('ROOM:SET_USERS', users1);

    // if (!users1[socket.id]) {
    //   users1[socket.id] = userName;
    // }
    socket.emit("yourID", socket.id);
  })
  socket.on('ROOM:NEW_MESSAGE', ({ roomId, userName, text, time }) => {  //event new message
    const obj = {
      userName,
      text,
      time,
    };
    rooms.get(roomId).get('messages').push(obj);  //pushing new message in array
    socket.to(roomId).broadcast.emit('ROOM:NEW_MESSAGE', obj); //refreshing messages list
  });

  socket.on('disconnect', () => {  //default event for disconneting user, and clear his data on server
    rooms.forEach((value, roomId) => {
      if (value.get('users').delete(socket.id)) {
        const users = [...value.get('users')];
        socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users);
      }
    });
  });
  

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit('hey', { signal: data.signalData, from: data.from, fromName: data.fromName });
  })

  socket.on("acceptCall", (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  })
  console.log('user connected', socket.id);
})


server.listen(9999, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log('Server started')
});