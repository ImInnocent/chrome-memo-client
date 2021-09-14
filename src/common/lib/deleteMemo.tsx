import _ from 'lodash';

export default function deleteMemo(id: number, cb: Function) {
  // load and delete new text
  chrome.storage.sync.get(["memos"], ({ memos }) => {
    _.remove(memos, { id });

    chrome.storage.sync.set({ memos });

    cb(memos);
  });
}
