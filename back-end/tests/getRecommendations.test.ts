import { prisma } from "../src/database.js";
import supertest from 'supertest';
import app from '../src/app.js';

describe("GET /recommendations", () => {
    it("get max 10 recommendations", async () => {
        let result = await supertest(app).get("/recommendations")
        let object = result.body;
        expect(object.length).toBeLessThanOrEqual(10);
    })
})

describe("GET /recommendations/:id", () => {
    it("get a unique recommendation with the right id", async () => {
        let id = 2
        let result = await supertest(app).get(`/recommendations/${id}`);
        expect(result.body).not.toBeNull();
    })
    it("recive 404 when the id don't exist", async () => {
        let id = 999;
        let result = await supertest(app).get(`/recommendations/${id}`);
        let status = result.status;
        expect(status).toEqual(404);
    })
})