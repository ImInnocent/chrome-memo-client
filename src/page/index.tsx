import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function Index() {
  const [memoLlist, setMemoList] = useState([]);

  useEffect(() => {
    chrome.storage.sync.get("memos", ({ memos }) => {
      setMemoList(memos);
    });
  }, []);

  return (
    <div>
      {/* memo list */}
      <ul id="memoList">
        {memoLlist.map((memo, i) => (
          <li key={`page-memo-list-${i}`}>{memo}</li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
