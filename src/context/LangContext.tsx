// @refresh reset

import { createContext, useContext, useState } from "react";
import { translations, type Lang, type TranslationKey } from "../i18n";
import PageTransition from "../components/ui/PageTransition";

const LangContext = createContext<{
    lang: Lang;
    setLang: (l: Lang) => void;
    t: (key: TranslationKey) => string;
}>({ lang: "en", setLang: () => {}, t: (key) => key });

export function LangProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Lang>("en");
    const [loading, setLoading] = useState(false);

    const changeLang = (newLang: Lang) => {
        setLoading(true);
        setTimeout(() => {
            setLang(newLang);
            setLoading(false);
        }, 800);
    };

    const t = (key: TranslationKey) => translations[lang][key];

    return (
        <LangContext.Provider value={{ lang, setLang: changeLang, t }}>
            <PageTransition visible={loading} message="Changing language..." />
            {children}
        </LangContext.Provider>
    );
}

export const useLang = () => useContext(LangContext);