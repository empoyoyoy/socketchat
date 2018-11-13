const express = require('express');
const app = express();
const http = require('http').Server(app);
const io  = require('socket.io')(http);
const path = require('path');

const DIST_FOLDER = path.join(process.cwd(), './dist');

// app.use(express.static('./dist'));
 
// app.get('*', function(req,res) {
//     res.sendFile(path.resolve('dist/socketchat/index.html'));
// });

app.use( express.static(path.join(DIST_FOLDER, 'socketchat')));

app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_FOLDER, 'socketchat/index.html'));
  });


let numberOfOnlineUsers = 0;
let users = [];
  
io.on('connection', (socket)=> {
    
    numberOfOnlineUsers++;
    io.emit('numberOfOnlineUsers',numberOfOnlineUsers);

    console.log(numberOfOnlineUsers);
    
    socket.on('disconnect', () => {
        numberOfOnlineUsers--;
        io.emit('numberOfOnlineUsers',numberOfOnlineUsers);
        console.log('User Disconnected...');
    });

    socket.on('add-message', (message, username)=>{
        io.emit('message', {type: 'new-message', text: message, username: username})
    });

    socket.on('user-connect', (username)=>{
        // users.push(username)
        io.emit('user', {type: 'new-user',username: username});
    });

    // socket.on('user-leave', (username)=>{
    //     user.splice(username,1)
    //     io.emit('user', {type: 'new-user',username: user});
    // });
});

const port = process.env.PORT || '5000';
app.set('port',port);

const server = http;
server.listen(port,() => console.log(__dirname));