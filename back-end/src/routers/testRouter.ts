import { Router } from "express";
import { testsController } from "../controllers/testsController.js";

const router = Router();

router.post("/reset-database", testsController.resetDatabase);
router.post("/seed", testsController.seed);

export default router;