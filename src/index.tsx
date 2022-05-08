import React from 'react';
import ReactDOM from 'react-dom/client';
import RootComponent from './RootComponent';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
      <RootComponent />
  </Provider>
);
