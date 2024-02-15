const express = require("express")
const app = express()
const {Event} = require("./models")
const bodyParser = require("body-parser")
app.use(express.json())
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
        // res.redirect("/");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error creating event");
    }
});
module.exports = app;