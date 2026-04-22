import coffeeImg from "../assets/stickers/coffee.png";
import polyImg from "../assets/stickers/polyglote.png";

export interface StickerData {
    id: number;
    image: string;
    defaultPos: { x: number; y: number };
    defaultRot: number;
    size: number;
    trigger: string;
    foundKey: string;
    nameKey: string;
    suffixKey: string;
    descKey: string;
}

export const stickers: StickerData[] = [
    {
        id: 1,
        image: coffeeImg,
        defaultPos: { x: 62, y: 35 },
        defaultRot: 12,
        size: 140,
        trigger: "coffee",
        foundKey: "sticker.found",
        suffixKey: "sticker.suffix",
        nameKey: "sticker.coffee.name",
        descKey: "sticker.coffee.desc",
    },
    {
        id: 2,
        image: polyImg,
        defaultPos: { x: 74, y: 38 },
        defaultRot: 6,
        size: 220,
        trigger: "lang",
        foundKey: "sticker.found",
        suffixKey: "sticker.suffix",
        nameKey: "sticker.lang.name",
        descKey: "sticker.lang.desc",
    },
];