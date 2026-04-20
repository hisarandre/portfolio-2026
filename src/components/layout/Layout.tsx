import { useIsMobile } from "../../hooks/useIsMobile";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";
import Footer from "./Footer";
import { useMenu } from "../../context/MenuContext";
import { motion } from "framer-motion";
import SlideMenu from "../ui/Nav/SlideMenu.tsx";

interface Props {
    children: React.ReactNode;
    onThemeToggle: () => void;
    dark: boolean;
}

export default function Layout({ children, onThemeToggle, dark }: Props) {
    const { open } = useMenu();
    const isMobile = useIsMobile();

    return (
        <>
            <motion.div
                animate={{ x: open && !isMobile ? -320 : 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-screen h-screen flex flex-col"
            >
                {isMobile
                    ? <MobileNav onThemeToggle={onThemeToggle} dark={dark} />
                    : <Navbar onThemeToggle={onThemeToggle} dark={dark} />
                }
                <main className="flex flex-1 px-6 sm:px-10 md:px-20 lg:px-40 z-10 py-32">
                    {children}
                </main>
                <Footer />
            </motion.div>

            {!isMobile && <SlideMenu />}
        </>
    );
}