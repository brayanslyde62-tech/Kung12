const fs = require("fs-extra");
const axios = require("axios");
const { utils } = global;

const spamTracker = new Map();

const saeImages = [
	"https://i.ibb.co/SwQt62Nj/496512273-1204951088032522-2615432667809170938-n-jpg-stp-dst-jpg-s480x480-tt6-nc-cat-103-ccb-1-7-n.jpg",
	"https://i.ibb.co/NdXQTtdQ/582177743-1422681209863991-3938323416121779783-n-jpg-stp-dst-jpg-s480x480-tt6-nc-cat-101-ccb-1-7-n.jpg",
	"https://i.ibb.co/DD4Q8Sfv/714223136-4515716092015557-389525099031517-n-jpg-stp-dst-jpg-s480x480-tt6-nc-cat-109-ccb-1-7-nc-si.jpg",
	"https://i.ibb.co/pjgtmM6n/737401343-1735081627832639-6476078146213765327-n-jpg-stp-dst-jpg-s480x480-tt6-nc-cat-107-ccb-1-7-n.jpg",
	"https://i.ibb.co/gFDdVfhG/520142159-1416962302684681-3100311594614701165-n-jpg-stp-dst-jpg-p480x480-tt6-nc-cat-109-ccb-1-7-n.jpg"
];

const saeReplies = [
	"%1, tu souffres d'amnésie ou ton cerveau manque juste d'irrigation ? Je viens de te le donner. N'attend aucun talent d'un type médiocre comme toi.",
	"Encore, %1 ? Arrête de me faire perdre mon temps avec tes spams inutiles, tiède.",
	"%1, répéter la même chose en boucle ne comblera pas ton manque de niveau. Regarde le message au-dessus et tais-toi.",
	"T'as besoin qu'on te prémâche l'information combien de fois, %1 ? Tu es désespérant.",
	"Incapable d'imprimer une donnée aussi basique, %1... Le niveau zéro de la réflexion.",
	"%1, ne me force pas à gaspiller mon énergie pour tes caprices de débutant.",
	"C'est censé être drôle, %1 ? Ton manque d'efficacité me donne la nausée.",
	"%1, tu spams parce que c'est la seule façon pour toi d'exister dans cette conversation ?",
	"T'as le cerveau aussi lent que ta vision du jeu, %1. Lis le message plus haut.",
	"%1, garde tes doigts loin de ton écran si c'est pour sortir des inepties pareilles.",
	"Même un pnj de fond aurait déjà assimilé l'information, %1. Tu fais quoi là ?",
	"Encore toi, %1 ? Ta présence est déjà une perte de temps, alors arrête d'aggraver ton cas.",
	"C'est bien %1, continue de prouver à tout le monde que tu ne sais pas lire.",
	"%1, tu manques cruellement de technique, même pour taper un simple mot sur ton clavier.",
	"Ton insistance ne masque pas ton incompétence, %1. Le préfixe est juste au-dessus.",
	"Je ne suis pas là pour faire du baby-sitting avec des joueurs de seconde zone comme toi, %1.",
	"%1, tu crois que je vais changer le préfixe juste parce que tu répètes le même mot comme un robot ?",
	"Aucune vision, aucun timing, %1. Ton spam est aussi prévisible que tes mouvements.",
	"Tu devrais utiliser cette énergie pour apprendre à te servir de tes yeux, %1.",
	"C'est gênant à ce stade, %1. Arrête de te donner en spectacle.",
	"%1, tu es le genre de poids mort qui ralentit toute l'équipe.",
	"Je t'ai déjà répondu, %1. Si ton cerveau a du mal à faire le lien, ce n'est plus mon problème.",
	"Tu cherches mon attention, %1 ? Tu n'as pas le niveau pour ça.",
	"Tes tentatives de spam sont aussi pathétiques que ton niveau de jeu, %1.",
	"%1, tu penses vraiment que c'est en insistant que tu vas devenir intéressant ?",
	"Regarde l'historique du chat au lieu d'agir comme un incapable, %1.",
	"Tu n'as aucune discipline, %1. C'est pour ça que tu resteras toujours en bas du classement.",
	"Encore un effort %1 et tu atteindras le niveau d'un bot mal codé. Quoique, non.",
	"Ton manque de précision me fatigue, %1. Le préfixe n'a pas bougé depuis 5 secondes.",
	"%1, tu perds ton temps, tu me fais perdre le mien. Disparais.",
	"Incapable de retenir une information de 3 caractères, %1... C'est consternant.",
	"%1, tu fais exprès d'être aussi tiède ou c'est naturel chez toi ?",
	"Sérieusement %1 ? Tu comptes faire ça toute la journée au lieu de te rendre utile ?",
	"Même sur un terrain, un type comme toi finirait sur le banc en deux minutes, %1.",
	"Ta persévérance est déplacée, %1. Utilise-la plutôt pour apprendre à lire.",
	"Chaque message que tu envoies réduit le niveau global de ce groupe, %1.",
	"%1, tu n'apportes rien d'intéressant. Lève les yeux et lis.",
	"Tu t'enfonces, %1. Arrête de taper 'prefix' et va bosser ta vision.",
	"%1, tu veux un dessin ou tu vas enfin décider de faire fonctionner tes neurones ?",
	"Inutile de forcer %1, tu resteras un figurant sans impact.",
	"Si tu mettais autant d'ardeur à réfléchir qu'à spanner, %1, tu ferais peut-être illusion.",
	"%1, tu es la définition même du bruit parasite.",
	"Encore une preuve que tu n'as aucun contrôle sur ce que tu fais, %1.",
	"Je t'ai déjà donné l'information, %1. Fais un effort pour l'analyser.",
	"La répétition sans progrès, c'est la marque des médiocres, %1.",
	"%1, tu fatigues tout le monde. Passe à autre chose.",
	"Ton niveau d'attention est à l'image de ton talent, %1 : inexistant.",
	"%1, tu spams 'prefix' parce que tu n'as rien d'autre d'intelligent à dire ?",
	"Ferme-la %1, et regarde ce qui me précède.",
	"Je ne te répéterai plus jamais rien, %1. Démerde-toi avec ce qu'il y a plus haut."
];

function boxify(text, title = "SAE ITOSHI") {
	return `╭━━━〘 ⚽ ${title} 〙━━━╮\n┃\n┃ ${text.split('\n').join('\n┃ ')}\n┃\n╰━━━━━━━━━━━━━━━━━━━━╯`;
}

module.exports = {
	config: {
		name: "prefix",
		version: "1.9",
		author: "CRIMSON 🩵🪽",
		countDown: 5,
		role: 0,
		description: "Changer le préfixe de commande du bot dans votre groupe ou dans tout le système (réservé aux admins bot)",
		category: "config",
		guide: {
			vi: "   {pn} <new prefix>: thay đổi prefix mới trong box chat của bạn"
				+ "\n   Ví dụ:"
				+ "\n    {pn} #"
				+ "\n\n   {pn} <new prefix> -g: thay đổi prefix mới trong hệ thống bot (chỉ admin bot)"
				+ "\n   Ví dụ:"
				+ "\n    {pn} # -g"
				+ "\n\n   {pn} reset: thay đổi prefix trong box chat của bạn về mặc định",
			en: "   {pn} <new prefix>: change new prefix in your box chat"
				+ "\n   Example:"
				+ "\n    {pn} #"
				+ "\n\n   {pn} reset: change prefix in your box chat to default",
			fr: "   {pn} <nouveau préfixe> : change le préfixe dans votre groupe\n"
				+ "   Exemple :\n"
				+ "    {pn} #\n\n"
				+ "   {pn} <nouveau préfixe> -g : change le préfixe dans tout le système du bot (admin bot uniquement)\n"
				+ "   Exemple :\n"
				+ "    {pn} # -g\n\n"
				+ "   {pn} reset : réinitialise le préfixe de votre groupe à celui par défaut"
		}
	},

	langs: {
		vi: {
			reset: "Đã reset prefix của bạn về mặc định: %1",
			onlyAdmin: "Chỉ admin mới có thể thay đổi prefix hệ thống bot",
			confirmGlobal: "Vui lòng thả cảm xúc bất kỳ vào tin nhắn này để xác nhận thay đổi prefix của toàn bộ hệ thống bot",
			confirmThisThread: "Vui lòng thả cảm xúc bất kỳ vào tin nhắn này để xác nhận thay đổi prefix trong nhóm chat của bạn",
			successGlobal: "Đã thay đổi prefix hệ thống bot thành: %1",
			successThisThread: "Đã thay đổi prefix trong nhóm chat của bạn thành: %1",
			myPrefix: "👋 Hey %1, tu m’as demandé mon préfixe ?\n➥ 🌐 Global : %2\n➥ 💬 Ce groupe : %3\nJe suis %4 à ton service 🫡"
		},
		en: {
			reset: "Your prefix reset to default: %1",
			onlyAdmin: "Only admin can change prefix of system bot",
			confirmGlobal: "Please react to this message to confirm change prefix of system bot",
			confirmThisThread: "Please react to this message to confirm change prefix in your box chat",
			successGlobal: "Changed prefix of system bot to: %1",
			successThisThread: "Changed prefix in your box chat to: %1",
			myPrefix: "👋 Hey %1, tu m’as demandé mon préfixe ?\n➥ 🌐 Global : %2\n➥ 💬 Ce groupe : %3\nJe suis %4 à ton service 🫡"
		},
		fr: {
			reset: "Votre préfixe a été réinitialisé : %1",
			onlyAdmin: "Seul un admin bot peut changer le préfixe du système",
			confirmGlobal: "Réagissez à ce message pour confirmer le changement de préfixe du système",
			confirmThisThread: "Réagissez à ce message pour confirmer le changement de préfixe dans ce groupe",
			successGlobal: "Le préfixe du système a été changé en : %1",
			successThisThread: "Le préfixe de ce groupe a été changé en : %1",
			myPrefix: "👋 Hey %1, tu m’as demandé mon préfixe ?\n➥ 🌐 Global : %2\n➥ 💬 Ce groupe : %3\nJe suis %4 à ton service 🫡"
		}
	},

	onStart: async function ({ message, role, args, commandName, event, threadsData, getLang }) {
		if (!args[0])
			return message.SyntaxError();

		if (args[0] == 'reset') {
			await threadsData.set(event.threadID, null, "data.prefix");
			return message.reply(getLang("reset", global.GoatBot.config.prefix));
		}

		const newPrefix = args[0];
		const formSet = {
			commandName,
			author: event.senderID,
			newPrefix
		};

		if (args[1] === "-g")
			if (role < 2)
				return message.reply(getLang("onlyAdmin"));
			else
				formSet.setGlobal = true;
		else
			formSet.setGlobal = false;

		return message.reply(args[1] === "-g" ? getLang("confirmGlobal") : getLang("confirmThisThread"), (err, info) => {
			formSet.messageID = info.messageID;
			global.GoatBot.onReaction.set(info.messageID, formSet);
		});
	},

	onReaction: async function ({ message, threadsData, event, Reaction, getLang }) {
		const { author, newPrefix, setGlobal } = Reaction;
		if (event.userID !== author)
			return;
		if (setGlobal) {
			global.GoatBot.config.prefix = newPrefix;
			fs.writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
			return message.reply(getLang("successGlobal", newPrefix));
		}
		else {
			await threadsData.set(event.threadID, newPrefix, "data.prefix");
			return message.reply(getLang("successThisThread", newPrefix));
		}
	},

	onChat: async function ({ event, message, getLang, usersData }) {
		if (event.body && event.body.toLowerCase() === "prefix") {
			const userId = event.senderID;
			const key = `${event.threadID}_${userId}`;
			const userName = await usersData.getName(userId);

			if (spamTracker.has(key)) {
				const randomTemplate = saeReplies[Math.floor(Math.random() * saeReplies.length)];
				const rawReply = randomTemplate.replace(/%1/g, userName);
				const formattedReply = boxify(rawReply, "SAE ITOSHI");
				const randomImgUrl = saeImages[Math.floor(Math.random() * saeImages.length)];

				try {
					const imgStream = (await axios.get(randomImgUrl, { responseType: "stream" })).data;
					return message.reply({
						body: formattedReply,
						attachment: imgStream
					});
				} catch (e) {
					return message.reply(formattedReply);
				}
			}

			spamTracker.set(key, true);
			setTimeout(() => spamTracker.delete(key), 30000);

			const botName = "SAE BOT 🍒🫟";
			const rawPrefixMsg = getLang("myPrefix", userName, global.GoatBot.config.prefix, utils.getPrefix(event.threadID), botName);
			return message.reply(boxify(rawPrefixMsg, "INFO PREFIX"));
		}
	}
};