import fs from "fs";
import path from "path";

const DB_FILE = path.resolve("./data/database.json");
const DATA_DIR = path.dirname(DB_FILE);

function ensureDatabase() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(
      DB_FILE,
      JSON.stringify(
        {
          users: {},
          sessions: {},
          settings: {}
        },
        null,
        2
      )
    );
  }
}

export function loadDatabase() {
  ensureDatabase();

  try {
    return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  } catch (error) {
    console.error("❌ Database read error:", error);

    return {
      users: {},
      sessions: {},
      settings: {}
    };
  }
}

export function saveDatabase(data) {
  ensureDatabase();

  fs.writeFileSync(
    DB_FILE,
    JSON.stringify(data, null, 2)
  );
}

export function getUser(userId) {
  const db = loadDatabase();
  return db.users[userId] || null;
}

export function saveUser(userId, userData) {
  const db = loadDatabase();

  db.users[userId] = {
    ...(db.users[userId] || {}),
    ...userData
  };

  saveDatabase(db);

  return db.users[userId];
}

export function saveSession(userId, sessionData) {
  const db = loadDatabase();

  db.sessions[userId] = {
    ...(db.sessions[userId] || {}),
    ...sessionData
  };

  saveDatabase(db);

  return db.sessions[userId];
}

export function getSession(userId) {
  const db = loadDatabase();
  return db.sessions[userId] || null;
}

export function saveSetting(userId, key, value) {
  const db = loadDatabase();

  if (!db.settings[userId]) {
    db.settings[userId] = {};
  }

  db.settings[userId][key] = value;

  saveDatabase(db);
}

export function getSetting(userId, key, fallback = null) {
  const db = loadDatabase();

  return db.settings[userId]?.[key] ?? fallback;
}
