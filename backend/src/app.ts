import express ,{Application} from "express";
import cors from "cors";
import dotenv from "dotenv";
import categoryRoutes from "./routes/categoryRoutes";
import jobRoutes from "./routes/jobRoutes";

dotenv.config();


const app:Application=express();
app.use(cors({origin: "*"}));
app.use(express.json());



app.use("/api/jobs",jobRoutes);
app.use("/api/categories",categoryRoutes);

export default app;