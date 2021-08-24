chrome.runtime.onInstalled.addListener(() => {
  const initMemos = [
    { id: 1, text: "환영합니다!" },
    { id: 2, text: "고정해서 어디서든 메모를 관리하세요" },
  ]

  chrome.storage.local.set({ memos: initMemos, nextId: 3 });
  console.log('Memo inited!');
})
