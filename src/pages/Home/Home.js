import React from 'react';
import ReactDOM from 'react-dom'
import { NavLink, Route } from 'react-router-dom';
import axios from 'axios';

import { Chat } from '../../modules/index';
import Modal from '../../modules/Modal/Modal';


const Home = ({ users, messages, userName, onAddMessage, onJoin, rooms }) => {
    let i = 0;
    const videoRef = React.createRef();
    const localVideo = videoRef.current;
   
      let localStream;
    let pc1;
    let pc2;
    const offerOptions = {
      offerToReceiveAudio: 1,
      offerToReceiveVideo: 1
    };

    function getName(pc) {
      return (pc === pc1) ? 'pc1' : 'pc2';
    }

    function getOtherPc(pc) {
      return (pc === pc1) ? pc2 : pc1;
    }
    async function start() {
        console.log('Start')
        console.log('Requesting local stream');
       
      try {
          const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
          console.log('Received local stream');
          localVideo.srcObject = stream;
          localStream = stream;
          
      } catch (e) {
          alert(`getUserMedia() error: ${e.name}`);
      }
    };
    return (
        <section className="home">
            <Modal onJoin={onJoin} />
            {rooms.map((name) => (
                <Route key={i++} exact path={"/room/" + name} render={() => <Chat users={users} messages={messages} userName={userName} roomId={name} onAddMessage={onAddMessage} onJoin={onJoin} />} />))}
            <div>
                <video autoplay id="localVideo" ref={videoRef} playsInline autoPlay muted></video>
                <button onClick={start}>Start</button>
            </div>
        </section>
    );
}

export default Home;
