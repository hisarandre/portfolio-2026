import { AnimatePresence, motion } from "framer-motion";
import { SunIcon, MoonIcon } from "@phosphor-icons/react";
import {useHoverCursor} from "../../../hooks/useHoverCursor.ts";

interface Props {
    dark: boolean;
    onToggle: () => void;
}

const variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -10 },
};

export default function ThemeToggle({ dark, onToggle }: Props) {
    const hoverProps = useHoverCursor();
    return (
        <div {...hoverProps} className="overflow-hidden w-5 h-5" onClick={onToggle}>
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={dark ? "sun" : "moon"}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                >
                    {dark ? <SunIcon size={20} /> : <MoonIcon size={20} />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}