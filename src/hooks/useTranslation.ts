'use client';

import { useCallback } from 'react';
import { useLanguageStore } from '@/store';
import en from '@/locales/en.json';
import lt from '@/locales/lt.json';
import type { Language } from '@/locales';

type TranslationKeys = typeof en;

const translations: Record<Language, TranslationKeys> = {
  en,
  lt,
};

// Get nested value from object using dot notation
function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path; // Return the key if not found
    }
  }
  
  return typeof current === 'string' ? current : path;
}

// Interpolate variables in translation strings
function interpolate(str: string, params?: Record<string, string | number>): string {
  if (!params) return str;
  
  return str.replace(/\{(\w+)\}/g, (_, key) => {
    return params[key] !== undefined ? String(params[key]) : `{${key}}`;
  });
}

export function useTranslation() {
  const { language, setLanguage } = useLanguageStore();
  
  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const translation = getNestedValue(
        translations[language] as unknown as Record<string, unknown>,
        key
      );
      return interpolate(translation, params);
    },
    [language]
  );
  
  return {
    t,
    language,
    setLanguage,
  };
}

// Non-hook version for use outside of components
export function getTranslation(language: Language, key: string, params?: Record<string, string | number>): string {
  const translation = getNestedValue(
    translations[language] as unknown as Record<string, unknown>,
    key
  );
  return interpolate(translation, params);
}
