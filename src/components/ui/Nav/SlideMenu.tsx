import { motion, AnimatePresence } from "framer-motion";
import { useMenu } from "../../../context/MenuContext";
import { useEffect, useRef, useState } from "react";
import { useLang } from "../../../context/LangContext";
import { usePageTransition } from "../../../context/PageTransitionContext";
import { links } from "../../../data/menuLinks";
import type { KeyboardEvent } from "react";
import { useHoverCursor } from "../../../hooks/useHoverCursor";

export default function SlideMenu() {
    const { open, setOpen } = useMenu();
    const { t } = useLang();
    const { navigateTo } = usePageTransition();
    const inputRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState("");
    const hoverProps = useHoverCursor();

    const normalizedQuery = query.toLowerCase().trim();

    const matched =
        normalizedQuery.length > 0
            ? links.find(
                (l) =>
                    t(`nav.${l.id}`).toLowerCase() === normalizedQuery
            )
            : undefined;

    const handleNavigate = (path: string, label: string) => {
        navigateTo(path, label);
        setOpen(false);
        setQuery("");
    };

    const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && matched) {
            handleNavigate(matched.path, t(`nav.${matched.id}`));
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
                    className="fixed top-0 right-0 h-screen w-[360px] bg-[var(--dark)] z-[200] flex flex-col p-16 font-mono"
                >
                    {/* TITLE */}
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.3 }}
                        className="text-[var(--muted)] tracking-widest uppercase pb-4"
                    >
                        Command Terminal
                    </motion.p>

                    {/* INPUT */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="flex items-center gap-3 border-b border-[var(--border)] pb-8 mb-8"
                    >
                        <span className="text-[var(--lime)]">:/</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKey}
                            placeholder="type a page"
                            className="bg-transparent outline-none text-[var(--text)] placeholder:text-[var(--muted)] w-full"
                        />
                    </motion.div>

                    {/* INSTRUCTION */}
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.25, duration: 0.3 }}
                        className="text-[var(--muted)] mb-8"
                    >
                        {t("nav.instruction")}
                    </motion.span>

                    {/* LINKS */}
                    <nav className="flex gap-x-2 gap-y-4 flex-wrap">
                        {links.map((link, i) => {
                            const label = t(`nav.${link.id}`);
                            const isMatch = matched?.path === link.path;

                            return (
                                <motion.div
                                    {...hoverProps}
                                    key={link.path}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: 0.15 + i * 0.08,
                                        duration: 0.5,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                >
                                    <span
                                        onClick={() =>
                                            handleNavigate(link.path, label)
                                        }
                                        className={`lowercase px-3 py-1.5 rounded transition-all duration-200 cursor-pointer ${
                                            isMatch
                                                ? "bg-[var(--lime)] text-[var(--dark)]"
                                                : "bg-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]"
                                        }`}
                                    >
                                        {label}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </nav>

                    {/* FOOTER */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                        className="mt-auto text-[var(--muted)]"
                    >
                        press <span className="text-[var(--text)]">esc</span> or{" "}
                        <span className="text-[var(--text)]">/</span> to close
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}