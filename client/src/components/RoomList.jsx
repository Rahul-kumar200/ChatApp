import React, { useState } from "react";
import './RoomList.css'

const RoomList = ({current_room , selectRoom , room}) => {
    
    const select = ()=>{
        selectRoom(current_room);
    }
    
    return (
            <div className='room' onClick={select} >
               {current_room}
            </div>
    );
};

export default RoomList;
