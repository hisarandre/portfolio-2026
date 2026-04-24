import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../../../context/LangContext";
import { useDiscoverable } from "../../../hooks/useDiscoverable";
import { useHoverCursor } from "../../../hooks/useHoverCursor";
import { langs, type LangCode } from "../../../data/langs";

const dropdownVariants = {
    initial: { opacity: 0, y: -4 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -4 },
};

const dropdownTransition = { duration: 0.15 };

export default function LangSwitcher() {
    const { lang, setLang } = useLang();
    const [open, setOpen] = useState(false);
    const { handlers } = useDiscoverable("lang", { hoverMode: "hover" });
    const hoverProps = useHoverCursor();

    const current = langs.find((l) => l.code === lang)!;
    const others = langs.filter((l) => l.code !== lang);

    const handleSelect = (code: LangCode) => {
        setLang(code);
        setOpen(false);
    };

    return (
        <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <span
                onMouseEnter={handlers.onMouseEnter}
                onMouseLeave={handlers.onMouseLeave}
                onClick={handlers.onClick}
            >
                {current.label}
            </span>

            <AnimatePresence>
                {open && (
                    <motion.div
                        variants={dropdownVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={dropdownTransition}
                        className="absolute top-full right-0 mt-2 flex flex-col gap-1 min-w-[60px]"
                    >
                        {others.map((l) => (
                            <span
                                key={l.code}
                                onClick={(e) => { e.stopPropagation(); handleSelect(l.code); }}
                                {...hoverProps}
                                className="text-[var(--muted)] hover:text-[var(--text)] transition-colors text-right"
                            >
                                {l.label}
                            </span>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}