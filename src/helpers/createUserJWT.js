import jwt from 'jsonwebtoken';

const createUserToken = async (user, req, res) => {
    const token = jwt.sign(
        {
            nome: user.nome,
            id: user.id_participante
        },
        "SENHASEGURA"
    )

    res.status(200).json({
        message: "Logado!",
        token,
        usuarioId: user.id_participante
    })
}

export default createUserToken;