import React from 'react';
import socket from '../../../socket';
import classNames from 'classnames'
import { NavLink } from 'react-router-dom';


function Chat({ users, messages, userName, roomId, onAddMessage, onJoin }) {
  const [messageValue, setMessageValue] = React.useState('');
  const messagesRef = React.useRef(null);
  // values.roomId=roomId
  // values.userName = localStorage.userName
  // onJoin(values)

  const onSendMessage = () => {
    let date = new Date();
    let min = date.getMinutes();
    if (min < 10) {
      min = '0' + min.toString();
    }
    socket.emit('ROOM:NEW_MESSAGE', {
      userName,
      roomId,
      text: messageValue,
      time: date.getHours() + ':' + min,
    });
    onAddMessage({ userName, text: messageValue, time: date.getHours() + ':' + min });
    setMessageValue('');
  };

  React.useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages]);

  React.useEffect(() => {
    let test;
    let values = {}
    if (localStorage.userName === undefined) {

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
  }, [])
  let index = 0;
  return (
    <div>
      <a href="/room">Rooms</a>
      <div className="chat">
        <div className="chat-users">
          Комната: <b>{roomId}</b>
          <hr />
          <b>Онлайн ({users.length}):</b>
          <ul>
            {users.map((name, index) => (
              <li key={name + index}>{name}</li>
            ))}
          </ul>
        </div>
        <div className="chat-messages">
          <div ref={messagesRef} className="messages">
            {messages.map((message) => (
              <div key={index++} className={classNames(`message`, { "message--isme": message.userName == userName })}>
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
              className="form-control"
              rows="3"></textarea>
            <button onClick={onSendMessage} type="button" className="btn btn-primary">
              Отправить
          </button>
          </form>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
}

export default Chat;