import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function useLenis() {
    const lenisRef = useRef<Lenis | null>(null);
    const rafId = useRef<number | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.08,
            smoothWheel: true,
            autoRaf: false,
        });

        lenisRef.current = lenis;

        const raf = (time: number) => {
            lenis.raf(time);
            rafId.current = requestAnimationFrame(raf);
        };

        rafId.current = requestAnimationFrame(raf);

        return () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);
            lenis.destroy();
        };
    }, []);

    return lenisRef;
}