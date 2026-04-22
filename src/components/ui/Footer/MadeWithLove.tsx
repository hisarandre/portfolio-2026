import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HeartIcon } from "@phosphor-icons/react";

const variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -10 },
};

const transition = { duration: 0.2 };

interface Props {
    className?: string;
}

export default function MadeWithLove({ className }: Props) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className={`flex items-center gap-1 uppercase ${className ?? ""}`}
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
                        transition={transition}
                    >
                        <HeartIcon
                            size={16}
                            weight={hovered ? "fill" : "regular"}
                            className={hovered ? "text-[var(--lime)]" : ""}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}