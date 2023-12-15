import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const connectInfoAtom = atom<{
  user: string;
  host: string;
  port: number;
  password: string;
  database: string;
}>({
  key: 'databaseConnectInfoAtom',
  default: {
    user: '',
    host: '',
    port: 0,
    password: '',
    database: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export const TableAtom = atom<string>({
  key: 'sqlTableAtom',
  default: '',
});
