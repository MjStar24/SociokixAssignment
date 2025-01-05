import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();
class JobController{
    async getFeaturedJob(req:Request,res:Response){
        try {
            const { category } = req.query;
        
            const jobs = await prisma.job.findMany({
              where: {
                featured: true,
                ...(category && { category: { name: String(category) } }),
              },
              include: { category: true },
            });
        
            res.status(200).json(jobs);
          } catch (error) {
            res.status(500).json({ error: "Failed to fetch featured jobs." });
          }
    }

    async applyForJob(req: Request, res: Response) {
          try {
            const {title,company,location,salary,categoryId,featured}=req.body;
            if(!title || !company || !location || !salary || !categoryId || !featured) res.status(400).json("Requireds fields are missing")
            
            const categoryExists = await prisma.category.findUnique({
                where: { id: categoryId },
            });

            if (!categoryExists) {
              res.status(400).json({ message: "Invalid category ID" });
          }

          const job = await prisma.job.create({
            data: {
                title,
                company,
                location,
                salary,
                featured,
                categoryId,
            },
            include: {
                category: true, 
            },
        });

        res.status(201).json({ message: "Job successfully applied for", job });
        
        } catch (error) {
          console.error("Error in applyForJob:", error);
          res.status(500).json({ error: "Failed to submit job application." });
        }
      }

}

export default new JobController();
