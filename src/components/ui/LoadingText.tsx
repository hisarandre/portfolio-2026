import {useEffect} from "react";
import {useLoading} from "../../context/LoadingContext.tsx";
import { motion } from "framer-motion";

export default function LoadingText() {
    const { onLoadingComplete } = useLoading();

    useEffect(() => {
        const t = setTimeout(() => {
            onLoadingComplete();
        }, 1600);

        return () => clearTimeout(t);
    }, []);

    return (
        <motion.p
            className="fixed inset-0 flex items-center justify-center z-[20] text-[var(--muted)] uppercase"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.36, 1] }}
        >
            building something nice...
        </motion.p>
    );
}