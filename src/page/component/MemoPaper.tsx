import React, { useState, useEffect } from 'react';

import { 
  Paper, List, ListItem, ListItemSecondaryAction, ListItemText, IconButton, TextField, Button,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import _ from 'lodash';

import generate from '../../common/lib/generate';
import Memo from '../../common/interface/Memo';
import addNewMemo from '../../common/lib/addNewMemo';
import deleteMemo from '../../common/lib/deleteMemo';
import editMemo from '../../common/lib/editMemo';
import { useLanguage } from './../../context/LanguageContext';

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
    editTextField: {
      width: "100%",
      marginRight: 44,
    },
  }),
);

function MemoPaper(): React.ReactElement {
  const [memoList, setMemoList] = useState<Memo[]>([]);
  const [editMemoId, setEditMemoId] = useState(-1);
  const [newMemoText, setNewMemoText] = useState(""); // new memo input text
  const [editMemoText, setEditMemoText] = useState("");
  const classes = useStyles();
  const { getWord } = useLanguage();
  
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

    addNewMemo(newMemoText, setMemoList);

    // set input text to empty
    setNewMemoText("");
  }

  const handleDeleteMemo = (id: number) => {
    deleteMemo(id, setMemoList);
  }

  // handle edit text changed
  const handleChangeEditMemoText:React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setEditMemoText(event.target.value);
  }

  // handle when edit icon clicked
  const handleEditMemo = (id: number) => {
    const selectedMemo = _.find(memoList, { id });

    if (!!!selectedMemo)
      return

    setEditMemoText(selectedMemo.text);
    setEditMemoId(id);
  }

  // handle when edit confirm
  const handleConfirmEdit = () => {
    editMemo(editMemoId, editMemoText, setMemoList);
    setEditMemoId(-1);
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
            {props.id !== editMemoId
              ? <ListItemText
                  primary={props.text}
                  // secondary={secondary ? 'Secondary text' : null}
                />
              : <TextField
                  size="small"
                  id="memo-paper-edit-text-field"
                  className={classes.editTextField}
                  value={editMemoText}
                  variant="outlined"
                  onChange={handleChangeEditMemoText}
                />
            }
            <ListItemSecondaryAction>
              {props.id !== editMemoId
                ? <>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEditMemo(props.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteMemo(props.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                : <Button variant="contained" color="primary" onClick={handleConfirmEdit}>
                    {getWord('confirm')}
                  </Button>
              }
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
          {getWord('add')}
        </Button>
      </div>
    </Paper>
  );
}

export default MemoPaper;
