import React, { useEffect, useState, useContext } from 'react';

import words, { languageList, PossibleLanguages } from '../data/words';
import announcements, { Announcement } from '../data/announcements';

const LanguageContext = React.createContext<LanguageContextProps | null>(null);
const { Provider, Consumer: LanguageConsumer } = LanguageContext;

const LanguageProvider: React.FunctionComponent = props => {
  const [lang, setLang] = useState<PossibleLanguages>('en');

  useEffect(() => {
    chrome.storage.sync.get("language", ({ language }) => {
      if (languageList.indexOf(language) < 0) {
        language = 'en';

        chrome.storage.sync.set({ language });
      }

      setLang(language);
    });
  }, [])

  const getWord = (key: string) => {
    // get word with current language
    let word = words[lang][key];

    // if not exist, find in en
    if (word === undefined) {
      word = words['en'][key];
    }

    // if not, return empty string with warning message
    if (word === undefined) {
      word = key;
      console.warn('Word not exist: ' + key);
    }

    return word;
  }

  const getAnnouncement = () => {
    // get announcement with current language
    let announcement = announcements[lang];

    // if not exist, find in en
    if (announcement === undefined) {
      announcement = announcement['en'];
    }

    // if not, return empty string with warning message
    if (announcement === undefined) {
      console.warn('Announcement not exist: ' + lang);
    }

    return announcement;
  }

  return (
    <Provider value={{ lang, setLang, getWord, getAnnouncement }}>
      {props.children}
    </Provider>
  );
}

export default LanguageContext;
export interface LanguageContextProps {
  lang: PossibleLanguages;
  setLang: React.Dispatch<React.SetStateAction<PossibleLanguages>>;
  getAnnouncement: () => Announcement;
  getWord: (key: string) => string;
};
export { LanguageProvider, LanguageConsumer };
export function useLanguage() {
  const state = useContext(LanguageContext);

  if (!!!state) throw new Error('LanguageContext is Null'); // 유효하지 않을땐 에러를 발생

  return state;
}
export function isPossibleLanguage(lang: string): lang is PossibleLanguages {
  return languageList.indexOf(lang) >= 0;
}
