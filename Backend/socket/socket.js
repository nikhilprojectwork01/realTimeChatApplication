import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);


const io = new Server(server, {
    cors:{
        origin:['http://localhost:5173'],
        methods:['GET', 'POST'],
    },
});

const userSocketmap = {} 

export const getReceiverSocketId = (recieverid)=>{
    return userSocketmap[recieverid]
}

io.on('connection', (socket)=>{   
    const userId = socket.handshake.query.userId  // querry can be recieved by this way  

    if(userId !== undefined){
        userSocketmap[userId] = socket.id
    }

    // emmiting to all the Users  

    io.emit('getOnlineUsers' ,Object.keys(userSocketmap))
console.log(userSocketmap)

    // when user disconnect  
    socket.on('disconnect' , ()=>{
        delete userSocketmap[userId]
        io.emit('getOnlineUsers' ,Object.keys(userSocketmap))
    })
})

export {app, io, server};
