import conn from "../config/dbconfig.js";

const palestranteModel = /*sql*/ `
    CREATE TABLE IF NOT EXISTS palestrantes(
        id_palestrante VARCHAR(60) PRIMARY KEY NOT NULL,
        nome VARCHAR(255) NOT NULL,
        expertise VARCHAR(60) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`

conn.query(palestranteModel, (err, table) => {
    if(err){
        return console.error(err);
    }
    if(table.warningStatus < 1){
        console.log("Tabela palestrantes criada!")  
    }
})

export default palestranteModel