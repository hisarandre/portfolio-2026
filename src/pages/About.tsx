import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useLenis } from "../hooks/useLenis";
import { CompanyItem } from "../components/ui/Me/CompanyItem";
import about from "../assets/about.png";
import { useLang } from "../context/LangContext";
import AnimatedNoise from "../components/ui/AnimatedNoise";
import {useDiscoverable} from "../hooks/useDiscoverable.ts";

const ease = [0.76, 0, 0.24, 1] as const;
const contentEase = [0.22, 1, 0.36, 1] as const;

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
    const { handlers: smileHandlers } = useDiscoverable("smile");
    const { handlers: travelHandlers } = useDiscoverable("travel");
    const { handlers: multitaskHandlers } = useDiscoverable("multitask");


    useEffect(() => {
        const timer = setTimeout(() => setEntered(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const companiesRef = useRef<HTMLDivElement>(null!);
    const skillsRef = useRef<HTMLDivElement>(null!);

    const smoothComp   = useSmoothScroll(companiesRef, ["start 80%", "start 30%"] as const);
    const smoothSkills = useSmoothScroll(skillsRef,    ["start 80%", "start 20%"] as const);

    const skillsOpacity = useTransform(smoothSkills, [0, 1], [0, 1]);
    const skillsY       = useTransform(smoothSkills, [0, 1], [60, 0]);

    const companies = t("about.companies.list", { returnObjects: true }) as string[];
    const devSkills = t("about.skills.list.dev", { returnObjects: true }) as string[];
    const uiSkills  = t("about.skills.list.ui",  { returnObjects: true }) as string[];

    const SkillsBlock = ({ title, skills }: { title: string; skills: string[] }) => (
        <div className="flex flex-col md:flex-row md:justify-between gap-6 border-b border-[var(--muted)] pb-12">
            <p className="text-2xl md:text-3xl font-medium tracking-tight text-[var(--muted)]">
                {title}
            </p>
            <div className="text-right space-y-2">
                {skills.map((s) => (
                    <p key={s} className="text-sm md:text-base">
                        {s}
                    </p>
                ))}
            </div>
        </div>
    );

    return (
        <>
            <AnimatedNoise />

            <div className="w-full">
                {/* HERO */}
                <div className="h-screen flex flex-col overflow-hidden -mt-32">
                    <motion.div
                        animate={{ height: entered ? "60vh" : "100vh" }}
                        transition={{ duration: 1.2, ease }}
                        className="w-full shrink-0 overflow-hidden"
                    >
                        <img
                            {...travelHandlers}
                            src={about}
                            className="w-full h-full object-cover object-top"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, ease: contentEase, delay: 0.5 }}
                        className="px-6 sm:px-10 md:px-20 pt-8 md:pt-12 flex-1"
                    >
                        <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-16">
                            <div>
                                <div className="text-[var(--lime)]">01/</div>
                                <h1 {...smileHandlers} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-medium tracking-tight leading-none">
                                    Hi there :)
                                </h1>
                            </div>
                            <p {...multitaskHandlers} className="max-w-xs sm:max-w-sm md:max-w-md text-[var(--muted)] leading-relaxed md:pt-4">
                                {t("about.description")}
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* COMPANIES */}
                <div
                    ref={companiesRef}
                    className="bg-[var(--dark)] mx-20 mt-8"
                >
                    <div className="w-full flex flex-col md:flex-row justify-between gap-10 sticky top-32">
                        <div className="w-[35vh]">
                            <div className="text-[var(--lime)] pb-6">02/</div>
                            <h2 className="text-5xl! font-medium tracking-tight leading-none">
                                {t("about.companies.title")}
                            </h2>
                        </div>
                        <div className="text-right pt-12">
                            {companies.map((company, i) => (
                                <CompanyItem
                                    key={company}
                                    company={company}
                                    index={i}
                                    progress={smoothComp}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* SKILLS */}
                <div
                    ref={skillsRef}
                    className="bg-[var(--dark)] m-20 mt-32"
                >
                    <motion.div
                        className="w-full grid grid-cols-1 md:grid-cols-3 gap-16"
                        style={{ opacity: skillsOpacity, y: skillsY }}
                    >
                        {/* LEFT */}
                        <div className="md:col-span-1">
                            <div className="sticky top-32">
                                <div className="text-[var(--lime)] pb-6">03/</div>
                                <h2 className="!text-5xl font-medium tracking-tight leading-none">
                                    {t("about.skills.title")}
                                </h2>
                            </div>
                        </div>

                        {/* RIGHT */}
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
            </div>
        </>
    );
}