interface Props {
    src: string;
    alt: string;
}

export default function ProjectImageSlide({ src, alt }: Props) {
    return (
        <div className="flex-shrink-0 w-[50vw] h-full overflow-hidden">
            <img src={src} alt={alt} className="w-full h-full object-cover" />
        </div>
    );
}