import express from "express";
const router = express.Router();
import { registerNGO, loginNGO, registerUser, loginUser } from"../controllers/authController.js";

router.post('/register/ngo', registerNGO);
router.get('/login/ngo', loginNGO);
router.post('/register/user', registerUser);
router.get('/login/user', loginUser);

export default router;
