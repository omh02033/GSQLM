import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { globalCss, styled } from '@/stitches.config';

import './node-api';

import { Connect } from './pages';
import { Hexile, NavBar } from './components';

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

const Wrapper = styled(Hexile, {
  position: 'relative',
});
const MainFrame = styled(Hexile, {
  width: 'calc(100% - 60px)',
  height: '100%',
  borderRadius: '15px',
  position: 'absolute',
  right: 0,
  transform: 'translateY(-50%)',
  top: '50%',
  background: '#343434',
  color: '#fff',
  paddingLeft: '170px',
});
const DragBar = styled(Hexile, {
  position: 'absolute',
  top: 0,
  left: 0,
  '-webkit-app-region': 'drag',
  height: '30px'
});

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
    <Wrapper fillx filly>
      <DragBar fillx />
      <MainFrame>
        <Routes>
          <Route path="/" element={<Connect />} />
        </Routes>
      </MainFrame>
      <NavBar />
    </Wrapper>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Router />
    </HashRouter>
  </React.StrictMode>
);
