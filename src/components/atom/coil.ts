import { atom } from 'recoil';

export const connectInfoAtom = atom<{
  username: string;
  address: string;
  port: number;
  password: string;
  database: string;
}>({
  key: 'databaseConnectInfoAtom',
  default: {
    username: '',
    address: '',
    port: 0,
    password: '',
    database: '',
  },
});
