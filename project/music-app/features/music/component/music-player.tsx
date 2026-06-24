"use client";

import { useEffect, useRef, useState } from "react";
import { usePlayerStore } from "@/features/music/store";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music, Disc } from "lucide-react";

export function MusicPlayer() {
    const { tracks, currentTrack, isPlaying, volume, setCurrentTrack, togglePlay, nextTrack, prevTrack, setVolume } =
        usePlayerStore();

    const audioRef = useRef<HTMLAudioElement>(null);
    const [progress, setProgress] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Sync audio playback and handle AbortError
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !isMounted) return;

        if (isPlaying) {
            audio.play().catch((e) => {
                if (e.name !== "AbortError") console.error(e);
            });
        } else {
            audio.pause();
        }
    }, [isPlaying, currentTrack, isMounted]);

    // Handle Volume and Progress tracking
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !isMounted) return;

        audio.volume = volume;

        const updateProgress = () => {
            const percent = (audio.currentTime / audio.duration) * 100;
            setProgress(isNaN(percent) ? 0 : percent);
        };

        audio.addEventListener("timeupdate", updateProgress);
        return () => audio.removeEventListener("timeupdate", updateProgress);
    }, [currentTrack, volume, isMounted]);

    // Handle clicking the progress bar to seek
    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const audio = audioRef.current;
        if (!audio || !audio.duration) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = x / rect.width;
        audio.currentTime = percentage * audio.duration;
    };

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 selection:bg-indigo-500/30">
            <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-indigo-500/20 rounded-3xl p-6 shadow-2xl shadow-indigo-950/40 flex flex-col gap-6">
                <div className="flex items-center justify-between text-xs font-semibold tracking-wider text-indigo-400 uppercase">
                    <span>Now Playing</span>
                    <Disc
                        className={`w-4 h-4 text-indigo-400 ${isPlaying ? "animate-spin [animation-duration:8s]" : ""}`}
                    />
                </div>

                <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-lg shadow-black/50 group border border-slate-800">
                    {currentTrack ? (
                        <img
                            src={currentTrack.albumArt}
                            alt={currentTrack.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-950 to-slate-900 flex flex-col items-center justify-center gap-3">
                            <div className="p-4 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 animate-pulse">
                                <Music className="w-10 h-10" />
                            </div>
                        </div>
                    )}
                </div>

                <div className="text-center h-14 flex flex-col justify-center">
                    <h2 className="text-xl font-bold truncate tracking-tight text-white px-2">
                        {currentTrack?.title || "No Track Selected"}
                    </h2>
                    <p className="text-sm font-medium text-indigo-400/80 mt-1 truncate px-4">
                        {currentTrack?.artist || "—"}
                    </p>
                </div>

                {/* Interactive Progress Bar */}
                <div className="flex flex-col gap-2">
                    <div
                        className="relative w-full h-1.5 bg-slate-800 rounded-full overflow-hidden cursor-pointer group"
                        onClick={handleProgressClick}
                    >
                        <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-5 items-center">
                    <div className="flex items-center justify-center gap-6">
                        <button
                            onClick={prevTrack}
                            disabled={!currentTrack}
                            className="p-3 text-slate-400 hover:text-indigo-400 disabled:opacity-30"
                        >
                            <SkipBack className="w-6 h-6 fill-current" />
                        </button>
                        <button
                            onClick={togglePlay}
                            disabled={!currentTrack}
                            className="p-5 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-full hover:scale-105 disabled:opacity-40"
                        >
                            {isPlaying ? (
                                <Pause className="w-7 h-7 fill-current" />
                            ) : (
                                <Play className="w-7 h-7 fill-current translate-x-0.5" />
                            )}
                        </button>
                        <button
                            onClick={nextTrack}
                            disabled={!currentTrack}
                            className="p-3 text-slate-400 hover:text-indigo-400 disabled:opacity-30"
                        >
                            <SkipForward className="w-6 h-6 fill-current" />
                        </button>
                    </div>

                    <div className="flex items-center gap-3 w-3/4 mx-auto text-slate-400">
                        <button onClick={() => setVolume(volume === 0 ? 0.5 : 0)}>
                            {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Tracklist</h3>
                    <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
                        {tracks.map((track) => (
                            <button
                                key={track.id}
                                onClick={() => setCurrentTrack(track)}
                                className={`w-full flex items-center gap-3 p-2 rounded-xl text-left ${currentTrack?.id === track.id ? "bg-indigo-500/10 border border-indigo-500/30" : "hover:bg-slate-800/50"}`}
                            >
                                <img src={track.albumArt} className="w-9 h-9 rounded-lg object-cover" />
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-sm font-semibold truncate text-slate-200">{track.title}</p>
                                    <p className="text-xs text-slate-400">{track.artist}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            {currentTrack && <audio ref={audioRef} src={currentTrack.audioUrl} onEnded={nextTrack} />}
        </div>
    );
}
