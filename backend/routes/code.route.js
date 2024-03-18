import { Router } from "express";
import submission from "../controllers/submission.controller.js";

const router = Router();

router.post('/page1', submission.executeCode);
router.get('/page2', submission.getSubmissions);

export default router;