import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { useLang } from "../../context/LangContext";
import { links } from "../../data/menuLinks";
import ThemeToggle from "../ui/Nav/ThemeToggle";
import LangSwitcher from "../ui/Nav/LangSwitcher";

interface Props {
    onThemeToggle: () => void;
    dark: boolean;
}

export default function MobileNav({ onThemeToggle, dark }: Props) {
    const [open, setOpen] = useState(false);
    const { t } = useLang();

    return (
        <>
            {/* Barre du haut */}
            <motion.div
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 left-0 right-0 px-6 py-6 flex items-center justify-between z-50"
            >
                <span className="font-mono text-xs tracking-widest">SARA</span>
                <button onClick={() => setOpen(true)}>
                    <ListIcon size={24} />
                </button>
            </motion.div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-[var(--dark)] z-[200] flex flex-col p-8"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-16">
                            <span className="font-mono text-xs tracking-widest">SARA</span>
                            <button onClick={() => setOpen(false)}>
                                <XIcon size={24} />
                            </button>
                        </div>

                        {/* Links */}
                        <nav className="flex flex-col gap-6 flex-1 justify-center">
                            {links.map((link, i) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={() => setOpen(false)}
                                        className="text-4xl font-extrabold tracking-tight hover:text-[var(--lime)] transition-colors"
                                    >
                                        {t(link.labelKey)}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Footer du menu */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.35 }}
                            className="flex items-center gap-6"
                        >
                            <ThemeToggle dark={dark} onToggle={onThemeToggle} />
                            <LangSwitcher />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}