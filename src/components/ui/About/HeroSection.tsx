import { motion } from "framer-motion";
import { useLang } from "../../../context/LangContext";
import { useDiscoverable } from "../../../hooks/useDiscoverable";
import about from "../../../assets/about.png";

const ease = [0.76, 0, 0.24, 1] as const;
const contentEase = [0.22, 1, 0.36, 1] as const;

interface Props {
    entered: boolean;
}

export default function HeroSection({ entered }: Props) {
    const { t } = useLang();
    const { handlers: smileHandlers }     = useDiscoverable("smile");
    const { handlers: travelHandlers }    = useDiscoverable("travel");
    const { handlers: multitaskHandlers } = useDiscoverable("multitask");

    return (
        <div className="h-screen flex flex-col overflow-hidden -mt-32">
            <motion.div
                animate={{ height: entered ? "55vh" : "100vh" }}
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
                        <h1 {...smileHandlers}>Hi there :)</h1>
                    </div>
                    <div className="max-w-xs sm:max-w-sm md:max-w-md text-[var(--muted)] md:pt-4">
                        <p {...multitaskHandlers}>
                            {t("about.description")}
                        </p>
                        <p className="text-xs font-mono !text-[var(--lime)] pt-4">
                            (scroll)
                        </p>
                    </div>

                </div>
            </motion.div>
        </div>
    );
}