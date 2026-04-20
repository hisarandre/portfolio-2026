// contexts/LoadingContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

interface LoadingContextType {
    isLoading: boolean;
    onLoadingComplete: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
    isLoading: true,
    onLoadingComplete: () => {},
});

export function LoadingProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <LoadingContext.Provider
            value={{ isLoading, onLoadingComplete: () => setIsLoading(false) }}
        >
            {children}
        </LoadingContext.Provider>
    );
}

export const useLoading = () => useContext(LoadingContext);