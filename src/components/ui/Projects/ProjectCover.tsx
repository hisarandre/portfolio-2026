import { motion } from "framer-motion";
import type { Project } from "../../../data/projects";
import { useLang } from "../../../context/LangContext";

interface Props {
    project: Project;
    entered: boolean;
}

export default function ProjectCover({ project, entered }: Props) {
    const { t } = useLang();
    const title = t(`projects.${project.id}.title`);

    return (
        <motion.div
            className="w-1/2 h-full overflow-hidden"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: entered ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
            {project.cover ? (
                <img src={project.cover} alt={title} className="w-full h-full object-cover" />
            ) : (
                <div className="w-full h-full bg-[var(--card)] flex items-center justify-center text-[var(--muted)] text-sm tracking-widest uppercase">
                    Confidential
                </div>
            )}
        </motion.div>
    );
}