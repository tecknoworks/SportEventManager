const express = require("express");
const config = require("dotenv").config();
const app = express();
const cors = require("cors");
const {
  createAssistant,
  getAssistantParamsTemplate,
} = require("./src/createAssistant");
const { createThread, getThreadParamsTemplate } = require("./src/createThread");

app.use(express.json());
app.use(cors());

app.get("/test", async (req, res) => {
  res.json({ ana: "are mere" });
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
