import conn from "../config/dbconfig.js";

const eventosModel = /*sql*/ `
    CREATE TABLE IF NOT EXISTS eventos(
        id_evento VARCHAR(60) PRIMARY KEY NOT NULL,
        titulo VARCHAR(200) NOT NULL,
        data_evento date NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`

conn.query(eventosModel, (err, table) => {
    if(err){
        return console.error(err);
    }
    if(table.warningStatus < 1){
        console.log("Tabela eventos criada!")  
    }
})

export default eventosModel