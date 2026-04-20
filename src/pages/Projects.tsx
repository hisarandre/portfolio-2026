import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "../data/projects.ts";
import type { Project } from "../data/projects.ts";
import { useLoading } from "../context/LoadingContext.tsx";
import { useIsMobile } from "../hooks/useIsMobile.ts";
import AnimatedNoise from "../components/ui/AnimatedNoise.tsx";
import ProjectCard from "../components/ui/Projects/ProjectCard.tsx";
import ProjectList from "../components/ui/Projects/ProjectList.tsx";
import ProjectCardMobile from "../components/ui/Projects/ProjectCardMobile.tsx";

export default function Projects() {
    const { isLoading } = useLoading();
    const isMobile = useIsMobile();
    const [active, setActive] = useState<Project>(projects[0]);

    return (
        <>
            <AnimatedNoise />

            {isMobile ? (
                <div className="flex-1 flex flex-col gap-4 z-10">
                    {projects.map((project, i) => (
                        <ProjectCardMobile key={project.id} project={project} index={i} />
                    ))}
                </div>
            ) : (
                <div className="flex-1 flex items-stretch z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={!isLoading ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        className="flex-1 flex items-stretch"
                        style={{ height: "100%" }}
                    >
                        <ProjectCard project={active} />
                        <ProjectList projects={projects} active={active} onHover={setActive} />
                    </motion.div>
                </div>
            )}
        </>
    );
}