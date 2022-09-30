import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.css';
import { App } from './App';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { BrowserRouter } from 'react-router-dom';

const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.Suspense>,
);
