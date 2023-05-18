const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIo = require("socket.io");

require("dotenv").config();

const app = express();
const userRouter = require("./routes/userRoute");
const { handleError } = require("./middleware/errors");

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));

// Set up CORS headers
app.use(cors({ origin: "*" }));

app.use("/users", userRouter);

app.use(handleError);

const connect = async () => {
    const uri = process.env.MONGO_URI;
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(uri);
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
};
connect();





const port = process.env.PORT || 5550;
let server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// let io = socketIo(server, {cors:{
//     origin:"*"
// }})

// io.on("connection", (socket)=>{
//     console.log(socket.id) //A unique id is created every connection
//     console.log("A user connected successfully", socket.id)

//     //To receive and emit a message from the client. Note that the message is received from the client and emitted to the client. Also, emit is used to send a message to the client and on is used to receive a message from the client
//     socket.on("message", (data)=>{
//         console.log(data, socket.id)
//         io.emit("broadcast", data)
//     })

//     //TO check if a user is disconnected from the room
//     socket.on("disconnect", ()=>{
//         console.log("A user disconnected", socket.id)
//     })
// })

let io = socketIo(server, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {
    console.log(socket.id)

    //socket.on is used to receive a message from the client while io.emit is used to send a message to the client

    socket.on("message", (data)=>{
        console.log(data, socket.id)
        io.emit("broadcast", data)
    })
    //To check if a user is disconnected from the room
    socket.on("disconnect", ()=>{
        console.log("A user disconnected", socket.id)
    })
})