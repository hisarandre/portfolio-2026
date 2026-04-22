import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../../../context/LangContext";
import { useDiscoverable } from "../../../hooks/useDiscoverable";

const langs = [
    { code: "en", label: "ENG" },
    { code: "fr", label: "FR" },
    { code: "ko", label: "한" },
] as const;

const dropdownVariants = {
    initial: { opacity: 0, y: -4 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -4 },
};

const dropdownTransition = { duration: 0.15 };

type LangCode = typeof langs[number]["code"];

export default function LangSwitcher() {
    const { lang, setLang } = useLang();
    const [open, setOpen] = useState(false);
    const { handlers } = useDiscoverable("lang", { hoverMode: "hover" });

    const current = langs.find((l) => l.code === lang)!;
    const others = langs.filter((l) => l.code !== lang);

    const handleSelect = (code: LangCode) => {
        setLang(code);
        setOpen(false);
    };

    return (
        <div
            className="relative"
            onMouseEnter={() => { setOpen(true); handlers.onMouseEnter(); }}
            onMouseLeave={() => { setOpen(false); handlers.onMouseLeave(); }}
            onClick={handlers.onClick}
        >
            <span className="cursor-pointer">{current.label}</span>

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