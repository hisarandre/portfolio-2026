import {type CursorMode, useCursor} from "../context/CursorContext.tsx";
import {useDiscovered} from "../context/DiscoveredContext.tsx";
import {stickers} from "../data/stickers.ts";

interface Options {
    hoverMode?: CursorMode;
}

export function useDiscoverable(trigger: string, { hoverMode = "default" }: Options = {}) {
    const { setMode } = useCursor();
    const { discover, isDiscovered } = useDiscovered();

    const linked = stickers.find((s) => s.trigger === trigger);
    const discovered = linked ? isDiscovered(linked.id) : true;

    return {
        discovered,
        handlers: {
            onMouseEnter: () => setMode(discovered ? hoverMode : "magnifier"),
            onMouseLeave: () => setMode("default"),
            onClick: () => {
                if (!discovered && linked) {
                    discover(linked.id);
                    setMode("default");
                }
            },
        },
    };
}