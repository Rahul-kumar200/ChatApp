import { useEffect, useState } from "react";
import "./RoomListContainer.css";
import RoomList from "./RoomList";

const RoomListContainer = ({username ,  room, setRoom, socket , messages , setMessages }) => {
    const [newRoom, setNewRoom] = useState(false); // check create room is clicked or not
    const [roomNo, setRoomNo] = useState(null); // current room no
    const [roomList, setRoomList] = useState([]);

    useEffect(()=>{
        console.log(roomList)
    },[roomList])

    const hide_show_createRoom = () => {
        if (!newRoom) setNewRoom(true);
        else setNewRoom(false);
    };

    const joinRoom = () => {
        if (roomNo !== "" && roomNo !== null) {
            setRoom(roomNo);
            socket.emit("join_room", roomNo ,username);
            setRoomList([{ id: roomNo }, ...roomList]);
            setMessages([ ...messages, { roomID: roomNo, msgs: [] }]);
            setRoomNo("");
            setNewRoom(false);
        }
    };

    const current_roomNo = (event) => {
        setRoomNo(event.target.value);
    };

    const selectRoom = (current_room) => {
        console.log('roomList'+ current_room);
        setRoom(current_room);
    };

    return (
        <div className="room_list">
            <button className="create_room" onClick={hide_show_createRoom}>
                <span style={{ fontSize: "30px" }}> + </span> Create Room
            </button>

            {newRoom && (
                <>
                    <div className="join_room">
                        <input
                            className="input_room"
                            onChange={current_roomNo}
                            value={roomNo}
                            placeholder="Enter Room No.."
                        />
                        <button className="join_room_button" onClick={joinRoom}>
                            Join
                        </button>
                    </div>
                </>
            )}
            <div className="rooms">
                {roomList.map((current_room) => {
                    return(
                    <RoomList  current_room={current_room.id}  selectRoom={selectRoom} room={room}/>
                    )
                })}
            </div>
        </div>
    );
};

export default RoomListContainer;
