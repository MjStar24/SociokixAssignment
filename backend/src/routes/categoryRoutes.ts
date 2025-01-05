import { Router } from "express";
import category from "../controllers/category";

const router:Router=Router();

router.get("/",category.getCategories);
router.post("/create",category.createCategories);

export default router;
