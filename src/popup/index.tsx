import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { 
  List, ListItem, ListItemSecondaryAction, ListItemText, IconButton, TextField, Button,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';

import generate from '../common/lib/generate';
import Memo from '../common/interface/Memo';
import addNewMemo from '../common/lib/addNewMemo';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "max-content", 
      minWidth: 400,
    },
    memoList: {
      marginBottom: "1em"
    },
    inputLine: {
      display: "flex", 
      width: "100%",
    },
    inputTextField: {
      width: "100%", 
      marginRight: "1em",
    },
  }),
);

function Index() {
  const [newMemoText, setNewMemoText] = useState(""); // new memo input text
  const [memoList, setMemoList] = useState<Memo[]>([]);
  const classes = useStyles();

  // load from chrome storage
  useEffect(() => {
    chrome.storage.local.get("memos", ({ memos }) => {
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

    addNewMemo(newMemoText, setMemoList);

    // set input text to empty
    setNewMemoText("");
  }

  return (
    <div className={classes.root}>
      {/* Memo List */}
      <List className={classes.memoList}>
        {generate((props) =>
          <ListItem key={props.key}>
            {/* <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar> */}
            <ListItemText
              primary={props.text}
              // secondary={secondary ? 'Secondary text' : null}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <ClearIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        , memoList, 'popup-memo-list')}
      </List>

      {/* input line */}
      <div className={classes.inputLine}>
        <TextField
          size="small"
          id="memo-paper-text-field"
          className={classes.inputTextField}
          value={newMemoText}
          variant="outlined"
          onChange={handleChangeNewMemoText}
        />
        <Button variant="contained" color="primary" onClick={handleClickAddNewMemo}>
          추가
        </Button>
      </div>
    </div>
  );
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
