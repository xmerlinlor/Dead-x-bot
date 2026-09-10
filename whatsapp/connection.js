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
let connecting = false;
let connectionReady = false;

export function getWhatsAppSocket() {
  return socket;
}

export function isWhatsAppConnected() {
  return socket?.user != null;
}

export function isWhatsAppReady() {
  return socket != null && connectionReady;
}

export async function connectWhatsApp() {
  if (connecting) {
    return socket;
  }

  connecting = true;

  try {
    if (!fs.existsSync(sessionDir)) {
      fs.mkdirSync(sessionDir, { recursive: true });
    }

    const { state, saveCreds } =
      await useMultiFileAuthState(sessionDir);

    /*
     * If an existing WhatsApp account is already registered
     * in this session, keep using that account.
     */
    if (state.creds.registered) {
      console.log(
        "⚠️ ᴇxɪsᴛɪɴɢ ᴡʜᴀᴛsᴀᴘᴘ sᴇssɪᴏɴ ғᴏᴜɴᴅ."
      );
    } else {
      console.log(
        "🔗 ɴᴏ ᴡʜᴀᴛsᴀᴘᴘ sᴇssɪᴏɴ — ᴘᴀɪʀɪɴɢ ʀᴇᴀᴅʏ."
      );
    }

    socket = makeWASocket({
      auth: state,
      logger: P({ level: "silent" }),
      printQRInTerminal: false,
      browser: [
        "DEAD X BOT",
        "Chrome",
        "1.0.0"
      ],
      markOnlineOnConnect: false,
      syncFullHistory: false
    });

    socket.ev.on("creds.update", saveCreds);

    /*
     * Register WhatsApp message handler.
     */
    registerWhatsAppHandler(socket);

    socket.ev.on(
      "connection.update",
      ({ connection, lastDisconnect }) => {
        if (connection === "connecting") {
          connectionReady = false;

          console.log(
            "🟡 ᴅᴇᴀᴅ × ʙᴏᴛ — ᴡʜᴀᴛsᴀᴘᴘ ᴄᴏɴɴᴇᴄᴛɪɴɢ..."
          );
        }

        if (connection === "open") {
          connectionReady = true;

          console.log(
            "🟢 ᴅᴇᴀᴅ × ʙᴏᴛ — ᴡʜᴀᴛsᴀᴘᴘ ᴄᴏɴɴᴇᴄᴛᴇᴅ"
          );
        }

        if (connection === "close") {
          connectionReady = false;

          const statusCode =
            lastDisconnect?.error?.output?.statusCode;

          console.log(
            `🔴 ᴡʜᴀᴛsᴀᴘᴘ ᴅɪsᴄᴏɴɴᴇᴄᴛᴇᴅ: ${
              statusCode || "unknown"
            }`
          );

          socket = null;

          if (
            statusCode !== DisconnectReason.loggedOut
          ) {
            console.log(
              "🔄 ʀᴇᴄᴏɴɴᴇᴄᴛɪɴɢ ᴡʜᴀᴛsᴀᴘᴘ..."
            );

            setTimeout(() => {
              connectWhatsApp().catch((error) => {
                console.error(
                  "☠️ ʀᴇᴄᴏɴɴᴇᴄᴛ ᴇʀʀᴏʀ:",
                  error
                );
              });
            }, 5000);
          }
        }
      }
    );

    return socket;
  } finally {
    connecting = false;
  }
}
