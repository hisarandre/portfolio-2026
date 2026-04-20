import { motion } from "framer-motion";
import type { Project } from "../../../data/projects.ts";
import { useLang } from "../../../context/LangContext.tsx";
import { useLoading } from "../../../context/LoadingContext.tsx";
import ProjectNoise from "./ProjectNoise.tsx";

interface Props {
    project: Project;
    index: number;
}

export default function ProjectCardMobile({ project, index }: Props) {
    const { t } = useLang();
    const { isLoading } = useLoading();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
            className="bg-[var(--card)] rounded-2xl flex flex-col gap-4 p-4"
        >
            {/* Image or noise */}
            {project.confidential ? (
                <ProjectNoise />
            ) : (
                <img
                    src={project.image}
                    alt={t(project.titleKey)}
                    className="w-full aspect-[2/1] object-cover rounded-xl"
                />
            )}

            {/* Titre */}
            <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[var(--lime)]">{project.index}</span>
                <h2 className="text-xl font-medium tracking-tight">{t(project.titleKey)}</h2>
            </div>

            {/* Description */}
            <p className="text-sm text-[var(--muted)] leading-relaxed">
                {t(project.descriptionKey)}
            </p>

            {/* Meta */}
            <div className="flex flex-col gap-2 text-xs font-mono border-t border-[var(--border)] pt-3">
                <div className="flex items-center justify-between">
                    <span className="text-[var(--muted)] uppercase tracking-widest">Tags</span>
                    <div className="flex gap-2 flex-wrap justify-end">
                        {project.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded-full bg-[var(--lime)] text-[var(--dark)]">{tag}</span>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-[var(--muted)] uppercase tracking-widest">Technologies</span>
                    <span className="text-[var(--muted)]">{project.techs.join(", ")}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-[var(--muted)] uppercase tracking-widest">Year</span>
                    <span className="text-[var(--lime)]">{project.year}</span>
                </div>
            </div>
        </motion.div>
    );
}