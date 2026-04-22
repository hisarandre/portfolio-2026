// @refresh reset

import { createContext, useContext, useState, useCallback } from "react";
import { translations, type Lang } from "../i18n";
import PageTransition from "../components/ui/PageTransition";

interface LangContextType {
    lang: Lang;
    setLang: (l: Lang) => void;
    t: (key: string, options?: { returnObjects?: boolean }) => any;
}

const LangContext = createContext<LangContextType>({
    lang: "en",
    setLang: () => {},
    t: (key) => key,
});

const TRANSITION_DURATION = 800;

export function LangProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Lang>("en");
    const [loading, setLoading] = useState(false);

    const changeLang = useCallback((newLang: Lang) => {
        setLoading(true);
        setTimeout(() => {
            setLang(newLang);
            setLoading(false);
        }, TRANSITION_DURATION);
    }, []);

    const t = useCallback(
        (key?: string, options?: { returnObjects?: boolean }) => {
            if (!key) return "";

            const value = key
                .split(".")
                .reduce(
                    (obj, k) => (obj && typeof obj === "object" ? (obj as Record<string, unknown>)[k] : undefined),
                    translations[lang] as unknown
                );

            if (Array.isArray(value)) return value;
            if (typeof value === "object" && options?.returnObjects) return value;

            return value ?? key;
        },
        [lang]
    );

    return (
        <LangContext.Provider value={{ lang, setLang: changeLang, t }}>
            <PageTransition visible={loading} message="Switching language..." />
            {children}
        </LangContext.Provider>
    );
}

export const useLang = () => useContext(LangContext);