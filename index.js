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
   🚀 START SERVICES
━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

async function startBot() {
  try {
    /*
     * Start WhatsApp first.
     * This creates the Baileys socket before
     * Telegram becomes available for pairing.
     */
    console.log(
      "📱 ᴡʜᴀᴛsᴀᴘᴘ ᴇɴɢɪɴᴇ — sᴛᴀʀᴛɪɴɢ..."
    );

    const socket = await connectWhatsApp();

    if (socket) {
      console.log(
        "🟢 ᴡʜᴀᴛsᴀᴘᴘ sᴏᴄᴋᴇᴛ — ʀᴇᴀᴅʏ"
      );
    }

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━
       🤖 TELEGRAM
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

    if (!config.TELEGRAM_BOT_TOKEN) {
      console.log(
        "⚠️ ᴛᴇʟᴇɢʀᴀᴍ ʙᴏᴛ ᴛᴏᴋᴇɴ ɴᴏᴛ sᴇᴛ"
      );

      return;
    }

    await bot.launch();

    console.log(
      "🤖 ᴛᴇʟᴇɢʀᴀᴍ ᴘᴀɴᴇʟ — ᴏɴʟɪɴᴇ"
    );

  } catch (error) {
    console.error(
      "☠️ ʙᴏᴛ sᴛᴀʀᴛᴜᴘ ᴇʀʀᴏʀ:",
      error
    );
  }
}

startBot();

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
