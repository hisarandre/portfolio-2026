import { useEffect, useRef } from "react";

export default function ProjectNoise() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        let animId: number;

        const draw = () => {
            const { width, height } = canvas;
            const imageData = ctx.createImageData(width, height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const value = Math.random() * 255;
                data[i] = value * 0.6;
                data[i + 1] = value * 0.9;
                data[i + 2] = value * 0.2;
                data[i + 3] = 30;
            }

            ctx.putImageData(imageData, 0, 0);
            animId = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(animId);
    }, []);

    return (
        <div className="relative w-full h-full overflow-hidden bg-[var(--dark)] rounded-xl">
            <canvas ref={canvasRef} className="md:absolute inset-0 w-full h-full" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <span className="font-mono text-xs text-[var(--lime)] uppercase">
                    ( Confidential )
                </span>
            </div>
        </div>
    );
}