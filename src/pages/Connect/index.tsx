import { Vexile } from '@/components';
import React, { useEffect, useState } from 'react';
import { connectInfoAtom } from '@/components';
import { useSetRecoilState } from 'recoil';
import { Input, Submit, Wrapper } from './style';
import { address2info } from '@/resources';

const addressRegex = /^mysql:\/\/[a-zA-Z0-9]+:[\w!\-@#$%^&*()-+=?]+@[a-zA-Z0-9.-]+:[0-9]+\/[a-zA-Z0-9_]+$/i;

export const Connect: React.FC = () => {
  const [address, setAddress] = useState<string>('');
  const [isSyntex, setIsSyntex] = useState<boolean>(false);

  const setConnectInfo = useSetRecoilState(connectInfoAtom);

  useEffect(() => {
    setIsSyntex(addressRegex.test(address));
  }, [address]);

  const connectDatabase = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setConnectInfo(address2info(address));
  }

  return (
    <Wrapper onSubmit={connectDatabase}>
      <Vexile fillx x='center' y='center' gap={5}>
        <Input
          type='text'
          value={address}
          onChange={({ target: { value } }) => setAddress(value)}
          placeholder='mysql://username:password@address:port/database'
          id='addressInput'
        />
        <Submit type='submit' value='Connect' disabled={!isSyntex} />
      </Vexile>
    </Wrapper>
  );
};
