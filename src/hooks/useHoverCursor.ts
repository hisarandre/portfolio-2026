import { useCursor, type CursorMode } from "../context/CursorContext";

export function useHoverCursor(mode: CursorMode = "hover") {
    const { setMode } = useCursor();
    return {
        onMouseEnter: () => setMode(mode),
        onMouseLeave: () => setMode("default"),
    };
}