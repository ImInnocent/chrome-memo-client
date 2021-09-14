import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import TopAppBar from './component/TopAppBar';
import MainDrawer from './component/MainDrawer';
import { PageManageProvider } from '../context/PageManageContext';
import PageContainer from './component/PageContainer';
import { LanguageProvider } from '../context/LanguageContext';

function Index() {
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);

  return (
    <LanguageProvider>
      <PageManageProvider>
        <MainDrawer drawerOpened={drawerOpened} setDrawerOpened={setDrawerOpened} />
        <TopAppBar setDrawerOpened={setDrawerOpened} />
        <PageContainer />
      </PageManageProvider>
    </LanguageProvider>
  );
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
