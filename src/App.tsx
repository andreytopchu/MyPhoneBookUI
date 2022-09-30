import React, { Fragment } from 'react';
import { GlobalStyles } from './assets/styles/globalStyles';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './pages/Layout';
import { Customers } from './modules/customers/components/Customers';
import { Groups } from './modules/groups/components/Groups';
import { Categories } from './modules/categories/components/Categories';

export const App = () => {
  return (
    <Fragment>
      <GlobalStyles />
      <Routes>
        <Route path={''} element={<Layout />}>
          <Route path={'/customers'} element={<Customers />} />
          <Route path={'/groups'} element={<Groups />} />
          <Route path={'/categories'} element={<Categories />} />
        </Route>
      </Routes>
    </Fragment>
  );
};
