export interface LanguageOption {
  value: string;
  englishSpelling: string;
  nativeSpelling: string;
}

export const languages: LanguageOption[] = [
  { value: 'en', englishSpelling: 'English', nativeSpelling: 'English' },
  { value: 'ja', englishSpelling: 'Japanese', nativeSpelling: '日本語' },
];
