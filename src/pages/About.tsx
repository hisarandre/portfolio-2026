import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useLenis } from "../hooks/useLenis";
import { CompanyItem } from "../components/ui/Me/CompanyItem.tsx";
import about from "../assets/about.png";
import { useLang } from "../context/LangContext.tsx";
import OutsideLink from "../components/ui/OutsideLink.tsx";

const companies = [
    "Empirys (Luxembourg)",
    "Red Cross (Belgium)",
    "AvProd (France)",
    "87 seconds (Belgium)",
];

export default function About() {
    useLenis();
    const { t } = useLang();

    const heroRef      = useRef<HTMLDivElement>(null);
    const companiesRef = useRef<HTMLDivElement>(null);
    const skillsRef    = useRef<HTMLDivElement>(null);

    // Hero
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end end"],
    });
    const smooth = useSpring(scrollYProgress, { stiffness: 40, damping: 30 });

    const imageHeight = useTransform(smooth, [0, 0.3], ["100vh", "50vh"]);
    const imageScale  = useTransform(smooth, [0, 0.3], [1, 0.98]);
    const textY       = useTransform(smooth, [0.15, 0.4], [60, 0]);
    const textOpacity = useTransform(smooth, [0.15, 0.4], [0, 1]);

    // Companies
    const { scrollYProgress: comp } = useScroll({
        target: companiesRef,
        offset: ["start 90%", "start 40%"]
    });
    const smoothComp = useSpring(comp, { stiffness: 40, damping: 30 });

    // Skills
    const { scrollYProgress: skills } = useScroll({
        target: skillsRef,
        offset: ["start 80%", "start 20%"],
    });
    const smoothSkills = useSpring(skills, { stiffness: 40, damping: 30 });

    const skillsOpacity = useTransform(smoothSkills, [0, 1], [0, 1]);
    const skillsY       = useTransform(smoothSkills, [0, 1], [60, 0]);
    const skillsScale   = useTransform(smoothSkills, [0, 1], [0.96, 1]);

    return (
        <div className="w-full">

            {/* HERO */}
            <div ref={heroRef} className="h-[220vh]">
                <div className="sticky top-0 h-screen overflow-hidden">

                    <motion.div
                        style={{ height: imageHeight, scale: imageScale }}
                        className="w-full overflow-hidden origin-top"
                    >
                        <img
                            src={about}
                            className="w-full h-full object-cover object-top"
                        />
                    </motion.div>

                    <motion.div
                        style={{ y: textY, opacity: textOpacity }}
                        className="absolute bottom-32 left-0 right-0 px-6 sm:px-10 md:px-20 z-10"
                    >
                        <div className="flex items-start justify-between gap-16">
                            <h1 className="text-6xl font-medium tracking-tight shrink-0">
                                Hi there
                            </h1>
                            <div className="max-w-sm">
                                <p className="text-[var(--muted)] leading-relaxed pb-6">
                                    {t("about_description")}
                                </p>
                                <p className="text-[var(--muted)] text-sm opacity-50">
                                    Scroll or download my{" "}
                                    <OutsideLink label="CV" href="https://github.com/yourname" />
                                </p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* COMPANIES */}
            <div ref={companiesRef} className="bg-[var(--dark)] py-40 px-6 sm:px-10 md:px-20 h-[160vh]">
                <div className="max-w-4xl flex flex-col gap-10 sticky top-32">
                    <p className="text-xs font-mono uppercase tracking-widest text-[var(--muted)] mb-8">
                        {t("about_companies_title")}
                    </p>
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

            {/* SKILLS */}
            <div ref={skillsRef} className="h-screen bg-[var(--dark)]">
                <div className="h-full flex items-center justify-center px-6">

                    <motion.div
                        className="w-full max-w-5xl border border-[var(--border)] rounded-2xl p-16 bg-[var(--card)]"
                        style={{
                            opacity: skillsOpacity,
                            scale: skillsScale
                        }}
                    >
                        <h2 className="text-5xl font-medium pb-8">
                            Skills
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            <div>
                                <p className="text-[var(--muted)] text-xs uppercase tracking-widest font-mono mb-6">
                                    Development
                                </p>
                                {["Java · Spring Boot", "React · Angular · TypeScript", "Node.js · NestJS", "MySQL · MongoDB",
                                    "SonarQube · Docker"].map((s) => (
                                    <p key={s} className="py-3 border-b border-[var(--border)] last:border-0">{s}</p>
                                ))}
                            </div>
                            <div>
                                <p className="text-[var(--muted)] text-xs uppercase tracking-widest font-mono mb-6">
                                    Interface
                                </p>
                                {["UI/UX · Design Systems", "Framer Motion", "Responsive Design", "Figma", "Adobe Suite"].map((s) => (
                                    <p key={s} className="py-3 border-b border-[var(--border)] last:border-0">{s}</p>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}