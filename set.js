const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkpqOHZCdmpwdnowWnA4VEpBYUIxUGVmTnNnSUxwc1ptTVlIak5GVFUwQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZmM5SFQrNGtZdk5Yb1dBbW1DQ2ltekFwaTNGSUtubmNqYnRXdjA0RjloND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjQklqOUVwTlhUcHVJTTM2eDY0TS9mRlY1OWxQWTIxN0FFZkJqcDZwK0VnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMMllTNkVRc2h4eHNxZkNqa0lDNk9EWE5Zb3YrMzdqVS9zSFBIN25IbWpZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFONktVdm14dElndEZWZm5yUWxzRm5XWjg2WHVHRTdYclozK1pSM2xobTg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZjcU1vUWNkU09sYjNHU1JTa0hmNkdDOXduNXJoN3dtK1IvRkVQTkJERUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ01nbm55TzNZRXgveW5VOXlUZFdrNnBzaWxudTVNUnZJbENvNkt6b2Vraz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUTZIeVB6dzNIZ21QZ09pSXpMU1gxaS9CNVR1eC9TSks2QzhWS3NXVGFtYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZjMHlnTWFMbUxiaEozYVkyUWE0NXoySlU4b0ZJMTV0dzQ2RWYwbDBpbjdnWlFuVjlSc3l3VVBUenRnVnM3S2FnTzUrYUNISkd4NVp0b2JYTnlPc0RRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzYsImFkdlNlY3JldEtleSI6ImJDMzYwd1BndHBmZ2ZDb0g1NmUvaUJ3S2FVdnkzM1JSSlF5UXc4MCtMams9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzNDE5MTU5NjcwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkExMzM0MEQ2QkI4MjM1MURFMDkyNjMyMzFGNkRDRkFCIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDEwNzcxMTZ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjkyMzQxOTE1OTY3MEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzOEZFRjYwMDZDMjI2Q0Y2QkJCNjFFMDk1MEZCNUMyMSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQxMDc3MTIwfV0sIm5leHRQcmVLZXlJZCI6NjEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo2MSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJWVFlJTXB0WFJqS0xTRkVnT2tEX2xBIiwicGhvbmVJZCI6ImQ0M2E0N2Y1LWZiNGItNGU2Mi1iMDY5LTM3ZDcyMWFiYmZjYSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqaDlBZUppenFVTHArSFY4ZjhmSHFqU2NhL289In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOWE0aXNpSWJ5VElnR21CT1pyMHdCMmxHYWRjPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjFYNUNXQ1Y3IiwibWUiOnsiaWQiOiI5MjM0MTkxNTk2NzA6ODZAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2RtPCdkbzwnZGv8J2RqPCdkbTwnZG08J2RqPCdkasg8J2RqPCdkbrwnZG+8J2RqPCdkasg8J+YjiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTjJIK1pNQkVPYjBtcjRHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoicGgzUWhXUEZlNG1abmlRVEU1WkhJbUVGeFhGNGJIN1h2aWxVN21IbjdFMD0iLCJhY2NvdW50U2lnbmF0dXJlIjoibUNpM1dBNGM5QVEzQzFod05BM2dVaFowUEh0ZVZhM215dlROVW1HV3o2RkNZSXAxczhVbVlaMitTSEZaalo1cUxkeUlYL2RGTG8vc296VDRySTIzRFE9PSIsImRldmljZVNpZ25hdHVyZSI6Im9LWHJqbEF3ZTVSNkVTNDNCY1RPeVZYMXZVMFZmRzg0eVNTcU5XVHBDZStqTlVjeGZ1TllOQUc4M0VKMFpaVXRkZCtXbEtPaWJ1SXNCVFVOMjdEekJBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzNDE5MTU5NjcwOjg2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmFZZDBJVmp4WHVKbVo0a0V4T1dSeUpoQmNWeGVHeCsxNzRwVk81aDUreE4ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDEwNzcxMTAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRjlSIn0=',
    PREFIXES: (process.env.PREFIX || '').split('.').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "M ASWAD",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "923419159670",
    AUTO_LIKE: process.env.STATUS_LIKE || "on",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    ANTIVIEW: process.env.VIEWONCE,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'recording',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
