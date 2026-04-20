import { motion, AnimatePresence } from "framer-motion";
import { useMenu } from "../../../context/MenuContext.tsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useLang } from "../../../context/LangContext.tsx";
import { links } from "../../../data/menuLinks.ts";
import type { KeyboardEvent } from "react";

export default function SlideMenu() {
    const { open, setOpen } = useMenu();
    const inputRef = useRef<HTMLInputElement>(null);
    const { t } = useLang();
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    const matched = links.find(
        (l) => t(l.labelKey).toLowerCase() === query.toLowerCase().trim()
    );

    const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && matched) {
            navigate(matched.path);
            setOpen(false);
            setQuery("");
        }
    };

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => inputRef.current?.focus(), 420);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => setQuery(""), 0);
            return () => clearTimeout(timer);
        }
    }, [open]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed top-0 right-0 h-screen w-[320px] bg-[var(--dark)] border-l border-[var(--border)] z-[200] flex flex-col p-16 font-mono"
                >
                    {/* Title */}
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.3 }}
                        className="text-[var(--muted)] text-xs tracking-widest uppercase pb-4"
                    >
                        Command Terminal
                    </motion.p>

                    {/* Input */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="flex items-center gap-3 border-b border-[var(--border)] pb-4 mb-4"
                    >
                        <span className="text-[var(--lime)]">:/</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKey}
                            placeholder="type a page..."
                            className="bg-transparent outline-none text-[var(--text)] placeholder:text-[var(--muted)] text-sm w-full"
                        />
                    </motion.div>

                    {/* Hint */}
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.25, duration: 0.3 }}
                        className="text-[var(--muted)] text-xs mb-8"
                    >
                        Start typing and use one of the prompts below.
                    </motion.span>

                    {/* Links */}
                    <nav className="flex gap-2 flex-wrap">
                        {links.map((link, i) => {
                            const isMatch = matched?.path === link.path;
                            return (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={() => { setOpen(false); setQuery(""); }}
                                        className={`lowercase px-3 py-1.5 rounded text-xs transition-all duration-200 ${
                                            isMatch
                                                ? "bg-[var(--lime)] text-[var(--dark)]"
                                                : "bg-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]"
                                        }`}
                                    >
                                        {t(link.labelKey)}
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                        className="mt-auto text-[var(--muted)] text-xs"
                    >
                        press <span className="text-[var(--text)]">esc</span> or <span className="text-[var(--text)]">/</span> to close
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}