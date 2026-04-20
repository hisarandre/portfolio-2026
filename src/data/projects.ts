import type {TranslationKey} from "../i18n";
import portfolio from "../assets/projects/portfolio.png";

export interface Project {
    id: string;
    index: string;
    titleKey: TranslationKey;
    descriptionKey: TranslationKey;
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
        titleKey: "project_portfolio_title",
        descriptionKey: "project_portfolio_desc",
        tags: ["Frontend", "Design"],
        techs: ["React", "Framer Motion"],
        confidential: false,
        image: portfolio,
        year: 2026,
    },
    {
        id: "predik360",
        index: "02",
        titleKey: "project_predik360_title",
        descriptionKey: "project_predik360_desc",
        tags: ["Frontend", "Backend", "Acting Lead"],
        techs: ["Angular", "Nest", "MongoDb"],
        confidential: true,
        year: 2025,
    },
    {
        id: "Projet 3",
        index: "03",
        titleKey: "project_nomapp_title",
        descriptionKey: "project_nomapp_desc",
        tags: ["Frontend", "Design"],
        techs: ["React"],
        confidential: false,
        image: portfolio,
        year: 2026,
    },
];