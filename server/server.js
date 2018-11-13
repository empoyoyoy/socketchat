// var app = require('express')();
// var http = require('http').Server(app);
// var io  = require('socket.io')(http);


// io.on('connection', (socket)=> {

//     console.log('User Connected...');
    
//     socket.on('disconnect', () => {
//         console.log('User Disconnected...');
//     });

//     socket.on('add-message', (message, username)=>{
//         io.emit('message', {type: 'new-message', text: message, username: username})
//     })
// });

// http.listen('port', process.env.PORT || 5000, () => {
//     console.log('server running on port 5000');
// });

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io  = require('socket.io')(http);
const path = require('path');

// app.use(express.static('dist'));
// app.get('*', (req,res) => {
//     res.sendFile('dist/socketchat/index.html')
// })

// app.use(express.static(path.join(__dirname, './dist')));
// //app.use(express.static(__dirname + '/dist/socketchat'));

// app.get('/*', function(req,res) {    
//     res.sendFile(path.join(__dirname, './dist/socketchat/index.html'));
// });

app.use(express.static(__dirname + './dist/socketchat'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'./dist/socketchat/index.html'));
});



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