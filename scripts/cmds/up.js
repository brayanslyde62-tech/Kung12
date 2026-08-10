const os = require("os");

module.exports = {

  config: {
    name: "uptime",
    aliases: ["up", "ut"],
    version: "5.4",
    author: "Crimson 🥷🪽",
    countDown: 5,
    role: 0,
    shortDescription: {
      fr: "Statut complet et métriques du bot"
    },
    category: "info"
  },

  onStart: async function ({ message, usersData }) {
    const startPing = Date.now();

    // URLs d'images directes et vérifiées
    const images = [
      "https://us.oricon-group.com/upimg/sns/1000/1953/img1200/1257ec3464d228a6dac26d1cf9710d26.jpg"
    ];

    const img = images[Math.floor(Math.random() * images.length)];

    // Calcul de l'uptime
    const uptime = process.uptime();
    const d = Math.floor(uptime / 86400);
    const h = Math.floor((uptime % 86400) / 3600);
    const m = Math.floor((uptime % 3600) / 60);
    const s = Math.floor(uptime % 60);

    // Métriques mémoire
    const ramUsed = Math.round(process.memoryUsage().rss / 1024 / 1024);
    const totalRam = Math.round(os.totalmem() / 1024 / 1024);

    // Vrai calcul de latence au moment du rendu
    const ping = Date.now() - startPing;

    let adminName = "Inconnu";
    try {
      const adminUID = global.GoatBot.config.adminBot[0];
      const adminInfo = await usersData.get(adminUID);
      adminName = adminInfo.name;
    } catch (e) {}

    const body = `
╭━━━━━━ ⚽ 𝐒𝐀𝐄 𝐈𝐓𝐎𝐒𝐇𝐈 ⚽ ━━━━━━╮

🤖 𝐁𝐎𝐓 𝐒𝐓𝐀𝐓𝐔𝐒

🟢 Statut :
『 En ligne ✅ 』

⏱️ Uptime :
${d}j ${h}h ${m}m ${s}s

⚡ Ping Réel :
${ping} ms

📦 Commandes :
${global.GoatBot.commands?.size || 0}

💾 RAM Utilisée :
${ramUsed} MB / ${totalRam} MB

💻 Node.js :
${process.version}

🖥️ Système :
${os.platform()} (${os.arch()})

👑 Admin du Bot :
『 ${adminName} 』

⚽ Mode :
『 Sae Itoshi AI 』

╰━━━━━━━━━━━━━━━━━━╯
`;

    let attachment = null;
    try {
      attachment = await global.utils.getStreamFromURL(img);
    } catch (err) {
      console.error("[UPTIME ERROR] Image introuvable :", err.message);
    }

    await message.reply({
      body,
      ...(attachment && { attachment })
    });

  }
};
