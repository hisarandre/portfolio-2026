import {useIsMobile} from "../../../hooks/useIsMobile.ts";

interface Props {
    title: string;
    skills: string[];
}

export default function SkillsBlock({ title, skills }: Props) {
    const isMobile = useIsMobile();

    return (
        <div className="flex flex-col md:flex-row md:justify-between gap-6 border-b border-[var(--muted)] pb-12">
            <p className="text-2xl md:text-3xl font-medium">
                {title}
            </p>
            <div className= {isMobile ? ``: `text-right space-y-2`} >
                {skills.map((s) => (
                    <p key={s} className="text-[var(--muted)] text-sm md:text-base">{s}</p>
                ))}
            </div>
        </div>
    );
}