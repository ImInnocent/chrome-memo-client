import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function Index() {
  const [newMemoText, setNewMemoText] = useState(""); // new memo input text
  const [memoLlist, setMemoList] = useState([]); // memo list

  // load from chrome storage
  useEffect(() => {
    chrome.storage.sync.get("memos", ({ memos }) => {
      setMemoList(memos);
    });
  }, []);

  // handle input text changed
  const handleChangeNewMemoText:React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewMemoText(event.target.value);
  }

  // handle button clicked for add new memo
  const handleClickAddNewMemo:React.MouseEventHandler<HTMLButtonElement> = () => {
    // except 0 length 
    if (newMemoText.length <= 0) {
      return;
    }

    // load and add new text
    chrome.storage.sync.get("memos", ({ memos }) => {
      memos.push(newMemoText);
  
      chrome.storage.sync.set({ memos });

      setMemoList(memos);
    });

    // set input text to empty
    setNewMemoText("");
  }

  return (
    <div>
      {/* memo list */}
      <ul id="memoList">
        {memoLlist.map((memo, i) => (
          <li key={`popup-memo-list-${i}`}>{memo}</li>
        ))}
      </ul>
      {/* new memo button */}
      <div id="newMemo">
        <input type="text" id="newMemoText" value={newMemoText} onChange={handleChangeNewMemoText} />
        <button id="newMemoButton" onClick={handleClickAddNewMemo}>추가</button>
      </div>
    </div>
  );
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
