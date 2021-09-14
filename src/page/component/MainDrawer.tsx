import React, { useContext } from 'react';

import { 
  SwipeableDrawer, Divider , List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import DvrIcon from '@material-ui/icons/Dvr';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import _ from 'lodash';

import PageManageContext from './../../context/PageManageContext';
import { useLanguage } from '../../context/LanguageContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      minWidth: 260,
    },
  }),
);

export default function MainDrawer(props: { drawerOpened: boolean, setDrawerOpened: Function }): React.ReactElement {
  const classes = useStyles();
  const { setPage } = useContext(PageManageContext);
  const { drawerOpened, setDrawerOpened } = props;
  const { getWord } = useLanguage();

  

  const pages = [
    [
      {
        key: 'memo',
        icon: <DvrIcon />,
      },
    ],
    [
      {
        key: 'announcement',
        icon: <AnnouncementIcon />,
      },
    ],
  ];

  const handleChangePage = (key: string) => {
    if (setPage) {
      setPage(key);
      setDrawerOpened(false);
    }
  }

  const menuList = () => {
    let list = [];

    for (const i in pages) {
      list.push(
        <List key={`drawer-area-${i}`}>
          {pages[i].map(pageInfo => (
            <ListItem button key={`drawer-list-${pageInfo.key}`} onClick={() => handleChangePage(pageInfo.key)}>
              <ListItemIcon>{pageInfo.icon}</ListItemIcon>
              <ListItemText primary={getWord(`main-drawer-${pageInfo.key}`)} />
            </ListItem>
          ))}
        </List>
      )

      list.push(<Divider />);
    }

    list = _.dropRight(list);

    return list;
  }

  return (
    <SwipeableDrawer
      anchor="left"
      open={drawerOpened}
      onClose={() => setDrawerOpened(false)}
      onOpen={() => setDrawerOpened(true)}
    >
      <div
        className={classes.container}
        role="presentation"
      >
        {menuList()}
      </div>
    </SwipeableDrawer>
  );
}
