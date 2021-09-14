import React, { useEffect, useState, useContext } from 'react';

import words, { languageList, PossibleLanguages } from '../data/words';

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
    // get word from current language
    let word = words[lang][key];
    console.log(word);

    // if not exist, find in en-us
    if (word === undefined) {
      word = words['en'][key];
    }

    // if not, return empty string with warning message
    if (word === undefined) {
      console.warn('Word not exist: ' + key);
    }

    return word;
  }

  return (
    <Provider value={{ lang, setLang, getWord }}>
      {props.children}
    </Provider>
  );
}

export default LanguageContext;
export interface LanguageContextProps {
  lang: PossibleLanguages;
  setLang: React.Dispatch<React.SetStateAction<PossibleLanguages>>;
  getWord: (key: string) => string;
};
export { LanguageProvider, LanguageConsumer };
export function useLanguage() {
  const state = useContext(LanguageContext);

  if (!!!state) throw new Error('LanguageContext is Null'); // 유효하지 않을땐 에러를 발생

  return state;
}
