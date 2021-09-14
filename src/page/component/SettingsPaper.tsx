import React, { useEffect, useState } from 'react';

import { MenuItem, Select, Paper, Typography, } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import _ from 'lodash';

import { useLanguage, isPossibleLanguage } from '../../context/LanguageContext';
import { languageList } from '../../data/words';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "1em", 
      padding: "3em",
    },
    langaugeBox: {
      display: "contents",
    },
    languageSelect: {
      position: "absolute",
      right: 0,
      marginRight: "2em",
    },
  })
);

export default function SettingsPaper(): React.ReactElement {
  const classes = useStyles();
  const { lang, setLang, getWord } = useLanguage();

  const handleChangeLanguage = (event: React.ChangeEvent<{ value: unknown }>) => {
    let nextLang = event.target.value as string;

    if (!isPossibleLanguage(nextLang)) {
      setLang('en');
    } else {
      setLang(nextLang);
    }
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.langaugeBox}>
        <Typography display="inline" variant="h5">{getWord('settings-paper-select-language')}</Typography>
        <Select
          labelId="settings-language-select"
          id="settings-language-select"
          value={lang}
          onChange={handleChangeLanguage}
          className={classes.languageSelect}
        >
          {languageList.map(l => (
            <MenuItem value={l}>{getWord(`settings-language-${l}`)}</MenuItem>
          ))}
        </Select>
      </div>
    </Paper>
  );
}
