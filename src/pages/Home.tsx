import { motion } from "framer-motion";
import { useLoading } from "../context/LoadingContext";
import { useIsMobile } from "../hooks/useIsMobile";
import { useDiscovered } from "../context/DiscoveredContext";
import AnimatedNoise from "../components/ui/AnimatedNoise";
import HeroTitle from "../components/ui/Home/HeroTitle";
import ProfileDescription from "../components/ui/Home/ProfileDescription";
import Sticker from "../components/ui/Home/Sticker";
import { stickers } from "../data/stickers";
import { useLang } from "../context/LangContext";

export default function Home() {
    const { t } = useLang();
    const { isLoading } = useLoading();
    const isMobile = useIsMobile();
    const { isDiscovered } = useDiscovered();

    const isReady = !isLoading;

    return (
        <>
            <AnimatedNoise />

            <div className="flex-1 flex flex-col items-center justify-center z-10">
                <HeroTitle isReady={isReady} />

                <motion.div
                    className={
                        isMobile
                            ? "text-xl mt-4"
                            : "absolute bottom-34 right-20 w-70"
                    }
                    initial={
                        isMobile
                            ? { opacity: 0, y: 20 }
                            : { opacity: 0, x: 60 }
                    }
                    animate={
                        isReady
                            ? isMobile
                                ? { opacity: 1, y: 0 }
                                : { opacity: 1, x: 0 }
                            : isMobile
                                ? { opacity: 0, y: 20 }
                                : { opacity: 0, x: 60 }
                    }
                    transition={{
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.4,
                    }}
                >
                    <ProfileDescription />
                </motion.div>

                {!isMobile && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={isReady ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-[var(--muted)]"
                    >
                        {t("home.hint")}
                    </motion.span>
                )}
            </div>

            {!isMobile &&
                stickers
                    .filter((s) => isDiscovered(s.id))
                    .map((s, i) => (
                        <Sticker key={s.id} sticker={s} index={i} />
                    ))}
        </>
    );
}