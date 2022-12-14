import React from 'react';
import ReactDOM from 'react-dom/client';
import Board from'./components/board/Board';
import { Provider } from 'react-redux';
import store from './store/store';
import './style/style.scss';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Board />
  </Provider>
);

