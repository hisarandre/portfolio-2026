import en from "./en";
import fr from "./fr";
import ko from "./ko";

export const translations = { en, fr, ko };
export type Lang = keyof typeof translations;
export type TranslationKey = keyof typeof en;