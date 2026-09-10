import { Telegraf } from "telegraf";
import config from "../config.js";
import { mainPanel } from "./menu.js";
import { startPairing } from "./pairing.js";

const bot = new Telegraf(config.TELEGRAM_BOT_TOKEN);

// /start → open the Spare Panel
bot.start(async (ctx) => {
  const panel = mainPanel();

  await ctx.reply(panel.text, panel.keyboard);
});

// 🔗 Pair WhatsApp
bot.action("pair", async (ctx) => {
  await ctx.answerCbQuery();

  await startPairing(ctx);
});

// 📱 Enter number
bot.action("enter_number", async (ctx) => {
  await ctx.answerCbQuery();

  await ctx.editMessageText(
    `
╭━━━〔 📱 ᴘʜᴏɴᴇ ɴᴜᴍʙᴇʀ 〕━━━╮
┃
┃ sᴇɴᴅ ʏᴏᴜʀ ᴡʜᴀᴛsᴀᴘᴘ
┃ ɴᴜᴍʙᴇʀ ɪɴ ɪɴᴛᴇʀɴᴀᴛɪᴏɴᴀʟ
┃ ғᴏʀᴍᴀᴛ.
┃
┃ ᴇxᴀᴍᴘʟᴇ:
┃ +2348012345678
┃
╰━━━━━━━━━━━━━━━━━━━━╯
`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "◀️ ʙᴀᴄᴋ",
              callback_data: "pair"
            }
          ]
        ]
      }
    }
  );
});

// 📊 Status
bot.action("status", async (ctx) => {
  await ctx.answerCbQuery();

  await ctx.editMessageText(
    `
╭━━━〔 📊 sᴛᴀᴛᴜs 〕━━━╮
┃
┃ 🟢 ᴛᴇʟᴇɢʀᴀᴍ: ᴏɴʟɪɴᴇ
┃ 🔴 ᴡʜᴀᴛsᴀᴘᴘ: ᴅɪsᴄᴏɴɴᴇᴄᴛᴇᴅ
┃ ⚡ ʙᴏᴛ: ʀᴜɴɴɪɴɢ
┃
╰━━━━━━━━━━━━━━━━━━━━╯
`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "◀️ ʙᴀᴄᴋ",
              callback_data: "home"
            }
          ]
        ]
      }
    }
  );
});

// 📖 How to use
bot.action("howto", async (ctx) => {
  await ctx.answerCbQuery();

  await ctx.editMessageText(
    `
╭━━━〔 📖 ʜᴏᴡ ᴛᴏ ᴜsᴇ 〕━━━╮
┃
┃ 1️⃣ ᴄʟɪᴄᴋ 🔗 ᴘᴀɪʀ
┃
┃ 2️⃣ ᴇɴᴛᴇʀ ʏᴏᴜʀ ɴᴜᴍʙᴇʀ
┃
┃ 3️⃣ ɢᴇᴛ ᴛʜᴇ ᴘᴀɪʀɪɴɢ ᴄᴏᴅᴇ
┃
┃ 4️⃣ ᴇɴᴛᴇʀ ᴛʜᴇ ᴄᴏᴅᴇ
┃
┃ 5️⃣ 🟢 ᴡʜᴀᴛsᴀᴘᴘ ᴄᴏɴɴᴇᴄᴛs
┃
╰━━━━━━━━━━━━━━━━━━━━╯
`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "◀️ ʙᴀᴄᴋ",
              callback_data: "home"
            }
          ]
        ]
      }
    }
  );
});

// ⚙️ Settings
bot.action("settings", async (ctx) => {
  await ctx.answerCbQuery();

  await ctx.editMessageText(
    `
╭━━━〔 ⚙️ sᴇᴛᴛɪɴɢs 〕━━━╮
┃
┃ ☠️ ʙᴏᴛ: ᴅᴇᴀᴅ × ʙᴏᴛ
┃ ⚡ ᴍᴏᴅᴇ: ᴘᴜʙʟɪᴄ
┃ 🔐 sᴇᴄᴜʀɪᴛʏ: ᴇɴᴀʙʟᴇᴅ
┃
╰━━━━━━━━━━━━━━━━━━━━╯
`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "◀️ ʙᴀᴄᴋ",
              callback_data: "home"
            }
          ]
        ]
      }
    }
  );
});

// 🏠 Back to main panel
bot.action("home", async (ctx) => {
  await ctx.answerCbQuery();

  const panel = mainPanel();

  await ctx.editMessageText(panel.text, panel.keyboard);
});

// Error handler
bot.catch((error) => {
  console.error("☠️ Telegram error:", error);
});

export default bot;
