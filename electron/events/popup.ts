process.env.POPUP = join(__dirname, '../../../popup');

import { ipcMain, BrowserWindow } from 'electron';
import { join } from 'path';
import { mainWin, indexHtml, url, preload } from '../main';

let win: BrowserWindow | null = null;

ipcMain.on('passwordPopup', async (event, arg) => {
  win = new BrowserWindow({
    width: 400,
    height: 200,
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: false,
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(`${url}?POPUP_PASSWORD`);
    // win.webContents.openDevTools();
  } else {
    win.loadFile(indexHtml, { search: 'POPUP_PASSWORD' });
  }
});

ipcMain.on('thisPassword', (event, arg) => {
  win?.close();
  mainWin?.webContents.send('IPC_PASSWORD', arg);
});
