const OpenAI = require("openai");

async function createAssistant() {
  const secretKey = process.env.OPENAI_API_KEY;
  if (!secretKey) {
    console.error("OpenAI API key is missing.");
    return;
  }

  const openai = new OpenAI({
    apiKey: secretKey,
  });

  try {
    const assistantResponse = await openai.beta.assistants.create({
      name: "Event Planner Assistant",
      instructions: process.env.ASSISTANT_INSTRUCTIONS,
      tools: [],
      model: "gpt-3.5-turbo-1106",
    });

    return assistantResponse;
  } catch (error) {
    console.error("Error creating OpenAI assistant:", error);
  }
}

module.exports = { createAssistant };
