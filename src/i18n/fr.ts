export default {
    home: {
        intro: {
            line1: "Salut, moi c'est Sara",
            line2: "développeuse full stack",
        },
        description: {
            part1: "Mais je suis aussi amoureuse du café et collectionneuse de ",
            part2: "(beaucoup trop) ",
            part3: "passions",
        },
        hint: "La page semble vide ? Essaie de trouver les 7 stickers cachés",
    },

    nav: {
        home: "accueil",
        projects: "projets",
        about: "À propos",
        instruction: "Utilise les prompts ci-dessous pour commencer.",
    },

    sticker: {
        found: "Tu as trouvé le sticker",
        suffix: "",

        lang: {
            name: "polyglotte",
            desc: "Je parle plusieurs langues... mais je vais parfois prononcer un mot en une autre langue. Ça fait sens. Juste pas pour tout le monde.",
        },
        coffee: {
            name: "café",
            desc: "J'adore le café… mais je le bois rarement encore chaud.",
        },
        multitask: {
            name: "multitâche",
            desc: "Illustratrice et motion designer dans une vie passée. Maintenant je dessine juste pour le plaisir.",
        },
        photo: {
            name: "photographe",
            desc: "18k+ photos sauvegardées et organisées.",
        },
        pokemon: {
            name: "fan de pokémon",
            desc: "Ma nouvelle passion ? Collectionner des cartes Pokémon. Mais le vrai plaisir, c'est d'organiser la collection...",
        },
        smile: {
            name: "😊😊😊",
            desc: "J'abuse de cet emoji pour exprimer la bonne humeur.",
        },
        travel: {
            name: "voyageuse",
            desc: "C'est dans les aéroports que j'ai mes meilleures idées. Quelque chose dans le fait d'être entre deux endroits.",
        },
    },

    projects: {
        portfolio: {
            title: "Portfolio",
            desc: "Conçu et développé from scratch — le site que tu consultes en ce moment.",
            features: [
                { label: "Curseur personnalisé", desc: "Curseur entièrement custom avec des interactions contextuelles." },
                { label: "Stickers cachés", desc: "Des easter eggs dissimulés sur le site pour en apprendre plus sur mes passions." },
                { label: "Multilingue", desc: "Support i18n complet avec changement de langue fluide." },
                { label: "Thème", desc: "Mode clair et sombre avec transitions." },
            ],
        },
        predik360: {
            title: "Predik360",
            desc: "Une plateforme de commandes groupées permettant aux EHPADs de négocier de meilleurs prix sur le matériel.",
            features: [
                { label: "Commandes groupées", desc: "Les EHPADs mutualisent leurs commandes pour accéder à des tarifs négociés." },
                { label: "Facturation", desc: "Génération et suivi des factures pour chaque établissement." },
                { label: "Annuaire", desc: "Liste de contacts centralisée par établissement." },
                { label: "Système de rôles", desc: "Rôles et permissions multi-niveaux à travers les utilisateurs et les organisations." },
                { label: "Catégories produits", desc: "Hiérarchie de catégories à plusieurs niveaux (familles, sous-familles) pour classifier le matériel." },
            ],
        },
        meta: {
            tags: "Tags",
            tech: "Technologies",
            year: "Année",
        },
    },

    about: {
        description:
            "Ancienne graphiste devenue développeuse full-stack, je conçois des applications web modernes avec Angular, React et Spring Boot, en alliant architecture propre et expérience utilisateur soignée.",

        companies: {
            title: "Entreprises avec lesquelles j'ai travaillé",
            list: [
                "Empirys (Luxembourg)",
                "Croix-Rouge (Belgique)",
                "AvProd (France)",
                "87 seconds (Belgique)",
            ],
        },

        skills: {
            title: "Compétences",
            categories: {
                development: "Développement",
                interface: "Interface",
            },
            list: {
                dev: [
                    "Java · Spring Boot",
                    "React · Angular · TypeScript",
                    "Node.js · NestJS",
                    "MySQL · MongoDB",
                    "SonarQube · Docker",
                ],
                ui: [
                    "UI/UX · Systèmes de design",
                    "Framer Motion",
                    "Design responsive",
                    "Figma",
                    "Suite Adobe",
                ],
            },
        },
    },
};