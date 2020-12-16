import React from 'react';
import Message from '../../components/Message/Message';

import './Home.scss'

const Home = () => {
    return (
        <section className="home">
            <Message
                avatar="https://sun1.norilsk.userapi.com/impf/GAThXgl1EqIx3LNnhOwzzVBVqvmiQ5EXPosTAg/1en8f9OLaRw.jpg?size=100x0&quality=96&crop=146,38,304,304&sign=83e7ef66350c4d15ae5389826e3879fd&ava=1"
                text="Салам, брут! Че как?"
                date="Thu Dec 17 2020 00:06:13" />
        </section>
    );
}

export default Home;
