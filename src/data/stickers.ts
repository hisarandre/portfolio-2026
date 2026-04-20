import coffeeImg from "../assets/stickers/coffee.png";
import pokemonImg from "../assets/stickers/pokemon.png";
import polyImg from "../assets/stickers/polyglote.png";
import type {TranslationKey} from "../i18n";

export interface StickerData {
    id: number;
    image: string;
    defaultPos: { x: number; y: number };
    defaultRot: number;
    size: number;
    trigger: string;
    foundKey: TranslationKey;
    nameKey: TranslationKey;
    suffixKey: TranslationKey;
    descKey: TranslationKey;
}

export const stickers: StickerData[] = [
    {
        id: 1,
        image: coffeeImg,
        defaultPos: { x: 62, y: 35 },
        defaultRot: 12,
        size: 180,
        trigger: "coffee",
        foundKey: "sticker_found",
        suffixKey: "sticker_suffix",
        nameKey: "sticker_coffee_name",
        descKey: "sticker_coffee_desc",
    },
    {
        id: 2,
        image: pokemonImg,
        defaultPos: { x: 70, y: 62 },
        defaultRot: -8,
        size: 180,
        trigger: "pokemon",
        foundKey: "sticker_found",
        suffixKey: "sticker_suffix",
        nameKey: "sticker_coffee_name",
        descKey: "sticker_coffee_desc",
    },
    {
        id: 3,
        image: polyImg,
        defaultPos: { x: 74, y: 38 },
        defaultRot: 6,
        size: 180,
        trigger: "lang",
        foundKey: "sticker_found",
        suffixKey: "sticker_suffix",
        nameKey: "sticker_coffee_name",
        descKey: "sticker_coffee_desc",
    },
];