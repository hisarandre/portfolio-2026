import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import music from "../../../assets/music/keshi-beside-you.mp3";
import { useHoverCursor } from "../../../hooks/useHoverCursor";

const bars = [1, 2, 3, 4];

const barTransition = (b: number) => ({
    duration: 0.7,
    repeat: Infinity,
    delay: b * 0.15,
    ease: "easeInOut" as const,
});

interface Props {
    className?: string;
}

export default function MusicPlayer({ className }: Props) {
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const hoverProps = useHoverCursor();

    const toggle = () => {
        if (!audioRef.current) return;
        if (playing) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setPlaying((p) => !p);
    };

    return (
        <div
            {...hoverProps}
            onClick={toggle}
            className={`flex items-center gap-3 cursor-pointer group ${className ?? ""}`}
        >
            <audio ref={audioRef} src={music} loop />

            <div className="w-7 h-7 rounded-md bg-[var(--text)] flex items-center justify-center shrink-0">
                <AnimatePresence mode="wait" initial={false}>
                    {playing ? (
                        <motion.div
                            key="bars"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-end gap-[2px] h-3"
                        >
                            {bars.map((b) => (
                                <motion.span
                                    key={b}
                                    className="w-[2px] bg-[var(--dark)] rounded-full"
                                    animate={{ height: ["4px", "10px", "4px"] }}
                                    transition={barTransition(b)}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="play"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
                                <path d="M0 0L8 5L0 10V0Z" fill="var(--dark)" />
                            </svg>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}