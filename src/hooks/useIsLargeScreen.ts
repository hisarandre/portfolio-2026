import { useEffect, useState } from "react";

export function useIsLargeScreen() {
    const [isLarge, setIsLarge] = useState(false);

    useEffect(() => {
        const check = () => setIsLarge(window.innerWidth >= 1920); // 2xl
        check();

        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return isLarge;
}