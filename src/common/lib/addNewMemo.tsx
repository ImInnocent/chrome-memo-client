export default function addNewMemo(newMemoText: string, cb: Function) {
  // load and add new text
  chrome.storage.local.get(["memos", "nextId"], ({ memos, nextId }) => {
    memos.push({ id: nextId, text: newMemoText });

    chrome.storage.local.set({ memos, nextId: nextId + 1 });

    cb(memos);
  });
}
