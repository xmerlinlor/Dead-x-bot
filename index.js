import "dotenv/config";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.send("☠️ ᴅᴇᴀᴅ × ʙᴏᴛ — ᴏɴʟɪɴᴇ");
});

app.listen(PORT, () => {
  console.log(`☠️ ᴅᴇᴀᴅ × ʙᴏᴛ running on port ${PORT}`);
});
