const express = require('express');
const app = express();
const socketio = require('socket.io');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8091;
const expressServer = app.listen(PORT, console.log(`listen on port ${PORT}`));

app.use(bodyParser.urlencoded({ extended: false }))
const io = socketio(expressServer);
let id, userName
let userState = {
    id,
    userName,
    
};
const usersArr = [];
const namesArr = [];


app.post('/', (req, res) => {
    
    userState = {
        id: req.body.id,
        userName: req.body.user
    }
    if (!userState.userName){
         res.redirect('./403.html');
         return;
    }
    namesArr.push(userState.userName) 
    for (let i = 0; i < namesArr.length - 1; i++) {
        if (namesArr[i] === (userState.userName)) {
            res.redirect('./403.html');
            return;
        };
    };

    usersArr.push(userState)
    io.on('connection', (socket) => {
        userState.id = socket.id;
        socket.emit('serverMsg', {
             usersArr
        });

    });
    res.redirect('./chats.html');
});

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.urlencoded({
    extended: false
}));
io.on('connection', (socket) => {
    
    socket.on('clientMsg', (msgData) => {
        io.emit('dataBackToClient', 
           msgData
        )
    });
    socket.on('clientData', (usersData) => {
        console.log(usersData)
        io.emit('usersToClient',
            usersData
    )
    })
});
