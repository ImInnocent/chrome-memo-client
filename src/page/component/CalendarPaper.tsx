import React, { useState, useEffect } from 'react';

import { 
  Paper, 
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import _ from 'lodash';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "1em", 
      padding: "1em",
    },
    calendar: {
      position: "relative",
      width: "100%",
      height: "343px",
    },
  }),
);

function CalendarPaper(): React.ReactElement {
  const [calendarData, setCalendarData] = useState<string[]>([]);
  const classes = useStyles();
  
  useEffect(() => {
    chrome.storage.sync.get("calendar", ({ calendar = [] }) => {
      setCalendarData(calendar);
    });
  }, []);

  return (
    <Paper className={classes.root}>
      {/* Memo List */}
      <ReactCalendar className={classes.calendar} />
    </Paper>
  );
}

export default CalendarPaper;
