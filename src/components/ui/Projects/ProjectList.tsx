import { motion } from "framer-motion";
import type { Project } from "../../../data/projects";
import { useLang } from "../../../context/LangContext";
import { useLoading } from "../../../context/LoadingContext";
import { useHoverCursor } from "../../../hooks/useHoverCursor.ts";
import { useNavigate } from "react-router-dom";

interface Props {
    projects: Project[];
    active: Project;
    onHover: (project: Project) => void;
}

export default function ProjectList({ projects, active, onHover }: Props) {
    const { t } = useLang();
    const { isLoading } = useLoading();
    const navigate = useNavigate();
    const hoverProps = useHoverCursor();

    return (
        <nav className="flex flex-col flex-1 justify-end pl-16 pb-6">
            {projects.map((project, i) => {
                const isActive = active.id === project.id;

                return (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                            !isLoading
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 20 }
                        }
                        transition={{
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1],
                            delay: 0.2 + i * 0.1,
                        }}
                        onMouseEnter={() => {
                            onHover(project);
                            hoverProps.onMouseEnter();
                        }}
                        onMouseLeave={hoverProps.onMouseLeave}
                        onClick={() => {
                            hoverProps.onMouseLeave();
                            navigate(`/projects/${project.id}`);
                        }}
                        className={`flex items-center gap-12 py-6 border-b border-[var(--border)] cursor-pointer transition-all duration-300 ${
                            isActive
                                ? "opacity-100"
                                : "opacity-30 hover:opacity-60"
                        }`}
                    >
                        <span
                            className={`font-mono text-sm w-8 transition-colors duration-300 ${
                                isActive
                                    ? "text-[var(--lime)]"
                                    : "text-[var(--muted)]"
                            }`}
                        >
                            {project.index}
                        </span>

                        <span
                            className={`text-3xl font-medium tracking-tight ${
                                isActive
                                    ? "text-[var(--text)]"
                                    : "text-[var(--muted)]"
                            }`}
                        >
                            {t(`projects.${project.id}.title`)}
                        </span>
                    </motion.div>
                );
            })}
        </nav>
    );
}