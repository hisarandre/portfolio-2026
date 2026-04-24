import { useTheme } from "./hooks/useTheme";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import {LangProvider} from "./context/LangContext.tsx";
import { MenuProvider } from "./context/MenuContext.tsx";
import CustomCursor from "./components/ui/CustomCursor.tsx";
import {CursorProvider} from "./context/CursorContext.tsx";
import {DiscoveredProvider, useDiscovered} from "./context/DiscoveredContext";
import StickerModal from "./components/ui/Home/StickerModal.tsx";
import LoadingText from "./components/ui/LoadingText.tsx";
import { AnimatePresence } from "framer-motion";
import {LoadingProvider, useLoading} from "./context/LoadingContext.tsx";
import Projects from "./pages/Projects.tsx";
import About from "./pages/About.tsx";
import { useLenis } from "./hooks/useLenis.ts";
import { PageTransitionProvider } from "./context/PageTransitionContext";

function AppContent() {
    const { dark, toggle } = useTheme();
    useLenis();
    const { justDiscovered, clearJustDiscovered } = useDiscovered();
    const { isLoading } = useLoading();
    const { pathname } = useLocation();

    const FULL_HEIGHT_ROUTES = ["/projects", "/"];
    const fullHeight = FULL_HEIGHT_ROUTES.includes(pathname);

    return (
        <PageTransitionProvider>
            <CustomCursor />
            <StickerModal sticker={justDiscovered} onClose={clearJustDiscovered} />
            <Layout onThemeToggle={toggle} dark={dark} fullHeight={fullHeight}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </Layout>

            <AnimatePresence>
                {isLoading && <LoadingText />}
            </AnimatePresence>
        </PageTransitionProvider>
    );
}

export default function App() {
    return (
        <LangProvider>
            <MenuProvider>
                <CursorProvider>
                    <DiscoveredProvider>
                        <LoadingProvider>
                            <BrowserRouter>
                                <AppContent />
                            </BrowserRouter>
                        </LoadingProvider>
                    </DiscoveredProvider>
                </CursorProvider>
            </MenuProvider>
        </LangProvider>
    );
}