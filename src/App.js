import React from 'react';
import { Route } from 'react-router-dom'
import reducer from './reducer';
import socket from './socket';
import axios from 'axios';

import './styles/index.scss'
import { Auth, Home } from "./pages/index";



function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    auth: false,
    roomId: null,
    userName: null,
    users: {},
    messages: [],
    rooms: [],
  })

  const getRooms = async () => {    //get array rooms
    const data2 = await axios.get(`/get_rooms`);
    dispatch({        //dispatching rooms in state
      type: 'GET_ROOMS',
      payload: data2,
    })
  }

  const onJoin = async (values) => {
    const { data } = await axios.get(`/rooms/${values.roomId}`);      //get data from current room
    // if (data.users.length >= 2) {
    //   alert("Room is overload")
    //   history.push("/room")
    // } else {
    dispatch({
      type: 'JOINED',
      payload: values,
    });
    socket.emit('ROOM:JOIN', values);

    dispatch({        //dispatching data in state
      type: 'SET_DATA',
      payload: data,
    });
    getRooms()
    // }

  }

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    });

  };


  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,
    });
  };

  React.useEffect(() => {
    socket.on('ROOM:JOINED', setUsers)
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);
    getRooms();
  }, [])

  return (
    <div className="wrapper">
      <Route exact path="/" render={() => <Auth socket={socket} />} />
      <Route path="/room" render={() => <Home {...state} socket={socket} onAddMessage={addMessage} onJoin={onJoin} />} />
    </div>
  );
}

export default App;