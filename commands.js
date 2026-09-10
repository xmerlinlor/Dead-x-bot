// commands.js
// ☠️ ᴅᴇᴀᴅ × ʙᴏᴛ — ᴇxᴇᴄᴜᴛᴀʙʟᴇ ᴄᴏᴍᴍᴀɴᴅ ʀᴇɢɪsᴛʀʏ

const commands = new Map();

/**
 * Register a command
 */
function command(names, execute, options = {}) {
  if (!Array.isArray(names)) names = [names];

  for (const name of names) {
    commands.set(name.toLowerCase(), {
      name: name.toLowerCase(),
      execute,
      category: options.category || "GENERAL",
      owner: options.owner || false,
      group: options.group || false,
      admin: options.admin || false,
      botAdmin: options.botAdmin || false
    });
  }
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🟢 GENERAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

command(["ping"], async ({ sock, jid, reply }) => {
  const start = Date.now();

  await reply("🏓 ᴘɪɴɢɪɴɢ...");

  const ms = Date.now() - start;

  await reply(
    `╭━━━〔 🏓 ᴘᴏɴɢ 〕━━━╮
┃
┃ ⚡ ʀᴇsᴘᴏɴsᴇ: ${ms}ᴍs
┃ 🟢 sᴛᴀᴛᴜs: ᴏɴʟɪɴᴇ
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
  );
}, {
  category: "GENERAL"
});

command(["alive"], async ({ reply }) => {
  await reply(
    `╭━━━〔 ☠️ ᴅᴇᴀᴅ × ʙᴏᴛ 〕━━━╮
┃
┃ 🟢 sᴛᴀᴛᴜs: ᴏɴʟɪɴᴇ
┃ ⚡ sʏsᴛᴇᴍ: ʀᴜɴɴɪɴɢ
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
  );
}, {
  category: "GENERAL"
});

command(["status"], async ({ reply }) => {
  await reply(
    `╭━━━〔 📊 sᴛᴀᴛᴜs 〕━━━╮
┃
┃ 🟢 ʙᴏᴛ: ᴏɴʟɪɴᴇ
┃ 🟢 ᴇɴɢɪɴᴇ: ᴀᴄᴛɪᴠᴇ
┃ 🟢 ʜᴀɴᴅʟᴇʀ: ᴀᴄᴛɪᴠᴇ
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
  );
}, {
  category: "GENERAL"
});

command(["runtime", "uptime"], async ({ reply }) => {
  const seconds = Math.floor(process.uptime());

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  await reply(
    `╭━━━〔 ⏱️ ʀᴜɴᴛɪᴍᴇ 〕━━━╮
┃
┃ 📅 ${days}ᴅ
┃ 🕐 ${hours}ʜ
┃ 🕑 ${minutes}ᴍ
┃ ⏱️ ${secs}s
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
  );
}, {
  category: "GENERAL"
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━
   👑 OWNER
━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

command(["owner", "creator"], async ({ reply }) => {
  await reply(
    `╭━━━〔 👑 ᴏᴡɴᴇʀ 〕━━━╮
┃
┃ 👑 sɪᴍᴏɴ ᴛᴇᴄʜ
┃ ⚡ ᴅᴇᴀᴅ × ʙᴏᴛ
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
  );
}, {
  category: "OWNER"
});

command(["restart"], async ({ reply }) => {
  await reply("♻️ ʀᴇsᴛᴀʀᴛɪɴɢ ʙᴏᴛ...");
  
  setTimeout(() => {
    process.exit(0);
  }, 1000);
}, {
  category: "OWNER",
  owner: true
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ⚙️ SETTINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

command(["settings", "config"], async ({ reply }) => {
  await reply(
    `╭━━━〔 ⚙️ sᴇᴛᴛɪɴɢs 〕━━━╮
┃
┃ ☠️ ʙᴏᴛ: ᴅᴇᴀᴅ × ʙᴏᴛ
┃ ⚡ ᴍᴏᴅᴇ: ᴘᴜʙʟɪᴄ
┃ 🔐 sᴇᴄᴜʀɪᴛʏ: ᴇɴᴀʙʟᴇᴅ
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
  );
}, {
  category: "SETTINGS"
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━
   👁️ VIEW ONCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

command(["vv", "viewonce"], async ({ sock, jid, message, reply }) => {
  const quoted =
    message?.message?.extendedTextMessage?.contextInfo?.quotedMessage;

  if (!quoted) {
    return reply(
      "👁️ ʀᴇᴘʟʏ ᴛᴏ ᴀ ᴠɪᴇᴡ-ᴏɴᴄᴇ ᴍᴇᴅɪᴀ ᴡɪᴛʜ .ᴠᴠ"
    );
  }

  await reply(
    "👁️ ᴠɪᴇᴡ-ᴏɴᴄᴇ ᴍᴇᴅɪᴀ ᴅᴇᴛᴇᴄᴛᴇᴅ.\n⚙️ ᴠᴠ ᴍᴏᴅᴜʟᴇ ɪs ʀᴇᴀᴅʏ."
  );
}, {
  category: "VV"
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🛠️ TOOLS
━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

command(["calc", "calculator"], async ({ args, reply }) => {
  if (!args.length) {
    return reply("🧮 ᴜsᴀɢᴇ: .ᴄᴀʟᴄ 10 + 5");
  }

  const expression = args.join(" ");

  // Only allow basic arithmetic characters.
  if (!/^[0-9+\-*/().%\s]+$/.test(expression)) {
    return reply("❌ ɪɴᴠᴀʟɪᴅ ᴄᴀʟᴄᴜʟᴀᴛɪᴏɴ.");
  }

  try {
    const result = Function(`"use strict"; return (${expression})`)();

    await reply(
      `╭━━━〔 🧮 ᴄᴀʟᴄᴜʟᴀᴛᴏʀ 〕━━━╮
┃
┃ 🔢 ɪɴᴘᴜᴛ: ${expression}
┃ ✅ ʀᴇsᴜʟᴛ: ${result}
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
    );
  } catch {
    await reply("❌ ᴄᴏᴜʟᴅ ɴᴏᴛ ᴄᴀʟᴄᴜʟᴀᴛᴇ.");
  }
}, {
  category: "TOOLS"
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━
   📚 HELP
━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

command(["help", "commands"], async ({ reply }) => {
  await reply(
    `╭━━━〔 📚 ᴄᴏᴍᴍᴀɴᴅs 〕━━━╮
┃
┃ 🏓 .ping
┃ 🟢 .alive
┃ 📊 .status
┃ ⏱️ .runtime
┃ 👑 .owner
┃ ⚙️ .settings
┃ 👁️ .vv
┃ 🧮 .calc
┃
┃ ⚡ ᴍᴏʀᴇ ᴄᴏᴍᴍᴀɴᴅs ᴄᴏᴍɪɴɢ
┃ ᴛʜʀᴏᴜɢʜ ᴛʜᴇ 26 ᴄᴀᴛᴇɢᴏʀɪᴇs.
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
  );
}, {
  category: "GENERAL"
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🔎 LOOKUP
━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function getCommand(name) {
  return commands.get(name.toLowerCase());
}

export function getAllCommands() {
  return [...commands.values()];
}

export function getCommandsByCategory(category) {
  return [...commands.values()].filter(
    (cmd) => cmd.category === category.toUpperCase()
  );
}

export default commands;
