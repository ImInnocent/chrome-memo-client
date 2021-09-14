const WELCOME_MESSAGE = {
  'ko': [
    "환영합니다!",
    "고정해서 어디서든 메모를 관리하세요",
  ],
  'en': [
    "Welcome!",
    "Pin this App and manage memo everywhere!",
  ]
}

chrome.runtime.onInstalled.addListener(() => {
  // init language
  let language = navigator.language.slice(0, 2);

  if (!!!WELCOME_MESSAGE[language]) {
    language = 'en';
  }

  chrome.storage.sync.set({ language });
  console.log(`System language inited!: ${language}`)

  // init memo
  const initMemos = WELCOME_MESSAGE[language].map((v, i) => ({
    id: i + 1, text: v,
  }));

  chrome.storage.sync.set({ memos: initMemos, nextId: 3 });
  console.log('Memo inited!');
});
