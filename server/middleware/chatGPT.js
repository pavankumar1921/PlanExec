const OpenAI = require("openai");
require("dotenv").config()

const openai = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"]
})

const systemPrompt = 
"You are an assistant helping a user to reate events. " +
"Given a messag, you should extract the details of events." +
"The user will provide the details like eventName, venue, description, date." + "To compute relatives dates, assume that the current timestamp is " +
new Date().toISOString() +
".";

async function askChatGpt(question) {
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt},
                { role: "user", content: question},
            ],
            tools: [
                {
                    type: "function",
                    function: {
                        name: "createEvent",
                        description: "Create a new event",
                        parameters:{
                            type: "object",
                            properties: {
                                eventName: {
                                    type: "string",
                                    description: "This is the name of the event"
                                },
                                venue: {
                                    type: "string",
                                    description: "The name of the venue"
                                },
                                description: {
                                    type: "string",
                                    description : "This is description of the event"
                                },
                                date: {
                                    type: "string",
                                    description: "The date of event when it is conducted",
                                }
                            }
                        }
                    }
                }
            ],
            tool_choice: { type: "function", function: { name: "createEvent" }},
            model: "gpt-3.5-turbo",
        })
        return chatCompletion.choices[0].message.tool_calls[0].function;
    }catch(error) {
        console.error("Error making a query: error")
        return null
    }
}

async function getResponse(question) {
    const suggestion = await askChatGpt(question);
    if (suggestion) {
      return suggestion;
    } else {
      console.log("No response received from ChatGPT.");
    }
  }
  
  module.exports = getResponse;