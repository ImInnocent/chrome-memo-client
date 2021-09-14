import React, { useContext } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { Paper, Grid,  Typography, } from '@material-ui/core';

import MemoPaper from './MemoPaper';
import PageManageContext from '../../context/PageManageContext';
import { useLanguage } from './../../context/LanguageContext';
import AnnouncementPaper from './AnnouncementPaper';
import SettingsPaper from './SettingsPaper';
import CalendarPaper from './CalendarPaper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridContainer: {
    },
    comingSoon: {
      margin: '1em',
      padding: '1em'
    },
  }),
);

export default function PageContainer(): React.ReactElement {
  const classes = useStyles();
  const { page } = useContext(PageManageContext);
  const { getWord } = useLanguage();

  return (
    <>
      {{
        memo: (
          <Grid container className={classes.gridContainer}>
            {/* Left Grid */}
            <Grid xs={12} sm={6}>
              <MemoPaper />
            </Grid>

            {/* Right Grid */}
            <Grid xs={12} sm={6}>
              <CalendarPaper />
            </Grid>
          </Grid>
        ),
        announcement: (
          <AnnouncementPaper />
        ),
        settings: (
          <SettingsPaper />
        ),
      }[page || 'memo']}
    </>
  );
}
