import express from 'express';
import "dotenv/config";
import conn from "./config/dbconfig.js";

const app = express();

import palestranteModel from './model/palestrante.js';

app.listen(8080, () => {
    console.log("Server open in port 8080")
})