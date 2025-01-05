import request from "supertest"
import app from "../app"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
    
    await prisma.job.deleteMany();
    
  
    await prisma.category.deleteMany(); 
  });
  
  afterAll(async () => {
    await prisma.$disconnect(); 
  });


describe("GET /api/jobs/featured", () => {
  it("returns featured jobs", async () => {
    const res = await request(app).get("/api/jobs/featured");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ featured: true }),
      ])
    );
  });
});


describe('GET /api/categories', () => {
    it('should return all categories', async () => {
      // Create some categories before testing
      await prisma.category.create({
        data: { name: 'Software' },
      });
      await prisma.category.create({
        data: { name: 'Design' },
      });

      const response = await request(app).get('/api/categories');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'Software' }),
          expect.objectContaining({ name: 'Design' }),
        ])
      );
});
});

describe("database queries",()=>{
    it('should fetch jobs from the database', async () => {
       
        const jobs = await prisma.job.findMany();
        
        
        expect(jobs).toBeDefined();
        expect(jobs.length).toBeGreaterThan(0);
      });
})