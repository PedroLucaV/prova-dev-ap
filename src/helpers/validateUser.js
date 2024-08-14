const validarUsuario = (req, res, next) => {
    const {nome, email, senha, confirmSenha} = req.body;

    if(!nome){
        return res.status(400).json('O campo nome não pode ser vazio');
    }
    if(!email){
        return res.status(400).json('O campo email não pode ser vazio');
    }
    if(!senha){
        return res.status(400).json('O campo senha não pode ser vazio');
    }
    if(!confirmSenha){
        return res.status(400).json('O campo confirmar senha não pode ser vazio');
    }

    if(!email.includes('@')){
        return res.status(409).json('Deve conter um @ no email!')
    }
    
    if(confirmSenha != senha){
        return res.status(409).json('As senhas diferem!')
    }

    next()
}

export default validarUsuario;