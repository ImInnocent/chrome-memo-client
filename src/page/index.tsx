import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import TopAppBar from './component/TopAppBar';
import MainDrawer from './component/MainDrawer';
import PageContainer from './component/PageContainer';
import DatePickerDialog from './component/DatePickerDialog';

import { PageManageProvider } from '../context/PageManageContext';
import { LanguageProvider } from '../context/LanguageContext';
import { DialogProvider } from '../context/DialogContext';

function Index() {
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);

  return (
    <DialogProvider>
      <LanguageProvider>
        <PageManageProvider>
          <MainDrawer drawerOpened={drawerOpened} setDrawerOpened={setDrawerOpened} />
          <TopAppBar setDrawerOpened={setDrawerOpened} />
          <PageContainer />
          <DatePickerDialog />
        </PageManageProvider>
      </LanguageProvider>
    </DialogProvider>
  );
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
