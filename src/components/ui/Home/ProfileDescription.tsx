import { useLang } from "../../../context/LangContext.tsx";
import profile from "../../../assets/home-profile.png";
import { useDiscoverable } from "../../../hooks/useDiscoverable.ts";

export default function ProfileDescription() {
    const { t } = useLang();
    const { handlers: coffeeHandlers } = useDiscoverable("coffee");
    const { handlers: photoHandlers } = useDiscoverable("photo");
    const { handlers: pokemonHandlers } = useDiscoverable("pokemon");

    return (
        <>
            <img {...photoHandlers} src={profile} alt="profile" className="mb-8 rounded-xl" />
            <p>
                <span {...coffeeHandlers}> {t("home.description.part1")}</span>
                <span {...pokemonHandlers} className="text-[var(--muted)]">{t("home.description.part2")}</span>
                {t("home.description.part3")}
            </p>
        </>
    );
}