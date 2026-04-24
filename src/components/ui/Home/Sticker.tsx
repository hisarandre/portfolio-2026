import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring, animate } from "framer-motion";
import type { StickerData } from "../../../data/stickers.ts";
import { useCursor } from "../../../context/CursorContext.tsx";
import { useLoading } from "../../../context/LoadingContext.tsx";

interface Props {
    sticker: StickerData;
    index: number;
}

export default function Sticker({ sticker, index }: Props) {
    const { setMode } = useCursor();
    const { isLoading } = useLoading();
    const [isDragging, setIsDragging] = useState(false);

    const relPos = useRef({
        xPct: sticker.defaultPos.x / 100,
        yPct: sticker.defaultPos.y / 100,
    });

    const x = useMotionValue((sticker.defaultPos.x / 100) * window.innerWidth);
    const y = useMotionValue((sticker.defaultPos.y / 100) * window.innerHeight);
    const scale = useMotionValue(1);
    const filter = useMotionValue("drop-shadow(0 4px 2px rgba(0,0,0,0.3))");

    const rotateRaw = useTransform(x, () => {
        const vel = x.getVelocity();
        const tilt = Math.max(-18, Math.min(18, vel * 0.01));
        return sticker.defaultRot + tilt;
    });
    const rotate = useSpring(rotateRaw, { stiffness: 200, damping: 20 });

    useEffect(() => {
        const onResize = () => {
            x.set(relPos.current.xPct * window.innerWidth);
            y.set(relPos.current.yPct * window.innerHeight);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [x, y]);

    const onDragStart = () => {
        setIsDragging(true);
        setMode("drag");
        animate(scale, 1.05, { duration: 0.1 });
        animate(filter, "drop-shadow(0 16px 24px rgba(0,0,0,0.5))", { duration: 0.1 });
    };

    const onDragEnd = () => {
        relPos.current = {
            xPct: x.get() / window.innerWidth,
            yPct: y.get() / window.innerHeight,
        };
        setIsDragging(false);
        setMode("default");
        animate(scale, 1, { duration: 0.1 });
        animate(filter, "drop-shadow(0 4px 2px rgba(0,0,0,0.3))", { duration: 0.1 });
    };

    return (
        <motion.img
            src={sticker.image}
            alt=""
            drag
            dragMomentum={false}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onHoverStart={() => setMode("drag")}
            onHoverEnd={() => setMode("default")}
            draggable={false}
            style={{
                x,
                y,
                rotate,
                scale,
                filter,
                position: "fixed",
                top: 0,
                left: 0,
                width: sticker.size,
                height: sticker.size,
                objectFit: "contain",
                translateX: "-50%",
                translateY: "-50%",
                zIndex: isDragging ? 1000 : index + 10,
                touchAction: "none",
                willChange: "transform",
            }}
            initial={{
                opacity: 0,
                scale: 0.8,
                rotate: sticker.defaultRot - 10,
            }}
            animate={isLoading ? {
                opacity: 0,
                scale: 0.8,
                rotate: sticker.defaultRot - 10,
            } : {
                opacity: 1,
                scale: 1,
                rotate: sticker.defaultRot,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: 1.5 + index * 0.05,
            }}
        />
    );
}