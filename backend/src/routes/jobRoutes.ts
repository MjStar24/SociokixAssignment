import { Router } from "express";
import job from "../controllers/job";

const router:Router=Router();

router.post("/apply",job.applyForJob);
router.get("/featured",job.getFeaturedJob);

export default router;