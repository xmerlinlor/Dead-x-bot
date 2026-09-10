import { Markup } from "telegraf";
import { getWhatsAppSocket } from "../whatsapp/connection.js";

const waitingForNumber = new Set();

export async function startPairing(ctx) {
  const userId = ctx.from?.id;

  if (!userId) {
    throw new Error("Telegram user ID not found.");
  }

  waitingForNumber.add(userId);

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
    throw new Error(
      "WhatsApp socket is not ready. Start the WhatsApp connection first."
    );
  }

  const cleanNumber = String(phoneNumber)
    .replace(/\D/g, "");

  if (!/^\d{7,15}$/.test(cleanNumber)) {
    throw new Error("Invalid WhatsApp phone number.");
  }

  console.log(
    `🔗 ʀᴇǫᴜᴇsᴛɪɴɢ ᴘᴀɪʀɪɴɢ ᴄᴏᴅᴇ ғᴏʀ +${cleanNumber}`
  );

  try {
    /*
     * Baileys pairing codes require the socket
     * to be available before requesting the code.
     */
    if (sock.user) {
      throw new Error(
        "WhatsApp is already connected with an existing session."
      );
    }

    const code = await sock.requestPairingCode(cleanNumber);

    if (!code) {
      throw new Error(
        "WhatsApp did not return a pairing code."
      );
    }

    console.log(
      `🔐 ᴘᴀɪʀɪɴɢ ᴄᴏᴅᴇ ɢᴇɴᴇʀᴀᴛᴇᴅ: ${code}`
    );

    return code;
  } catch (error) {
    console.error(
      "☠️ ᴘᴀɪʀɪɴɢ ᴄᴏᴅᴇ ᴇʀʀᴏʀ:",
      error
    );

    throw error;
  }
}
