import { forwardRef } from "react";
import { motion, MotionValue } from "framer-motion";
import { CompanyItem } from "../Me/CompanyItem.tsx";
import { useLang } from "../../../context/LangContext";
import { useIsMobile } from "../../../hooks/useIsMobile.ts";

interface Props {
    companies: string[];
    progress?: MotionValue<number>;
    opacity:   MotionValue<number>;
    y:         MotionValue<number>;
}

const CompaniesSection = forwardRef<HTMLDivElement, Props>(
    ({ companies, opacity, y }, ref) => {
        const { t } = useLang();
        const isMobile = useIsMobile();

        return (
            <motion.div
                ref={ref}
                className="px-6 sm:px-10 md:px-20 mt-8"
                style={{ opacity, y }}
            >
                <div className="w-full flex flex-col md:flex-row justify-between gap-10">
                    <div className="w-[35vh]">
                        <div className="text-[var(--lime)] pb-6">02/</div>
                        <h2 className="!text-4xl md:!text-5xl font-medium tracking-tight leading-none">
                            {t("about.companies.title")}
                        </h2>
                    </div>
                    <div className={isMobile ? `` : `text-right pt-12`}>
                        {companies.map((company) => (
                            <CompanyItem key={company} company={company} />
                        ))}
                    </div>
                </div>
            </motion.div>
        );
    }
);

CompaniesSection.displayName = "CompaniesSection";
export default CompaniesSection;