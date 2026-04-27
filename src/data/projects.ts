import portfolio from "../assets/projects/portfolio.png";

export interface Project {
    id: string;
    index: string;
    tags: string[];
    techs: string[];
    cover?: string;
    confidential?: boolean;
    year: number;
    href?: string;
    images?: string[];
    client?: string;
}

export const projects: Project[] = [
    {
        id: "portfolio",
        index: "01",
        tags: ["Frontend", "Design"],
        techs: ["React", "Framer Motion"],
        confidential: false,
        cover: portfolio,
        year: 2026,
        images: [portfolio,portfolio],
    },
    {
        id: "predik360",
        index: "02",
        tags: ["Frontend", "Backend", "Acting Lead"],
        techs: ["Angular", "Nest", "MongoDb"],
        confidential: true,
        year: 2025,
        images: [],
        client: "Empirys",
    },
];