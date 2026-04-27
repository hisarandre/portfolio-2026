import { useEffect } from "react";
import Lenis from "lenis";

export function useHorizontalScroll(ref: React.RefObject<HTMLDivElement>) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const lenis = new Lenis({
            wrapper: el,
            content: el,
            orientation: "horizontal",
            lerp: 0.02,
            smoothWheel: true,
            autoRaf: false,
        });

        let rafId: number;

        const raf = (time: number) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, [ref]);
}