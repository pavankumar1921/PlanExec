const request = require("supertest");
const db = require("../models/index");
const app = require("../app");
const jwt = require("jsonwebtoken");

let server, agent, token;

describe("PlanExec test suite", () => {
    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
        server = app.listen(7000);
        agent = request.agent(server);
    });

    afterAll(async () => {
        try {
            await db.sequelize.close();
            await server.close();
        } catch (err) {
            console.log(err);
        }
    });

    test("Test for signup", async () => {
        const res = await agent.post("/signup").send({
            name: "testUser",
            email: "test@gmail.com",
            password: "abcd12345"
        });
        expect(res.statusCode).toBe(200);
    });

    test("Test for signin", async () => {
        const res = await agent.post("/signin").send({
            email: "test@gmail.com",
            password: "abcd12345"
        });
        expect(res.statusCode).toBe(200);
        token = res.body.token;
        agent.set("Authorization", `Bearer ${token}`);
    });

    test("Test for creating an event", async () => {
        const eventData = { eventName: "concert", venue: "test venue" };
        try {
            const res = await agent.post("/createEvent").send(eventData);
            expect(res.status).toBe(201);
        } catch (err) {
            console.log(err);
        }
    });

    test("Test for fetching all events", async () => {
        try {
            const res = await agent.get("/allEvents");
            expect(res.status).toBe(200);
        } catch (err) {
            console.log(err);
        }
    });
});
