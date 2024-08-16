import conn from "../config/dbconfig.js";
import { v4 as uuidv4 } from 'uuid';

export const registarPartcipantes = (req, res) => {
    const {nome, email} = req.body;
    const validateSql = /*sql*/ `
        SELECT * FROM participantes
        WHERE ?? = ?
    `
    
    const checkVal = ["email", email];
    conn.query(validateSql, checkVal, async (err, data) => {
        if(err){
            res.status(500).json("Ocorreu um erro na criação!")
            return console.error(err);
        }

        if(data.length > 0){
            return res.status(400).json('Já existe um usuario com este email!');
        }
        
        const id = uuidv4();
        const createUser = /*sql*/ `
            INSERT INTO participantes(??, ??, ??)
            VALUES(?, ?, ?)
        `
        const dataValues = ["id_participante", "nome", "email", id, nome, email];
        conn.query(createUser, dataValues, (err) => {
            if(err){
                res.status(500).json("Ocorreu um erro na criação!")
                return console.error(err);
            }
            
            const usuarioSQL = /*sql*/ `
                SELECT * FROM participantes
                WHERE ?? = ?
            `
            const userData = ['id_participante', id];

            conn.query(usuarioSQL, userData, async (err, data) => {
                if(err){
                    res.status(500).json("Ocorreu um erro na busca!")
                    return console.error(err);
                }

                res.status(201).json("Usuario criado!")
            })
        })
    })
}