var app = require('express')();
var http = require('http').Server(app);
var io  = require('socket.io')(http);


io.on('connection', (socket)=> {

    console.log('User Connected...');
    
    socket.on('disconnect', () => {
        console.log('User Disconnected...');
    });

    socket.on('add-message', (message, username)=>{
        io.emit('message', {type: 'new-message', text: message, username: username})
    })
});

http.listen(process.env.PORT || 5000, () => {
    console.log('server running on port 5000');
});

