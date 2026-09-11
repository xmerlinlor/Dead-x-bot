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

app.get("/health", (_req, res) => {
  res.json({
    status: "online",
    telegram: Boolean(config.TELEGRAM_BOT_TOKEN),
    whatsapp: true
  });
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
   🤖 TELEGRAM
━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

async function startTelegram() {
  if (!config.TELEGRAM_BOT_TOKEN) {
    console.error(
      "🔴 ᴛᴇʟᴇɢʀᴀᴍ ʙᴏᴛ ᴛᴏᴋᴇɴ ɪs ɴᴏᴛ sᴇᴛ."
    );
    return;
  }

  try {
    console.log(
      "🤖 ᴛᴇʟᴇɢʀᴀᴍ — sᴛᴀʀᴛɪɴɢ..."
    );

    await bot.launch({
      dropPendingUpdates: true
    });

    console.log(
      "🟢 ᴅᴇᴀᴅ × ʙᴏᴛ — ᴛᴇʟᴇɢʀᴀᴍ ᴏɴʟɪɴᴇ"
    );
  } catch (error) {
    console.error(
      "🔴 ᴛᴇʟᴇɢʀᴀᴍ sᴛᴀʀᴛᴜᴘ ғᴀɪʟᴇᴅ:",
      error
    );
  }
}

startTelegram();

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🛑 SHUTDOWN
━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const shutdown = (signal) => {
  console.log(
    `🛑 ${signal} — sʜᴜᴛᴛɪɴɢ ᴅᴏᴡɴ...`
  );

  try {
    bot.stop(signal);
  } catch (error) {
    console.error(
      "Telegram shutdown error:",
      error
    );
  }

  process.exit(0);
};

process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));
