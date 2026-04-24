import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
import type { Project } from "../data/projects";
import { useLoading } from "../context/LoadingContext";
import { useIsMobile } from "../hooks/useIsMobile";
import { useIsLargeScreen } from "../hooks/useIsLargeScreen";
import AnimatedNoise from "../components/ui/AnimatedNoise";
import ProjectCard from "../components/ui/Projects/ProjectCard";
import ProjectList from "../components/ui/Projects/ProjectList";
import ProjectCardMobile from "../components/ui/Projects/ProjectCardMobile";

export default function Projects() {
    const { isLoading } = useLoading();
    const isMobile = useIsMobile();
    const isLarge = useIsLargeScreen();

    const [active, setActive] = useState<Project>(() => projects[0]);

    return (
        <>
            <AnimatedNoise />

            {isMobile && (
                <div className="flex-1 flex flex-col gap-4 z-10">
                    {projects.map((project, i) => (
                        <ProjectCardMobile
                            key={project.id}
                            project={project}
                            index={i}
                        />
                    ))}
                </div>
            )}

            {!isMobile && isLarge && (
                <div className="flex-1 z-10 px-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={!isLoading ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="columns-3 2xl:columns-4 gap-6"
                    >
                        {projects.map((project, i) => (
                            <div
                                key={project.id}
                                className="mb-6 break-inside-avoid"
                            >
                                <ProjectCardMobile
                                    project={project}
                                    index={i}
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            )}

            {!isMobile && !isLarge && (
                <div className="flex-1 flex items-stretch z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={
                            !isLoading
                                ? { opacity: 1, x: 0 }
                                : { opacity: 0, x: -30 }
                        }
                        transition={{
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                            delay: 0.1,
                        }}
                        className="flex-1 flex items-stretch min-h-0"
                    >
                        <ProjectCard project={active} />
                        <ProjectList
                            projects={projects}
                            active={active}
                            onHover={setActive}
                        />
                    </motion.div>
                </div>
            )}
        </>
    );
}