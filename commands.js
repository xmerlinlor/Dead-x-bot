// commands.js
// ☠️ ᴅᴇᴀᴅ × ʙᴏᴛ — ᴄᴏᴍᴍᴀɴᴅ ᴇɴɢɪɴᴇ + 26 ᴄᴀᴛᴇɢᴏʀɪᴇs

const commands = new Map();

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

/* ═══════════════════════════════
   📚 FULL MENU
═══════════════════════════════ */

const MENU = `
╭━━━〔 👑 dead xMᴅ 〕━━━╮
┃
┃ 👋 Hᴇʟʟᴏ, ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ dead x Mᴅ
┃
┃ ⚡ Fᴀsᴛ • Sᴍᴀʀᴛ • Pᴏᴡᴇʀғᴜʟ
┃
┃ ─────────────────────
┃
┃ 📚 Cᴏᴍᴍᴀɴᴅ Mᴇɴᴜ
┃
┃ 01 ➜ .general
┃ 02 ➜ .owner
┃ 03 ➜ .group
┃ 04 ➜ .security
┃ 05 ➜ .lock
┃ 06 ➜ .welcome
┃ 07 ➜ .ai
┃ 08 ➜ .music
┃ 09 ➜ .download
┃ 10 ➜ .sticker
┃ 11 ➜ .games
┃ 12 ➜ .fun
┃ 13 ➜ .economy
┃ 14 ➜ .level
┃ 15 ➜ .user
┃ 16 ➜ .search
┃ 17 ➜ .tools
┃ 18 ➜ .whatsapp
┃ 19 ➜ .anime
┃ 20 ➜ .settings
┃ 21 ➜ .premium
┃ 22 ➜ .stats
┃ 23 ➜ .automation
┃ 24 ➜ .media
┃ 25 ➜ .extra
┃ 26 ➜ .vv
┃
╰━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 👑 dead xMᴅ 〕━━━╮
┃
┃ 👑 Dead x Mᴅ
┃ ⚡ made by Simon Tech inc
┃ ❤️ Mᴀᴅᴇ Wɪᴛʜ Lᴏᴠᴇ
┃
╰━━━━━━━━━━━━━━━━━━━━╯
`;

/* ═══════════════════════════════
   📖 CATEGORY LISTS
═══════════════════════════════ */

const CATEGORIES = {
  general: [
    ".menu", ".help", ".allmenu", ".list", ".commands",
    ".ping", ".alive", ".status", ".runtime", ".uptime",
    ".botinfo", ".info", ".about", ".owner", ".owners",
    ".creator", ".speed", ".cpu", ".ram", ".disk",
    ".server", ".host", ".version", ".features", ".stats",
    ".health", ".support", ".rules", ".terms", ".privacy"
  ],

  owner: [
    ".broadcast", ".bc", ".bcgroup", ".bcall",
    ".eval", ".exec", ".shell", ".restart", ".shutdown",
    ".reload", ".update", ".install", ".uninstall",
    ".addsudo", ".delsudo", ".listsudo", ".addowner",
    ".delowner", ".listowner", ".block", ".unblock",
    ".blocklist", ".join", ".leave", ".leaveall",
    ".setname", ".setbio", ".setpp", ".delpp",
    ".setstatus", ".maintenance"
  ],

  group: [
    ".kick", ".add", ".promote", ".demote", ".ban",
    ".unban", ".mute", ".unmute", ".warn", ".unwarn",
    ".warnings", ".resetwarn", ".delete", ".del",
    ".purge", ".clear", ".tagall", ".hidetag",
    ".tagadmins", ".tag", ".mention", ".mentionall",
    ".groupinfo", ".members", ".admins", ".listadmins",
    ".getgroup", ".getinvite", ".link", ".revoke",
    ".approve", ".reject", ".open", ".close",
    ".setsubject", ".setdescription", ".setrules",
    ".setgroupicon", ".removeicon", ".resetgroup",
    ".groupstats", ".memberinfo"
  ],

  security: [
    ".antilink", ".antispam", ".antiflood", ".antiraid",
    ".antibot", ".antidelete", ".antimention", ".antitag",
    ".antiinvite", ".anticall", ".antiswear", ".antislam",
    ".antiscam", ".antiphishing", ".antinsfw",
    ".antiforward", ".antimedia", ".antigif",
    ".antisticker", ".security", ".antidomain",
    ".antichannel", ".antiporn", ".antidup",
    ".antiunknown", ".antivoice", ".antireport",
    ".securitylog", ".securityinfo", ".resetsecurity"
  ],

  lock: [
    ".lock", ".unlock", ".locklink", ".unlocklink",
    ".lockmedia", ".unlockmedia", ".lockphoto",
    ".unlockphoto", ".lockvideo", ".unlockvideo",
    ".lockaudio", ".unlockaudio", ".lockdocument",
    ".unlockdocument", ".locksticker", ".unlocksticker",
    ".lockgif", ".unlockgif", ".lockcontact",
    ".unlockcontact", ".locklocation", ".unlocklocation",
    ".lockpoll", ".unlockpoll", ".lockreaction",
    ".unlockreaction", ".lockvoice", ".unlockvoice",
    ".lockall", ".unlockall"
  ],

  welcome: [
    ".welcome", ".welcomeon", ".welcomeoff",
    ".setwelcome", ".getwelcome", ".resetwelcome",
    ".goodbye", ".goodbyeon", ".goodbyeoff",
    ".setgoodbye", ".getgoodbye", ".resetgoodbye",
    ".welcomeimage", ".goodbyeimage", ".welcometext",
    ".goodbyetext", ".welcomegif", ".goodbyegif",
    ".welcomevideo", ".goodbyevideo", ".welcometag",
    ".goodbyetag", ".welcomebutton", ".goodbyebutton",
    ".welcomeaudio", ".goodbyeaudio", ".welcomeadmin",
    ".goodbyeadmin", ".welcomechannel", ".resetgreet"
  ],

  ai: [
    ".ai", ".ask", ".chat", ".chatbot", ".gpt",
    ".gemini", ".llama", ".deepseek", ".imagine",
    ".image", ".draw", ".generate", ".translate",
    ".detect", ".summarize", ".summary", ".rewrite",
    ".paraphrase", ".grammar", ".fixgrammar",
    ".explain", ".code", ".debug", ".review",
    ".optimize", ".essay", ".story", ".poem",
    ".question"
  ],

  music: [
    ".play", ".song", ".music", ".audio", ".mp3",
    ".ytmp3", ".ytaudio", ".ytsearch", ".searchsong",
    ".lyrics", ".lyric", ".album", ".artist",
    ".songinfo", ".musicinfo", ".spotify", ".spotifydl",
    ".soundcloud", ".soundclouddl", ".radio",
    ".playlist", ".queue", ".pause", ".resume",
    ".skip", ".stop", ".volume", ".next", ".previous"
  ],

  download: [
    ".video", ".ytmp4", ".ytvideo", ".youtube",
    ".youtubedl", ".tiktok", ".tiktokdl", ".tt",
    ".instagram", ".ig", ".igdl", ".facebook",
    ".fb", ".fbdl", ".twitter", ".x", ".xdl",
    ".threads", ".pinterest", ".pindl", ".reddit",
    ".redditdl", ".snapchat", ".snapdl", ".mediafire",
    ".gdrive", ".terabox", ".capcut", ".download",
    ".fetch"
  ],

  sticker: [
    ".sticker", ".s", ".stick", ".toimg", ".img",
    ".photo", ".webp", ".png", ".jpg", ".jpeg",
    ".crop", ".resize", ".rotate", ".flip", ".blur",
    ".sharpen", ".invert", ".grayscale", ".removebg",
    ".qr", ".qrcode", ".readqr", ".caption",
    ".meme", ".take", ".circle", ".round",
    ".frame", ".watermark"
  ],

  games: [
    ".game", ".games", ".tictactoe", ".ttt", ".rps",
    ".rock", ".paper", ".scissors", ".hangman",
    ".guess", ".number", ".trivia", ".quiz",
    ".mathgame", ".wordgame", ".scramble", ".anagram",
    ".memory", ".blackjack", ".dice", ".roll", ".coin",
    ".coinflip", ".spin", ".slot", ".lottery",
    ".battle", ".duel", ".chess"
  ],

  fun: [
    ".joke", ".jokes", ".meme", ".memegenerator",
    ".quote", ".quotes", ".truth", ".dare",
    ".truthordare", ".8ball", ".love", ".ship",
    ".compatibility", ".rizz", ".roast", ".compliment",
    ".insult", ".pickup", ".flirt", ".wyr",
    ".wouldyourather", ".emojimix", ".emojify",
    ".reverse", ".mock", ".fancy", ".howcute",
    ".howfunny", ".random"
  ],

  economy: [
    ".balance", ".bal", ".wallet", ".money", ".daily",
    ".weekly", ".monthly", ".work", ".job", ".crime",
    ".rob", ".gamble", ".bet", ".deposit", ".withdraw",
    ".pay", ".send", ".transfer", ".give", ".receive",
    ".claim", ".reward", ".bonus", ".cash", ".bank",
    ".transactions", ".history", ".rich", ".leaderboard"
  ],

  level: [
    ".level", ".xp", ".rank", ".ranking", ".leaderboard",
    ".top", ".topusers", ".topchat", ".topxp",
    ".topmoney", ".profile", ".card", ".badges",
    ".badge", ".achievements", ".achievement",
    ".reputation", ".rep", ".givexp", ".addxp",
    ".removexp", ".resetxp", ".levelup", ".mylevel",
    ".rankcard", ".rankings", ".toprank", ".toprep",
    ".topactive"
  ],

  user: [
    ".register", ".unregister", ".verify", ".unverify",
    ".profile", ".me", ".myinfo", ".myid", ".id",
    ".whois", ".avatar", ".pp", ".getpp", ".setbio",
    ".getbio", ".setage", ".getage", ".setgender",
    ".getgender", ".setlocation", ".getlocation",
    ".afk", ".unafk", ".afklist", ".mystats",
    ".activity", ".mygroups", ".groups", ".groupcount"
  ],

  search: [
    ".google", ".search", ".youtube", ".ytsearch",
    ".wikipedia", ".wiki", ".image", ".images",
    ".news", ".weather", ".forecast", ".time",
    ".timezone", ".date", ".calendar", ".translate",
    ".dictionary", ".define", ".meaning", ".synonym",
    ".antonym", ".github", ".stackoverflow", ".reddit",
    ".imdb", ".movies", ".anime", ".manga",
    ".lyrics", ".map"
  ],

  tools: [
    ".calculator", ".calc", ".unit", ".convert",
    ".currency", ".exchange", ".qr", ".qrcode",
    ".barcode", ".shorturl", ".urlshort", ".urlinfo",
    ".whois", ".ip", ".iplookup", ".dns", ".pingip",
    ".port", ".base64", ".encode", ".decode", ".md5",
    ".sha256", ".uuid", ".password", ".random",
    ".binary", ".hex", ".json", ".timestamp"
  ],

  whatsapp: [
    ".vcf", ".contact", ".save", ".forward", ".copy",
    ".quote", ".quoted", ".reply", ".react",
    ".reaction", ".read", ".unread", ".viewonce",
    ".toviewonce", ".poll", ".createpoll", ".pollresult",
    ".status", ".statusdl", ".statussave", ".statusview",
    ".story", ".channel", ".channelinfo", ".channelpost",
    ".channelsearch", ".contactinfo", ".business",
    ".jid", ".jidinfo"
  ],

  anime: [
    ".anime", ".animeinfo", ".animequote", ".animegirl",
    ".animeboy", ".neko", ".waifu", ".maid", ".husbando",
    ".kiss", ".hug", ".pat", ".slap", ".poke", ".bite",
    ".cuddle", ".wink", ".smile", ".wave", ".blush",
    ".cry", ".angry", ".dance", ".sad", ".happy",
    ".baka", ".senpai", ".kitsune", ".foxgirl", ".cosplay"
  ],

  settings: [
    ".settings", ".config", ".setprefix", ".getprefix",
    ".setlanguage", ".language", ".settimezone",
    ".timezone", ".setmode", ".public", ".private",
    ".self", ".groupmode", ".autoread", ".autotyping",
    ".autorecording", ".autoreact", ".autoview",
    ".autoreply", ".autostatus", ".autodownload",
    ".autosticker", ".autoemoji", ".autowelcome",
    ".autogoodbye", ".autobot", ".autoforward",
    ".autotranslate", ".resetsettings"
  ],

  premium: [
    ".premium", ".premiuminfo", ".plans", ".plan",
    ".buy", ".subscribe", ".subscription", ".activate",
    ".deactivate", ".addpremium", ".delpremium",
    ".listpremium", ".premiumusers", ".premiumcheck",
    ".premiumfeatures", ".premiumprice", ".premiumdays",
    ".adddays", ".removedays", ".giftpremium",
    ".premiumgift", ".premiumcode", ".redeem", ".coupon",
    ".coupons", ".createcoupon", ".delcoupon",
    ".listcoupon", ".premiumstats"
  ],

  stats: [
    ".stats", ".botstats", ".groupstats", ".userstats",
    ".commandstats", ".cmdstats", ".usage", ".logs",
    ".log", ".errorlogs", ".activitylogs", ".userlogs",
    ".grouplogs", ".broadcaststats", ".database",
    ".dbstats", ".dbstatus", ".connections", ".sessions",
    ".session", ".devices", ".process", ".memory",
    ".storage", ".uptimestats", ".serverstats",
    ".traffic", ".requests"
  ],

  automation: [
    ".autoreply", ".autoresponder", ".addreply",
    ".delreply", ".listreply", ".setreply", ".autoreact",
    ".addreact", ".delreact", ".listreact", ".autogreet",
    ".autowarn", ".autoban", ".automute", ".autokick",
    ".autodelete", ".autopin", ".autounpin", ".autotag",
    ".autotranslate", ".autosave", ".autodownload",
    ".autostatus", ".autoforward", ".autofilter",
    ".autorespond", ".autolike", ".autoview",
    ".autoread", ".autojoin"
  ],

  media: [
    ".stickerize", ".toaudio", ".tovideo", ".tomp3",
    ".toogg", ".tomp4", ".gif", ".togif", ".gifmp4",
    ".videogif", ".compress", ".compressvideo",
    ".compressimage", ".compressaudio", ".mutevideo",
    ".trim", ".cut", ".merge", ".speedvideo",
    ".slowvideo", ".reversevideo", ".volumeup",
    ".volumedown", ".screenshot", ".thumbnail",
    ".extractaudio", ".extractimage", ".videotosticker",
    ".imagetosticker", ".audiosticker", ".textsticker"
  ],

  extra: [
    ".report", ".reportuser", ".reportgroup", ".feedback",
    ".suggest", ".request", ".support", ".contact",
    ".faq", ".donate", ".sponsor", ".developer",
    ".source", ".repository", ".credits", ".thanks",
    ".invitebot", ".sharebot", ".addbot", ".botlink",
    ".pair", ".unpair", ".login", ".logout",
    ".sessioninfo", ".deviceinfo", ".checknumber",
    ".numberinfo", ".online", ".offline"
  ],

  vv: [
    ".vv", ".viewonce", ".view", ".savevv",
    ".saveviewonce", ".vvimage", ".vvvideo",
    ".vvaudio", ".vvmedia", ".vvphoto", ".vvsticker",
    ".vvdocument", ".vvinfo", ".vvtype", ".vvsize",
    ".vvtime", ".vvdownload", ".vvforward",
    ".vvreply", ".vvquote", ".vvcaption", ".vvrename",
    ".vvconvert", ".vvtoimage", ".vvtovideo",
    ".vvtoaudio", ".vvextract", ".vvstatus", ".vvhelp"
  ]
};

/* ═══════════════════════════════
   🔧 REAL COMMANDS
═══════════════════════════════ */

command("menu", async ({ reply }) => {
  await reply(MENU);
}, { category: "GENERAL" });

command(["help", "commands"], async ({ reply }) => {
  await reply(MENU);
}, { category: "GENERAL" });

command("ping", async ({ reply }) => {
  const start = Date.now();

  await reply(
    `╭━━━〔 🏓 ᴘᴏɴɢ 〕━━━╮
┃
┃ ⚡ ʀᴇsᴘᴏɴsᴇ: ${Date.now() - start}ᴍs
┃ 🟢 sᴛᴀᴛᴜs: ᴏɴʟɪɴᴇ
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
  );
}, { category: "GENERAL" });

command("alive", async ({ reply }) => {
  await reply(
    `╭━━━〔 ☠️ ᴅᴇᴀᴅ × ʙᴏᴛ 〕━━━╮
┃
┃ 🟢 sᴛᴀᴛᴜs: ᴏɴʟɪɴᴇ
┃ ⚡ sʏsᴛᴇᴍ: ᴀᴄᴛɪᴠᴇ
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
  );
}, { category: "GENERAL" });

command(["runtime", "uptime"], async ({ reply }) => {
  const total = Math.floor(process.uptime());

  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  await reply(
    `╭━━━〔 ⏱️ ʀᴜɴᴛɪᴍᴇ 〕━━━╮
┃
┃ 📅 ${days}ᴅ
┃ 🕐 ${hours}ʜ
┃ 🕑 ${minutes}ᴍ
┃ ⏱️ ${seconds}s
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
  );
}, { category: "GENERAL" });

command(["owner", "creator"], async ({ reply }) => {
  await reply(
    `╭━━━〔 👑 ᴏᴡɴᴇʀ 〕━━━╮
┃
┃ 👑 sɪᴍᴏɴ ᴛᴇᴄʜ
┃ ⚡ ᴅᴇᴀᴅ × ʙᴏᴛ
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
  );
}, { category: "OWNER" });

command(["settings", "config"], async ({ reply }) => {
  await reply(
    `╭━━━〔 ⚙️ sᴇᴛᴛɪɴɢs 〕━━━╮
┃
┃ ☠️ ʙᴏᴛ: ᴅᴇᴀᴅ × ʙᴏᴛ
┃ ⚡ ᴍᴏᴅᴇ: ᴘᴜʙʟɪᴄ
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
  );
}, { category: "SETTINGS" });

command(["vv", "viewonce"], async ({ reply }) => {
  await reply(
    `╭━━━〔 👁️ ᴠɪᴇᴡ ᴏɴᴄᴇ 〕━━━╮
┃
┃ 👁️ ᴠᴠ sʏsᴛᴇᴍ ᴀᴄᴛɪᴠᴇ
┃
┃ ↪️ ʀᴇᴘʟʏ ᴛᴏ ᴀ
┃ ᴠɪᴇᴡ-ᴏɴᴄᴇ ᴍᴇᴅɪᴀ
┃ ᴡɪᴛʜ .ᴠᴠ
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
  );
}, { category: "VV" });

command(["calc", "calculator"], async ({ args, reply }) => {
  if (!args.length) {
    return reply("🧮 ᴜsᴀɢᴇ: .ᴄᴀʟᴄ 10 + 5");
  }

  const expression = args.join(" ");

  if (!/^[0-9+\-*/().%\s]+$/.test(expression)) {
    return reply("❌ ɪɴᴠᴀʟɪᴅ ᴄᴀʟᴄᴜʟᴀᴛɪᴏɴ.");
  }

  try {
    const result = Function(
      `"use strict"; return (${expression})`
    )();

    await reply(`🧮 ${expression} = ${result}`);
  } catch {
    await reply("❌ ᴄᴀʟᴄᴜʟᴀᴛɪᴏɴ ғᴀɪʟᴇᴅ.");
  }
}, { category: "TOOLS" });

/* ═══════════════════════════════
   📦 REGISTER CATEGORY COMMANDS
═══════════════════════════════ */

for (const [category, list] of Object.entries(CATEGORIES)) {
  for (const item of list) {
    const name = item.replace(/^\./, "").toLowerCase();

    if (!commands.has(name)) {
      command(
        name,
        async ({ reply }) => {
          await reply(
            `⚙️ .${name}\n\n` +
            `📂 ᴄᴀᴛᴇɢᴏʀʏ: ${category.toUpperCase()}\n\n` +
            `🟡 ᴄᴏᴍᴍᴀɴᴅ ʀᴇɢɪsᴛᴇʀᴇᴅ.\n` +
            `🔧 ʜᴀɴᴅʟᴇʀ ᴡɪʟʟ ʙᴇ ᴄᴏɴɴᴇᴄᴛᴇᴅ.`
          );
        },
        { category: category.toUpperCase() }
      );
    }
  }
}

/* ═══════════════════════════════
   🔎 EXPORTS
═══════════════════════════════ */

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
