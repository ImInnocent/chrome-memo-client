import _ from 'lodash';

export default function editMemo(id: number, newText: string, newDate: string | null, cb: Function) {
  // load and change text
  chrome.storage.sync.get(["memos"], ({ memos }) => {
    const index = _.findIndex(memos, { id });
    
    // Replace item at index using native splice
    _.assign(memos[index], { text: newText, date: newDate });

    chrome.storage.sync.set({ memos });

    cb(memos);
  });
}
