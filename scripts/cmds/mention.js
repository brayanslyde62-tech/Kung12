const fs = require("fs");
const path = require("path");

let moduleStatus = true;

const responsesSeth = [
  "🕶️ Seth est occupé à calculer vos moves...",
  "💻 Seth code un nouveau bot révolutionnaire...",
  "🎮 Seth est en full focus sur un jeu compétitif",
  "🎮 Seth dominait sur Free Fire, ne le dérangez pas",
  "🎧 Seth mixe un son qui va tout exploser",
  "🧠 Seth est en train de hacker la matrice",
  "🚀 Seth prépare son voyage vers Mars",
  "🌐 Seth debugge internet (oui, tout internet)",
  "📈 Seth analyse le marché crypto",
  "🔐 Seth cracke un algo quantique pour s'amuser",
  "🛰️ Seth pirate un satellite pour une bonne cause",
  "🎯 Seth vise la perfection et l'atteint",
  "🛑 Seth a trouvé un bug dans la réalité",
  "🦾 Seth s'améliore en version 2.0",
  "🛠️ Seth forge des outils pour demain",
  "🪄 Seth transforme du café en code propre",
  "🚧 Seth construit une autoroute de données",
  "🧨 Seth teste la résistance des firewalls",
  "🔮 Seth voit votre futur... et il est flou",
  "⚡ Seth charge ses super-pouvoirs",
  "🌌 Seth explore un trou de ver",
  "🤖 Seth enseigne la politesse aux IA",
  "⌛ Seth manipule le temps (pour être à l'heure)",
  "🎨 Seth peint un chef-d'œuvre digital",
  "🧪 Seth fait des expériences interdites",
  "🤯 Seth vient de comprendre la vie",
  "💡 Seth a une idée qui va changer le monde",
  "🛌 Seth fait une sieste méritée",
  "🎤 Seth répète pour son concert",
  "🧘 Seth médite en apesanteur",
  "🛸 Seth doit aller sauver la galaxie",
  "⚗️ Seth distille des potions digitales",
  "🎭 Seth joue dans une pièce de théâtre IA",
  "🧩 Seth résout le puzzle ultime",
  "📯 Seth sonne l'alerte générale",
  "🖥️ Seth a planté son OS - Redémarrage en cours",
  "🌡️ Seth prend la température du web",
  "🛒 Seth fait du shopping dans le metaverse",
  "🗝️ Seth a perdu ses clés cryptographiques",
  "🛡️ Seth protège le serveur des attaques",
  "🎲 Seth lance les dés quantiques",
  "📊 Seth crée un nouveau langage de programmation",
  "🔋 Seth est en recharge (20% restants)",
  "🧭 Seth navigue dans le dark web",
  "🎻 Seth compose une symphonie algorithmique",
  "🛎️ Seth est en service - Sonnez 3 fois",
  "🌋 Seth calme un supervolcan avec du code",
  "🧲 Seth magnétise les données perdues",
  "🧿 Seth scanne l'aura du groupe",
  "📡 Seth intercepte des signaux extraterrestres",
  "🪁 Seth fait voler des drones mentaux",
  "🎰 Seth joue avec le destin et gagne",
  "🌠 Seth capture des étoiles filantes en JSON",
  "🧪 Seth mélange la chimie et le code",
  "🛌 Seth rêve de recursion infinie",
  "🛠️ Seth répare le 4ème mur",
  "🎤 Seth fait un freestyle algorithmique",
  "🌪️ Seth calme le chaos numérique",
  "🪐 Seth nomme une nouvelle exoplanète",
  "⚗️ Seth distille l'essence du web",
  "🎭 Seth switch de personnalité v3.4",
  "🖥️ Seth a un écran bleu de l'âme",
  "🛡️ Seth défend le château numérique",
  "📊 Seth trace des graphiques en 5D",
  "🔋 Seth est à 1% - Mode économie d'énergie",
  "🧭 Seth trouve le nord magnétique du web",
  "🛠️ Seth forge des outils quantiques",
  "🌋 Seth refroidit les serveurs en surchauffe",
  "🚧 Seth construit un pont entre deux univers",
  "🛰️ Seth uploade sa conscience",
  "⏳ Seth compile le temps",
  "🦾 Seth s'upgrade en temps réel",
  "🛸 Seth communique en protocole alien",
  "🎰 Seth gagne le jackpot crypto",
  "🪄 Seth fait apparaître un nouveau framework",
  "🧩 Seth résout le paradoxe du dev",
  "🌠 Seth capture des exceptions cosmiques",
  "🧪 Seth fait réagir JS et Python",
  "🛌 Seth rêve en binaire",
  "🎲 Seth joue à Dungeons & Datasets",
  "🛠️ Seth répare la 5ème dimension",
  "🎤 Seth rappe en langage machine",
  "🧲 Seth attire les bons commits",
  "🌪️ Seth calme les tempêtes numériques",
  "🛸 Seth reverse-engineer sa propre existence",
  "🎰 Seth mise tout sur Stack Overflow",
  "🧿 Seth voit vos futurs merges",
  "🪐 Seth colonise une base de données",
  "🎭 Seth joue tous les rôles dans le CI/CD",
  "🧩 Seth trouve le sens de la vie (404)",
  "📯 Seth annonce la fin du debugging",
  "🖥️ Seth a un écran noir de sagesse",
  "🛡️ Seth pare les attaques DDoS mentales",
  "🎲 Seth joue à la roulette russe avec sudo",
  "📊 Seth plotte des graphiques existentiels",
  "🔋 Seth passe en mode low-energy",
  "🛠️ Seth répare la courbure de l'espace-temps",
  "🎤 Seth freestyle en SQL",
  "🌪️ Seth calme les conflits de merge",
  "🛸 Seth débugge un vaisseau alien",
  "⚗️ Seth distille l'essence du clean code"
];

const responsesCrimson = [
  "🥷 CRIMSON opère dans l'ombre...",
  "🪽 CRIMSON déploie ses ailes pour surveiller le serveur",
  "🔴 Mode CRIMSON : Esthétique sombre activée",
  "⛓️ CRIMSON verrouille les accès non autorisés",
  "🗡️ CRIMSON tranche les bugs sans sommation",
  "🏴‍☠️ CRIMSON prend le contrôle du flux de données",
  "🖤 CRIMSON ne valide pas vos hypothèses faibles",
  "🎯 CRIMSON frappe avec une précision chirurgicale",
  "🦇 CRIMSON patrouille dans les sous-terrains du bot",
  "🩸 CRIMSON injecte du code optimisé à chaud",
  "⚡ CRIMSON déclenche une tempête d'exécution",
  "🌪️ CRIMSON balaie les erreurs de syntaxe",
  "🗿 CRIMSON reste impassible face à vos erreurs",
  "💀 CRIMSON a exécuté le processus sans pitié",
  "🔮 CRIMSON analyse les failles cachées",
  "👑 CRIMSON dicte les règles de l'architecture",
  "🔥 CRIMSON brûle les scripts obsolètes",
  "💣 CRIMSON teste la résistance sous pression",
  "🥊 CRIMSON va droit au problème sans détours",
  "🕯️ CRIMSON éclaire les angles morts du code",
  "🛑 CRIMSON bloque l'exécution : manque de rigueur",
  "☣️ CRIMSON isole les modules instables",
  "🕷️ CRIMSON tisse son réseau de middlewares",
  "🚨 CRIMSON Alerte : Incohérence détectée",
  "🛡️ CRIMSON dresse un pare-feu impénétrable",
  "🧊 CRIMSON refroidit vos ardeurs logiques",
  "🗡️ CRIMSON élimine le superflu",
  "👾 CRIMSON traque les anomalies système",
  "☠️ CRIMSON nettoie les processus fantômes",
  "🖤 CRIMSON applique le dark mode absolu",
  "⛓️ CRIMSON enchaîne les requêtes asynchrones",
  "🎯 CRIMSON cible la racine du problème",
  "🩸 CRIMSON refuse le code non testé",
  "🥷 CRIMSON s'est glissé derrière le pare-feu",
  "🪽 CRIMSON survole l'architecture globale",
  "🔥 CRIMSON incinère les dépendances inutiles",
  "⚡ CRIMSON optimise la latence au millième de seconde",
  "💀 CRIMSON met fin aux boucles infinies",
  "👑 CRIMSON impose le standard de qualité",
  "🏴‍☠️ CRIMSON détourne les paquets corrompus",
  "🦇 CRIMSON surveille les logs de la nuit",
  "🔮 CRIMSON prédit le crash de votre serveur",
  "🕯️ CRIMSON inspecte le fichier config.json",
  "🛑 CRIMSON stoppe net les tentatives invalides",
  "🛡️ CRIMSON protège les clés privées",
  "☣️ CRIMSON purge la mémoire RAM",
  "🕷️ CRIMSON intercepte les requêtes réseau",
  "🚨 CRIMSON audit les permissions utilisateurs",
  "🧊 CRIMSON gèle le thread principal",
  "🥷 CRIMSON a accompli sa mission en silence"
];

const responsesBrayan = [
  "🍵 Brayan prend son thé - Ne pas déranger",
  "📚 Brayan lit un livre de philosophie blockchain",
  "🍳 Brayan cuisine un plat quantique",
  "🎲 Brayan joue aux échecs 4D",
  "🔕 Mode silence activé - Brayan n'est pas dispo",
  "🌫️ Brayan s'est évaporé dans la brume",
  "🛠️ Brayan répare l'espace-temps (encore)",
  "📡 Brayan communique avec des aliens sympas",
  "🧲 Brayan attire les problèmes (et les résout)",
  "🪁 Brayan lâche les kite strings",
  "🧿 Brayan voit tous vos futurs alternatifs",
  "📯 Brayan annonce la fin des temps (ou pas)",
  "🌡️ Brayan prend la température des serveurs",
  "🛒 Brayan achète des NFT utiles",
  "🗝️ Brayan a perdu ses clés SSH (encore)",
  "🎲 Brayan lance un D20 cosmique",
  "🎻 Brayan joue du violon sur un firewall",
  "🛎️ Brayan est en maintenance - Reboot imminent",
  "🧲 Brayan aligne les polarités numériques",
  "🎯 Brayan vise juste (à 93.7%)",
  "⏳ Brayan optimise le temps processeur",
  "🛑 Brayan a trouvé le bug ultime",
  "🪶 Brayan plume une instance cloud",
  "📡 Brayan intercepte des signaux WiFi aliens",
  "🪁 Brayan fait voler des données dans le vent",
  "🎰 Brayan gagne le jackpot de la compilation",
  "🪄 Brayan fait apparaître une documentation claire",
  "🧩 Brayan résout le mystère du cache vide",
  "🛎️ Brayan est en mode écoute active",
  "🌠 Brayan capture des étoiles en base64",
  "🪶 Brayan défroisse une base de données",
  "📯 Brayan sonne la fin du sprint",
  "🧪 Brayan catalyse les réactions devops",
  "🛌 Brayan rêve de recursion tail-optimized",
  "🎲 Brayan lance les dés pour le prochain feature",
  "🛠️ Brayan répare la courbure logicielle",
  "🛑 Brayan a trouvé le point de non-retour",
  "🧲 Brayan aligne les énergies numériques",
  "🪁 Brayan lâche les kite strings du cloud",
  "🛸 Brayan débugge un module",
  "🎰 Brayan mise tout sur la prochaine release",
  "🧿 Brayan voit vos futurs commits",
  "🪐 Brayan terraforme une nouvelle branche git",
  "🎭 Brayan incarne tous les design patterns",
  "🧩 Brayan assemble le puzzle microservices",
  "📯 Brayan annonce la v2.0 de la réalité",
  "🖥️ Brayan inspecte le matériel obsolète",
  "⚽ Brayan analyse le mercato du Barça",
  "🎮 Brayan gère l'effectif de DARK STACKS FC",
  "📝 Brayan rédige de la doc technique propre"
];

module.exports = {
  config: {
    name: "mentions",
    aliases: ["seth", "crimson", "brayan"],
    version: "3.2",
    author: "ᴄʀɪᴍsᴏɴ 🥷🪽",
    description: "Réponse automatique sur détection de mot-clé (Seth, Crimson, Brayan).",
    category: "system",
    role: 0
  },

  onStart: async function ({ message, args }) {
    const state = args[0]?.toLowerCase();
    if (state === "on") {
      moduleStatus = true;
      return message.reply("🟢 Mode mentions activé.");
    }
    if (state === "off") {
      moduleStatus = false;
      return message.reply("🔴 Mode mentions désactivé.");
    }
    return message.reply(`📊 Statut : ${moduleStatus ? "ACTIVÉ 🟢" : "DÉSACTIVÉ 🔴"}\nUsage: mentions [on/off]`);
  },

  onChat: async function ({ message, event, api }) {
    if (!moduleStatus || !event.body || event.senderID === api.getCurrentUserID()) return;

    const text = event.body.toLowerCase();
    const matchedLists = [];

    if (/\bseth\b/i.test(text)) matchedLists.push(responsesSeth);
    if (/\bcrimson\b/i.test(text)) matchedLists.push(responsesCrimson);
    if (/\bbrayan\b/i.test(text)) matchedLists.push(responsesBrayan);

    if (matchedLists.length > 0) {
      const selectedList = matchedLists[Math.floor(Math.random() * matchedLists.length)];
      const randomMsg = selectedList[Math.floor(Math.random() * selectedList.length)];
      const randomIndex = Math.floor(Math.random() * 10) + 1;
      const imgPath = path.join(__dirname, "brayanImg", `kiyo${randomIndex}.jpg`);

      if (fs.existsSync(imgPath)) {
        return message.reply({
          body: randomMsg,
          attachment: fs.createReadStream(imgPath)
        });
      }
      return message.reply(randomMsg);
    }
  }
};
  
