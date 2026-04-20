import Sticker from "../components/ui/Home/Sticker.tsx";
import { stickers } from "../data/stickers";
import { useLang } from "../context/LangContext.tsx";
import AnimatedNoise from "../components/ui/AnimatedNoise.tsx";
import { useIsMobile } from "../hooks/useIsMobile.ts";
import { motion } from "framer-motion";
import { useDiscovered } from "../context/DiscoveredContext.tsx";
import { useLoading } from "../context/LoadingContext.tsx";
import ProfileDescription from "../components/ui/Home/ProfileDescription.tsx";

export default function Home() {
    const { t } = useLang();
    const isMobile = useIsMobile();
    const { isDiscovered } = useDiscovered();
    const { isLoading } = useLoading();

    const heroLines = [t("home_intro_1"), t("home_intro_2")];

    return (
        <>
            <AnimatedNoise />

            <div className="flex-1 flex flex-col items-center justify-center z-10">
                <h1 className="leading-[1.08] text-center overflow-hidden">
                    {heroLines.map((line, i) => (
                        <motion.span
                            key={i}
                            className="block overflow-hidden"
                            initial={{ y: "100%", opacity: 0 }}
                            animate={!isLoading ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.36, 1], delay: 0.15 + i * 0.12 }}
                        >
                            {line}
                        </motion.span>
                    ))}
                </h1>

                {isMobile && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                        className="text-xl"
                    >
                        <ProfileDescription />
                    </motion.section>
                )}

                {!isMobile && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={!isLoading ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-[var(--muted)]"
                    >
                        {t("home_hint")}
                    </motion.span>
                )}
            </div>

            {!isMobile && (
                <motion.section
                    initial={{ x: 60, opacity: 0 }}
                    animate={!isLoading ? { x: 0, opacity: 1 } : { x: 60, opacity: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                    className="absolute bottom-34 right-20 w-70"
                >
                    <ProfileDescription />
                </motion.section>
            )}

            {!isMobile &&
                stickers
                    .filter((s) => isDiscovered(s.id))
                    .map((s, i) => <Sticker key={s.id} sticker={s} index={i} />)
            }
        </>
    );
}