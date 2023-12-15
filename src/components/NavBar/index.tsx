import React, { useState } from 'react';
import { Vexile } from '@/components';
import { LogoContainer, SubTitle, Title, Wrapper } from './style';

import LogoImg from '@/assets/logo.png';

export const NavBar: React.FC = () => {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <Wrapper gap={5}>
      <LogoContainer fillx y='center' x='space' className={loaded ? 'loaded' : ''}>
        <img src={LogoImg} style={{
          height: '10rem',
        }} />
        <Vexile filly y='center' x='center'>
          <Title>GSQLM</Title>
          <SubTitle>Graphic SQL Manager</SubTitle>
        </Vexile>
      </LogoContainer>
    </Wrapper>
  );
};
