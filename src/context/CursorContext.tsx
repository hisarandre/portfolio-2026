import { createContext, useContext, useState } from "react";

export type CursorMode = "default" | "hover" | "magnifier" | "drag" ;

// eslint-disable-next-line react-refresh/only-export-components
const CursorContext = createContext<{
    mode: CursorMode;
    setMode: (m: CursorMode) => void;
}>({ mode: "default", setMode: () => {} });

export function CursorProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<CursorMode>("default");
    return (
        <CursorContext.Provider value={{ mode, setMode }}>
            {children}
        </CursorContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCursor = () => useContext(CursorContext);