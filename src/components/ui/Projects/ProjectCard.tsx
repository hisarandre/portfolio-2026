import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "../../../data/projects";
import { useLang } from "../../../context/LangContext";
import ProjectNoise from "./ProjectNoise";

interface Props {
    project: Project;
}

export default function ProjectCard({ project }: Props) {
    const { t } = useLang();

    return (
        <div className="w-2/5 shrink-0 rounded-2xl overflow-hidden min-h-0">
            <AnimatePresence mode="wait">
                {project.confidential ? (
                    <motion.div
                        key={project.id + "-noise"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full"
                    >
                        <ProjectNoise />
                    </motion.div>
                ) : (
                    <motion.img
                        key={project.id + "-img"}
                        src={project.cover}
                        alt={t(`projects.${project.id}.title`)}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full h-full object-cover"
                    />
                )}
            </AnimatePresence>
        </div>
    );
}