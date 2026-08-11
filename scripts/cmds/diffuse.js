const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

// Liste des visuels Sae Itoshi
const IMAGES = [
	"https://i.ibb.co/SwQt62Nj/496512273-1204951088032522-2615432667809170938-n-jpg-stp-dst-jpg-s480x480-tt6-nc-cat-103-ccb-1-7-n.jpg",
	"https://i.ibb.co/NdXQTtdQ/582177743-1422681209863991-3938323416121779783-n-jpg-stp-dst-jpg-s480x480-tt6-nc-cat-101-ccb-1-7-n.jpg",
	"https://i.ibb.co/DD4Q8Sfv/714223136-4515716092015557-389525099031517-n-jpg-stp-dst-jpg-s480x480-tt6-nc-cat-109-ccb-1-7-nc-si.jpg",
	"https://i.ibb.co/pjgtmM6n/737401343-1735081627832639-6476078146213765327-n-jpg-stp-dst-jpg-s480x480-tt6-nc-cat-107-ccb-1-7-n.jpg",
	"https://i.ibb.co/gFDdVfhG/520142159-1416962302684681-3100311594614701165-n-jpg-stp-dst-jpg-p480x480-tt6-nc-cat-109-ccb-1-7-n.jpg"
];

module.exports = {
	config: {
		name: "diffuse",
		aliases: ["diff", "broadcast"],
		version: "3.0",
		author: "CRIMSON 🖇️🩵🪽",
		countDown: 5,
		role: 2,
		description: {
			fr: "Diffuser une annonce officielle (Mode Sae Itoshi)",
			en: "Send broadcast notification (Sae Itoshi Mode)"
		},
		category: "owner",
		guide: {
			fr: "{pn} message"
		},
		envConfig: {
			delayPerGroup: 1000
		}
	},

	langs: {
		fr: {
			missingMessage: "⚽ Spécifie le message à transmettre aux terrains.",
			sendingNotification: "⚙️ Déploiement du message dans %1 groupes...",
			sentNotification: "👑 Notification transmise dans %1/%2 groupes.",
			imageError: "❌ Échec de récupération du visuel Sae Itoshi."
		},
		en: {
			missingMessage: "⚽ Provide the message to broadcast.",
			sendingNotification: "⚙️ Broadcasting to %1 groups...",
			sentNotification: "👑 Sent to %1/%2 groups.",
			imageError: "❌ Failed to download Sae Itoshi image."
		}
	},

	onStart: async function ({
		message,
		api,
		envCommands,
		commandName,
		args,
		threadsData,
		getLang
	}) {
		const { delayPerGroup } = envCommands[commandName];

		if (!args[0]) return message.reply(getLang("missingMessage"));

		// Sélection aléatoire d'une image parmi les 5
		const selectedImageUrl = IMAGES[Math.floor(Math.random() * IMAGES.length)];

		// Gestion du fichier cache temporaire
		const cacheDir = path.join(__dirname, "cache");
		if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
		const cachePath = path.join(cacheDir, `sae_broadcast_${Date.now()}.jpg`);

		try {
			const res = await axios.get(selectedImageUrl, { responseType: "arraybuffer" });
			fs.writeFileSync(cachePath, Buffer.from(res.data));
		} catch (err) {
			console.error("[Sae Broadcast Image Error]:", err.message);
			return message.reply(getLang("imageError"));
		}

		// Filtrage des groupes actifs où le bot est présent
		const allThreads = (await threadsData.getAll()).filter(
			t => t.isGroup && t.members.some(m => m.userID == api.getCurrentUserID() && m.inGroup)
		);

		await message.reply(getLang("sendingNotification", allThreads.length));

		let success = 0;

		try {
			for (const thread of allThreads) {
				const formSend = {
					body: `━━━ 𝐒𝐀𝐄 𝐈𝐓𝐎𝐒𝐇𝐈 𝐍𝐎𝐓𝐈𝐅𝐈𝐂𝐀𝐓𝐈𝐎𝐍 ━━━\n\n` +
						`🏟️ 𝐓𝐚𝐫𝐠𝐞𝐭 : ${thread.threadName || "Terrain Inconnu"}\n\n` +
						`─────────────────────\n\n` +
						`💬 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 :\n\n${args.join(" ")}\n\n` +
						`─────────────────────\n` +
						`👑 𝐒𝐀𝐄 𝐈𝐓𝐎𝐒𝐇𝐈 𝐁𝐎𝐓\n` +
						`⚡ 𝐑𝐞𝐚𝐥 𝐌𝐚𝐝𝐫𝐢𝐝 𝐘𝐨𝐮𝐭𝐡 | 𝐍𝐮𝐦𝐛𝐞𝐫 𝟏𝟎\n` +
						`━━━━━━━━━━━━━━━━━━━━━━━━━`,
					attachment: fs.createReadStream(cachePath)
				};

				try {
					await api.sendMessage(formSend, thread.threadID);
					success++;
				} catch (e) {
					console.error(`[Broadcast Fail] Group: ${thread.threadID} | Error:`, e.message || e);
				}

				await new Promise(resolve => setTimeout(resolve, delayPerGroup));
			}
		} finally {
			// Destruction systématique de l'image locale
			if (fs.existsSync(cachePath)) fs.unlinkSync(cachePath);
		}

		return message.reply(getLang("sentNotification", success, allThreads.length));
	}
};