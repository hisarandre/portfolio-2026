import MusicPlayer from "../ui/Footer/MusicPlayer";
import MadeWithLove from "../ui/Footer/MadeWithLove";
import OutsideLink from "../ui/OutsideLink";
import { useLoading } from "../../context/LoadingContext";
import { useIsMobile } from "../../hooks/useIsMobile";
import { motion } from "framer-motion";

export default function Footer() {
    const { isLoading } = useLoading();
    const isMobile = useIsMobile();

    return (
        <motion.footer
            initial={{ y: 60, opacity: 0 }}
            animate={isLoading ? { y: 60, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed w-full bottom-0 left-0 right-0 px-6 sm:px-10 md:px-20 pb-16 grid grid-cols-3 items-center z-50"
        >
            <nav className="flex items-center gap-4">
                <OutsideLink label="MAIL" href="mailto:info.sarahandre@gmail.com" />
                <OutsideLink label="LINKEDIN" href="https://www.linkedin.com/in/hisarandre" />
                <OutsideLink label="GITHUB" href="https://github.com/hisarandre" />
            </nav>

            {!isMobile && <MadeWithLove className="justify-self-center" />}
            {!isMobile && <MusicPlayer className="justify-self-end" />}
        </motion.footer>
    );
}