const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io  = require('socket.io')(http);
const path = require('path');

// const DIST_FOLDER = path.join(process.cwd(), './dist');

// app.get('*.*', express.static(path.join(DIST_FOLDER, 'socketchat')));

// app.get('*', (req, res) => {
//     res.render(path.join(DIST_FOLDER, 'socketchat', 'index.html'), { req });
//   }); 

 
io.on('connection', (socket)=> {

    console.log('User Connected...');
    
    socket.on('disconnect', () => {
        console.log('User Disconnected...');
    });

    socket.on('add-message', (message, username)=>{
        io.emit('message', {type: 'new-message', text: message, username: username})
    })
});

const port = process.env.PORT || '5000';
app.set('port',port);

const server = http;
server.listen(port,() => console.log(__dirname));