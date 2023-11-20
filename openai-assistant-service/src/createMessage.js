const OpenAI = require("openai");

function getMessageParamsTemplate() {
  return {
    threadId: "",
    userQuestion: "",
    userId: "",
    assistantId: "",
  };
}

async function createMessage(params) {
  const secretKey = process.env.OPENAI_API_KEY;
  const openai = new OpenAI({
    apiKey: secretKey,
  });

  const userQuestion = params.userQuestion;
  const inputThreadId = params.threadId;
  const inputUserId = params.userId;
  const inputAssistantId = params.assistantId;

  await openai.beta.threads.messages.create(inputThreadId, {
    role: "user",
    content: userQuestion,
  });

  const run = await openai.beta.threads.runs.create(inputThreadId, {
    assistant_id: inputAssistantId,
  });

  let runStatus = await openai.beta.threads.runs.retrieve(inputThreadId, run.id);

  let attempts = 0;
  const maxAttempts = 20;
  const timoutWaitTimeMs = 2000;

  while (runStatus.status !== "completed" && attempts < maxAttempts) {
    await new Promise((resolve) => setTimeout(resolve, timoutWaitTimeMs));
    runStatus = await openai.beta.threads.runs.retrieve(inputThreadId, run.id);
    attempts++;
  }

  const messages = await openai.beta.threads.messages.list(inputThreadId);
  console.info(messages);
  const lastAssistantMessageForRun = messages.data
    .filter((message) => message.run_id === run.id && message.role === "assistant")
    .pop();

  const userMessages = messages.body.data.filter((message) => message.role === "user");
  const lastUserMessage = userMessages[0];

  //TODO: store message record to db
  return messages;
}

module.exports = { createMessage, getMessageParamsTemplate };
