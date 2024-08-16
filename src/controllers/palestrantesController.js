import conn from "../config/dbconfig.js";

import { v4 as uuidv4 } from 'uuid';

export const registrarPalestrante = (req, res) => {
    const {nome, expertise} = req.body;

    if(!nome){
        return res.status(400).json("O campo de nome não pode ser vazio")
    }

    if(!expertise){
        return res.status(400).json("O campo de expertise não pode ser vazio")
    }

    const checkSql = /*sql*/ `
        SELECT * FROM palestrantes
        WHERE ?? = ?
    `
    const dataSql = ['nome', nome];

    conn.query(checkSql, dataSql, async (err, data) => {
        if(err){
            console.error(err)
            return res.status(500).json("Erro ao buscar dados");
        }

        if(data.length > 0){
            return res.status(409).json("Este palestrante já existe!");
        }

        const id = uuidv4();
        const createUser = /*sql*/ `
            INSERT INTO palestrantes(??, ??, ??)
            VALUES(?, ?, ?)
        `
        const dataValues = ["id_palestrante", "nome", "expertise", id, nome, expertise];
        conn.query(createUser, dataValues, (err) => {
            if(err){
                res.status(500).json("Ocorreu um erro na criação!")
                return console.error(err);
            }

            res.status(201).json(`Palestrante ${nome} foi adicionado com sucesso!`)
        })
    })
}

export const puxarPalestrante = (req, res) => {
    const selectQuery = /*sql*/ `
        SELECT * FROM palestrantes
    `
    conn.query(selectQuery, (err, data) => {
        if(err){
            res.status(500).json("Ocorreu um erro na criação!")
            return console.error(err);
        }
        res.status(200).json(data)
    })
}