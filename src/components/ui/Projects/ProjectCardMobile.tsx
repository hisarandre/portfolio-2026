import { motion } from "framer-motion";
import type { Project } from "../../../data/projects";
import { useLang } from "../../../context/LangContext";
import { useLoading } from "../../../context/LoadingContext";
import ProjectNoise from "./ProjectNoise";

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
            transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.1,
            }}
            className="bg-[var(--card)] rounded-2xl flex flex-col gap-4 p-4"
        >
            {/* Image */}
            {project.confidential ? (
                <ProjectNoise />
            ) : (
                <img
                    src={project.cover}
                    alt={t(`projects.${project.id}.title`)}
                    className="w-full aspect-[2/1] object-cover rounded-xl"
                />
            )}

            {/* Title */}
            <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[var(--lime)]">
                    {project.index}
                </span>
                <h2 className="text-xl font-medium tracking-tight">
                    {t(`projects.${project.id}.title`)}
                </h2>
            </div>

            {/* Description */}
            <p className="text-sm text-[var(--muted)] leading-relaxed">
                {t(`projects.${project.id}.desc`)}
            </p>

            {/* Meta */}
            <div className="flex flex-col gap-2 text-xs font-mono border-t border-[var(--border)] pt-3">
                <div className="flex items-center justify-between">
                    <span className="text-[var(--muted)] uppercase tracking-widest">
                        {t("projects.meta.tags")}
                    </span>
                    <div className="flex gap-2 flex-wrap justify-end">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-0.5 rounded-full bg-[var(--lime)] text-[var(--dark)]"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-[var(--muted)] uppercase tracking-widest">
                        {t("projects.meta.tech")}
                    </span>
                    <span className="text-[var(--muted)]">
                        {project.techs.join(", ")}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-[var(--muted)] uppercase tracking-widest">
                        {t("projects.meta.year")}
                    </span>
                    <span className="text-[var(--lime)]">
                        {project.year}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}