import { Vexile } from '@/components';
import React, { useEffect, useState } from 'react';
import { connectInfoAtom } from '@/components';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { ErrorSpan, Input, LoadBtn, Spinner, Submit, Wrapper } from './style';
import { address2info } from '@/resources';
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { ipcRenderer } from 'electron';

const addressRegex =
  /^mysql:\/\/[a-zA-Z0-9]+:[\w!\-@#$%^&*()-+=?]+@[a-zA-Z0-9.-]+:[0-9]+\/[a-zA-Z0-9_]+$/i;

export const Connect: React.FC = () => {
  const [address, setAddress] = useState<string>('');
  const [isSyntex, setIsSyntex] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const setConnectInfo = useSetRecoilState(connectInfoAtom);
  const setDefaultConnectInfo = useResetRecoilState(connectInfoAtom);

  const goto = useNavigate();

  useEffect(() => {
    setIsSyntex(addressRegex.test(address));
  }, [address]);

  useEffect(() => {
    ipcRenderer.on('SQLStatus', (_event, status) => {
      if (status) {
        setIsError(false);
        goto('/main');
      } else {
        setIsError(true);
        setDefaultConnectInfo();
      }
      setIsLoading(false);
    })
  }, []);

  const connectDatabase = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    setConnectInfo(address2info(address));
    ipcRenderer.send('connectTest', address2info(address));
  };

  return (
    <Wrapper onSubmit={connectDatabase}>
      <Vexile fillx x="center" y="center" gap={5}>
        <Input
          type="text"
          value={address}
          onChange={({ target: { value } }) => setAddress(value)}
          placeholder="mysql://username:password@address:port/database"
          id="addressInput"
        />
        {isLoading ? (
          <LoadBtn>
            <span>Connect</span>
            <Spinner>
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="20"
                visible={true}
              />
            </Spinner>
          </LoadBtn>
        ) : (
          <Submit type="submit" value="Connect" disabled={!isSyntex} />
        )}
      </Vexile>
      {isError && <ErrorSpan>Connect Error.</ErrorSpan>}
    </Wrapper>
  );
};
