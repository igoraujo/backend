const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio =  require('socket.io')
const http =  require('http')


const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-ghemz.mongodb.net/OmniStackDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connectedUsers = {}; //o ideal seria utilizar um banco rapido para isto, por exemplo o REDIS (MONGO tambem funciona)

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
    // { user_id : socket.id }
    // { '5d9a4a5ff56da82c3ed7c200': 'V4fbsxOjFryO6nC9AAAB'}
});

app.use(req, res, next => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    
    next();
});

//GET, POST, PUT, DELETE

// req.query   = Acessar query params (para filtros)
// req.params  = Acessar route params (para edicao, delete)
// req.body    = Acessar corpo da requisicao (para criacao, edicao)

//informa para o express que o retorno do objeto é json
// app.use(cors({ origin: 'http//:localhost:3000'})); -- define que apenas este endereco possa acessar a api
app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes  );

server.listen(3333);