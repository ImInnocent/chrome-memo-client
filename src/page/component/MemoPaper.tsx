import React, { useState, useEffect } from 'react';

import { 
  Paper, List, ListItem, ListItemSecondaryAction, ListItemText, IconButton, TextField, Button,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import generate from '../../common/lib/generate';
import Memo from '../../common/interface/Memo';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "1em", 
      padding: "1em",
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

function MemoPaper(): React.ReactElement {
  const [memoList, setMemoList] = useState<Memo[]>([]);
  const [newMemoText, setNewMemoText] = useState(""); // new memo input text
  const classes = useStyles();
  
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

    // load and add new text
    chrome.storage.local.get(["memos", "nextId"], ({ memos, nextId }) => {
      memos.push({ id: nextId, text: newMemoText });
  
      chrome.storage.local.set({ memos, nextId: nextId + 1 });

      setMemoList(memos);
    });

    // set input text to empty
    setNewMemoText("");
  }

  return (
    <Paper className={classes.root}>
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
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        , memoList, 'memo-paper-list')}
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
    </Paper>
  );
}

export default MemoPaper;