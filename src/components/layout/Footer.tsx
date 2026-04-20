import MusicPlayer from "../ui/Footer/MusicPlayer.tsx";
import MadeWithLove from "../ui/Footer/MadeWithLove.tsx";
import { motion } from "framer-motion";
import {useLoading} from "../../context/LoadingContext.tsx";
import OutsideLink from "../ui/OutsideLink.tsx";

export default function Footer() {
    const { isLoading } = useLoading();

    return (
        <motion.footer
            initial={{ y: 60, opacity: 0 }}
            animate={isLoading ? { y: 60, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 left-0 right-0 px-10 md:px-20 pb-16 grid grid-cols-3 items-center z-50"
        >
            <section className="justify-self-start flex items-center gap-5">
                <OutsideLink label="MAIL" href="https://github.com/yourname" />
                <OutsideLink label="LINKEDIN" href="https://github.com/yourname" />
                <OutsideLink label="GITHUB" href="https://github.com/yourname" />
            </section>

            <div className="justify-self-center">
                <MadeWithLove />
            </div>

            <div className="justify-self-end">
                <MusicPlayer />
            </div>
        </motion.footer>
    );
}