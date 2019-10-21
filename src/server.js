const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();
mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-ghemz.mongodb.net/OmniStackDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//informa para o express que o retorno do objeto é json
// app.use(cors({ origin: 'http//:localhost:3000'})); -- define que apenas este endereco possa acessar a api
app.use(cors());
app.use(express.json());
app.use(routes  );

app.listen(3333);