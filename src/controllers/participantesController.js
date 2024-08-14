import conn from "../config/dbconfig.js";
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import createUserToken from "../helpers/createUserJWT.js";

export const registarPartcipantes = (req, res) => {
    const {nome, email, senha} = req.body;
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
        
        const salt = await bcrypt.genSalt(12);

        const senhaHash = await bcrypt.hash(senha, salt);
        const id = uuidv4();
        const createUser = /*sql*/ `
            INSERT INTO participantes(??, ??, ??, ??)
            VALUES(?, ?, ?, ?)
        `
        const dataValues = ["id_participante", "nome", "email", "senha", id, nome, email, senhaHash];
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

                const usuario = data[0];

                try {
                    await createUserToken(usuario, req, res);
                }catch(error){
                    console.error(error)
                }
            })
        })
    })
}