import React from 'react';
import classNames from 'classnames'
import { Button, Modal } from 'antd'
import Peer from "simple-peer";


function Chat({ users, messages, userName, roomId, onAddMessage, onJoin, socket }) {
  const [messageValue, setMessageValue] = React.useState('');
  const messagesRef = React.useRef(null);
  const [yourID, setYourID] = React.useState("");
  const [stream, setStream] = React.useState();
  const [receivingCall, setReceivingCall] = React.useState(false);
  const [caller, setCaller] = React.useState("");
  const [callerName, setCallerName] = React.useState("");
  const [callerSignal, setCallerSignal] = React.useState();
  const [callAccepted, setCallAccepted] = React.useState(false);
  const userVideo = React.useRef();
  const partnerVideo = React.useRef();
  const [mediaError, setMediaError] = React.useState(false);
  const constraints = {
    audio: true,
    video: {
      facingMode: 'user'
    }
  }
  let UserVideo;
  let PartnerVideo;
  let incomingCall;


  const onSendMessage = () => {  //function sending message
    let date = new Date();
    let min = date.getMinutes();
    if (min < 10) {
      min = '0' + min.toString();
    }

    if (messageValue === "") {
      alert("Введите текст сообщения")
    } else {
      if (messageValue.match(/^[ ]+$/)) { // В значении только пробелы
        setMessageValue('');
        alert("Введите текст сообщения");
      } else {
        socket.emit('ROOM:NEW_MESSAGE', {   //emitting event new message
          userName,
          roomId,
          text: messageValue,
          time: date.getHours() + ':' + min,
        });
        onAddMessage({ userName, text: messageValue, time: date.getHours() + ':' + min });
        setMessageValue('');
      }

    }

  };


  function errorMsg(msg, error) {
    alert(`${msg}`)
    if (typeof error !== 'undefined') {
      console.error(error);
    }
  }
  React.useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages]);


  React.useEffect(() => {  //checking for inputted name, if not inputted, show window with input field for inputing name
    let test;
    let values = {}
    if (localStorage.userName === undefined  || localStorage.userName === "") {

      test = prompt("Введите ваше имя", 'Username');
      if (test === "") {
        test = "Anonymus";
      }
      if (test === null) {
        test = "Anonymus";
      }
      localStorage.userName = test;
    }
    values.roomId = roomId
    values.userName = localStorage.userName
    onJoin(values)
    function hasGetUserMedia() {
      return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }
    if (hasGetUserMedia()) {
      try {
        navigator.mediaDevices.getUserMedia(constraints).then(stream => {
          setStream(stream);
          if (userVideo.current) {
            userVideo.current.srcObject = stream;
          }
        })
      }
      catch (error) {
        if (error.name === 'ConstraintNotSatisfiedError') {
          const v = constraints.video;
          errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
        } else if (error.name === 'PermissionDeniedError') {
          errorMsg('Permissions have not been granted to use your camera and ' +
            'microphone, you need to allow the page access to your devices in ' +
            'order for the demo to work.');
        }
        errorMsg(`getUserMedia error: ${error.name}`, error);
      }

      socket.on("yourID", (id) => {
        setYourID(id);
      })

      socket.on("incomingCall", (data) => {
        setReceivingCall(true);
        setCaller(data.from);
        setCallerName(data.fromName);
        setCallerSignal(data.signal);
      })

      socket.on("closeConnect", () => {
        setReceivingCall(false);
        setCallAccepted(false);
      })
    } else {
      setMediaError(true)
      alert("Возникли проблемы с получением ваших медиданных");
    }


  }, [])
  ////////////////////////////////////////
  let idCallUser;
  function callPeer(id) {
    idCallUser = id;
    if (partnerVideo.current) {
      dropCall();
    }
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", data => {
      socket.emit("callUser", { userToCall: id, signalData: data, from: yourID, fromName: userName })
    })

    peer.on("stream", stream => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.on("callAccepted", signal => {
      setCallAccepted(true);
      peer.signal(signal);
    })

  }
  ////////////////////////////////////////

  function dropCall() {
    if (callerSignal == undefined) {
      socket.emit("dropCall", { to: idCallUser })
    }
    else {
      socket.emit("dropCall", { to: caller })
    }
    setReceivingCall(false);
    setCallAccepted(false);
  }
  ////////////////////////////////////////

  function acceptCall() {
    if (partnerVideo.current) {
      dropCall();
    }
    setCallAccepted(true);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", data => {
      socket.emit("acceptCall", { signal: data, to: caller })
    })

    peer.on("stream", stream => {
      partnerVideo.current.srcObject = stream;
    });
    peer.signal(callerSignal);
  }
  ////////////////////////////////////////

  if (stream) {
    UserVideo = (
      <video className="my-video" playsInline muted ref={userVideo} autoPlay />
    );
  }


  if (callAccepted) {
    PartnerVideo = (
      <video className="user-video" playsInline ref={partnerVideo} autoPlay />
    );
  }

  let visible = false;
  let confirmLoading = false;
  let modalText = '';

  const showModal = () => {
    visible = true;
  };

  const handleOk = () => {
    confirmLoading = true;
    visible = false;
    confirmLoading = false;
    acceptCall();
  };

  const handleCancel = () => {
    console.log('hello')
    visible = false;
    dropCall();
  };

  if (receivingCall) {
    showModal();
    modalText = `Входящий вызов от ${callerName}(а) `;
    incomingCall = (

      <Modal
        title="Входящий вызов"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    )
  }
  debugger
  return (
    <div>
      <a href="/room">Rooms</a>
      <div className="chat">
        <div className="chat-users">
          Комната: <b>{roomId}</b>
          <hr />
          <b>Онлайн ({users.length}):</b>
          <ul>
            {Object.keys(users).map((name, index) => (
              <li key={name + index}>{users[name][1]}</li>
            ))}
          </ul>
        </div>

        <div className="chat-messages">
          <div ref={messagesRef} className="messages">
            {messages.map((message, index) => (
              <div key={index} className={classNames(`message`, { "message--isme": message.userName === userName })}>
                <div className="message__content">
                  <div className="message__info">
                    <span className="message__date">{message.userName}:</span>
                    <div className="message__bubble">
                      <div className="message__text">
                        <p>{message.text}</p>
                      </div>
                    </div>
                    <span className="message__date">{message.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <form>
            <textarea
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
              required
              className="form-control"
              rows="3"></textarea>
            <button onClick={onSendMessage} type="button" className="btn btn-primary">
              Отправить
          </button>
          </form>
        </div>
      </div>
      <div className="video-container">
        {UserVideo}
        {PartnerVideo}
      </div>
      { (mediaError == false) ? Object.keys(users).map((key, index) => {

        if (users[key][0] === yourID) {
          return null;
        }
        return (
          <Button type="primary" key={index} style={{ width: "720px" }} onClick={() => callPeer(users[key][0])} htmlType="submit" size="large">Call {users[key][1]}</Button>
        );
      }) : ''}
      {callAccepted ? '' : incomingCall}

    </div>
  );
}

export default Chat;