import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "../../context/CursorContext";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

export default function CustomCursor() {
    const { mode } = useCursor();
    const [clicking, setClicking] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const dotX = useMotionValue(-100);
    const dotY = useMotionValue(-100);

    const x = useSpring(cursorX, { stiffness: 300, damping: 28, mass: 0.5 });
    const y = useSpring(cursorY, { stiffness: 300, damping: 28, mass: 0.5 });

    useEffect(() => {
        const move = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            dotX.set(e.clientX);
            dotY.set(e.clientY);
        };
        const down = () => setClicking(true);
        const up = () => setClicking(false);

        window.addEventListener("mousemove", move);
        window.addEventListener("mousedown", down);
        window.addEventListener("mouseup", up);
        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mousedown", down);
            window.removeEventListener("mouseup", up);
        };
    }, [cursorX, cursorY, dotX, dotY]);

    const ringSize = mode === "magnifier" ? 56 : mode === "drag" ? 52 : 40;

    const ringContent = () => {
        if (mode === "magnifier") return (
            <div style={{
                width: "100%", height: "100%", borderRadius: "50%",
                border: "1.5px solid var(--lime)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--lime)",
            }}>
                <MagnifyingGlassIcon size={20} />
            </div>
        );
        if (mode === "drag") return (
            <div style={{
                width: "100%", height: "100%", borderRadius: "50%",
                background: "color-mix(in srgb, var(--dark) 60%, transparent)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--lime)",
                fontFamily: "monospace",
                fontSize: 10,
                letterSpacing: "0.1em",
            }}>
                DRAG
            </div>
        );
        return (
            <div style={{
                width: "100%", height: "100%", borderRadius: "50%",
                border: "1.5px solid var(--lime)",
            }} />
        );
    };

    return (
        <>
            {/* Ring — hidden on default */}
            {mode !== "default" && (
                <motion.div
                    style={{
                        x, y,
                        translateX: "-50%",
                        translateY: "-50%",
                        position: "fixed",
                        pointerEvents: "none",
                        zIndex: 9999,
                    }}
                    animate={{
                        width: clicking ? ringSize * 0.8 : ringSize,
                        height: clicking ? ringSize * 0.8 : ringSize,
                        opacity: 1,
                    }}
                    transition={{ duration: 0.15 }}
                >
                    {ringContent()}
                </motion.div>
            )}

            {/* Dot — hidden on magnifier and drag */}
            {mode !== "magnifier" && mode !== "drag" && (
                <motion.div
                    style={{
                        x: dotX, y: dotY,
                        translateX: "-50%",
                        translateY: "-50%",
                        position: "fixed",
                        pointerEvents: "none",
                        zIndex: 9999,
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