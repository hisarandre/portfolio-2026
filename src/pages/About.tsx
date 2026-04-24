import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, useSpring } from "framer-motion";
import { useLenis } from "../hooks/useLenis";
import { useLang } from "../context/LangContext";
import AnimatedNoise from "../components/ui/AnimatedNoise";
import HeroSection from "../components/ui/About/HeroSection";
import CompaniesSection from "../components/ui/About/CompaniesSection";
import SkillsSection from "../components/ui/About/SkillsSection";

const useSmoothScroll = (
    ref: React.RefObject<HTMLDivElement>,
    offset: readonly [string, string]
) => {
    const { scrollYProgress } = useScroll({ target: ref, offset: offset as any });
    return useSpring(scrollYProgress, { stiffness: 40, damping: 30 });
};

export default function About() {
    useLenis();
    const { t } = useLang();
    const [entered, setEntered] = useState(false);

    const companiesRef = useRef<HTMLDivElement>(null!);
    const skillsRef    = useRef<HTMLDivElement>(null!);

    const smoothComp   = useSmoothScroll(companiesRef, ["start 80%", "start 30%"] as const);
    const smoothSkills = useSmoothScroll(skillsRef,    ["start 80%", "start 20%"] as const);

    const skillsOpacity = useTransform(smoothSkills, [0, 1], [0, 1]);
    const skillsY       = useTransform(smoothSkills, [0, 1], [60, 0]);

    const companies = t("about.companies.list", { returnObjects: true }) as string[];
    const devSkills = t("about.skills.list.dev", { returnObjects: true }) as string[];
    const uiSkills  = t("about.skills.list.ui",  { returnObjects: true }) as string[];

    const compOpacity = useTransform(smoothComp, [0, 1], [0, 1]);
    const compY       = useTransform(smoothComp, [0, 1], [60, 0]);

    useEffect(() => {
        const timer = setTimeout(() => setEntered(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatedNoise />
            <div className="w-full">
                <HeroSection entered={entered} />
                <CompaniesSection
                    ref={companiesRef}
                    companies={companies}
                    progress={smoothComp}
                    opacity={compOpacity}
                    y={compY}
                />
                <SkillsSection
                    ref={skillsRef}
                    opacity={skillsOpacity}
                    y={skillsY}
                    devSkills={devSkills}
                    uiSkills={uiSkills}
                />
            </div>
        </>
    );
}