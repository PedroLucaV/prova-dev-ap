import express, { urlencoded } from 'express';
import "dotenv/config";
import conn from "./config/dbconfig.js";
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

import palestranteModel from './model/palestrante.js';

import rotas from './routes/mainRoute.js';

app.use(('/eventos'), rotas);

app.use('*', (req,res) => {
    res.send("505")
})

app.listen(8080, () => {
    console.log("Server open in port 8080")
})