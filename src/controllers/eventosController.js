import conn from "../config/dbconfig.js";
import { v4 as uuidv4 } from 'uuid';

export const criarEvento = (req, res) => {
    const {titulo, data_evento, palestrantes} = req.body;
    
    if(!titulo){
        return res.status(400).json("Informe o titulo do evento");
    }
    if(!data_evento){
        return res.status(400).json("Informe a data_evento do evento");
    }
    if(palestrantes.length == 0){
        return res.status(400).json("O evento precisa ter ao menos um palestrante");
    }

    const selectSQL = /*sql*/ `
        SELECT * FROM palestrantes
    `

    conn.query(selectSQL, (err, data) => {
        if(err){
            console.error(err)
            return res.status(500).json("Erro na hora de buscar dados");
        }
        let c = 0;
        const usuarios = data;
        palestrantes.map(id => {
            if(!usuarios.some(user => user.id_palestrante == id)){
                return c = 1
            }
        })
        
        if(c == 1){
            return res.status(400).json("Este palestrante não existe em nossa base de dados!")
        }

        const createEvent = /*sql*/ `
            INSERT INTO eventos(??, ??)
            VALUES(?, ?)
        `
        const id = uuidv4();
        const dataEvents = ['id_evento', 'data_evento', id, data_evento];

        conn.query(createEvent, dataEvents, (err) => {
            if(err){
                console.error(err)
                return res.status(500).json("Erro na hora de buscar dados");
            }
            let v=0;
            palestrantes.forEach(palestrante => {
                v++
                const createPalestEvent = /*sql*/ `
                    INSERT INTO palestranteevento (??, ??)
                    VALUES(?, ?)
                `
                const datas = ['id_palestrante', 'id_evento', palestrante, id]
                conn.query(createPalestEvent, datas, (err) => {
                    if(err){
                        console.error(err)
                        return res.status(500).json("Erro na hora de buscar dados");
                    }

                    if(v == palestrantes.length){
                        res.status(201).json("Evento criado!")
                    }
                })
            })
        })
    })
}

export const agendaEventos = () => {
    const selectSQL = /*sql*/ `
        
    `
}

const inscrever = (req, res) => {
    try{
        const token = getToken(req);
        const user = await getUserByToken(token);
    }
}