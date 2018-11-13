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