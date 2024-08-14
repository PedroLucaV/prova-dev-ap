import conn from "../config/dbconfig.js";

const palestranteEvento = /*sql*/ `
    CREATE TABLE IF NOT EXISTS palestranteEvento(
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        id_palestrante VARCHAR(60) NOT NULL,
        id_evento VARCHAR(60) NOT NULL,
        FOREIGN KEY(id_evento) REFERENCES eventos(id_evento),
        FOREIGN KEY(id_palestrante) REFERENCES palestrantes(id_palestrante)
    )
`;

conn.query(palestranteEvento, (err, result, field) => {
    if(err){
        return console.error(err.stack);
    }
    if(result.warningStatus > 0){
        return;
    }
    console.log("Tabela palestranteEvento criada com sucesso");
});

export default palestranteEvento;