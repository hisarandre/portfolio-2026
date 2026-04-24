import { AnimatePresence, motion } from "framer-motion";

const overlayVariants = {
    initial: { clipPath: "inset(0 0 100% 0)" },
    animate: { clipPath: "inset(0 0 0% 0)" },
    exit:    { clipPath: "inset(100% 0 0% 0)" },
};

const textVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -12 },
};

const overlayTransition = { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const };
const textTransition    = { delay: 0.2, duration: 0.4 };

interface Props {
    visible: boolean;
    message?: string;
}

export default function PageTransition({ visible, message = "..." }: Props) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    variants={overlayVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={overlayTransition}
                    className="fixed inset-0 z-[9999] bg-[var(--lime)] flex items-center justify-center px-20 py-16"
                >
                    <motion.span
                        variants={textVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={textTransition}
                        className="text-[var(--dark)] text-[clamp(1.5rem,4vw,3rem)]"
                    >
                        {message}
                    </motion.span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}