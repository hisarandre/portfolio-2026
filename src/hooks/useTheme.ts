import { useState, useEffect } from "react";

export function useTheme() {
    const [dark, setDark] = useState(() => {
        return localStorage.getItem("theme") !== "light";
    });

    useEffect(() => {
        const theme = dark ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [dark]);

    return { dark, toggle: () => setDark((d) => !d) };
}