// Mock data for Smart Nest Ecommerce

const featuredProducts = [
    {
        name: "Smart Hub Pro",
        description: "Central control hub for all your smart home devices with voice control and automation features",
        category: "Control Centers",
        brand: "Smart Nest",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1586078875290-c22eb791ad5d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHNwZWFrZXJ8ZW58MHx8fHwxNzY4NDY2NjY2fDA&ixlib=rb-4.1.0&q=85",
        vendorName: "Smart Nest Official",
        stock: 45,
        features: ["Voice Control", "Automation Hub", "Works with Alexa & Google"],
        compatibility: ["iOS", "Android", "Web"]
    },
    {
        name: "Voice Assistant Mini",
        description: "Compact smart speaker with premium sound quality and intelligent voice assistant",
        category: "Smart Speakers",
        brand: "Smart Nest",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1519558260268-cde7e03a0152?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWUlMjBkZXZpY2VzfGVufDB8fHx8MTc2ODQ2NjY2Mnww&ixlib=rb-4.1.0&q=85",
        vendorName: "Smart Nest Official",
        stock: 120,
        features: ["360° Sound", "Voice Commands", "Multi-room Audio"],
        compatibility: ["iOS", "Android"]
    },
    {
        name: "Security Camera 360",
        description: "HD security camera with 360-degree rotation, night vision, and motion detection",
        category: "Security",
        brand: "Smart Nest",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1730967844913-29eb5cae5f34?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwzfHxzbWFydCUyMGhvbWUlMjBkZXZpY2VzfGVufDB8fHx8MTc2ODQ2NjY2Mnww&ixlib=rb-4.1.0&q=85",
        vendorName: "SecureHome Tech",
        stock: 67,
        features: ["1080p HD", "Night Vision", "Motion Alerts", "Cloud Storage"],
        compatibility: ["iOS", "Android", "Web"]
    },
    {
        name: "Premium Speaker",
        description: "High-fidelity smart speaker with immersive audio and smart home integration",
        category: "Audio",
        brand: "Smart Nest",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1594419015530-4676f41c4bb9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwzfHxzbWFydCUyMHNwZWFrZXJ8ZW58MHx8fHwxNzY4NDY2NjY2fDA&ixlib=rb-4.1.0&q=85",
        vendorName: "Smart Nest Official",
        stock: 34,
        features: ["Premium Audio", "Dolby Atmos", "Voice Control", "Spotify Connect"],
        compatibility: ["iOS", "Android", "Web"]
    },
    {
        name: "Smart Display",
        description: "Interactive touchscreen display for controlling your smart home with visual feedback",
        category: "Control Centers",
        brand: "Smart Nest",
        price: 179.99,
        image: "https://images.unsplash.com/photo-1650682009477-52fd77302b78?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHw0fHxzbWFydCUyMHNwZWFrZXJ8ZW58MHx8fHwxNzY4NDY2NjY2fDA&ixlib=rb-4.1.0&q=85",
        vendorName: "Smart Nest Official",
        stock: 58,
        features: ["7-inch Touchscreen", "Video Calls", "Smart Home Dashboard", "Voice Control"],
        compatibility: ["iOS", "Android"]
    },
    {
        name: "Smart Remote Control",
        description: "Universal remote control for all your smart home devices with customizable buttons",
        category: "Control Centers",
        brand: "Smart Nest",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1736410223296-4537159eefe4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwyfHxzbWFydCUyMGhvbWUlMjBkZXZpY2VzfGVufDB8fHx8MTc2ODQ2NjY2Mnww&ixlib=rb-4.1.0&q=85",
        vendorName: "TechHome Solutions",
        stock: 95,
        features: ["Universal Control", "Programmable Buttons", "Long Battery Life"],
        compatibility: ["iOS", "Android"]
    },
    {
        name: "Smart Thermostat Pro",
        description: "Energy-efficient thermostat with learning capabilities and remote control",
        category: "Climate Control",
        brand: "EcoSmart",
        price: 229.99,
        image: "https://images.unsplash.com/photo-1639663742190-1b3dba2eebcf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBpbnRlcmlvcnxlbnwwfHx8fDE3Njg0NjY2Mzd8MA&ixlib=rb-4.1.0&q=85",
        vendorName: "EcoHome Devices",
        stock: 42,
        features: ["Auto-Learning", "Energy Reports", "Geofencing", "Voice Control"],
        compatibility: ["iOS", "Android", "Web"]
    },
    {
        name: "Smart LED Bulb Set (4-Pack)",
        description: "Color-changing LED bulbs with app control and voice commands",
        category: "Smart Lighting",
        brand: "BrightHome",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1752262167753-37a0ec83f614?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHw0fHxzbWFydCUyMGhvbWUlMjBpbnRlcmlvcnxlbnwwfHx8fDE3Njg0NjY2MzN8MA&ixlib=rb-4.1.0&q=85",
        vendorName: "BrightHome Tech",
        stock: 156,
        features: ["16M Colors", "Dimmable", "Schedules", "Voice Control"],
        compatibility: ["iOS", "Android"]
    },
    {
        name: "Smart Door Lock",
        description: "Keyless entry system with fingerprint and PIN code access",
        category: "Smart Locks",
        brand: "SecureLock",
        price: 189.99,
        image: "https://images.unsplash.com/photo-1730967844913-29eb5cae5f34?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwzfHxzbWFydCUyMGhvbWUlMjBkZXZpY2VzfGVufDB8fHx8MTc2ODQ2NjY2Mnww&ixlib=rb-4.1.0&q=85",
        vendorName: "SecureHome Tech",
        stock: 38,
        features: ["Fingerprint Scanner", "PIN Code", "Auto-Lock", "Activity Log"],
        compatibility: ["iOS", "Android"]
    },
    {
        name: "Video Doorbell Pro",
        description: "Smart doorbell with HD video, two-way audio, and motion detection",
        category: "Security",
        brand: "Smart Nest",
        price: 169.99,
        image: "https://images.unsplash.com/photo-1723186773193-621feea595c5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHw0fHxzbWFydCUyMGhvbWUlMjBkZXZpY2VzfGVufDB8fHx8MTc2ODQ2NjY2Mnww&ixlib=rb-4.1.0&q=85",
        vendorName: "Smart Nest Official",
        stock: 73,
        features: ["1080p Video", "Two-Way Audio", "Motion Zones", "Night Vision"],
        compatibility: ["iOS", "Android", "Web"]
    }
];

module.exports = { featuredProducts };
