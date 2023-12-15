import React, { useEffect, useState } from 'react';
import { TableAtom, Vexile } from '@/components';
import {
  LogoContainer,
  SubTitle,
  TableBox,
  TableWrapper,
  Title,
  Wrapper,
} from './style';
import { ipcRenderer } from 'electron';
import { useRecoilState } from 'recoil';

import LogoImg from '@/assets/logo.png';

export const NavBar: React.FC = () => {
  const [tables, setTables] = useState<Array<string>>([]);
  const [currentTable, setCurrentTable] = useRecoilState(TableAtom);

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
          {tables.map((tableName) => (
            <TableBox
              className={currentTable === tableName ? 'current' : ''}
              onClick={() => setCurrentTable(tableName)}
            >
              {tableName}
            </TableBox>
          ))}
        </TableWrapper>
      )}
    </Wrapper>
  );
};
