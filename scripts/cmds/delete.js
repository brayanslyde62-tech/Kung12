const fs = require("fs-extra");
const path = require("path");

const SAE_SUCCESS_QUOTES = [
	"Ce fichier n'avait pas le niveau pour rester dans mon environnement.",
	"Élimination exécutée avec précision. Prochain fichier.",
	"Un code inutile ne fait que ralentir la structure. Suppression validée.",
	"Seule l'efficacité m'intéresse. Ce script est désormais de l'histoire ancienne.",
	"Effacé. Assure-toi que le prochain ajout soit à la hauteur de mes standards.",
	"Le terrain est nettoyé. Pas de place pour ce qui ne sert à rien.",
	"Ajustement tactique : cette commande a été purgée du système.",
	"Désormais absent du disque et de la mémoire. On passe à la suite."
];

const SAE_REJECT_QUOTES = [
	"Écarte-toi %1, tu n'as ni le rôle ni la vision pour toucher à mes commandes.",
	"Tu crois vraiment pouvoir interférer ici, %1 ? Retourne jouer dans ta catégorie.",
	"Incapable. %1, ne pose plus jamais tes mains sur mes boutons.",
	"Reste à ta place %1. Tu es une distraction inutile sur ce terrain.",
	"Ta présence ici est sans valeur, %1. Seul le créateur contrôle cette zone.",
	"Ne me touche pas avec tes réactions médiocres, %1."
];

function getRandomItem(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function formatSaeStyle(text, commandName) {
	return `━━━━━━━ 𝑺𝑨𝑬 𝑰𝑻𝑶𝑺𝑯𝑰 ━━━━━━━\n\n` +
		` [ 𝑪𝑶𝑴𝑴𝑨𝑵𝑫𝑬 : ${commandName.toUpperCase()} ]\n\n` +
		`» ${text}\n\n` +
		`━━━━━━━ 𝑰𝑻𝑶𝑺𝑯𝑰 𝑬𝑵𝑽 ━━━━━━━`;
}

module.exports = {
	config: {
		name: "delete",
		version: "3.1",
		author: "CRIMSON 🩵🪽",
		countDown: 5,
		role: 2,
		description: {
			fr: "Supprime une commande avec validation par réaction et auto-suppression des messages"
		},
		category: "admin",
		guide: {
			fr: "   {pn} <nom de la commande>"
		}
	},

	langs: {
		fr: {
			noArgs: "Fournis le nom d'une commande. Je ne perds pas de temps avec des demandes incomplètes.",
			selfDelete: "Supprimer la commande 'delete' ? Une décision illogique que je refuse d'exécuter.",
			notFound: "Commande '%1' introuvable dans le répertoire.",
			confirmPrompt: "La commande '%1' est ciblée pour élimination.\nRéagis avec n'importe quel emoji sous ce message pour confirmer la suppression (Délai : 30s).",
			deletedSuccess: "La commande '%1' a été supprimée du disque et de la mémoire.\n\n» Analyse : %2",
			timeOut: "Délai expiré sans réaction. Procédure d'élimination annulée.",
			error: "Erreur durant l'exécution de la suppression : %1"
		}
	},

	onStart: async function ({ args, message, getLang, event }) {
		if (!args.length) {
			return message.reply(formatSaeStyle(getLang("noArgs"), "SYSTEM"));
		}

		const commandName = path.basename(args[0].toLowerCase(), ".js");

		if (commandName === this.config.name) {
			return message.reply(formatSaeStyle(getLang("selfDelete"), commandName));
		}

		const commandPath = path.join(__dirname, `${commandName}.js`);

		if (!commandPath.startsWith(__dirname) || !(await fs.pathExists(commandPath))) {
			return message.reply(formatSaeStyle(getLang("notFound", commandName), commandName));
		}

		const confirmMsg = await message.reply(
			formatSaeStyle(getLang("confirmPrompt", commandName), commandName)
		);

		// Sauvegarde explicite des IDs
		global.GoatBot.onReaction.set(confirmMsg.messageID, {
			commandName: this.config.name,
			confirmMessageID: confirmMsg.messageID,
			userPromptMsgID: event.messageID,
			authorID: event.senderID || message.author,
			targetCommand: commandName,
			targetPath: commandPath
		});

		// Timeout de sécurité (30s)
		setTimeout(async () => {
			if (global.GoatBot.onReaction.has(confirmMsg.messageID)) {
				global.GoatBot.onReaction.delete(confirmMsg.messageID);
				try {
					await message.unsend(confirmMsg.messageID);
				} catch (e) {}
			}
		}, 30000);
	},

	onReaction: async function ({ api, message, event, getLang, usersData }) {
		const reactionData = global.GoatBot.onReaction.get(event.messageID);
		if (!reactionData) return;
		if (!event.reaction) return;

		const currentUserID = event.userID || event.senderID;

		// --- SI CE N'EST PAS L'AUTEUR ---
		if (currentUserID !== reactionData.authorID) {
			let userName = "Intrus";
			try {
				if (usersData && typeof usersData.getName === "function") {
					userName = await usersData.getName(currentUserID);
				}
			} catch (e) {
				userName = "Joueur médiocre";
			}

			const insult = getRandomItem(SAE_REJECT_QUOTES).replace("%1", userName);
			return message.reply(formatSaeStyle(insult, reactionData.targetCommand));
		}

		// --- SI C'EST L'AUTEUR ---
		const { targetCommand, targetPath, confirmMessageID, userPromptMsgID } = reactionData;

		try {
			// 1. Suppression physique & purge mémoire
			if (await fs.pathExists(targetPath)) {
				await fs.unlink(targetPath);
			}

			if (require.cache[require.resolve(targetPath)]) {
				delete require.cache[require.resolve(targetPath)];
			}

			if (global.GoatBot?.commands) {
				global.GoatBot.commands.delete(targetCommand);
			}

			// Retrait du listener pour éviter la double exécution
			global.GoatBot.onReaction.delete(event.messageID);

			// 2. Suppression du message de confirmation initial (prompt)
			try {
				if (api && typeof api.unsendMessage === "function") {
					await api.unsendMessage(confirmMessageID);
				} else if (typeof message.unsend === "function") {
					await message.unsend(confirmMessageID);
				}
			} catch (err) {
				// Erreur ignorée si l'utilisateur l'a supprimé manuellement
			}

			// 3. Envoi du nouveau message de succès
			const quote = getRandomItem(SAE_SUCCESS_QUOTES);
			const successMsg = await message.reply(
				formatSaeStyle(getLang("deletedSuccess", targetCommand, quote), targetCommand)
			);

			// 4. Suppression différée (2 minutes / 120000 ms) du message initial + message de succès
			setTimeout(async () => {
				const unsendFunc = (id) => {
					if (api && typeof api.unsendMessage === "function") return api.unsendMessage(id);
					if (typeof message.unsend === "function") return message.unsend(id);
				};

				try {
					if (userPromptMsgID) await unsendFunc(userPromptMsgID);
				} catch (e) {}

				try {
					if (successMsg?.messageID) await unsendFunc(successMsg.messageID);
				} catch (e) {}
			}, 120000);

		} catch (err) {
			global.GoatBot.onReaction.delete(event.messageID);
			return message.reply(
				formatSaeStyle(getLang("error", err.message), targetCommand)
			);
		}
	}
};
