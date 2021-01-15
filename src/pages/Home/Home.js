import React from 'react';
import { Route } from 'react-router-dom';

import { Chat } from '../../modules/index';
import Modal from '../../modules/Modal/Modal';


const Home = ({ users, messages, userName, onAddMessage, onJoin, rooms }) => {
    let i = 0;

    return (
        <section className="home">
            <Route exact path={"/room"} render={() => <Modal onJoin={onJoin} /> }/>
            {rooms.map((name) => (
                <Route key={i++} exact path={"/room/" + name} render={() => <Chat users={users} messages={messages} userName={userName} roomId={name} onAddMessage={onAddMessage} onJoin={onJoin} />} />))}
            {/* <div>
                <video id="localVideo" playsInline autoPlay muted></video>
                <button>Start</button>
            </div> */}
        </section>
    );
}

export default Home;
