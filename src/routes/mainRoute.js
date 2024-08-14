import { Router } from "express";

const router = Router();

import palestrantesRotas from './palestranteRoutes.js'

router.use('/palestrantes', palestrantesRotas);

export default router;