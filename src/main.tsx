import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { globalCss } from '@/stitches.config';

import './node-api';

import { Main } from './pages';

globalCss({
  '@import': [
    'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css',
  ],
  ':root': {
    fontSize: '6px',
    '--toastify-font-family': 'Pretendard',
  },
  body: {
    fontSize: '3rem',
    fontFamily: 'Pretendard',
    margin: '0px',
    overflow: 'hidden',
  },
  button: {
    fontFamily: 'Pretendard',
  },
  '*': {
    wordBreak: 'keep-all',
    userSelect: 'none',
  },
  '#root': {
    width: '100vw',
    height: '100vh',
  },
})();

const Router = () => {
  const goto = useNavigate();

  useEffect(() => {
    try {
      const search = location.search.split('?')[1];
      if (!search) return;

      goto(`/${search}`);
    } catch {}
  }, [goto]);
  useEffect(() => postMessage({ payload: 'removeLoading' }, '*'), []);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Router />
    </HashRouter>
  </React.StrictMode>
);
