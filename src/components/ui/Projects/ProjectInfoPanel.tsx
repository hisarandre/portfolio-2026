import { motion } from "framer-motion";
import { useLang } from "../../../context/LangContext";
import type { Project } from "../../../data/projects";
import OutsideLink from "../OutsideLink";

interface Props {
    project: Project;
    entered: boolean;
}

export default function ProjectInfoPanel({ project, entered }: Props) {
    const { t } = useLang();
    const title = t(`projects.${project.id}.title`);

    return (
        <div className="w-1/2 h-full flex flex-col justify-between py-16 px-10 md:px-20 relative z-10">
            <motion.h1
                className="text-[var(--text)]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: entered ? 1 : 0, y: entered ? 0 : 30 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
                {title}
            </motion.h1>

            <motion.div
                className="flex flex-col gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: entered ? 1 : 0, y: entered ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.45 }}
            >
                <div className="flex flex-col gap-3 text-sm text-[var(--muted)]">
                    {project.client && (
                        <div className="flex gap-8">
                            <span className="w-28 shrink-0">Client</span>
                            <span className="text-[var(--text)] font-medium">{project.client}</span>
                        </div>
                    )}
                    <div className="flex gap-8">
                        <span className="w-28 shrink-0">Year</span>
                        <span className="text-[var(--text)] font-medium">{project.year}</span>
                    </div>
                    {project.techs.length > 0 && (
                        <div className="flex gap-8">
                            <span className="w-28 shrink-0">Technologies</span>
                            <span className="text-[var(--text)] font-medium">{project.techs.join(", ")}</span>
                        </div>
                    )}
                    {project.tags.length > 0 && (
                        <div className="flex gap-8">
                            <span className="w-28 shrink-0">Categories</span>
                            <span className="text-[var(--text)] font-medium">{project.tags.join(", ")}</span>
                        </div>
                    )}
                </div>

                {project.href && (
                    <OutsideLink label="Visit site" href={project.href} />
                )}
            </motion.div>
        </div>
    );
}