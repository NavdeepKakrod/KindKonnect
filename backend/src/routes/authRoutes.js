import express from "express";
const router = express.Router();
import { registerNGO, loginNGO, registerUser, loginUser } from"../controllers/authController.js";

router.post('/register/ngo', registerNGO);
router.post('/login/ngo', loginNGO);
router.post('/register/user', registerUser);
router.post('/login/user', loginUser);

export default router;
