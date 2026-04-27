import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "../hooks/useLenis";
import { useLang } from "../context/LangContext";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";
import { useHoverCursor } from "../hooks/useHoverCursor";
import { projects } from "../data/projects";
import AnimatedNoise from "../components/ui/AnimatedNoise";
import ProjectInfoPanel from "../components/ui/Projects/ProjectInfoPanel";
import ProjectCover from "../components/ui/Projects/ProjectCover";
import ProjectDescription from "../components/ui/Projects/ProjectDescription";
import ProjectImageSlide from "../components/ui/Projects/ProjectImageSlide";

export default function ProjectDetails() {
    useLenis();
    const { name } = useParams();
    const navigate = useNavigate();
    const { t } = useLang();
    const scrollRef = useRef<HTMLDivElement>(null!);
    const [entered, setEntered] = useState(false);
    const hoverProps = useHoverCursor();

    const project = projects.find((p) => p.id === name);

    useHorizontalScroll(scrollRef);

    useEffect(() => {
        const timer = setTimeout(() => setEntered(true), 80);
        return () => clearTimeout(timer);
    }, []);

    if (!project) return null;

    const desc  = t(`projects.${project.id}.desc`);
    const title = t(`projects.${project.id}.title`);

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 bg-[var(--bg)] overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
                <AnimatedNoise />

                <motion.button
                    {...hoverProps}
                    className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 w-12 h-12 rounded-full bg-[var(--text)] text-[var(--card)] flex items-center justify-center text-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: entered ? 1 : 0, scale: entered ? 1 : 0.8 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    onClick={() => {
                        hoverProps.onMouseLeave();
                        navigate(-1);
                    }}
                >
                    ✕
                </motion.button>

                <div
                    ref={scrollRef}
                    className="flex h-full overflow-x-auto overflow-y-hidden"
                    style={{ scrollbarWidth: "none" }}
                >
                    {/* SLIDE 1 — info + cover */}
                    <div className="flex-shrink-0 w-screen h-full flex">
                        <ProjectInfoPanel project={project} entered={entered} />
                        <ProjectCover project={project} entered={entered} />
                    </div>

                    {/* SLIDE 2 — description */}
                    <ProjectDescription desc={desc} />

                    {/* SLIDES — additional images */}
                    {project.images?.map((img, i) => (
                        <ProjectImageSlide key={i} src={img} alt={`${title} ${i + 1}`} />
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}