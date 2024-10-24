'use client';

import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from '../i18n/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Select value={language} onValueChange={setLanguage}>
      <SelectTrigger className="w-24">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en" className="cursor-pointer">
          <div className="flex items-center gap-2">
            <span>🇬🇧</span>
            <span>English</span>
          </div>
        </SelectItem>
        <SelectItem value="fr" className="cursor-pointer">
          <div className="flex items-center gap-2">
            <span>🇫🇷</span>
            <span>Français</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;