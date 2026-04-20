import { AnimatePresence, motion } from "framer-motion";

interface Props {
    visible: boolean;
    message?: string;
}

export default function PageTransition({ visible, message = "..." }: Props) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ clipPath: "inset(0 0 100% 0)" }}
                    animate={{ clipPath: "inset(0 0 0% 0)" }}
                    exit={{ clipPath: "inset(100% 0 0% 0)" }}
                    transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[9999] bg-[var(--lime)] flex items-end px-20 py-16"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="text-[var(--dark)]"
                    >
                        {message}
                    </motion.span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}