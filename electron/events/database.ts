import { BrowserWindow, dialog, ipcMain } from 'electron';
import mysql from 'mysql2/promise';

interface ConnectInfo {
  user: string;
  host: string;
  port: number;
  password: string;
  database: string;
}

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
  global.SQL = await mysql.createConnection({ ...args });

  const [results] = await global.SQL.execute(
    `SELECT table_name FROM information_schema.tables WHERE table_schema = ?`,
    [args.database]
  );
  event.sender.send(
    'GetTables',
    (results as mysql.RowDataPacket[]).map((e) => e.TABLE_NAME)
  );
});

ipcMain.on(
  'selectTable',
  async (event, { table, page }: { table: string; page: number }) => {
    if (!global.SQL) {
      dialog.showErrorBox('Error', 'Not Found SQL variable');
      return;
    }
    if (page < 0) return;
    const totalLength = (
      (
        await global.SQL.execute(`SELECT COUNT(*) AS CNT FROM ${table}`)
      )[0] as any
    )[0]['CNT'];
    const maxPage: number = Math.ceil(totalLength / 50);

    const [results, fields] = await global.SQL.execute(
      `SELECT * FROM ${table} LIMIT 50 OFFSET ${50 * (page - 1)}`
    );
    const schema = fields.map((field) => field.name);
    event.sender.send('GetData', {
      maxPage,
      results,
      schema,
    });
  }
);
