import koJson from './announcement-ko.json';
import enJson from './announcement-en.json';

const en: Announcement = enJson;
const ko: Announcement = koJson;

const announcements = { en, ko };

export default announcements;
export type Announcement = { title: string, list: string[] }[];
