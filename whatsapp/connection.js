import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason
} from "@whiskeysockets/baileys";

import P from "pino";
import fs from "fs";
import path from "path";

import { registerWhatsAppHandler } from "./handler.js";

const sessionDir = path.resolve("./session");

let socket = null;

export function getWhatsAppSocket() {
  return socket;
}

export function isWhatsAppConnected() {
  return socket?.user != null;
}

export async function connectWhatsApp() {
  if (!fs.existsSync(sessionDir)) {
    fs.mkdirSync(sessionDir, { recursive: true });
  }

  const { state, saveCreds } =
    await useMultiFileAuthState(sessionDir);

  socket = makeWASocket({
    auth: state,
    logger: P({ level: "silent" }),
    printQRInTerminal: false,
    browser: ["DEAD X BOT", "Chrome", "1.0.0"]
  });

  socket.ev.on("creds.update", saveCreds);

  // ☠️ CONNECT COMMAND HANDLER
  registerWhatsAppHandler(socket);

  socket.ev.on(
    "connection.update",
    ({ connection, lastDisconnect }) => {

      if (connection === "open") {
        console.log(
          "🟢 ᴅᴇᴀᴅ × ʙᴏᴛ — ᴡʜᴀᴛsᴀᴘᴘ ᴄᴏɴɴᴇᴄᴛᴇᴅ"
        );
      }

      if (connection === "close") {
        const statusCode =
          lastDisconnect?.error?.output?.statusCode;

        console.log(
          `🔴 ᴡʜᴀᴛsᴀᴘᴘ ᴅɪsᴄᴏɴɴᴇᴄᴛᴇᴅ: ${
            statusCode || "unknown"
          }`
        );

        if (statusCode !== DisconnectReason.loggedOut) {
          setTimeout(connectWhatsApp, 5000);
        }
      }
    }
  );

  return socket;
}
