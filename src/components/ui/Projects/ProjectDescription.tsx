interface Feature {
    label: string;
    desc: string;
}

interface Props {
    desc: string;
    features?: Feature[];
}

export default function ProjectDescription({ desc,  features }: Props) {
    return (
        <div className="flex-shrink-0 w-[50vw] h-full flex flex-col justify-center px-20 py-20">
            <h2 className="text-[var(--text)">{desc}</h2>
            {features && (
                <div className="flex flex-col gap-4 pt-16">
                    {features.map(({ label, desc }) => (
                        <div key={label}>
                            <p className="text-[var(--muted)] w-36 flex-shrink-0">{label}</p>
                            <p className="text-[var(--text)]">{desc}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}