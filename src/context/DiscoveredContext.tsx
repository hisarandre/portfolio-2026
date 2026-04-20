import { createContext, useContext, useState } from "react";
import { stickers, type StickerData } from "../data/stickers";

const STORAGE_KEY = "discovered_stickers";

function getDiscovered(): number[] {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch { return []; }
}

// eslint-disable-next-line react-refresh/only-export-components
const DiscoveredContext = createContext<{
    discovered: number[];
    discover: (id: number) => void;
    isDiscovered: (id: number) => boolean;
    justDiscovered: StickerData | null;
    clearJustDiscovered: () => void;
}>({
    discovered: [],
    discover: () => {},
    isDiscovered: () => false,
    justDiscovered: null,
    clearJustDiscovered: () => {},
});

export function DiscoveredProvider({ children }: { children: React.ReactNode }) {
    const [discovered, setDiscovered] = useState<number[]>(getDiscovered);
    const [justDiscovered, setJustDiscovered] = useState<StickerData | null>(null);

    const discover = (id: number) => {
        if (discovered.includes(id)) return;
        const next = [...discovered, id];
        setDiscovered(next);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        const sticker = stickers.find((s) => s.id === id) ?? null;
        setJustDiscovered(sticker);
    };

    const isDiscovered = (id: number) => discovered.includes(id);
    const clearJustDiscovered = () => setJustDiscovered(null);

    return (
        <DiscoveredContext.Provider value={{ discovered, discover, isDiscovered, justDiscovered, clearJustDiscovered }}>
            {children}
        </DiscoveredContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDiscovered = () => useContext(DiscoveredContext);