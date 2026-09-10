import { Markup } from "telegraf";

const waitingForNumber = new Set();

export function startPairing(ctx) {
  waitingForNumber.add(ctx.from.id);

  return ctx.editMessageText(
    `
╭━━━〔 🔗 ᴘᴀɪʀ ᴡʜᴀᴛsᴀᴘᴘ 〕━━━╮
┃
┃ 📱 sᴇɴᴅ ʏᴏᴜʀ ᴡʜᴀᴛsᴀᴘᴘ
┃ ɴᴜᴍʙᴇʀ ɪɴ ɪɴᴛᴇʀɴᴀᴛɪᴏɴᴀʟ
┃ ғᴏʀᴍᴀᴛ.
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
}

export function isWaitingForNumber(userId) {
  return waitingForNumber.has(userId);
}

export function clearPairing(userId) {
  waitingForNumber.delete(userId);
}
