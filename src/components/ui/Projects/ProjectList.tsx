import { motion } from "framer-motion";
import type { Project } from "../../../data/projects.ts";
import { useLang } from "../../../context/LangContext.tsx";
import { useLoading } from "../../../context/LoadingContext.tsx";

interface Props {
    projects: Project[];
    active: Project;
    onHover: (project: Project) => void;
}

export default function ProjectList({ projects, active, onHover }: Props) {
    const { t } = useLang();
    const { isLoading } = useLoading();

    return (
        <nav className="w-2/3 flex flex-col justify-end pl-16 pb-6">
            {projects.map((project, i) => {
                const isActive = active.id === project.id;
                return (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.1 }}
                        onMouseEnter={() => onHover(project)}
                        className={`flex items-center gap-12 py-6 border-b border-[var(--border)] cursor-pointer transition-all duration-300 ${
                            isActive ? "opacity-100" : "opacity-30 hover:opacity-60"
                        }`}
                    >
                        <span className={`font-mono text-sm w-8 transition-colors duration-300 ${
                            isActive ? "text-[var(--lime)]" : "text-[var(--muted)]"
                        }`}>
                            {project.index}
                        </span>
                        <span className={`text-3xl font-medium tracking-tight ${
                            isActive ? "text-[var(--text)]" : "text-[var(--muted)]"
                        }`}>
                            {t(project.titleKey)}
                        </span>
                    </motion.div>
                );
            })}
        </nav>
    );
}