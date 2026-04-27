import { useIsMobile } from "../../hooks/useIsMobile";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";
import Footer from "./Footer";
import SlideMenu from "../ui/Nav/SlideMenu";
import { useMenu } from "../../context/MenuContext";
import { motion } from "framer-motion";

interface Props {
    children: React.ReactNode;
    onThemeToggle: () => void;
    dark: boolean;
    fullHeight?: boolean;
    noFooter?: boolean;
}

export default function Layout({ children, onThemeToggle, dark, fullHeight, noFooter }: Props) {
    const { open } = useMenu();
    const isMobile = useIsMobile();

    const Nav = isMobile ? MobileNav : Navbar;

    return (
        <div className={fullHeight ? "overflow-y-auto md:overflow-hidden md:h-screen" : "overflow-x-hidden"}>
            <motion.div
                animate={{ x: open && !isMobile ? -320 : 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={fullHeight ? "w-screen md:h-screen flex flex-col" : "w-screen min-h-screen flex flex-col"}
            >
                <Nav onThemeToggle={onThemeToggle} dark={dark} />

                <main className={`flex flex-1 px-6 sm:px-10 md:px-20 z-10 py-32 ${fullHeight ? "min-h-0 overflow-hidden" : ""}`}>
                    {children}
                </main>

                {!noFooter && <Footer />}
            </motion.div>

            {!isMobile && <SlideMenu />}
        </div>
    );
}