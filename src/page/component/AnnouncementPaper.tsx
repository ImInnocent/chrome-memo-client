import React, { useEffect, useState } from 'react';

import { Divider, Paper, Typography, } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import _ from 'lodash';

import { useLanguage } from './../../context/LanguageContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "1em", 
      padding: "1em",
    },
    box: {
      margin: "1em", 
      padding: "1em",
    }
  })
);

export default function MemoPaper(): React.ReactElement {
  const classes = useStyles();
  const [cache, setCache] = useState<JSX.Element[]>([]);
  const { getAnnouncement } = useLanguage();

  useEffect(() => {
    setCache(getAnnouncementElements());
  }, []);

  const getAnnouncementElements = () => {
    let list = [];

    for (let data of getAnnouncement()) {
      list.push(
        <div className={classes.box}>
          <Typography variant="h4">{data.title}</Typography>
          <ul>
            {data.list.map(item => (
              <li><Typography variant="body1">{item}</Typography></li>
            ))}
          </ul>
        </div>
      );
      list.push(<Divider />);
    }

    list = _.dropRight(list);

    return list;
  };

  return (
    <Paper className={classes.root}>
      {cache}
    </Paper>
  );
}
