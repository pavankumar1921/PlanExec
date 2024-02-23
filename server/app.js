const express = require("express")
const app = express()
const cors = require("cors");
const {Event} = require("./models")
const bodyParser = require("body-parser")
app.use(express.json())
app.use(cors())
app.set("view engine","ejs")
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));


app.get("/", async(req,res) =>{
    try{
        const events = await Event.getEvents()
        res.render("home",{events})
    }catch(err){
        console.log(err)
    }
})


app.get("/createEvent",async(req,res) => {
    try{
        res.render("createEvent")
    }catch(err){console.log(err)}
})

app.post("/createEvent", async (req, res) => {
    try {
        const eventName = req.body.eventName;
        console.log(eventName)
        const venue = req.body.venue;
        const event = await Event.create({
            eventName,
            venue
        });

        console.log(event);
        res.status(201).json({message:"Event created successfully"})
    } catch (err) {
        console.log(err);
        res.status(500).send("Error creating event");
    }
});

app.get("/allEvents",async(req,res)=>{
    try{
        const events = await Event.getEvents()
        res.status(200).json(events)
        console.log(events)
    }catch(error){
        console.log(error)
        res.status(500).json({error:error})
    }
})

module.exports = app;