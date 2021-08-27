import React, { useState, useContext } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import {   Paper, Grid,  Typography, } from '@material-ui/core';

import MemoPaper from './MemoPaper';
import PageManageContext from '../../context/PageManageContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridContainer: {
      height: "100%",
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
              <Paper className={classes.comingSoon}>
                <Typography variant="h4" align="center">
                  다음 기능을 기대해 주세요!
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        ),
        announcement: (
          <div>
            announcement
          </div>
        )
      }[page || 'memo']}
    </>
  );
}