import { useLang } from "../../../context/LangContext.tsx";
import profile from "../../../assets/home-profile.png";
import {useDiscoverable} from "../../../hooks/useDiscoverable.ts";

export default function ProfileDescription() {
    const { t } = useLang();
    const { handlers } = useDiscoverable("coffee");

    return (
        <>
            <img src={profile} alt="profile" className="mb-8 rounded-xl" />
            <p {...handlers}>
                {t("home.description.part1")}
                <span className="text-[var(--muted)]">{t("home.description.part2")}</span>
                {t("home.description.part3")}
            </p>
        </>
    );
}