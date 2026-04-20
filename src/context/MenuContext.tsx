import { createContext, useContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
const MenuContext = createContext<{
    open: boolean;
    setOpen: (o: boolean) => void;
}>({ open: false, setOpen: () => {} });

export function MenuProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "/") setOpen((o) => !o);
            if (e.key === "Escape") setOpen(false);
        };

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <MenuContext.Provider value={{ open, setOpen }}>
            {children}
        </MenuContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMenu = () => useContext(MenuContext);