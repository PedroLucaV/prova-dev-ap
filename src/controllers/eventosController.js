import conn from "../config/dbconfig.js";
import { v4 as uuidv4 } from 'uuid';

export const criarEvento = (req, res) => {
    const {titulo, data_evento, palestrantes} = req.body;

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
            INSERT INTO eventos(??, ??, ??)
            VALUES(?, ?, ?)
        `
        const id = uuidv4();
        const dataEvents = ['id_evento', 'titulo', 'data_evento', id, titulo, data_evento];

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

export const agendaEventos = (req, res) => {
    const eventos = [];
    const selectSQL = /*sql*/ `
        SELECT * FROM eventos
    ` 
    conn.query(selectSQL, (err, data) => {
        data.forEach(evento => {
            let current;
            current = evento;
            evento.palestrante = [];

            const selectSQL = /*sql*/ `SELECT id_palestrante from palestranteevento where ?? = ?`
            const dataM = ['id_evento', evento.id_evento]
            conn.query(selectSQL, dataM, (err, data) => {
                data.forEach(palestrante => {
                    const selectSQL = /*sql*/ `SELECT nome, expertise from palestrantes where ?? = ?`
                    const dataM = ['id_palestrante', palestrante.id_palestrante]
                    conn.query(selectSQL, dataM, (err, data) => {
                        evento.palestrante.push(data[0])
                    })
                })
            })
        })
    })
}

export const inscrever = (req, res) => {
    const {idParticipante, idEvento} = req.body;
    
    const validateExistiying = /*sql*/ `
        SELECT * FROM participantes
        WHERE ?? = ?
    `
    const dataVali = ["id_participante", idParticipante]
    conn.query(validateExistiying, dataVali, (err, data) => {
        if(err){
            res.status(500).json("Ocorreu um erro!")
            return console.error(err)
        }
        if(data.length == 0){
            return res.status(400).json("Não existe usuario com este id")
        }
        const validateExistiying = /*sql*/ `
        SELECT * FROM eventos
        WHERE ?? = ?
        `
        const dataVali = ["id_evento", idEvento]
        conn.query(validateExistiying, dataVali, (err, data) => {
            if(err){
                res.status(500).json("Ocorreu um erro!")
                return console.error(err)
            }
            if(data.length == 0){
                return res.status(400).json("Não existe evento com este id")
            }

            const inscrever = /*sql*/ `
                INSERT INTO inscricao(??, ??)
                VALUES(?, ?)
            `
            const inscData = ['id_participante', 'id_evento', idParticipante, idEvento]
            conn.query(inscrever, inscData, (err) => {
                if(err){
                    res.status(500).json("Ocorreu um erro!")
                    return console.error(err)
                }
                res.status(201).json("Inscrição realizada com sucesso")
            })
        })
    })
}

export const feedback = (req, res) => {
    const {idParticipante, idEvento, nota, comentario} = req.body;

    if(!comentario){
        return res.status(400).json("Informe um comentario para o evento");
    }

    if(!nota){
        return res.status(400).json("Informe uma nota para o evento");
    }
    
    const validateExistiying = /*sql*/ `
        SELECT * FROM participantes
        WHERE ?? = ?
    `

    const dataVali = ["id_participante", idParticipante]
    conn.query(validateExistiying, dataVali, (err, data) => {
        if(err){
            res.status(500).json("Ocorreu um erro!")
            return console.error(err)
        }
        if(data.length == 0){
            return res.status(400).json("Não existe usuario com este id")
        }
        const validateExistiying = /*sql*/ `
        SELECT * FROM eventos
        WHERE ?? = ?
        `
        const dataVali = ["id_evento", idEvento]
        conn.query(validateExistiying, dataVali, (err, data) => {
            if(err){
                res.status(500).json("Ocorreu um erro!")
                return console.error(err)
            }
            if(data.length == 0){
                return res.status(400).json("Não existe evento com este id")
            }

            if(isNaN(nota) || nota < 0 || nota > 10){
                return res.status(404).json("Não é possivel colocar esta nota! Por favor informe uma nota de 0 a 10!")
            }

            const inscrever = /*sql*/ `
                INSERT INTO feedback(??, ??, ??, ??)
                VALUES(?, ?, ?, ?)
            `
            const inscData = ['id_participante', 'id_evento', 'nota', 'comentario', idParticipante, idEvento, nota, comentario]
            conn.query(inscrever, inscData, (err) => {
                if(err){
                    res.status(500).json("Ocorreu um erro!")
                    return console.error(err)
                }
                res.status(201).json("Feedback realizado com sucesso!")
            })
        })
    })
}

export const mostPopular = (req, res) => {
    const selectSQL = /*sql*/ `
        SELECT COUNT(id_participante) AS inscricoes, id_evento 
        FROM inscricao 
        GROUP BY id_evento 
        ORDER BY inscricoes DESC;
    `
    conn.query(selectSQL, (err, data) => {
        if(err){
            res.status(500).json("Ocorreu um erro!")
            return console.error(err)
        }

        if(data == 0){
            return res.status(404).json("Não há nenhuma inscrição em evento!")
        }

        const mostPopular = data[0];

        const selectSQL = /*sql*/ `
            SELECT * FROM eventos
            WHERE ?? = ?
        `
        const dataVali = ['id_evento', mostPopular.id_evento];
        conn.query(selectSQL, dataVali, (err, data) => {
            if(err){
                res.status(500).json("Ocorreu um erro!")
                return console.error(err)
            }

            data[0].inscricoes = mostPopular.inscricoes
            res.status(200).json(data[0])
        })
    })
}

export const minhasInsc = (req, res) => {
    const {participanteId} = req.params;

    const selectSQL = /*sql*/ `
        SELECT * FROM participantes
        WHERE ?? = ?
    `
    const dataVali = ['id_participante', participanteId];
    conn.query(selectSQL, dataVali, (err, data) => {
        if(err){
            res.status(500).json("Ocorreu um erro!")
            return console.error(err)
        }

        if(data == 0){
            return res.status(404).json("Não há nenhum usuario com este id!")
        }

        const selectSQL = /*sql*/ `
        SELECT id_evento
        FROM inscricao
        WHERE ?? = ?
        `
        const dataVali = ['id_participante', participanteId];

        conn.query(selectSQL, dataVali, (err, data) => {
            if(err){
                res.status(500).json("Ocorreu um erro!")
                return console.error(err)
            }

            if(data == 0){
                return res.status(404).json("Você não se inscreveu em nenhum evento!")
            }

            const eventos = [];
            data.map(evento => eventos.push(evento.id_evento))
            res.status(200).json(eventos)
        })
    })
}

export const cancelarEvento = (req, res) => {
    const {eventoId} = req.body
    if(!eventoId){
        return res.status(400).json("Informe o id do evento a ser deletado");
    }
    const sql = /*sql*/ `
        DELETE from palestranteevento WHERE ?? = ?;
        DELETE from inscricao WHERE ?? = ?;
        DELETE from feedback WHERE ?? = ?;
    `

    const data = ['id_evento', eventoId,'id_evento', eventoId,'id_evento', eventoId];

    conn.query(sql, data, (err) => {
        if(err){
            res.status(500).json("Ocorreu um erro!")
            return console.error(err)
        }

        const sqlDelete = /*sql*/ `
            DELETE FROM eventos WHERE ?? = ?;
        `
        const data = ['id_evento', eventoId]
        conn.query(sqlDelete, data, (err) => {
            if(err){
                res.status(500).json("Ocorreu um erro!")
                return console.error(err)
            }
            res.status(204).end()
        })
    })
}

export const editarEvento = (req, res) => {
    const {titulo, data_evento, palestrantes, eventoId} = req.body;

    if(!eventoId){
        return res.status(404).json("Informe o ID do evento!");
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

        const updateEvents = /*sql*/ `
            UPDATE eventos
            SET ?? = ?, ?? = ?
            WHERE id_evento = "${eventoId}"
        `
        const dataEvents = ["titulo", titulo, "data_evento", data_evento];

        conn.query(updateEvents, dataEvents, (err) => {
            if(err){
                console.error(err)
                return res.status(500).json("Erro na hora de buscar dados");
            }
            let v=0;
            palestrantes.forEach(palestrante => {
                v++
                const createPalestEvent = /*sql*/ `
                    UPDATE palestranteevento
                    SET ?? = ?, ?? = ?
                    WHERE id_evento = "${eventoId}"
                `
                const datas = ["id_palestrante", palestrante, "id_evento", eventoId]
                conn.query(createPalestEvent, datas, (err) => {
                    if(err){
                        console.error(err)
                        return res.status(500).json("Erro na hora de buscar dados");
                    }

                    if(v == palestrantes.length){
                        res.status(200).json("Evento atualizado!")
                    }
                })
            })
        })
    })
}

export const mostActive = (req, res) => {
    const selectSQL = /*sql*/ `
        SELECT COUNT(id_evento) AS atividade, id_palestrante
        FROM palestranteevento
        GROUP BY id_palestrante 
        ORDER BY atividade DESC;
    `
    conn.query(selectSQL, (err, data) => {
        if(err){
            res.status(500).json("Ocorreu um erro!")
            return console.error(err)
        }

        if(data == 0){
            return res.status(404).json("Não há nenhuma inscrição em evento!")
        }

        const mostActive = data[0];

        const selectSQL = /*sql*/ `
            SELECT * FROM palestrantes
            WHERE ?? = ?
        `
        const dataVali = ['id_palestrante', mostActive.id_palestrante];
        conn.query(selectSQL, dataVali, (err, data) => {
            if(err){
                res.status(500).json("Ocorreu um erro!")
                return console.error(err)
            }

            data[0].atividade = mostActive.atividade
            res.status(200).json(data[0])
        })
    })
}