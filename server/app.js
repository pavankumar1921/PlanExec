const express = require("express")
const app = express()
const cors = require("cors");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const bcrypt = require("bcrypt")
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("some secret string"))

const { User,Event} = require("./models")

const saltRounds = 10

const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authentication.js");
require("dotenv").config();

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"3d"})
}

app.post("/createEvent", async (req, res) => {
    try {
        const eventName = req.body.eventName;
        console.log(eventName)
        const venue = req.body.venue;
        const description = req.body.description
        const date = req.body.date
        const event = await Event.create({
            eventName,
            venue,
            description,
            date
        });

        console.log(event);
        res.status(200).json({message:"Event created successfully"})
    } catch (err) {
        console.log(err);
        res.status(500).send("Error creating event");
    }
});


app.get("/allEvents",authenticateToken,async(req,res)=>{
    try{
        const events = await Event.getEvents()
        res.status(200).json(events)
        console.log(events)
    }catch(error){
        console.log(error)
        res.status(500).json({error:error})
    }
})

app.post("/signup",async(req,res) => {
    try {
        const { name , email , password } = req.body;
        const hashedPassword = await bcrypt.hash(password,saltRounds)
        const user = await User.create({
            name,
            email,
            password:hashedPassword
        })
        const token = generateToken(user.id)
        return res.status(200).json({user,token})
    }catch(err){
        console.error("Error during signup",err)
        res.status(500).json({err:"Error occured during signup"})
    }
})
app.post("/signin", async(req,res) => {
    try {
        const user = await User.findUser(req.body.email)
        const passwordMatch = await bcrypt.compare(req.body.password,user.password)
        if (!passwordMatch){
            return res.status(400).json({error:"Invalid password"})
        }
        const token = generateToken(user.id)
        return res.status(200).json({user,token})
    }catch(err){
        console.error("error during signin",err)
        res.status(500).json({err:"error occured during signin"})
    }
})
module.exports = app;