const OpenAI = require("openai");
require("dotenv").config()

const openai = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"]
})

const systemPrompt = 
"You are an assistant helping a user to create services. " +
"Given a message, you should extract the details of services." +
"The user will provide the details like name, description, contact." +
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
                        name: "createService",
                        description: "Create a new service",
                        parameters:{
                            type: "object",
                            properties: {
                                name: {
                                    type: "string",
                                    description: "This is the name of the service"
                                },
                                description: {
                                    type: "string",
                                    description : "This is description of the service"
                                },
                                contact: {
                                    type: "string",
                                    description: "The contact of person who created service",
                                }
                            }
                        }
                    }
                }
            ],
            tool_choice: { type: "function", function: { name: "createService" }},
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