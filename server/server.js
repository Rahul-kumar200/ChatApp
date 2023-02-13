const io = require("socket.io")(3000, {
    cors: {
        origin: ["http://localhost:3001"],
    },
}); // connect with port number 3000 and pass the cors so that two different port can pass the data

io.on("connection", (socket) => {
    // on every connection a function will execute
    console.log(socket.id);

    // IF SOMEONE SEND THE MESSAGE 
    socket.on("send_message", (message, room , username ,current_time) => {
        if (room === null) {
            socket.broadcast.emit("receive_message", message ,username , current_time);
        } else {
            socket.to(room).emit("receive_message", message,username , current_time);
        }
        console.log(message);
    });

    // IF SOMEONE JOINS THE ROOM
    socket.on("join_room", (room,username) => {
        socket.join(room);
        console.log("Joined Room");

        socket.to(room).emit("receive_message", username+" joined this room");
    });
});
