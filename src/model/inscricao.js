import conn from "../config/dbconfig.js";

const inscricao = /*sql*/ `
    CREATE TABLE IF NOT EXISTS inscricao(
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        id_participante VARCHAR(60) NOT NULL,
        id_evento VARCHAR(60) NOT NULL,
        FOREIGN KEY(id_evento) REFERENCES eventos(id_evento),
        FOREIGN KEY(id_participante) REFERENCES participantes(id_participante)
    )
`;

conn.query(inscricao, (err, result, field) => {
    if(err){
        return console.error(err.stack);
    }
    if(result.warningStatus > 0){
        return;
    }
    console.log("Tabela inscricao criada com sucesso");
});

export default inscricao;