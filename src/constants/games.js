export const games = [
    {
        id: "gm_1001",
        name: "Enterprise Resource Planner VR",
        title: "ERP VR Simulator",
        description: "Interactive virtual reality environment for training employees on enterprise resource planning systems and warehouse management.",
        category: "Business Training",
        status: "production",
        version: "2.1.0",
        releaseDate: "2025-11-15T00:00:00Z",
        developer: "Skilladiz Internal",
        rating: 4.8,
        images: [
            "/images/erp-vr-1.png",
            "/images/erp-vr-2.png",
            "/images/erp-vr-3.png"
        ],
        tags: ["VR", "Training", "ERP", "Enterprise"]
    },
    {
        id: "gm_1002",
        name: "Supply Chain Tycoon",
        title: "Global Supply Chain Optimizer",
        description: "Strategic simulation game focused on optimizing global supply chains, managing logistics, and handling supply disruptions.",
        category: "Logistics Simulation",
        status: "production",
        version: "1.5.2",
        releaseDate: "2026-02-10T00:00:00Z",
        developer: "Skilladiz Business Group",
        rating: 4.5,
        images: [
            "/images/supply-chain-1.png",
            "/images/supply-chain-2.png"
        ],
        tags: ["Strategy", "Supply Chain", "Logistics", "Management"]
    },
    {
        id: "gm_1003",
        name: "Corporate Defense Team",
        title: "Cybersecurity Incident Response",
        description: "Multiplayer team-based simulator where players handle live cybersecurity threats, manage communication, and mitigate attacks.",
        category: "Security Training",
        status: "beta",
        version: "0.9.0",
        releaseDate: "2026-04-01T00:00:00Z",
        developer: "Skilladiz Security Labs",
        rating: 4.9,
        availableGames: [
            {
                id: "ps5_game_1",
                title: "EA SPORTS FC 25 (FIFA 25)",
                genre: "Sports / Football",
                description: "Experience the most realistic football simulation with hyper-motion technology, updated rosters, and ultimate team features. Gather your friends for intense competitive matches.",
                thumbnailImage: "https://images.unsplash.com/photo-1518605368461-1e1282246208?w=400&q=80",
                images: [
                    "https://images.unsplash.com/photo-1518605368461-1e1282246208?w=800&q=80",
                    "https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&q=80"
                ],
                details: {
                    publisher: "Electronic Arts",
                    releaseYear: 2024,
                    multiplayer: true,
                    coop: true,
                    ageRating: "E for Everyone"
                },
                seo: {
                    seoTitle: "Play EA SPORTS FC 25 on PS5 | GameZone",
                    seoDescription: "Book a slot to play EA SPORTS FC 25 on PlayStation 5 with your friends. Enjoy the ultimate football gaming experience.",
                    keywords: ["FIFA 25", "EA FC 25", "PS5 football", "sports game PS5"]
                }
            },
            {
                id: "ps5_game_2",
                title: "Marvel's Spider-Man 2",
                genre: "Action-Adventure",
                description: "Swing through Marvel's New York as both Peter Parker and Miles Morales. Experience an epic single-player story featuring iconic villains like Venom and Kraven the Hunter.",
                thumbnailImage: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=400&q=80",
                images: [
                    "https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=800&q=80",
                    "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=800&q=80"
                ],
                details: {
                    publisher: "Sony Interactive Entertainment",
                    releaseYear: 2023,
                    multiplayer: false,
                    coop: false,
                    ageRating: "T for Teen"
                },
                seo: {
                    seoTitle: "Play Marvel's Spider-Man 2 on PS5 | GameZone",
                    seoDescription: "Experience the thrilling action of Spider-Man 2 on PlayStation 5. Swing through the city and battle iconic villains.",
                    keywords: ["Spider-Man 2 PS5", "action game", "Marvel game", "single player PS5"]
                }
            },
            {
                id: "ps5_game_3",
                title: "Tekken 8",
                genre: "Fighting",
                description: "Get ready for the next battle! Experience the latest chapter in the legendary fighting game franchise with stunning graphics and intense, aggressive combat.",
                thumbnailImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80",
                images: [
                    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
                    "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80"
                ],
                details: {
                    publisher: "Bandai Namco",
                    releaseYear: 2024,
                    multiplayer: true,
                    coop: false,
                    ageRating: "T for Teen"
                },
                seo: {
                    seoTitle: "Play Tekken 8 on PS5 | GameZone",
                    seoDescription: "Challenge your friends in Tekken 8 on PS5. Next-gen fighting game experience with incredible visuals.",
                    keywords: ["Tekken 8", "fighting game PS5", "multiplayer fighting", "PS5 Tekken"]
                }
            }
        ],
        tags: ["Cybersecurity", "Multiplayer", "Simulation", "IT"]
    }
];