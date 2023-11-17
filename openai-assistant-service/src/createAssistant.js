const OpenAI = require("openai");

function getAssistantParamsTemplate() {
  return {
    assistantName: "",
    assistantInstructions: "",
    userId: "",
  };
}

async function createAssistant(params) {
  const secretKey = process.env.OPENAI_API_KEY;
  if (!secretKey) {
    console.error("OpenAI API key is missing.");
    return;
  }

  const openai = new OpenAI({
    apiKey: secretKey,
  });

  const inputUserId = params.userId;

  try {
    const assistantResponse = await openai.beta.assistants.create({
      name: params.assistantName,
      instructions: params.assistantInstructions,
      tools: [],
      model: "gpt-3.5-turbo-1106",
    });

    //TODO: if it will be needed, store this to a db and make the relation between a user an his assistant

    return assistantResponse;
  } catch (error) {
    console.error("Error creating OpenAI assistant:", error);
  }
}

module.exports = { createAssistant, getAssistantParamsTemplate };
