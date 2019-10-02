const express = require('express');

const routes = express.Router();

//GET, POST, PUT, DELETE 
//rotas
routes.get('/', (req, res) => {
    return res.json({ message: "Hello" });
});

// req.query = acesso aos query params (para filtros)
routes.get('/users', (req, res) => {
    return res.json({ idade: req.query.idade });
});

//req.body = acesso ao corpo da requisicao (criacao, edicao) 
routes.post('/users', (req, res) => {
    return res.json(req.body);
});

// req.params = acesso route params (para editar, delete)
routes.put('/users/:id', (req, res) => {
    return res.json({ id: req.params.id });    
});

routes.post('/users', (req, res) => {
    return res.json({ message: "Hello" });
});

module.exports = routes;