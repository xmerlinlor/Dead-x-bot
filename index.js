import "dotenv/config";
import express from "express";

import config from "./config.js";
import bot from "./telegram/bot.js";
import { connectWhatsApp } from "./whatsapp/connection.js";

const app = express();
const PORT = process.env.PORT || 3000;

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🌐 WEB SERVER
━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

app.get("/", (_req, res) => {
  res.send("☠️ ᴅᴇᴀᴅ × ʙᴏᴛ — ᴏɴʟɪɴᴇ");
});

app.listen(PORT, () => {
  console.log(
    `☠️ ᴅᴇᴀᴅ × ʙᴏᴛ — ᴘᴏʀᴛ ${PORT}`
  );
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━
   📱 WHATSAPP
━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

connectWhatsApp()
  .then(() => {
    console.log(
      "📱 ᴡʜᴀᴛsᴀᴘᴘ ᴇɴɢɪɴᴇ — sᴛᴀʀᴛɪɴɢ..."
    );
  })
  .catch((error) => {
    console.error(
      "🔴 ᴡʜᴀᴛsᴀᴘᴘ sᴛᴀʀᴛᴜᴘ ᴇʀʀᴏʀ:",
      error
    );
  });

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🤖 TELEGRAM SPARE PANEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

if (config.TELEGRAM_BOT_TOKEN) {
  bot.launch()
    .then(() => {
      console.log(
        "🤖 ᴛᴇʟᴇɢʀᴀᴍ sᴘᴀʀᴇ ᴘᴀɴᴇʟ — ᴏɴʟɪɴᴇ"
      );
    })
    .catch((error) => {
      console.error(
        "🔴 ᴛᴇʟᴇɢʀᴀᴍ ᴇʀʀᴏʀ:",
        error
      );
    });
} else {
  console.log(
    "⚠️ ᴛᴇʟᴇɢʀᴀᴍ ʙᴏᴛ ᴛᴏᴋᴇɴ ɴᴏᴛ sᴇᴛ"
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🛑 SHUTDOWN
━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

process.once("SIGINT", () => {
  bot.stop("SIGINT");
});

process.once("SIGTERM", () => {
  bot.stop("SIGTERM");
});
