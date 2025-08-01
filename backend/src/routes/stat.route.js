import { Router } from "express";

import {
    getStats
} from "../controllers/stat.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute, requireAdmin);

router.get("/", getStats);

export default router;