import { Markup } from "telegraf";
import { getWhatsAppSocket } from "../whatsapp/connection.js";

const waitingForNumber = new Set();

export function startPairing(ctx) {
  waitingForNumber.add(ctx.from.id);

  return ctx.editMessageText(
    `
╭━━━〔 🔗 ᴘᴀɪʀ ᴡʜᴀᴛsᴀᴘᴘ 〕━━━╮
┃
┃ 📱 sᴇɴᴅ ʏᴏᴜʀ ᴡʜᴀᴛsᴀᴘᴘ
┃ ɴᴜᴍʙᴇʀ ʙᴇʟᴏᴡ.
┃
┃ ᴇxᴀᴍᴘʟᴇ:
┃ +2348012345678
┃
┃ ⚡ ᴜsᴇ ɪɴᴛᴇʀɴᴀᴛɪᴏɴᴀʟ ғᴏʀᴍᴀᴛ
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

export async function requestPairingCode(phoneNumber) {
  const sock = getWhatsAppSocket();

  if (!sock) {
    throw new Error("WhatsApp socket is not ready.");
  }

  const cleanNumber = String(phoneNumber)
    .replace(/[^\d]/g, "");

  if (!cleanNumber) {
    throw new Error("Invalid phone number.");
  }

  const code = await sock.requestPairingCode(cleanNumber);

  return code;
}
