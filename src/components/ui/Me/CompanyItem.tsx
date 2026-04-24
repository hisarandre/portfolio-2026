import { motion, useTransform, MotionValue } from "framer-motion";

export function CompanyItem({company, index, progress}: {
    company: string;
    index: number;
    progress: MotionValue<number>;
}) {
    const total = 0.25;
    const gap = 0.05;

    const start = index * (total + gap);
    const end = Math.min(start + total, 1);

    const mask = useTransform(
        progress,
        [start, end],
        [
            "linear-gradient(to right, black 0%, transparent 0%)",
            "linear-gradient(to right, black 100%, transparent 100%)"
        ]
    );

    return (
        <div className="relative text-lg leading-none pb-8">
            <p className="text-[var(--border)] block">{company}</p>
            <motion.p
                style={{ WebkitMaskImage: mask, maskImage: mask }}
                className="absolute inset-0 text-[var(--muted)] will-change-[mask-image]"
            >
                {company}
            </motion.p>
        </div>
    );
}