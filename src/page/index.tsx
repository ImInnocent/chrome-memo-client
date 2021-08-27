import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';

import TopAppBar from './component/TopAppBar';
import MainDrawer from './component/MainDrawer';
import PageManageContext, { PageManageProvider } from '../context/PageManageContext';
import PageContainer from './component/PageContainer';


function Index() {
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);

  return (
    <PageManageProvider>
      <MainDrawer drawerOpened={drawerOpened} setDrawerOpened={setDrawerOpened} />
      <TopAppBar setDrawerOpened={setDrawerOpened} />
      <PageContainer />
    </PageManageProvider>
  );
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
