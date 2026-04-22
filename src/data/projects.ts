import portfolio from "../assets/projects/portfolio.png";

export interface Project {
    id: string;
    index: string;
    tags: string[];
    techs: string[];
    image?: string;
    confidential?: boolean;
    year: number;
    href?: string;
}

export const projects: Project[] = [
    {
        id: "portfolio",
        index: "01",
        tags: ["Frontend", "Design"],
        techs: ["React", "Framer Motion"],
        confidential: false,
        image: portfolio,
        year: 2026,
    },
    {
        id: "predik360",
        index: "02",
        tags: ["Frontend", "Backend", "Acting Lead"],
        techs: ["Angular", "Nest", "MongoDb"],
        confidential: true,
        year: 2025,
    },
];