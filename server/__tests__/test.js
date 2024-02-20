const request = require("supertest")
const db = require("../models/index")
const app = require("../app")

let server
describe("test suite ", () => {
    beforeAll(async() => {
        server = app.listen(7000,()=> {})
        agent = request.agent(server)
    })
    afterAll(async() => {
        try{
            await db.sequelize.close()
            await server.close()
        }catch(err){
            console.log(err)
        }
    })

    test("frst",()=>{
        expect(true).toBe(true)
    })

    test("creating an event", async () => {
        const eventData = { eventName: "concert", venue: "test venue" };
        try {
            const res = await request(server).post("/createEvent").send(eventData);
            expect(res.status).toBe(302);
        } catch (err) {
            console.log(err);
        }
    });
})