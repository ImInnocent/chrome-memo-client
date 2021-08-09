chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ memos: [] });
  console.log('Memo inited!');
})
