import { Router } from "express";

const router = Router();

import { criarEvento, agendaEventos } from "../controllers/eventosController.js";
import palestrantesRotas from './palestranteRoutes.js'
import participantesRotas from './participantesRoutes.js'

router.use('/palestrantes', palestrantesRotas);
router.use('/criar', criarEvento);
router.use('/agenda', agendaEventos);
router.use('/participantes', participantesRotas)
router.use('/inscrever', inscrever)

export default router;