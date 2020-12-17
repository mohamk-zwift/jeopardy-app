import React from 'react';
import ReactDOM from 'react-dom';

import { JeopardyApp } from './components/jeopardy-app';

import '../css/main-style.scss';

const App = () => {
  return <JeopardyApp />;
};

const root = document.querySelector('#root');
root ? ReactDOM.render(<App />, root) : false;
