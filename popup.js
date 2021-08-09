const memoList = document.getElementById("memoList");

function addChildToMemoList(memo) {
  const newMemo = document.createElement("li");
  const memoText = document.createTextNode(memo);
  newMemo.appendChild(memoText);

  memoList.appendChild(newMemo);
}

// Initialize list by storage
chrome.storage.sync.get("memos", ({ memos }) => {
  for (let memo of memos) {
    addChildToMemoList(memo);
  }
});

// add onClick listener to #newMemoButton
const newMemoButton = document.getElementById("newMemoButton");

newMemoButton.onclick = () => {
  const newMemoText = document.getElementById("newMemoText");

  const text = newMemoText.value;

  if (text.length <= 0) {
    return;
  }

  //diable button
  newMemoButton.disabled = true;

  chrome.storage.sync.get("memos", ({ memos }) => {
    memos.push(text);

    chrome.storage.sync.set({ memos });
  });

  // add to list
  addChildToMemoList(text);

  // clear text and enable button
  newMemoText.value = "";
  newMemoButton.disabled = false;
}