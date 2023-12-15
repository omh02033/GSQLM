import { Hexile, TableAtom, connectInfoAtom } from '@/components';
import React, { useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { DatabaseSpan, LoadWrapper, TableSpan, Wrapper } from './style';
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { ipcRenderer } from 'electron';

export const Main: React.FC = () => {
  const goto = useNavigate();
  const [isLoad, setIsLoad] = useState<boolean>(true);

  const connectInfo = useRecoilValue(connectInfoAtom);
  const resetConnectInfo = useResetRecoilState(connectInfoAtom);
  const currentTable = useRecoilValue(TableAtom);

  useEffect(() => {
    if (!connectInfo.host) goto('/');
    try {
      setIsLoad(false);
      ipcRenderer.send('connectSQL', connectInfo);
    } catch {
      resetConnectInfo();
      goto('/');
    }
  }, []);

  return (
    <Wrapper fillx filly y="space">
      <LoadWrapper
        fillx
        filly
        x="center"
        y="center"
        className={isLoad ? 'load' : ''}
      >
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="40"
          visible={true}
        />
      </LoadWrapper>
      <Hexile fillx x='left' y='bottom' gap={2} padding={3}>
        <DatabaseSpan>{connectInfo.database}</DatabaseSpan>
        <TableSpan>{currentTable}</TableSpan>
      </Hexile>
    </Wrapper>
  );
};
