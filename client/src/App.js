import "./App.css";
import { useState,useEffect } from "react";
import { socket } from "./services/socket";
import RoomListContainer from "./components/RoomListContainer";
import Username from "./components/Username";


// Editing
// Editing
// Editing
// Editing
// Editing
// Editing
// Editing
// Editing

function App() {
    const [inputMessage, setInputMessage] = useState("");

    // id ===1 (me)    and id===2 (other person)
    const [messages, setMessages] = useState([]); // storing the id and text in array in form of object

    const [room, setRoom] = useState(socket.id);

    const [username , setUsername] = useState('')
    const [ask_username , setAskUsername] = useState(true)
    
    const [current_time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            var today = new Date();
            var hrs = today.getHours()%12;
            var min  = today.getMinutes();
            var ampm = today.getHours() >= 12 ? 'pm' : 'am' ; 

            setTime(hrs+':'+min+ampm)
        }, 1000);
        return () => clearInterval(interval);
    }, []);



    socket.on("connect", () => {
        console.log(`You connected with id : ${socket.id}`);
    });
    // setting the current input message to inputMessage useState
    const currentMessage = (event) => {
        setInputMessage(event.target.value);
    };

    const sendMessage = () => {
        if (inputMessage !== "") {
            socket.emit("send_message", inputMessage, room , username , current_time);
            
                messages.map((obj) => {
                    if (obj.roomID === room) {
                        let prev = obj.msgs;
                        obj.msgs = [...prev, { id: 1,user:'You' , time : current_time  ,text: inputMessage }];
                    }
                });

            setInputMessage("");
        }

    };

    // Receiving the message
    socket.off('receive_message').on("receive_message", (string,sender_name,sending_time) => {
      messages.map((obj) => {
        if (obj.roomID === room) {
        console.log('Reached')
            let prev = obj.msgs;
            obj.msgs = [...prev, { id: 2, user : sender_name , time :sending_time  ,text: string }];
        }
       });
    });

    return (
        <div className="app">
        {ask_username && <Username username={username} setUsername={setUsername} setAskUsername={setAskUsername}/> }
            <RoomListContainer username={username} room={room} setRoom={setRoom} socket={socket} messages={messages} setMessages={setMessages}/>
            <div className="message_area">
            <div className="room_info">Room Name : {room}</div>
                <div className="messages">
                    {messages.map((obj) => {
                        if (obj.roomID === room) {
                            return obj.msgs.map((msg) => {
                                return (
                                        <>
                                        <div className={ msg.id === 1? "my_message_info": "other_message_info"}>{msg.user} <span>{msg.time}</span></div>
                                        <div className={ msg.id === 1? "my_message": "other_message"}>
                                            {msg.text}
                                        </div>
                                       </>
                                    );
                              });
                            }
                        })}
                </div>
                <div className="create_message">
                    <input
                        className="input_message"
                        placeholder="Type a message..."
                        onChange={currentMessage}
                        value={inputMessage}
                    />
                    <button className="send_message" onClick={sendMessage}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
