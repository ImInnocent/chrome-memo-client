import React, { useState, useEffect } from 'react';

import { 
  Paper, List, ListItem, ListItemSecondaryAction, ListItemText, IconButton, TextField, Button, Chip, Avatar,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ScheduleIcon from '@material-ui/icons/Schedule';

import _ from 'lodash';

import generate from '../../common/lib/generate';
import Memo from '../../common/interface/Memo';
import addNewMemo from '../../common/lib/addNewMemo';
import deleteMemo from '../../common/lib/deleteMemo';
import editMemo from '../../common/lib/editMemo';
import { useLanguage } from './../../context/LanguageContext';
import { useDialog } from './../../context/DialogContext';

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
      // marginRight: "1em",
    },
    editTextField: {
      width: "100%",
      marginRight: 74,
    },
    dateChip: {
      marginRight: 14,
    },
    datePickerButton: {
      width: 40,
      height: 40,
    },
  }),
);

function MemoPaper(): React.ReactElement {
  const [memoList, setMemoList] = useState<Memo[]>([]);
  const [editMemoId, setEditMemoId] = useState(-1);
  const [newMemoText, setNewMemoText] = useState(""); // new memo input text
  const [newMemoDate, setNewMemoDate] = useState<string | null>(null); // new memo date

  const [editMemoText, setEditMemoText] = useState("");
  const [editMemoDate, setEditMemoDate] = useState<string | null>(null); 

  const classes = useStyles();
  const { getWord } = useLanguage();
  const { openDialog } = useDialog();
  
  useEffect(() => {
    chrome.storage.sync.get("memos", ({ memos }) => {
      setMemoList(memos);
    });
  }, []);

  // handle input text changed
  const handleChangeNewMemoText:React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewMemoText(event.target.value);
  }

  // handle date selectd
  const handleEditMemoDateConfirm = (date: string) => {
    setEditMemoDate(date);
  }

  // handle open date picker dialog
  const handleClickEditMemoDate:React.MouseEventHandler<HTMLButtonElement> = () => {
    openDialog('DatePicker', handleEditMemoDateConfirm);
  }

  // handle date selectd
  const handleNewMemoDateConfirm = (date: string) => {
    setNewMemoDate(date);
  }

  // handle open date picker dialog
  const handleClickNewMemoDate:React.MouseEventHandler<HTMLButtonElement> = () => {
    openDialog('DatePicker', handleNewMemoDateConfirm);
  }

  // handle button clicked for add new memo
  const handleClickAddNewMemo:React.MouseEventHandler<HTMLButtonElement> = () => {
    // except 0 length 
    if (newMemoText.length <= 0) {
      return;
    }

    addNewMemo(newMemoText, newMemoDate, setMemoList);

    // set input text to empty
    setNewMemoText("");
    setNewMemoDate(null);
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
    editMemo(editMemoId, editMemoText, editMemoDate, setMemoList);
    setEditMemoId(-1);
  }

  return (
    <Paper className={classes.root}>
      {/* Memo List */}
      <List className={classes.memoList}>
        {generate((props) =>
          <ListItem key={props.key}>
            {props.id !== editMemoId
              ? <>
                  {!!props.date && 
                    <Chip
                      className={classes.dateChip}
                      icon={<ScheduleIcon />} 
                      label={props.date} 
                    />
                  }
                  <ListItemText
                    primary={props.text}
                    // secondary={secondary ? 'Secondary text' : null}
                  />
                </>
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
                : <>
                    <IconButton className={classes.datePickerButton} aria-label="date" onClick={handleClickEditMemoDate}>
                      <ScheduleIcon />
                    </IconButton>
                    <Button variant="contained" color="primary" onClick={handleConfirmEdit}>
                      {getWord('confirm')}
                    </Button>
                  </>
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
        <IconButton className={classes.datePickerButton} aria-label="date" onClick={handleClickNewMemoDate}>
          <ScheduleIcon />
        </IconButton>
        <Button variant="contained" color="primary" onClick={handleClickAddNewMemo}>
          {getWord('add')}
        </Button>
      </div>
    </Paper>
  );
}

export default MemoPaper;
