import coffeeImg from "../assets/stickers/coffee.png";
import polyImg from "../assets/stickers/polyglote.png";
import multitaskImg from "../assets/stickers/multitask.png";
import photographyImg from "../assets/stickers/photography.png";
import pokemonImg from "../assets/stickers/pokemon.png";
import smileImg from "../assets/stickers/smile.png";
import travelImg from "../assets/stickers/travel.png";

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
        defaultPos: { x: 66, y: 35 },
        defaultRot: -8,
        size: 120,
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
    {
        id: 3,
        image: multitaskImg,
        defaultPos: { x: 50, y: 70 },
        defaultRot: 6,
        size: 220,
        trigger: "multitask",
        foundKey: "sticker.found",
        suffixKey: "sticker.suffix",
        nameKey: "sticker.multitask.name",
        descKey: "sticker.multitask.desc",
    },
    {
        id: 4,
        image: photographyImg,
        defaultPos: { x: 30, y: 32 },
        defaultRot: 6,
        size: 130,
        trigger: "photo",
        foundKey: "sticker.found",
        suffixKey: "sticker.suffix",
        nameKey: "sticker.photo.name",
        descKey: "sticker.photo.desc",
    },
    {
        id: 5,
        image: pokemonImg,
        defaultPos: { x: 80, y: 55 },
        defaultRot: -6,
        size: 160,
        trigger: "pokemon",
        foundKey: "sticker.found",
        suffixKey: "sticker.suffix",
        nameKey: "sticker.pokemon.name",
        descKey: "sticker.pokemon.desc",
    },
    {
        id: 6,
        image: smileImg,
        defaultPos: { x: 35, y: 60 },
        defaultRot: -12,
        size: 100,
        trigger: "smile",
        foundKey: "sticker.found",
        suffixKey: "sticker.suffix",
        nameKey: "sticker.smile.name",
        descKey: "sticker.smile.desc",
    },
    {
        id: 7,
        image: travelImg,
        defaultPos: { x: 30, y: 50 },
        defaultRot: 6,
        size: 200,
        trigger: "travel",
        foundKey: "sticker.found",
        suffixKey: "sticker.suffix",
        nameKey: "sticker.travel.name",
        descKey: "sticker.travel.desc",
    },
];