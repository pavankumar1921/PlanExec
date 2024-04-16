const request = require("supertest");
const db = require("../models/index");
const app = require("../app");
const jwt = require("jsonwebtoken");

let server, agent;

describe("PlanExec test suite", () => {
    let authToken
    beforeAll(async () => {
        server = app.listen(7000,()=>{});
        agent = request.agent(server);
        authToken = jwt.sign({ id: 1 }, process.env.JWT_SECRET, { expiresIn: "1h" });
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
        try{
            const res = await request(server)
            .post("/createEvent")
            .set("Authorization", `Bearer ${authToken}`)
            .send({ eventData });
            expect(res.status).toBe(200);
        }catch (err) {
            console.log(err);
        }
        
       
    });

    test("Test for fetching all events", async () => {
            const res = await request(server)
            .get("/allEvents")
            .set("Authorization", `Bearer ${authToken}`);
            expect(res.status).toBe(200);
    });
});
