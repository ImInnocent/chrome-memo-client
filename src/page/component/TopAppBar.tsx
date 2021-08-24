import React, { useState, useEffect } from 'react';

import { AppBar, Typography, IconButton, Toolbar } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: "rgb(255, 227, 0)",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      color: "rgb(26, 52, 89)",
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
  }),
);

export default function TopAppBar(props: { setDrawerOpened: Function }): React.ReactElement {
  const classes = useStyles();
  const { setDrawerOpened } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => setDrawerOpened(true)}
          >
            <MenuIcon htmlColor="rgb(26, 52, 89)" />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            크롬 메모장
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}
