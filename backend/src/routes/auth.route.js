import { Router } from "express";
import {
    // signup,
    // login,
    // logout,
    // updateProfile,
    // checkAuth,
    callback,
} from "../controllers/auth.controller.js";
// import {
//     protectRoute,
// } from "../middleware/auth.middleware.js";

const router = Router();

// router.post("/signup", signup);
// router.post("/login", login);
// router.post("/logout", logout);
// router.post("/update-profile", updateProfile);
// router.get("/check", protectRoute, checkAuth);
router.post("/callback", callback);


export default router;