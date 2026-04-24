import { forwardRef } from "react";
import { motion } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useLang } from "../../../context/LangContext";
import SkillsBlock from "./SkillsBlock";

interface Props {
    opacity: MotionValue<number>;
    y: MotionValue<number>;
    devSkills: string[];
    uiSkills: string[];
}

const SkillsSection = forwardRef<HTMLDivElement, Props>(({ opacity, y, devSkills, uiSkills }, ref) => {
    const { t } = useLang();

    return (
        <div ref={ref} className="px-6 sm:px-10 md:px-20 mt-32">
            <motion.div
                className="w-full grid grid-cols-1 md:grid-cols-3 gap-16"
                style={{ opacity, y }}
            >
                <div className="md:col-span-1">
                    <div className="sticky top-32">
                        <div className="text-[var(--lime)] pb-6">03/</div>
                        <h2 className="!text-4xl md:!text-5xl font-medium tracking-tight leading-none">
                            {t("about.skills.title")}
                        </h2>
                    </div>
                </div>

                <div className="md:col-span-2 flex flex-col gap-20">
                    <SkillsBlock
                        title={t("about.skills.categories.development")}
                        skills={devSkills}
                    />
                    <SkillsBlock
                        title={t("about.skills.categories.interface")}
                        skills={uiSkills}
                    />
                </div>
            </motion.div>
        </div>
    );
});

SkillsSection.displayName = "SkillsSection";
export default SkillsSection;