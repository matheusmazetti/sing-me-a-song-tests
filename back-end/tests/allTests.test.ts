import { prisma } from "../src/database.js";
import supertest from 'supertest';
import app from '../src/app.js';
import createRecommendation from "./factories/recomendationFactory.js";

describe("POST /recommendations", () => {
    it("recive 201 when the object is correct", async () => {
        let body = createRecommendation();

        let result  = await supertest(app).post("/recommendations").send(body);
        let status = result.status
        let newRecommendation = await prisma.recommendation.findUnique({
            where: {
                name: body.name
            }
        });
        expect(newRecommendation).not.toBeNull();
        expect(status).toEqual(201);
    });
    it("return 409 when the name already exist", async () => {
        let body = {
            name: "test1",
            youtubeLink: "https://www.youtube.com/watch?v=05SILbfCpSA"
        }

        let result  = await supertest(app).post("/recommendations").send(body);
        let status = result.status
        expect(status).toEqual(409);
    });

})

afterAll(async () => {
    await prisma.$disconnect();
});