const express = require("express");
const config = require("dotenv").config();
const app = express();
const cors = require("cors");
const { createAssistant, getAssistantParamsTemplate } = require("./src/createAssistant");
const { createThread, getThreadParamsTemplate } = require("./src/createThread");
const { createMessage, getMessageParamsTemplate } = require("./src/createMessage");

app.use(express.json());
app.use(cors());

app.get("/test", async (_, res) => {
  res.json({ status: "up" });
});

app.post("/assistants", async (req, res) => {
  try {
    let params = getAssistantParamsTemplate();

    Object.assign(params, req.body);

    const assistantDetails = await createAssistant(params);

    res.json({ assistant: assistantDetails });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/assistants/:assistantId/threads", async (req, res) => {
  try {
    const { assistantId } = req.params;
    let params = getThreadParamsTemplate();
    params.inputAssistantId = assistantId;
    params.userId = req.body.userId;

    const threadDetails = await createThread(params);

    res.json({ thread: threadDetails });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/assistants/:assistantId/threads/:threadId", async (req, res) => {
  try {
    const { assistantId, threadId } = req.params;
    let params = getMessageParamsTemplate();
    params.assistantId = assistantId;
    params.threadId = threadId;
    params.userQuestion = req.body.userQuestion;
    params.userId = req.body.userId;

    const messages = await createMessage(params);

    res.json({ messages: messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
