import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();

class CategoryController{
    async getCategories(req:Request,res:Response){
        try {
            
            const categories = await prisma.category.findMany();
            if(!categories) res.json({message:"No categories foun"}) 
            res.status(200).json(categories);
          } catch (error) {
            res.status(500).json({ error: "Failed to fetch categories." });
          }
    }

    async createCategories(req:Request,res:Response){
        try{
            const {categoryName}=req.body;
            if(!categoryName) res.json({message:"No category name"})
            const category = await prisma.category.create({
                data:{
                    name:categoryName
                }
            })
            
            if(category) res.status(200).json(category);
            else res.json("Category not created");
        }catch(e){
           
            res.status(500).json("Cannot create category");
        }
    }
}

export default new CategoryController();