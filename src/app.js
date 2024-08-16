import express, { urlencoded } from 'express';
import "dotenv/config";
import conn from "./config/dbconfig.js";
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

import palestranteModel from './model/palestrante.js';
import eventosModel from './model/eventos.js';
import inscricao from './model/inscricao.js';
import palestranteEvento from './model/idPalestrantes.js';
import participantesModel from './model/participantes.js';
import feedback from './model/feedback.js';

import rotas from './routes/eventosRoutes.js';

app.use(('/eventos'), rotas);

app.use('*', (req,res) => {
    res.send("404")
})

app.listen(8080, () => {
    console.log("Server open in port 8080")
})