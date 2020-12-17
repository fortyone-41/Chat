import React from 'react';

import Message from '../../components/Message/Message';


import './Home.scss'

const Home = () => {
    return (
        <section className="home">
            <Message
                avatar="https://sun1.norilsk.userapi.com/impf/GAThXgl1EqIx3LNnhOwzzVBVqvmiQ5EXPosTAg/1en8f9OLaRw.jpg?size=100x0&quality=96&crop=146,38,304,304&sign=83e7ef66350c4d15ae5389826e3879fd&ava=1"
                text="Салам! "
                date="Thu Dec 17 2020 08:59:35" />
            <Message
                avatar="https://sun3-12.userapi.com/impf/c858236/v858236201/b7b82/K63tf50IMRE.jpg?size=50x0&quality=96&crop=0,93,768,768&sign=7a8f5a48a911c3efed0405312ca0a89a&ava=1"
                text="И тебе! "
                date="Thu Dec 17 2020 09:04:35"
                isMe={true} 
                isReaded={true} />
                
        </section>
    );
}

export default Home;
