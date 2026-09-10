import { Telegraf, Markup } from "telegraf";

import config from "../config.js";
import { mainPanel } from "./menu.js";

import {
  startPairing,
  isWaitingForNumber,
  clearPairing,
  requestPairingCode
} from "./pairing.js";

const bot = new Telegraf(config.TELEGRAM_BOT_TOKEN);

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🏠 START
━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

bot.start(async (ctx) => {
  const panel = mainPanel();

  await ctx.reply(panel.text, panel.keyboard);
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🔗 PAIR WHATSAPP
━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

bot.action("pair", async (ctx) => {
  await ctx.answerCbQuery();

  await startPairing(ctx);
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━
   📱 PHONE NUMBER
━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

bot.on("text", async (ctx, next) => {
  const userId = ctx.from?.id;

  if (!userId || !isWaitingForNumber(userId)) {
    return next();
  }

  const phoneNumber = ctx.message.text.trim();

  try {
    const cleanNumber = phoneNumber.replace(/[^\d]/g, "");

    if (!/^\d{7,15}$/.test(cleanNumber)) {
      await ctx.reply(
        `
╭━━━〔 ❌ ɪɴᴠᴀʟɪᴅ ɴᴜᴍʙᴇʀ 〕━━━╮
┃
┃ 📱 ᴇɴᴛᴇʀ ᴀ ᴠᴀʟɪᴅ
┃ ᴡʜᴀᴛsᴀᴘᴘ ɴᴜᴍʙᴇʀ.
┃
┃ ᴇxᴀᴍᴘʟᴇ:
┃ +2348012345678
┃
╰━━━━━━━━━━━━━━━━━━━━╯
        `,
        Markup.inlineKeyboard([
          [
            Markup.button.callback("◀️ ʙᴀᴄᴋ", "home")
          ]
        ])
      );

      return;
    }

    await ctx.reply(
      `
╭━━━〔 ⚡ ɢᴇɴᴇʀᴀᴛɪɴɢ ᴄᴏᴅᴇ 〕━━━╮
┃
┃ 📱 ɴᴜᴍʙᴇʀ: +${cleanNumber}
┃
┃ ⏳ ᴘʟᴇᴀsᴇ ᴡᴀɪᴛ...
┃
╰━━━━━━━━━━━━━━━━━━━━╯
      `
    );

    const code = await requestPairingCode(cleanNumber);

    clearPairing(userId);

    await ctx.reply(
      `
╭━━━〔 🔐 ᴘᴀɪʀɪɴɢ ᴄᴏᴅᴇ 〕━━━╮
┃
┃ 📱 ɴᴜᴍʙᴇʀ
┃ +${cleanNumber}
┃
┃ 🔑 ᴄᴏᴅᴇ
┃
┃ 『 ${code} 』
┃
┃ ⚡ ᴏᴘᴇɴ ᴡʜᴀᴛsᴀᴘᴘ
┃ → sᴇᴛᴛɪɴɢs
┃ → ʟɪɴᴋᴇᴅ ᴅᴇᴠɪᴄᴇs
┃ → ʟɪɴᴋ ᴀ ᴅᴇᴠɪᴄᴇ
┃
┃ ᴇɴᴛᴇʀ ᴛʜᴇ ᴄᴏᴅᴇ ᴀʙᴏᴠᴇ.
┃
╰━━━━━━━━━━━━━━━━━━━━╯
      `,
      Markup.inlineKeyboard([
        [
          Markup.button.callback("🔄 ᴘᴀɪʀ ᴀɢᴀɪɴ", "pair")
        ],
        [
          Markup.button.callback("🏠 ᴍᴀɪɴ ᴘᴀɴᴇʟ", "home")
        ]
      ])
    );

  } catch (error) {
    clearPairing(userId);

    console.error("☠️ ᴘᴀɪʀɪɴɢ ᴇʀʀᴏʀ:", error);

    await ctx.reply(
      `
╭━━━〔 ❌ ᴘᴀɪʀɪɴɢ ғᴀɪʟᴇᴅ 〕━━━╮
┃
┃ ⚠️ ᴜɴᴀʙʟᴇ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ
┃ ᴛʜᴇ ᴘᴀɪʀɪɴɢ ᴄᴏᴅᴇ.
┃
┃ 🔧 ᴄʜᴇᴄᴋ ᴛʜᴇ ʀᴇɴᴅᴇʀ ʟᴏɢs.
┃
╰━━━━━━━━━━━━━━━━━━━━╯
      `,
      Markup.inlineKeyboard([
        [
          Markup.button.callback("🔄 ʀᴇᴛʀʏ", "pair")
        ],
        [
          Markup.button.callback("🏠 ʜᴏᴍᴇ", "home")
        ]
      ])
    );
  }
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━
   📊 STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

bot.action("status", async (ctx) => {
  await ctx.answerCbQuery();

  await ctx.editMessageText(
    `
╭━━━〔 📊 sᴛᴀᴛᴜs 〕━━━╮
┃
┃ 🟢 ᴛᴇʟᴇɢʀᴀᴍ: ᴏɴʟɪɴᴇ
┃ ${"🟢"} ᴡʜᴀᴛsᴀᴘᴘ: ᴇɴɢɪɴᴇ ʀᴜɴɴɪɴɢ
┃ ⚡ ʙᴏᴛ: ʀᴜɴɴɪɴɢ
┃
╰━━━━━━━━━━━━━━━━━━━━╯
    `,
    Markup.inlineKeyboard([
      [
        Markup.button.callback("◀️ ʙᴀᴄᴋ", "home")
      ]
    ])
  );
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━
   📖 HOW TO USE
━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

bot.action("howto", async (ctx) => {
  await ctx.answerCbQuery();

  await ctx.editMessageText(
    `
╭━━━〔 📖 ʜᴏᴡ ᴛᴏ ᴜsᴇ 〕━━━╮
┃
┃ 1️⃣ ᴄʟɪᴄᴋ 🔗 ᴘᴀɪʀ
┃
┃ 2️⃣ sᴇɴᴅ ʏᴏᴜʀ ᴡʜᴀᴛsᴀᴘᴘ
┃    ɴᴜᴍʙᴇʀ
┃
┃ 3️⃣ ʀᴇᴄᴇɪᴠᴇ ᴛʜᴇ
┃    ᴘᴀɪʀɪɴɢ ᴄᴏᴅᴇ
┃
┃ 4️⃣ ᴇɴᴛᴇʀ ᴛʜᴇ ᴄᴏᴅᴇ
┃    ɪɴ ᴡʜᴀᴛsᴀᴘᴘ
┃
┃ 5️⃣ 🟢 ᴡʜᴀᴛsᴀᴘᴘ ᴄᴏɴɴᴇᴄᴛs
┃
╰━━━━━━━━━━━━━━━━━━━━╯
    `,
    Markup.inlineKeyboard([
      [
        Markup.button.callback("◀️ ʙᴀᴄᴋ", "home")
      ]
    ])
  );
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ⚙️ SETTINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

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
    Markup.inlineKeyboard([
      [
        Markup.button.callback("◀️ ʙᴀᴄᴋ", "home")
      ]
    ])
  );
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🏠 HOME
━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

bot.action("home", async (ctx) => {
  await ctx.answerCbQuery();

  const panel = mainPanel();

  await ctx.editMessageText(panel.text, panel.keyboard);
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ❌ ERROR HANDLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

bot.catch((error) => {
  console.error("☠️ ᴛᴇʟᴇɢʀᴀᴍ ᴇʀʀᴏʀ:", error);
});

export default bot;

Save "telegram/bot.js".

⚠️ One important limitation: this version receives the phone number as a normal Telegram message. It does not put a text-entry field literally inside the inline Telegram panel; Telegram inline keyboards don't provide arbitrary text input. If you want the phone field visually embedded inside the panel, we'll need a Telegram Mini App/Web App.

After saving, reply "DONE".
