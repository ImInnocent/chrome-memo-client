import React, { useState, useEffect } from 'react';

import { 
  SwipeableDrawer, Button, List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';

export default function MainDrawer(props: { drawerOpened: boolean, setDrawerOpened: Function }): React.ReactElement {
  const { drawerOpened, setDrawerOpened } = props;

  return (
    <React.Fragment>
      <SwipeableDrawer
        anchor="left"
        open={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        onOpen={() => setDrawerOpened(true)}
      >
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon><MailIcon /></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
    </React.Fragment>
  )
}
