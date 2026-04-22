import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { usePageTransition } from "../../../context/PageTransitionContext";

const letters = "ANDRE".split("");

export default function NavLogo() {
    const [hovered, setHovered] = useState(false);
    const { navigateTo } = usePageTransition();

    return (
        <div
            className="flex items-center overflow-hidden cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => navigateTo("/", "Home")}
        >
            <span className="pr-1">SARA</span>
            <AnimatePresence>
                {hovered &&
                    letters.map((letter, i) => (
                        <motion.span
                            key={letter + i}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ delay: i * 0.05, duration: 0.2 }}
                            className="text-[var(--muted)]"
                        >
                            {letter}
                        </motion.span>
                    ))}
            </AnimatePresence>
        </div>
    );
}