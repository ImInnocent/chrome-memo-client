import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { 
  Paper, Grid,  Typography,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import MemoPaper from './component/MemoPaper';
import TopAppBar from './component/TopAppBar';
import MainDrawer from './component/MainDrawer';

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

function Index() {
  const classes = useStyles();
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);

  return (
    <div>
      <MainDrawer drawerOpened={drawerOpened} setDrawerOpened={setDrawerOpened} />
      <TopAppBar setDrawerOpened={setDrawerOpened} />
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
    </div>
  );
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
