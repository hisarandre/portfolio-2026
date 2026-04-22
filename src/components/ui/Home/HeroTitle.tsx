import { useLang } from "../../../context/LangContext";
import { motion, type Variants, type Easing } from "framer-motion";

const ease: Easing = [0.16, 1, 0.36, 1];

const lineVariants: Variants = {
    hidden: { y: "100%", opacity: 0 },
    visible: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease,
            delay: 0.15 + i * 0.12,
        },
    }),
};

export default function HeroTitle({ isReady }: { isReady: boolean }) {
    const { t } = useLang();
    const lines = [t("home.intro.line1"), t("home.intro.line2")];

    return (
        <h1 className="leading-[1.08] text-center">
            {lines.map((line, i) => (
                <span key={i} className="block overflow-hidden">
          <motion.span
              className="block"
              custom={i}
              variants={lineVariants}
              initial="hidden"
              animate={isReady ? "visible" : "hidden"}
          >
            {line}
          </motion.span>
        </span>
            ))}
        </h1>
    );
}