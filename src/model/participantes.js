import conn from "../config/dbconfig.js";

const participantesModel = /*sql*/ `
    CREATE TABLE IF NOT EXISTS participantes(
        id_participante VARCHAR(60) PRIMARY KEY NOT NULL,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(100) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`

conn.query(participantesModel, (err, table) => {
    if(err){
        return console.error(err);
    }
    if(table.warningStatus < 1){
        console.log("Tabela participantes criada!")  
    }
})

export default participantesModel