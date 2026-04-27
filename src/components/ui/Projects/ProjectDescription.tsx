interface Props {
    desc: string;
}

export default function ProjectDescription({ desc }: Props) {
    return (
        <div className="flex-shrink-0 w-[50vw] h-full flex flex-col justify-center px-20 py-16">
            <p className="text-[var(--text)] text-lg leading-relaxed">{desc}</p>
        </div>
    );
}