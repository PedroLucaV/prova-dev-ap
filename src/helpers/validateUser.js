const validarUsuario = (req, res, next) => {
    const {nome, email} = req.body;

    if(!nome){
        return res.status(400).json('O campo nome não pode ser vazio');
    }
    if(!email){
        return res.status(400).json('O campo email não pode ser vazio');
    }

    if(!email.includes('@')){
        return res.status(409).json('Deve conter um @ no email!')
    }

    next()
}

export default validarUsuario;