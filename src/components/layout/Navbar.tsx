import Clock from "../ui/Nav/Clock.tsx";
import NavLogo from "../ui/Nav/NavLogo.tsx";
import ThemeToggle from "../ui/Nav/ThemeToggle.tsx";
import LangSwitcher from "../ui/Nav/LangSwitcher.tsx";
import { motion } from "framer-motion";
import {useLoading} from "../../context/LoadingContext.tsx";
import {useHoverCursor} from "../../hooks/useHoverCursor.ts";

interface Props {
    onThemeToggle: () => void;
    dark: boolean;
}

export default function Navbar({ onThemeToggle, dark }: Props) {
    const { isLoading } = useLoading();
    const hoverProps = useHoverCursor();

    return (
        <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={isLoading ? { y: -60, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 pt-16 px-10 md:px-20 flex items-center z-50"
        >
            <div
                {...hoverProps}
                className="flex-1"
            >
                <NavLogo />
            </div>
            <Clock />
            <div className="flex-1 flex items-center gap-10 justify-end">
                <ThemeToggle dark={dark} onToggle={onThemeToggle} />
                <LangSwitcher />
                <span className="text-[var(--lime)]">PRESS / FOR ?</span>
            </div>
        </motion.nav>
    );
}