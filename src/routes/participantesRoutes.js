import { Router } from "express";
import { registarPartcipantes } from "../controllers/participantesController.js";
import validarUsuario from "../helpers/validateUser.js";

const router = Router();

router.post('/registrar', validarUsuario, registarPartcipantes);

export default router;