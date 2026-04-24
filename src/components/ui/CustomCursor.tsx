import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor, type CursorMode } from "../../context/CursorContext";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

const RING_CONFIG: Record<CursorMode, { size: number } | null> = {
    default:   null,
    hover:     { size: 40 },
    magnifier: { size: 56 },
    drag:      { size: 52 },
};

const springConfig = { stiffness: 300, damping: 28, mass: 0.5 };

function RingContent({ mode }: { mode: CursorMode }) {
    switch (mode) {
        case "magnifier":
            return (
                <div className="size-full rounded-full border border-[var(--lime)] flex items-center justify-center text-[var(--lime)]">
                    <MagnifyingGlassIcon size={20} />
                </div>
            );
        case "drag":
            return (
                <div
                    className="size-full rounded-full flex items-center justify-center text-[var(--lime)] font-mono text-[10px] tracking-widest"
                    style={{ background: "color-mix(in srgb, var(--dark) 60%, transparent)" }}
                >
                    DRAG
                </div>
            );
        default:
            return <div className="size-full rounded-full border border-[var(--lime)]" />;
    }
}

export default function CustomCursor() {
    const { mode } = useCursor();
    const [clicking, setClicking] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const dotX = useMotionValue(-100);
    const dotY = useMotionValue(-100);

    const x = useSpring(cursorX, springConfig);
    const y = useSpring(cursorY, springConfig);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            dotX.set(e.clientX);
            dotY.set(e.clientY);
        };
        const down = () => setClicking(true);
        const up   = () => setClicking(false);

        window.addEventListener("mousemove", move);
        window.addEventListener("mousedown", down);
        window.addEventListener("mouseup", up);
        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mousedown", down);
            window.removeEventListener("mouseup", up);
        };
    }, [cursorX, cursorY, dotX, dotY]);

    const ring = RING_CONFIG[mode];
    const showDot = mode !== "magnifier" && mode !== "drag";

    const baseStyle = {
        translateX: "-50%",
        translateY: "-50%",
        position: "fixed" as const,
        pointerEvents: "none" as const,
        zIndex: 9999,
    };

    return (
        <>
            {ring && (
                <motion.div
                    style={{ x, y, ...baseStyle }}
                    animate={{
                        width:  clicking ? ring.size * 0.8 : ring.size,
                        height: clicking ? ring.size * 0.8 : ring.size,
                        opacity: 1,
                    }}
                    transition={{ duration: 0.15 }}
                >
                    <RingContent mode={mode} />
                </motion.div>
            )}

            {showDot && (
                <motion.div
                    style={{
                        x: dotX,
                        y: dotY,
                        ...baseStyle,
                        borderRadius: "50%",
                        background: mode === "hover" ? "var(--lime)" : "var(--text)",
                    }}
                    animate={{ width: clicking ? 4 : 6, height: clicking ? 4 : 6 }}
                    transition={{ duration: 0.1 }}
                />
            )}
        </>
    );
}