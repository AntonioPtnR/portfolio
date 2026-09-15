import { ui, defaultLang } from './ui';

/** Supported UI languages, derived from the translation dictionary. */
export type Lang = keyof typeof ui;

/** Every valid translation key, derived from the default language dictionary. */
export type TranslationKey = keyof typeof ui[typeof defaultLang];

/** Signature of the `t()` helper, shared by every component that renders copy. */
export type TranslateFn = (key: TranslationKey) => string;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  return isLang(lang) ? lang : defaultLang;
}

/** Runtime guard: narrows an arbitrary string to a known UI language. */
export function isLang(value: string | undefined): value is Lang {
  return value !== undefined && value in ui;
}

/**
 * Narrows an arbitrary string (e.g. `Astro.params.lang`) to a known UI language.
 * Runtime-checked, so callers never need an unchecked type assertion.
 */
export function toLang(value: string | undefined): Lang {
  return isLang(value) ? value : defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}
