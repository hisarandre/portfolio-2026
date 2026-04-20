import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import type { StickerData } from "../../../data/stickers.ts";
import { useCursor } from "../../../context/CursorContext.tsx";
import {useLoading} from "../../../context/LoadingContext.tsx";

interface Props {
    sticker: StickerData;
    index: number;
}

export default function Sticker({ sticker, index }: Props) {
    const { setMode } = useCursor();
    const { isLoading } = useLoading();

    const relPos = useRef({
        xPct: sticker.defaultPos.x / 100,
        yPct: sticker.defaultPos.y / 100,
    });

    const x = useMotionValue((sticker.defaultPos.x / 100) * window.innerWidth);
    const y = useMotionValue((sticker.defaultPos.y / 100) * window.innerHeight);

    const rotateRaw = useTransform(x, () => {
        const vel = x.getVelocity();
        const tilt = Math.max(-18, Math.min(18, vel * 0.01));
        return sticker.defaultRot + tilt;
    });
    const rotate = useSpring(rotateRaw, { stiffness: 200, damping: 20 });

    useEffect(() => {
        const onResize = () => {
            const newW = window.innerWidth;
            const newH = window.innerHeight;
            x.set(relPos.current.xPct * newW);
            y.set(relPos.current.yPct * newH);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [x, y]);

    const onDragEnd = () => {
        relPos.current = {
            xPct: x.get() / window.innerWidth,
            yPct: y.get() / window.innerHeight,
        };
        setMode("default");
    };

    return (
        <motion.img
            src={sticker.image}
            alt=""
            drag
            dragMomentum={false}
            onDragStart={() => setMode("drag")}
            onDragEnd={onDragEnd}
            onHoverStart={() => setMode("drag")}
            onHoverEnd={() => setMode("default")}
            draggable={false}
            style={{
                x,
                y,
                rotate,
                position: "fixed",
                top: 0,
                left: 0,
                width: sticker.size,
                height: sticker.size,
                objectFit: "contain",
                translateX: "-50%",
                translateY: "-50%",
                zIndex: index + 10,
                touchAction: "none",
                willChange: "transform",
                filter: "drop-shadow(0 4px 2px rgba(0,0,0,0.3))",
            }}
            whileDrag={{
                scale: 1.05,
                filter: "drop-shadow(0 16px 24px rgba(0,0,0,0.5))",
                zIndex: 1000,
            }}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, scale: 0.8, rotate: sticker.defaultRot - 10 }}
            animate={isLoading
                ? { opacity: 0, scale: 0.8, rotate: sticker.defaultRot - 10 }
                : { opacity: 1, scale: 1, rotate: sticker.defaultRot }
            }
            transition={{ type: "spring", stiffness: 300, damping: 25, delay: 1.5 + index * 0.05 }}
        />
    );
}

