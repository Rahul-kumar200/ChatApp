import React from "react";
import "./Username.css";

const Username = ({ username, setUsername, setAskUsername }) => {
    const currentUsername = (event) => {
        setUsername(event.target.value);
    };

    const submitUsername = () => {
        if (username !== "") {
            setAskUsername(false);
            console.log(username);
        }
    };

    return (
        <div className="startPage">
            <div className="get_username">
                <input
                    className="input_username"
                    placeholder="Enter Username..."
                    onChange={currentUsername}
                    value={username}
                />
                <button className="submit_username" onClick={submitUsername}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Username;
