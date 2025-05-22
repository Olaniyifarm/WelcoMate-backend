const express = require("express");

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("✅ Server is working");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`🟢 Test server running on http://localhost:${port}`);
});
