chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ memos: ['a','b','c'] });
  console.log('Memo inited!');
})
