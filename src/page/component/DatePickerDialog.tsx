import React, { useState, useContext } from 'react';

import { 
  Dialog, DialogActions, DialogContent, DialogTitle, Button,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import _ from 'lodash';
import Calendar from 'react-calendar';

import { useLanguage } from '../../context/LanguageContext';
import { useDialog } from './../../context/DialogContext';

import 'react-calendar/dist/Calendar.css';
import dateFormat from './../../common/lib/dateFormat';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 400,
      minHeight: 300,
    },
    container: {
      minWidth: 260,
    },
  }),
);

const DIALOG_KEY = 'DatePicker';

export default function MainDrawer(): React.ReactElement {
  const classes = useStyles();
  const [date, setDate] = useState<Date>(new Date());
  const { isOpened, closeDialog, confirmDialog } = useDialog();
  const { getWord } = useLanguage();

  const handleClose = () => {
    closeDialog(DIALOG_KEY);
  }

  const handleClick = (value: Date) => {
    setDate(value);
  }

  const handleConfirm = () => {
    const cb = confirmDialog(DIALOG_KEY);

    if (!!cb) {
      cb(dateFormat(date));
    }
  }

  return (
    <Dialog className={classes.root} onClose={handleClose} aria-labelledby="date-picker-dialog" open={isOpened(DIALOG_KEY)}>
      <DialogTitle id="date-picker-dialog-title">{getWord('date-picker-dialog-title')}</DialogTitle>
      <DialogContent>
        <Calendar
          value={date}
          onClickDay={handleClick}
          formatDay={(locale, date) => date.getDate().toString()}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleConfirm}>{getWord('confirm')}</Button>
      </DialogActions>
    </Dialog>
  );
}
