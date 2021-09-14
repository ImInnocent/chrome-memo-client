import _ from 'lodash';

export default function editMemo(id: number, newText: string, cb: Function) {
  // load and change text
  chrome.storage.sync.get(["memos"], ({ memos }) => {
    const index = _.findIndex(memos, { id });
    
    // Replace item at index using native splice
    _.assign(memos[index], { text: newText });

    chrome.storage.sync.set({ memos });

    cb(memos);
  });
}
