import { prisma } from "../src/database.js";
import supertest from 'supertest';
import app from '../src/app.js';


describe("POST /recommendations/:id/upvote", () => {
    it("return 200 when the id is correct", async () => {
        let id = 1;
        let recommendation = await prisma.recommendation.findUnique({
            where: {
                id: id
            }
        });
        let beforeLike = recommendation.score;
        let result = await supertest(app).post(`/recommendations/${id}/upvote`)
        let status = result.status;
        let afterRecommendation = await prisma.recommendation.findUnique({
            where: {
                id: id
            }
        });
        let afterLike = afterRecommendation.score;
        
        expect(afterLike).toEqual(beforeLike + 1);
        expect(status).toEqual(200);
        
    });
    it("return 404 when the id don't exist", async () => {
        let wrongId = 999;
        let result = await supertest(app).post(`/recommendations/${wrongId}/upvote`);
        let status = result.status;

        expect(status).toEqual(404);
    })
});

describe("POST /recommendations/:id/downvote", () => {
    it("return 200 when the id is correct", async () => {
        let id = 1;
        let recommendation = await prisma.recommendation.findUnique({
            where: {
                id: id
            }
        });
        let beforeDislike = recommendation.score;
        let result = await supertest(app).post(`/recommendations/${id}/downvote`)
        let status = result.status;
        let afterRecommendation = await prisma.recommendation.findUnique({
            where: {
                id: id
            }
        });
        let afterDislike = afterRecommendation.score;
        
        expect(afterDislike).toEqual(beforeDislike - 1);
        expect(status).toEqual(200);
    })
    it("return 404 when the id don't exist", async () => {
        let wrongId = 999;
        let result = await supertest(app).post(`/recommendations/${wrongId}/downvote`);
        let status = result.status;

        expect(status).toEqual(404);
    })
    it("delete recommendation when score is lower then -5", async () => {
        let id = 3;
        let result = await supertest(app).post(`/recommendations/${id}/downvote`);
        let status = result.status;
        let deleted = await prisma.recommendation.findUnique({
            where: {
                id: id
            }
        });
        expect(status).toEqual(200);
        expect(deleted).toBeNull();
    })
})


afterAll(async () => {
    await prisma.$disconnect();
});