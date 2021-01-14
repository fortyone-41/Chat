import React from 'react';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';
import axios from 'axios';

import { Chat } from '../../modules/index';
import Modal from '../../modules/Modal/Modal';


const Home = ({ users, messages, userName, room, onAddMessage, onLogin, auth, onJoin, rooms }) => {
    let values = {};
    const intoChat1 = async () => {
        values.userName= localStorage.userName;
        values.roomId = 1;
        //await axios.post("/rooms", values);
        onJoin(values);
    };
    const intoChat2 = async () => {
        values.userName= localStorage.userName;
        values.roomId = 2;
        //await axios.post("/rooms", values);
        onJoin(values);
    };
    return (
        <section className="home">
            <NavLink onClick={intoChat1} to="/room/1">Chat #1</NavLink>
            <NavLink onClick={intoChat2} to="/room/2">Chat #2</NavLink>
                <Route path="/room/1" render={() => <Chat users={users} messages={messages} userName={userName} roomId={1} onAddMessage={onAddMessage} onLogin={onLogin} auth={auth} />} />
                <Route path="/room/2" render={() => <Chat users={users} messages={messages} userName={userName} roomId={2} onAddMessage={onAddMessage} onLogin={onLogin} auth={auth} />} />
        </section>
    );
}

export default Home;
