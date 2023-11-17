const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

app.get("/test", async (req, res) => {
  res.json({ ana: "are mere" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
