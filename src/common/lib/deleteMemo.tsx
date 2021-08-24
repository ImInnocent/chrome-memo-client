import _ from 'lodash';

export default function deleteMemo(id: number, cb: Function) {
  chrome.storage.local.get(["memos"], ({ memos }) => {
    _.remove(memos, { id });

    chrome.storage.local.set({ memos });

    cb(memos);
  });
}