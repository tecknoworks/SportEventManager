const OpenAI = require("openai");

export async function run(params) {
  const secretKey = process.env.OPENAI_API_KEY;
  const openai = new OpenAI({
    apiKey: secretKey,
  });

  const userQuestion = params.userQuestion;
  const inputThreadId = params.threadId;
  const inputUserId = params.userId;

  const threadRecords = await api.thread.findMany({
    select: {
      id: true,
      description: true,
      openAiId: true,
      assistant: {
        id: true,
        openAiId: true,
      },
    },
    filter: {
      id: { equals: inputThreadId },
    },
  });

  // Store the OpenAI IDs for the thread and assistant
  const threadId = threadRecords[0].openAiId;
  const assistantOpenAiId = threadRecords[0].assistant.openAiId;

  // Create the user message in the OpenAI API
  await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: userQuestion,
  });

  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantOpenAiId,
  });

  let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);

  let attempts = 0;
  const maxAttempts = 20;
  const timoutWaitTimeMs = 2000;

  while (runStatus.status !== "completed" && attempts < maxAttempts) {
    await new Promise((resolve) => setTimeout(resolve, timoutWaitTimeMs));
    runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
    attempts++;
  }

  // Get the last assistant and user messages from the messages array that contain all past messages
  const messages = await openai.beta.threads.messages.list(threadId);
  console.info(messages);
  const lastAssistantMessageForRun = messages.data
    .filter(
      (message) => message.run_id === run.id && message.role === "assistant"
    )
    .pop();

  const userMessages = messages.body.data.filter(
    (message) => message.role === "user"
  );
  const lastUserMessage = userMessages[0];

  try {
    const messageRecord = await api.message.create({
      assistantMessage: lastAssistantMessageForRun,
      thread: {
        _link: threadRecords[0].id,
      },
      user: {
        _link: inputUserId,
      },
      userMessage: lastUserMessage,
    });

    if (threadRecords[0].description === null) {
      try {
        const completion = await openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content: `Provide a description for the question "${userQuestion}" using no more than 6 words. Don't use quotation marks or other characters when not needed.`,
            },
          ],
          model: "gpt-3.5-turbo",
        });

        const threadRecord = await api.thread.update(inputThreadId, {
          description: completion.choices[0].message.content,
        });
      } catch (error) {
        console.log(error);
      }
    }

    // This is what this function returns to the frontend, and is not used there yet
    scope.result = {
      success: true,
    };
  } catch (error) {
    console.log(error);

    // This is what this function returns to the frontend, and is not used there yet
    scope.result = {
      success: false,
    };
  }
}

export const params = {
  threadId: { type: "string" },
  userQuestion: { type: "string" },
  userId: { type: "string" },
};
