import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import {useHoverCursor} from "../../hooks/useHoverCursor.ts";

interface OutsideLinkProps {
    label: string;
    href: string;
}

export default function OutsideLink({ label, href }: OutsideLinkProps) {
    const hoverProps = useHoverCursor();

    return (
            <motion.a
                {...hoverProps}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm tracking-widest uppercase text-[var(--text)]"
                initial="rest"
                whileHover="hover"
                animate="rest"
            >
                <span>{label}</span>

                <motion.span
                    variants={{
                        rest: { x: 0, y: 0 },
                        hover: { x: 4, y: -4 }
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                    <ArrowUpRightIcon size={16} weight="light" />
                </motion.span>
            </motion.a>
        );
    }