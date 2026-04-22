import { createContext, useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/ui/PageTransition";

const DURATION = 700;

interface PageTransitionContextType {
    navigateTo: (path: string, message?: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
    navigateTo: () => {},
});

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("...");
    const navigate = useNavigate();

    const navigateTo = useCallback((path: string, msg = "...") => {
        setMessage(msg);
        setVisible(true);
        setTimeout(() => {
            navigate(path);
            setTimeout(() => setVisible(false), DURATION);
        }, DURATION);
    }, [navigate]);

    return (
        <PageTransitionContext.Provider value={{ navigateTo }}>
            <PageTransition visible={visible} message={message} />
            {children}
        </PageTransitionContext.Provider>
    );
}

export const usePageTransition = () => useContext(PageTransitionContext);