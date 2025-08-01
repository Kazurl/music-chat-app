import  { Router } from "express";

import {
    protectRoute,
} from "../middleware/auth.middleware.js";
import {
    getAllUsers,
    getMessages,
    sendMessage,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", protectRoute, getAllUsers);
router.get("/messages/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;