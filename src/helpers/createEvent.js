const validateEvent = (req, res, next) => {
    const {titulo, data_evento, palestrantes} = req.body;

    if(!titulo){
        return res.status(400).json("Informe o titulo do evento");
    }
    if(!data_evento){
        return res.status(400).json("Informe a data_evento do evento");
    }
    if(palestrantes.length == 0){
        return res.status(400).json("O evento precisa ter ao menos um palestrante");
    }

    next();
}

export default validateEvent;