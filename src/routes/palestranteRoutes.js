import { Router } from "express";

import { registrarPalestrante, puxarPalestrante } from "../controllers/palestrantesController.js";

const router = Router();

router.post('/', registrarPalestrante);
router.get('/', puxarPalestrante);

export default router;