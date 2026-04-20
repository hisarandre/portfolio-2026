import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HeartIcon } from "@phosphor-icons/react";

const variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -10 },
};

export default function MadeWithLove() {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="flex items-center gap-1 uppercase"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            made with
            <div className="overflow-hidden w-4 h-4 mx-1">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={hovered ? "filled" : "outline"}
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.2 }}
                    >
                        {hovered
                            ? <HeartIcon size={16} weight="fill" className="text-[var(--lime)]" />
                            : <HeartIcon size={16} weight="regular" />
                        }
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}