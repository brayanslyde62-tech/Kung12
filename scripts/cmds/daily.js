const moment = require("moment-timezone");

const CLAIM_QUOTES = [
	"Tu as réclamé ta part, %1. Ne la gâche pas dans des achats inutiles.",
	"Une progression constante vaut mieux qu'un coup de chance, %1. Reviens demain.",
	"Ressources créditées. La régularité est le minimum requis pour rester à niveau, %1.",
	"C'est récupéré, %1. Assure-toi d'utiliser ces points avec précision.",
	"Récompense versée. La discipline est la seule chose qui te sépare du reste, %1.",
	"C'est tout ce que tu viens chercher, %1 ? Une aumône quotidienne ?",
	"Voici tes pièces, %1. Essaie d'en faire quelque chose de correct pour une fois.",
	"Crédité. Ne viens pas pleurer si tu finis quand même au fond du classement, %1.",
	"Tu collectes des ressources mais ton niveau reste désespérément plat, %1.",
	"Un vrai joueur n'a pas besoin de ça pour dominer, mais prends-le quand même, %1.",
	"Ton manque d'ambition m'étonne à chaque connexion, %1. Voilà tes points.",
	"Distribution effectuée. Ne gâche pas mon temps à hésiter sur leur utilisation, %1.",
	"Prends cet avantage, %1. C'est la seule chose qui te maintient à flot.",
	"Revenu de façon prévisible, %1. Au moins, tu es ponctuel dans ta médiocrité.",
	"Ressources ajoutées. Ne crois pas que ça comblera ton manque de vision, %1.",
	"Voila ton bonus, %1. Essaie d'élever ton niveau de jeu au lieu de stagner.",
	"C'est injecté dans ton solde, %1. Fais en sorte que ça serve à quelque chose.",
	"Tu viens gratter tes pièces comme prévu, %1. Quelle prévisibilité.",
	"Ressources transmises, %1. La balle est dans ton camp, ne la perds pas.",
	"Même avec ces bonus, tu restes à des années-lumière du sommet, %1.",
	"Tu as ton injection quotidienne, %1. Maintenant, disparais de mon champ de vision.",
	"Transaction validée, %1. Ne me refais pas ce numéro avant demain.",
	"Prends tes pièces, %1, et retravaille tes fondamentaux.",
	"Voici ton carburant du jour, %1. N'en brûle pas une seule goutte inutilement.",
	"Tu te contentes de si peu, %1... C'est consternant. Voilà ta part."
];

const SPAM_QUOTES = [
	"Arrête de forcer, %1. Ton manque d'autocontrol est embarrassant. Attends encore %2.",
	"Tu ne sais pas lire une horloge, %1 ? Revenez dans %2 et arrête de casser les pieds.",
	"Insister ne changera rien à ton manque de talent, %1. Il te reste %2 à attendre.",
	"Aussi prévisible qu'inutile, %1. Degage d'ici, repasse dans %2.",
	"Tu penses que supplier le système va accélérer le temps, %1 ? Attends encore %2.",
	"La patience est une vertu d'élite, %1. Tu prouves juste que tu es un amateur. Reste sage %2.",
	"Encore là à gratter, %1 ? Tu fais pitié. Temps restant : %2.",
	"Ton comportement est ridicule, %1. Reviens quand ton compteur sera purgé dans %2.",
	"Tu spams une commande mais tu es incapable de cadrer un tir. Attends %2, %1.",
	"Incapable d'attendre proprement, %1 ? Reviens dans %2 sans faire de bruit.",
	"Quelle mendicité agaçante, %1. Il te reste %2 avant de pouvoir gratter à nouveau.",
	"L'impatiente des faibles, %1. Repasse dans %2 quand tu auras appris la discipline.",
	"Même avec toute la volonté du monde, le serveur ne te cédera rien avant %2, %1.",
	"Tu forces comme un désespéré, %1. Bloqué pour encore %2.",
	"Rien à faire de tes spams, %1. Repasse dans %2 ou va t'entraîner.",
	"Ton insistance frôle le pitoyable, %1. Le délai est strict : encore %2.",
	"Tu n'as aucune retenue, %1. Revenez me déranger seulement dans %2.",
	"Chaque spamm prouve ta nervosité, %1. Respire et attends %2.",
	"Ne me fais pas perdre mon temps, %1. Prochaine tentative autorisée dans %2.",
	"Tu gâches ton énergie à spammer, %1. Attends %2 et fais quelque chose de ta vie.",
	"Encore un échec de timing, %1. Il te reste %2 à patienter.",
	"Tu crois que je vais fléchir, %1 ? Tu rêves. Bloqué pendant encore %2.",
	"L'impatient %1 frappe encore... Reviens dans %2 quand tu seras adulte.",
	"Tu n'as toujours pas compris le principe d'un délai de 24h, %1 ? Attends %2.",
	"Disparais de mes logs, %1. Il te reste %2 avant que je t'accorde une seconde d'attention."
];

function formatSaeStyle(text, commandName) {
	return `━━━━━━━ 𝑺𝑨𝑬 𝑰𝑻𝑶𝑺𝑯𝑰 ━━━━━━━\n\n` +
		` [ 𝑹𝑬𝑪𝑶𝑴𝑷𝑬𝑵𝑺𝑬 : ${commandName.toUpperCase()} ]\n\n` +
		`» ${text}\n\n` +
		`━━━━━━━ 𝑰𝑻𝑶𝑺𝑯𝑰 𝑬𝑵𝑽 ━━━━━━━`;
}

module.exports = {
	config: {
		name: "daily",
		version: "1.5",
		author: "CRIMSON 🩵🪽",
		countDown: 5,
		role: 0,
		description: {
			fr: "Réclame ta récompense quotidienne sous la discipline de Sae Itoshi"
		},
		category: "game",
		guide: {
			fr: "   {pn} : Réclamer la récompense du jour\n   {pn} info : Voir le tableau des récompenses"
		},
		envConfig: {
			rewardFirstDay: {
				coin: 100,
				exp: 10
			}
		}
	},

	langs: {
		fr: {
			monday: "Lundi",
			tuesday: "Mardi",
			wednesday: "Mercredi",
			thursday: "Jeudi",
			friday: "Vendredi",
			saturday: "Samedi",
			sunday: "Dimanche",
			received: "Tu as reçu %1 coins et %2 exp.\n\n» Évaluation : %3",
			infoTitle: "─── 𝑻𝑨𝑩𝑳𝑬𝑨𝑴 𝑫𝑬𝑺 𝑹𝑬𝑪𝑶𝑴𝑷𝑬𝑵𝑺𝑬𝑺 ───\n\n"
		}
	},

	onStart: async function ({ args, message, event, envCommands, usersData, commandName, getLang }) {
		const reward = envCommands[commandName].rewardFirstDay;
		const TIMEZONE = "Asia/Ho_Chi_Minh";

		if (args[0] === "info") {
			let msg = getLang("infoTitle");
			const dayNames = [
				getLang("monday"),
				getLang("tuesday"),
				getLang("wednesday"),
				getLang("thursday"),
				getLang("friday"),
				getLang("saturday"),
				getLang("sunday")
			];
			for (let i = 1; i <= 7; i++) {
				const getCoin = Math.floor(reward.coin * (1 + 0.20) ** (i - 1));
				const getExp = Math.floor(reward.exp * (1 + 0.20) ** (i - 1));
				msg += `• ${dayNames[i - 1]} : ${getCoin} coins | ${getExp} exp\n`;
			}
			return message.reply(formatSaeStyle(msg, commandName));
		}

		const nowTz = moment.tz(TIMEZONE);
		const dateTime = nowTz.format("DD/MM/YYYY");
		const currentDayIso = nowTz.isoWeekday();
		const { senderID } = event;

		// Nom de l'utilisateur
		let userName = "Joueur";
		try {
			if (usersData && typeof usersData.getName === "function") {
				userName = await usersData.getName(senderID);
			} else if (event.userData?.name) {
				userName = event.userData.name;
			}
		} catch (e) {
			userName = "Joueur";
		}

		const userData = await usersData.get(senderID);

		// SI L'UTILISATEUR A DÉJÀ RÉCLAMÉ AUJOURD'HUI -> INSULTE + TEMPS RESTANT
		if (userData.data.lastTimeGetReward === dateTime) {
			const endOfDay = nowTz.clone().endOf("day");
			const diffMs = endOfDay.diff(nowTz);
			const duration = moment.duration(diffMs);
			
			const hours = duration.hours();
			const minutes = duration.minutes();
			const seconds = duration.seconds();
			const timeLeftStr = `${hours}h ${minutes}m ${seconds}s`;

			const rawSpamQuote = SPAM_QUOTES[Math.floor(Math.random() * SPAM_QUOTES.length)];
			const spamQuote = rawSpamQuote.replace("%1", userName).replace("%2", timeLeftStr);

			return message.reply(formatSaeStyle(spamQuote, commandName));
		}

		// RÉCLAMATION VALIDE
		const getCoin = Math.floor(reward.coin * (1 + 0.20) ** (currentDayIso - 1));
		const getExp = Math.floor(reward.exp * (1 + 0.20) ** (currentDayIso - 1));

		userData.data.lastTimeGetReward = dateTime;
		await usersData.set(senderID, {
			money: (userData.money || 0) + getCoin,
			exp: (userData.exp || 0) + getExp,
			data: userData.data
		});

		const rawClaimQuote = CLAIM_QUOTES[Math.floor(Math.random() * CLAIM_QUOTES.length)];
		const claimQuote = rawClaimQuote.replace("%1", userName);

		return message.reply(
			formatSaeStyle(getLang("received", getCoin, getExp, claimQuote), commandName)
		);
	}
};