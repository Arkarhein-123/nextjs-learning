// @/features/music/service.ts

export interface Track {
    id: number;
    title: string;
    artist: string;
    albumArt: string;
    audioUrl: string;
}

export const MOCK_TRACKS: Track[] = [
    {
        id: 1,
        title: "Midnight Drive",
        artist: "Indigo Synth",
        albumArt: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&q=80",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Live Public Audio
    },
    {
        id: 2,
        title: "Neon Lights",
        artist: "Retro Horizon",
        albumArt: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
        id: 3,
        title: "Cyberpunk Meltdown",
        artist: "Glitch Master",
        albumArt: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
];


