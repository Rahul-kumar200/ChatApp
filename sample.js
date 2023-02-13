import "./App.css";
import { useState } from "react";
import { socket } from "./services/socket";
import RoomListContainer from "./components/RoomListContainer";

function App() {
    const [inputMessage, setInputMessage] = useState("");

    // id ===1 (me)    and id===2 (other person)
    const [messages, setMessages] = useState([]); // storing the id and text in array in form of object

    const [room, setRoom] = useState(null);

    socket.on("connect", () => {
        console.log(`You connected with id : ${socket.id}`);
    });

    // setting the current input message to inputMessage useState
    const currentMessage = (event) => {
        setInputMessage(event.target.value);
    };

    const sendMessage = () => {
        if (inputMessage !== "") {
            console.log("room  " + room);
            socket.emit("send_message", inputMessage, room);
            setMessages(()=>{

              // if room is present
                if(messages.find(obj => obj.roomID==room))
                {
                  console.log('good')
                    messages.map(obj=>{
                      if(obj.roomID==room){
                         const prev = obj.msgs;
                         obj.msgs = [prev , {id:1 , text : inputMessage}]
                      } 
                    })
                }

                else{
                  console.log('room :'+room);
                   return  [...messages , {roomID : room , msgs :[ {id:1 , text : inputMessage }]}]
                }
              
            });
            setInputMessage("");
        }
    };

    socket.on("receive_message", (string) => {
        console.log(string);
        setMessages(
          messages.map(obj=>{
            if(obj.roomID==room){
               const prev = obj.msgs;
               obj.msgs = [ prev , {id:2 , text : string}]
            }  
          })
          
        );
    });

    return (
        <div className="app">
            <RoomListContainer room={room} setRoom={setRoom} socket={socket} />
            <div className="message_area">
                <div className="messages">
                    {messages.map((obj) => {
                      if(obj.roomID==room){
                        obj.map((msg) =>{
                        return (
                            <div
                                className={
                                    msg.id === 1
                                        ? "my_message"
                                        : "other_message"
                                }
                            >
                                {msg.text}
                            </div>
                        );})
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
