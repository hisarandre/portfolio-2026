import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../../../context/LangContext.tsx";
import {useDiscoverable} from "../../../hooks/useDiscoverable.ts";

const langs = [
    { code: "en", label: "ENG" },
    { code: "fr", label: "FR" },
    { code: "ko", label: "한" },
] as const;

export default function LangSwitcher() {
    const { lang, setLang } = useLang();
    const [open, setOpen] = useState(false);
    const current = langs.find((l) => l.code === lang)!;

    const { handlers } = useDiscoverable("lang", { hoverMode: "hover" });

    const handleEnter = () => {
        setOpen(true);
        handlers.onMouseEnter();
    };

    const handleLeave = () => {
        setOpen(false);
        handlers.onMouseLeave();
    };

    return (
        <div
            className="relative"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onClick={handlers.onClick}
        >
            <span className="cursor-pointer">{current.label}</span>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-2 flex flex-col gap-1 min-w-[60px]"
                    >
                        {langs
                            .filter((l) => l.code !== lang)
                            .map((l) => (
                                <span
                                    key={l.code}
                                    onClick={(e) => { e.stopPropagation(); setLang(l.code); setOpen(false); }}
                                    className="cursor-pointer text-[var(--muted)] hover:text-[var(--text)] transition-colors text-right"
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