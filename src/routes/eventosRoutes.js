import { Router } from "express";

const router = Router();

import { criarEvento, agendaEventos, inscrever } from "../controllers/eventosController.js";
import palestrantesRotas from './palestranteRoutes.js'
import participantesRotas from './participantesRoutes.js'

router.use('/palestrantes', palestrantesRotas);
router.post('/criar', criarEvento);
router.get('/agenda', agendaEventos);
router.post('/participantes', participantesRotas)
router.post('/inscrever/:id', inscrever)

export default router;