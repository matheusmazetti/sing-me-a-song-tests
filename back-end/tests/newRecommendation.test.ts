import { prisma } from "../src/database.js";
import supertest from 'supertest';
import app from '../src/app.js';
import { factory } from "./factories/recomendationFactory.js";
import { faker } from "@faker-js/faker";


describe("POST /recommendations", () => {
    it("recive 201 when the object is correct", async () => {
        let body = factory.createRecommendation();

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
        let body = factory.createRecommendation();
        await supertest(app).post("/recommendations").send(body);
        let result  = await supertest(app).post("/recommendations").send(body);
        let status = result.status
        expect(status).toEqual(409);
    });
    it("return 422 when the object is wrong", async () => {
        let body = {
            names: faker.music.songName(),
            youtubeLink: "https://www.youtube.com/watch?v=05SILbfCpSA"
        }

        let result  = await supertest(app).post("/recommendations").send(body);
        let status = result.status
        expect(status).toEqual(422);
    });
    it("return 422 when the link is not from youtube", async () => {
        let body = {
            name: faker.music.songName(),
            youtubeLink: "https://www.google.com/watch?v=05SILbfCpSA"
        }

        let result  = await supertest(app).post("/recommendations").send(body);
        let status = result.status
        expect(status).toEqual(422);
    });

})

afterAll(async () => {
    await prisma.$disconnect();
});