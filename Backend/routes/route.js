import { Router } from "express";
import { login, register } from "../controllers/user.controller.js";
import { tradeController } from "../controllers/trade.controller.js";
import { getPositionsController } from "../controllers/lot.controller.js";
import { getRealizedPnL } from "../controllers/realize.controller.js";

const router = Router()

router.post("/register", register);
router.post("/login",login)
router.post("/trades",tradeController)
router.get("/positions", getPositionsController);
router.get("/realized-pnl", getRealizedPnL);

export default router;