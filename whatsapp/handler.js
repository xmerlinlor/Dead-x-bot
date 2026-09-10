// whatsapp/handler.js

import { getCommand } from "../commands.js";
import config from "../config.js";

export function registerWhatsAppHandler(sock) {
  if (!sock) return;

  sock.ev.on("messages.upsert", async ({ messages }) => {
    try {
      const message = messages?.[0];

      if (!message?.message) return;
      if (message.key.fromMe) return;

      const jid = message.key.remoteJid;

      if (!jid || jid === "status@broadcast") return;

      const text =
        message.message.conversation ||
        message.message.extendedTextMessage?.text ||
        message.message.imageMessage?.caption ||
        message.message.videoMessage?.caption ||
        "";

      if (!text.startsWith(config.PREFIX)) return;

      const body = text.slice(config.PREFIX.length).trim();

      if (!body) return;

      const parts = body.split(/\s+/);
      const commandName = parts.shift()?.toLowerCase();

      if (!commandName) return;

      const args = parts;
      const cmd = getCommand(commandName);

      console.log(
        `☠️ ᴄᴍᴅ: ${config.PREFIX}${commandName} | ${jid}`
      );

      if (!cmd) return;

      const reply = async (text) => {
        return sock.sendMessage(
          jid,
          { text: String(text) },
          { quoted: message }
        );
      };

      const isGroup = jid.endsWith("@g.us");

      await cmd.execute({
        sock,
        message,
        jid,
        sender: message.key.participant || jid,
        args,
        text,
        reply,
        isGroup
      });

    } catch (error) {
      console.error(
        "☠️ ᴄᴏᴍᴍᴀɴᴅ ᴇʀʀᴏʀ:",
        error
      );
    }
  });
}
