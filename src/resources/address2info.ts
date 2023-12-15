export const address2info = (address: string): {
  username: string;
  address: string;
  port: number;
  password: string;
  database: string;
} => {
  const p1 = address.split('://')[1];
  const p2 = p1.split('/');
  const p3 = p2[0].split('@');
  const up = p3[0].split(':');
  const ap = p3[1].split(':');

  return {
    username: up[0],
    password: up[1],
    address: ap[0],
    port: +ap[1],
    database: p2[1],
  };
};
