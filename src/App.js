import React from 'react';
import ReactDOM from 'react-dom'
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
    users: [],
    messages: [],
    rooms: [],
  })


  const getRooms = async () => {
    const data2 = await axios.get(`/get_rooms`);
    dispatch({
      type: 'GET_ROOMS',
      payload: data2,
    })
  }

  const onLogin = async (values) => {
    const { data } = await axios.get(`/rooms/${values.roomId}`);
    dispatch({
      type: 'SET_DATA',
      payload: data,
    });
    getRooms()
  }

  const onJoin = async (values) => {
    dispatch({
      type: 'JOINED',
      payload: values,
    });
    socket.emit('ROOM:JOIN', values);
    const { data } = await axios.get(`/rooms/${values.roomId}`);
    dispatch({
      type: 'SET_DATA',
      payload: data,
    });
    getRooms()
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
       <Route exact path="/" render={() =><Auth onLogin={onLogin} socket={socket} /> } />
        <Route path="/room" render={() => <Home {...state} onAddMessage={addMessage} onJoin={onJoin}/> } />
    </div>
  );
}

export default App;