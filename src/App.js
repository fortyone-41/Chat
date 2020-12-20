import React from 'react';
import ReactDOM from 'react-dom'
import { Route } from 'react-router-dom'
import reducer from './reducer';
import socket from './socket';
import axios from 'axios';

import './styles/index.scss'
import { Auth, Home } from "./pages/index";
import { Button } from 'antd';





function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  })

  const onLogin = async (values) => {
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
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);
  }, [])

  return (
    <div className="wrapper">

      {!state.joined ? <Route exact path={["/", "/login", "/register"]} render={(props) => <Auth onLogin={onLogin} socket={socket} />} /> : <Home {...state} onAddMessage={addMessage} />}

    </div>
  );
}

export default App;
