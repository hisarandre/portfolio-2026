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
        <div className="w-1/3 shrink-0 bg-[var(--card)] rounded-2xl flex flex-col gap-5 p-8 overflow-hidden" style={{ height: "100%" }}>

            {/* Image or noise */}
            <AnimatePresence mode="wait">
                {project.confidential ? (
                    <motion.div
                        key={project.id + "-noise"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <ProjectNoise />
                    </motion.div>
                ) : (
                    <motion.img
                        key={project.id + "-img"}
                        src={project.image}
                        alt={t(`projects.${project.id}.title`)}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full aspect-[2/1] object-cover rounded-xl shrink-0"
                    />
                )}
            </AnimatePresence>

            {/* Description */}
            <div className="flex-1 min-h-0 overflow-y-auto">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={project.id + "-desc"}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="text-sm text-[var(--muted)] leading-relaxed"
                    >
                        {t(`projects.${project.id}.desc`)}
                    </motion.p>
                </AnimatePresence>
            </div>

            {/* Meta */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={project.id + "-meta"}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-2 shrink-0 text-xs font-mono"
                >
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
                </motion.div>
            </AnimatePresence>
        </div>
    );
}