const express = require('express');

const app = express();

const http = require('http');

const path = require('path');

const socketio = require('socket.io');

const server = http.createServer(app);

const io = socketio(server);
app.use('/',express.static('public'));

const users = [];
const user2 = {};

io.on('connection',(socket)=>
{
    socket.on('login',(data)=>
    {
       
        users.push(
            {
                id:socket.id,
                username:data.name
            }
        )
        
        user2[socket.id] = data.name
        io.emit('userlist',
        {
            user:users,
            

            
        })
    })
    socket.on('send_msg',(data)=>
    {
        io.emit('rcd_msg',{
            msg:data.msg,
            name:user2[socket.id]
        })
    })

    socket.on('logout',()=>
    {
        if(users.length!=0){
        let out,outname;
        for(let i=0;i<users.length;i++)
        {
            if(users[i].id===socket.id)
            {
              
                outname = users[i].username;
                out = socket.id;
                users.splice(i,1);
            

            }

        }
        io.emit('exit',{users:users,out:out,outname:outname});
    }
    else{
        io.emit('exit',{users:users,out:socket.id,outname:-1});
    }
    })
})

server.listen(process.env.PORT || 3000,()=>
{
    console.log("Server Listening");
})