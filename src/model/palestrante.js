import conn from "../config/dbconfig.js";

const palestranteModel = `
    CREATE TABLE IF NOT EXISTS palestrante(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    expertise VARCHAR(60) NOT NULL)
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