const express = require("express");
const config = require("dotenv").config();
const app = express();
const cors = require("cors");
const authenticateToken = require("./src/auth/authenticateToken");
const { createAssistant, getAssistantParamsTemplate } = require("./src/createAssistant");
const { createThread } = require("./src/createThread");
const { createMessage, getMessageParamsTemplate } = require("./src/createMessage");
const { getThreadMessages, getThreadMessagesParamsTemplate } = require("./src/getThreadMessages");

app.use(express.json());
app.use(cors());

app.get("/test", async (_, res) => {
  res.json({ status: "up" });
});

app.post("/assistants", authenticateToken, async (req, res) => {
  try {
    let params = getAssistantParamsTemplate();

    Object.assign(params, req.body);

    const assistantDetails = await createAssistant(params);
    res.json(assistantDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/threads", authenticateToken, async (_, res) => {
  try {
    const threadDetails = await createThread();
    res.json(threadDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/threads/:threadId/messages", authenticateToken, async (req, res) => {
  try {
    const { threadId } = req.params;
    let params = getThreadMessagesParamsTemplate();
    params.threadId = threadId;
    const threadMessages = await getThreadMessages(params);
    res.json(threadMessages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/assistants/:assistantId/threads/:threadId", authenticateToken, async (req, res) => {
  try {
    const { assistantId, threadId } = req.params;
    let params = getMessageParamsTemplate();
    params.assistantId = assistantId;
    params.threadId = threadId;
    params.userQuestion = req.body.userQuestion;

    const messages = await createMessage(params);

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
