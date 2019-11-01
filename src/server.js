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

io.on('connection', socket => {
    console.log('Usuario conectado', socket.id);

    socket.emit('hello', 'Ospra, bão?')//envia a mensagem

})

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-ghemz.mongodb.net/OmniStackDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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