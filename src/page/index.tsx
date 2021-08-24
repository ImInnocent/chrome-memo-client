import React from 'react';
import ReactDOM from 'react-dom';

import { 
  Paper, Grid,  Typography,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import MemoPaper from './component/MemoPaper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
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

  return (
    <Grid container className={classes.root}>
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
  );
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
