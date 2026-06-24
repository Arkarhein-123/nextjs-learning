import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MOCK_TRACKS, Track } from "./service";

interface PlayerState {
    tracks: Track[];
    currentTrack: Track | null;
    isPlaying: boolean;
    volume: number;
    setCurrentTrack: (track: Track) => void;
    togglePlay: () => void;
    setIsPlaying: (isPlaying: boolean) => void;
    setVolume: (volume: number) => void;
    nextTrack: () => void;
    prevTrack: () => void;
}

export const usePlayerStore = create<PlayerState>()(
    persist(
        (set, get) => ({
            tracks: MOCK_TRACKS,
            currentTrack: null,
            isPlaying: false,
            volume: 0.5,

            setCurrentTrack: (track) => set({ currentTrack: track, isPlaying: true }),

            togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

            setIsPlaying: (isPlaying) => set({ isPlaying }),

            setVolume: (volume) => set({ volume }),

            nextTrack: () => {
                const { tracks, currentTrack } = get();
                if (tracks.length === 0) return;

                if (!currentTrack) {
                    set({ currentTrack: tracks[0], isPlaying: true });
                    return;
                }

                const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
                const nextIndex = (currentIndex + 1) % tracks.length;

                set({ currentTrack: tracks[nextIndex], isPlaying: true });
            },

            prevTrack: () => {
                const { tracks, currentTrack } = get();
                if (tracks.length === 0) return;

                if (!currentTrack) {
                    set({ currentTrack: tracks[0], isPlaying: true });
                    return;
                }

                const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
                const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;

                set({ currentTrack: tracks[prevIndex], isPlaying: true });
            },
        }),
        {
            name: "music-player-storage",
            partialize: (state) => ({
                volume: state.volume,
            }),
        },
    ),
);
