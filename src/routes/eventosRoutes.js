import { Router } from "express";

const router = Router();

import { criarEvento, agendaEventos, inscrever, feedback, mostPopular, minhasInsc, cancelarEvento, editarEvento, mostActive } from "../controllers/eventosController.js";
import validateEvent from "../helpers/createEvent.js";
import palestrantesRotas from './palestranteRoutes.js'
import participantesRotas from './participantesRoutes.js'

router.use('/palestrantes', palestrantesRotas);
router.post('/criar', validateEvent, criarEvento);
router.get('/agenda', agendaEventos);
router.use('/participantes', participantesRotas)
router.post('/inscrever', inscrever)
router.post('/feedback', feedback)
router.get('/mais-popular', mostPopular)
router.get('/meus-eventos/:participanteId', minhasInsc)
router.delete('/cancelar', cancelarEvento)
router.put('/editar', validateEvent, editarEvento)
router.get('/palestrante-mais-ativo', mostActive)

export default router;