'use client';

import React from 'react';
import { useLanguageStore } from '@/store';
import { languages, type Language } from '@/locales';
import { Dropdown } from '@/components/ui';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguageStore();
  
  const currentLang = languages.find(l => l.code === language) || languages[0];
  
  const languageItems = languages.map(lang => ({
    label: `${lang.flag} ${lang.nativeName}`,
    value: lang.code,
  }));
  
  return (
    <Dropdown
      trigger={
        <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
          <span className="text-lg">{currentLang.flag}</span>
          <Globe className="h-4 w-4 text-surface-500" />
        </button>
      }
      items={languageItems}
      onSelect={(value) => setLanguage(value as Language)}
    />
  );
}
