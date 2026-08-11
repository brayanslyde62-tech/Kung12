const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const IMAGES = [
	"https://i.ibb.co/SwQt62Nj/496512273-1204951088032522-2615432667809170938-n-jpg-stp-dst-jpg-s480x480-tt6-nc-cat-103-ccb-1-7-n.jpg",
	"https://i.ibb.co/NdXQTtdQ/582177743-1422681209863991-3938323416121779783-n-jpg-stp-dst-jpg-s480x480-tt6-nc-cat-101-ccb-1-7-n.jpg",
	"https://i.ibb.co/DD4Q8Sfv/714223136-4515716092015557-389525099031517-n-jpg-stp-dst-jpg-s480x480-tt6-nc-cat-109-ccb-1-7-nc-si.jpg",
	"https://i.ibb.co/pjgtmM6n/737401343-1735081627832639-6476078146213765327-n-jpg-stp-dst-jpg-s480x480-tt6-nc-cat-107-ccb-1-7-n.jpg",
	"https://i.ibb.co/gFDdVfhG/520142159-1416962302684681-3100311594614701165-n-jpg-stp-dst-jpg-p480x480-tt6-nc-cat-109-ccb-1-7-n.jpg"
];

module.exports = {
	config: {
		name: "ping",
		aliases: ["ms", "speed", "latency"],
		version: "1.0",
		author: "CRIMSON 🖇️🩵🪽",
		countDown: 3,
		role: 0,
		description: {
			fr: "Vérifier la vitesse de réponse du système (Mode Sae Itoshi)",
			en: "Check system response latency (Sae Itoshi Mode)"
		},
		category: "system",
		guide: {
			fr: "{pn}"
		}
	},

	langs: {
		fr: {
			checking: "⚽ Calcul de la vitesse du terrain en cours...",
			imageError: "❌ Impossible de charger le visuel."
		},
		en: {
			checking: "⚽ Measuring system velocity...",
			imageError: "❌ Failed to load image."
		}
	},

	onStart: async function ({ message, getLang }) {
		const startTime = Date.now();

		// Téléchargement d'un visuel Sae aléatoire
		const selectedImageUrl = IMAGES[Math.floor(Math.random() * IMAGES.length)];
		const cacheDir = path.join(__dirname, "cache");
		if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
		const cachePath = path.join(cacheDir, `sae_ping_${Date.now()}.jpg`);

		try {
			const res = await axios.get(selectedImageUrl, { responseType: "arraybuffer" });
			fs.writeFileSync(cachePath, Buffer.from(res.data));
		} catch (err) {
			console.error("[Sae Ping Image Error]:", err.message);
			return message.reply(getLang("imageError"));
		}

		const latency = Date.now() - startTime;
		const uptime = process.uptime();

		// Formatting Uptime (Heures, Minutes, Secondes)
		const hours = Math.floor(uptime / 3600);
		const minutes = Math.floor((uptime % 3600) / 60);
		const seconds = Math.floor(uptime % 60);

		const responseText = 
			`━━━ 𝐒𝐀𝐄 𝐈𝐓𝐎𝐒𝐇𝐈 𝐒𝐏𝐄𝐄𝐃 ━━━\n\n` +
			`⚡ 𝐋𝐚𝐭𝐞𝐧𝐜𝐞 : ${latency}ms\n` +
			`⏱️ 𝐔𝐩𝐭𝐢𝐦𝐞 : ${hours}h ${minutes}m ${seconds}s\n` +
			`📊 𝐒𝐭𝐚𝐭𝐮𝐬 : ${latency < 200 ? "Précision chirurgicale 🎯" : "Ralentissement détecté ⚠️"}\n\n` +
			`─────────────────────\n` +
			`👑 𝐒𝐀𝐄 𝐈𝐓𝐎𝐒𝐇𝐈 𝐁𝐎𝐓\n` +
			`⚡ 𝐑𝐞𝐚𝐥 𝐌𝐚𝐝𝐫𝐢𝐝 𝐘𝐨𝐮𝐭𝐡 | 𝐍𝐮𝐦𝐛𝐞𝐫 𝟏𝟎\n` +
			`━━━━━━━━━━━━━━━━━━━━━━━━━`;

		try {
			await message.reply({
				body: responseText,
				attachment: fs.createReadStream(cachePath)
			});
		} catch (e) {
			console.error("[Ping Command Error]:", e.message || e);
		} finally {
			if (fs.existsSync(cachePath)) fs.unlinkSync(cachePath);
		}
	}
};