import enJson from './en.json';
import koJson from './ko.json';

const en: { [key: string]: string } = enJson;
const ko: { [key: string]: string } = koJson;

const words = { en, ko };
const languageList = Object.keys(words);

export default words;
export type PossibleLanguages = 'en' | 'ko';
export { languageList };
