import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "@phosphor-icons/react";
import {useLang} from "../../../context/LangContext.tsx";
import type {StickerData} from "../../../data/stickers.ts";
import {useHoverCursor} from "../../../hooks/useHoverCursor.ts";


interface Props {
    sticker: StickerData | null;
    onClose: () => void;
}

export default function StickerModal({ sticker, onClose }: Props) {
    const { t } = useLang();
    const hoverProps = useHoverCursor();

    return (
        <AnimatePresence>
            {sticker && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[500] bg-black/40 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed z-[501] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--dark)] rounded-xl p-20 flex gap-10 items-center max-w-[580px] w-[90vw]"
                    >
                        {/* Sticker image */}
                        <motion.img
                            src={sticker.image}
                            alt=""
                            initial={{ rotate: sticker.defaultRot - 15, scale: 0.8, opacity: 0 }}
                            animate={{ rotate: sticker.defaultRot, scale: 1, opacity: 1 }}
                            transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="w-32 h-32 object-contain shrink-0"
                        />

                        {/* Text */}
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25, duration: 0.4 }}
                            className="flex flex-col gap-3"
                        >
                            <p className="font-mono text-sm text-[var(--muted)]">
                                {t(sticker.foundKey)}{" "}
                                <span className="text-[var(--lime)] font-bold">{t(sticker.nameKey)}</span>{" "}
                                {t(sticker.suffixKey)}
                            </p>
                            <p className="text-[var(--text)] leading-relaxed">
                                {t(sticker.descKey)}
                            </p>
                        </motion.div>

                        {/* Close */}
                        <button
                            {...hoverProps}
                            onClick={onClose}
                            className="absolute top-4 right-4 text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                        >
                            <XIcon size={16} />
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}