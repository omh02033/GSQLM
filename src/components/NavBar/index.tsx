import React, { useEffect, useState } from 'react';
import { TableAtom, Vexile, connectInfoAtom } from '@/components';
import {
  LogoContainer,
  SubTitle,
  TableBox,
  TableWrapper,
  Title,
  Wrapper,
} from './style';
import { ipcRenderer } from 'electron';
import { useRecoilState, useRecoilValue } from 'recoil';

import LogoImg from '@/assets/logo.png';

export const NavBar: React.FC = () => {
  const [tables, setTables] = useState<Array<string>>([]);
  const [currentTable, setCurrentTable] = useRecoilState(TableAtom);
  const connectInfo = useRecoilValue(connectInfoAtom);

  useEffect(() => {
    ipcRenderer.on('GetTables', (_, tables) => {
      if (typeof tables === 'object' && tables.length === 0) {
        ipcRenderer.send('error', {
          title: 'Database Warning',
          message: 'Empty Table',
        });
      } else {
        setTables(tables);
      }
    });
  }, []);

  useEffect(() => {
    if (!connectInfo.host) setTables([]);
  }, [connectInfo]);

  return (
    <Wrapper>
      <LogoContainer
        fillx
        y="center"
        x="space"
        className={tables.length !== 0 ? 'loaded' : ''}
      >
        <img
          src={LogoImg}
          style={{
            height: '10rem',
          }}
        />
        <Vexile filly y="center" x="center">
          <Title>GSQLM</Title>
          <SubTitle>Graphic SQL Manager</SubTitle>
        </Vexile>
      </LogoContainer>
      {tables.length > 0 && (
        <TableWrapper fillx gap={1}>
          {tables.map((tableName, idx) => (
            <TableBox
              className={currentTable === tableName ? 'current' : ''}
              onClick={() => setCurrentTable(tableName)}
              key={`tb${idx}`}
            >
              {tableName}
            </TableBox>
          ))}
        </TableWrapper>
      )}
    </Wrapper>
  );
};
