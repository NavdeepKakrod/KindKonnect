import express from "express";
import {
  createPost,
  getAllPosts,
  getMyPosts,
  donateToPost,
  volunteerForPost,
} from "../controllers/postController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
 
router.get("/get", getAllPosts);

router.get("/get/my",protect, getMyPosts);

router.post("/create", protect, createPost);
 
router.post("/donate", protect, donateToPost);
 
router.post("/volunteer", protect, volunteerForPost);

export default router;
