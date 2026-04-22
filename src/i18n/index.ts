import en from "./en";
import fr from "./fr";
import ko from "./ko";

export const translations = { en, fr, ko };
export type Lang = keyof typeof translations;

type DotPaths<T, Prefix extends string = ""> = {
    [K in keyof T]: T[K] extends object
        ? DotPaths<T[K], `${Prefix}${K & string}.`>
        : `${Prefix}${K & string}`;
}[keyof T];

export type TranslationKey = DotPaths<typeof en>;