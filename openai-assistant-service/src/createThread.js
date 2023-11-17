import { GlobalCreateThreadGlobalActionContext } from "gadget-server";
const OpenAI = require("openai");

/**
 * Creates a thread associated with an assistant using OpenAI and stores its information.
 * @param { GlobalCreateThreadGlobalActionContext } context - The context object containing parameters, logger, API, connections, and scope.
 */
export async function run({ params, logger, api, connections, scope }) {
  const secretKey = process.env.OPENAI_API_KEY;
  if (!secretKey) {
    logger.error("OpenAI API key is missing.");
    return;
  }

  const openai = new OpenAI({
    apiKey: secretKey,
  });

  const assistantInputId = params.inputAssistantId;
  const inputUserId = params.userId;

  try {
    // Create a new thread using OpenAI API.
    const thread = await openai.beta.threads.create();

    // Store the thread's information in your application.
    const threadRecord = await api.thread.create({
      assistant: {
        _link: assistantInputId,
      },
      openAiId: thread.id,
      user: {
        _link: inputUserId,
      },
    });

    scope.result = {
      success: true,
    };
  } catch (error) {
    logger.error("Error in thread creation or storage:", error);
    scope.result = {
      success: false,
      error: error,
    };
  }
}

export const params = {
  inputAssistantId: { type: "string", required: true },
  userId: { type: "string" },
};
