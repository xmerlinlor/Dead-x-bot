import { Markup } from "telegraf";

export function mainPanel() {
  return {
    text: `
╭━━━〔 ☠️ ᴅᴇᴀᴅ × ʙᴏᴛ 〕━━━╮
┃
┃ 🟢 ᴡʜᴀᴛsᴀᴘᴘ: ᴅɪsᴄᴏɴɴᴇᴄᴛᴇᴅ
┃
┃ 🔗 ᴘᴀɪʀ ᴡʜᴀᴛsᴀᴘᴘ
┃ 📊 sᴛᴀᴛᴜs
┃ 📖 ʜᴏᴡ ᴛᴏ ᴜsᴇ
┃ ⚙️ sᴇᴛᴛɪɴɢs
┃
╰━━━━━━━━━━━━━━━━━━━━╯
`,
    keyboard: Markup.inlineKeyboard([
      [
        Markup.button.callback("🔗 ᴘᴀɪʀ ᴡʜᴀᴛsᴀᴘᴘ", "pair"),
      ],
      [
        Markup.button.callback("📊 sᴛᴀᴛᴜs", "status"),
        Markup.button.callback("📖 ʜᴏᴡ ᴛᴏ ᴜsᴇ", "howto"),
      ],
      [
        Markup.button.callback("⚙️ sᴇᴛᴛɪɴɢs", "settings"),
      ],
    ]),
  };
}
