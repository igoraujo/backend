const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);
// routes.post('/spots', upload.array('thumbnail'), SpotController.store); // mais de uma imagem

routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);





//GET, POST, PUT, DELETE 
//rotas
routes.get('/', (req, res) => {
    return res.json({ message: "Hello" });
});

// req.query = acesso aos query params (para filtros)
routes.get('/users', (req, res) => {
    return res.json({ idade: req.query.idade });
});

// req.body = acesso ao corpo da requisicao (criacao, edicao)
routes.post('/users', (req, res) => {
    return res.json(req.body);
});

// req.params = acesso route params (para editar, delete)
routes.put('/users/:id', (req, res) => {
    return res.json({ id: req.params.id });    
});


module.exports = routes;