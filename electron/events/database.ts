import { ipcMain } from 'electron';
import mysql from 'mysql2/promise';

interface ConnectInfo {
  user: string;
  host: string;
  port: number;
  password: string;
  database: string;
}

let SQL: mysql.Connection;

ipcMain.on('connectTest', async (event, args: ConnectInfo) => {
  try {
    const connectTest = await mysql.createConnection({ ...args });
    connectTest.end();
    event.sender.send('SQLStatus', true);
  } catch {
    event.sender.send('SQLStatus', false);
  }
});

ipcMain.on('connectSQL', async (event, args: ConnectInfo) => {
  SQL = await mysql.createConnection({ ...args });

  const [results] = await SQL.execute(
    `SELECT table_name FROM information_schema.tables WHERE table_schema = ?`,
    [args.database]
  );
  event.sender.send(
    'GetTables',
    (results as mysql.RowDataPacket[]).map((e) => e.TABLE_NAME)
  );
});
