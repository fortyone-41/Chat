import React from 'react';

import Message from '../../components/Message/Message';
import {Chat} from '../../modules/index';


const Home = ({ users, messages, userName, roomId, onAddMessage }) => {
    return (
        <section className="home">
           <Chat  users={users} messages={messages} userName={userName} roomId={roomId} onAddMessage={onAddMessage} />
        </section>
    );
}

export default Home;
