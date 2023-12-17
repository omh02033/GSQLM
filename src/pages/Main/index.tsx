import { Hexile, TableAtom, connectInfoAtom } from '@/components';
import React, { useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import {
  DataContainer,
  DatabaseSpan,
  Footer,
  LoadWrapper,
  MainWrapper,
  PageBtn,
  TableSpan,
  Wrapper,
} from './style';
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { ipcRenderer } from 'electron';

export const Main: React.FC = () => {
  const goto = useNavigate();
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [DBData, setDBData] = useState<Array<any>>([]);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [schema, setSchema] = useState<Array<string>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const connectInfo = useRecoilValue(connectInfoAtom);
  const resetConnectInfo = useResetRecoilState(connectInfoAtom);
  const currentTable = useRecoilValue(TableAtom);

  useEffect(() => {
    if (!connectInfo.host) goto('/');
    try {
      console.log(!currentTable);
      if (!currentTable) setIsLoad(false);
      ipcRenderer.send('connectSQL', connectInfo);
    } catch {
      resetConnectInfo();
      goto('/');
    }

    ipcRenderer.on(
      'GetData',
      (
        _,
        {
          maxPage,
          results,
          schema,
        }: {
          maxPage: number;
          results: Array<any>;
          schema: Array<string>;
        }
      ) => {
        setMaxPage(maxPage);
        setDBData(results);
        setSchema(schema);
        setIsLoad(false);
      }
    );
  }, []);

  useEffect(() => {
    if (!currentTable) return;
    setIsLoad(true);
    setCurrentPage(1);
    setMaxPage(1);
    ipcRenderer.send('selectTable', {
      table: currentTable,
      page: 1,
    });
  }, [currentTable]);

  useEffect(() => {
    if (!currentTable) return;
    setIsLoad(true);
    ipcRenderer.send('selectTable', {
      table: currentTable,
      page: currentPage,
    });
  }, [currentPage]);

  const onEditBox = (data: string) => {
    ipcRenderer.send('editBox', data);
  };

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
      <Hexile fillx x="left" y="bottom" gap={2} padding={3}>
        <DatabaseSpan>{connectInfo.database}</DatabaseSpan>
        <TableSpan>{currentTable}</TableSpan>
      </Hexile>
      <DataContainer fillx>
        <MainWrapper border={1}>
          <thead>
            <tr className="head">
              {schema.map((s, idx) => (
                <td key={`tth${idx}`}>{s}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {DBData.map((db, idx) => (
              <tr key={`tdr${idx}`}>
                {Object.keys(db).map((value, idx2) => (
                  <td key={`tdd${idx}${idx2}`} onClick={() => onEditBox(value)}>
                    {typeof db[value] !== 'string'
                      ? JSON.stringify(db[value])
                      : db[value]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </MainWrapper>
      </DataContainer>
      <Footer fillx gap={3} x="center">
        {currentTable && new Array(maxPage).fill('maxPage').map((_, idx) => (
          <PageBtn
            x="center"
            y="center"
            className={idx + 1 === currentPage ? 'current' : 'no'}
            key={`tdp${idx}`}
            onClick={() => setCurrentPage(idx+1)}
          >
            {idx + 1}
          </PageBtn>
        ))}
      </Footer>
    </Wrapper>
  );
};
