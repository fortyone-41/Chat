import React from 'react';
import { Route } from 'react-router-dom';

import { Chat } from '../../modules/index';
import Modal from '../../modules/Modal/Modal';


const Home = ({ users, messages, userName, onAddMessage, onJoin, rooms, socket }) => {
    let i = 0; //for array map
    
    return (
        <section className="home">
            <Route exact path={"/room"} render={() => <Modal onJoin={onJoin} /> }/>
            {rooms.map((name) => (
                <Route key={i++} exact path={"/room/" + name} render={() => <Chat socket={socket} users={users} messages={messages} userName={userName} roomId={name} onAddMessage={onAddMessage} onJoin={onJoin} />} />))}
            
        </section>
    );
}

export default Home;