process.env.DIST_ELECTRON = join(__dirname, '../');
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist');
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : join(process.env.DIST_ELECTRON, '../public');

import { app, BrowserWindow, shell, ipcMain, Menu } from 'electron';
import { release } from 'os';
import { join } from 'path';
import mysql from 'mysql2/promise';
import './events';

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName());

export let mainWin: BrowserWindow | null = null;

let SQL: mysql.Connection | null = null;
global.SQL = SQL;
// declare let SQL: mysql.Connection;

export const preload = join(__dirname, './preload.js');
export const url = process.env.VITE_DEV_SERVER_URL;
export const indexHtml = join(process.env.DIST, 'index.html');

async function createWindow() {
  mainWin = new BrowserWindow({
    title: 'GSQLM',
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 1200,
    height: 700,
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 70, y: 10 },
    frame: false,
    transparent: true,
    resizable: false,
    visualEffectState: 'inactive',
  });

  const template: (Electron.MenuItemConstructorOptions | Electron.MenuItem)[] =
    [
      {
        label: 'GSQLM',
        submenu: [
          {
            role: 'quit',
          },
          {
            role: 'close',
          },
          {
            role: 'minimize',
          },
          {
            role: 'hide',
          },
          {
            type: 'separator',
          },
          {
            role: 'reload',
            visible: !!process.env.VITE_DEV_SERVER_URL,
          },
          {
            role: 'forceReload',
            visible: !!process.env.VITE_DEV_SERVER_URL,
          },
          {
            type: 'separator',
            visible: !!process.env.VITE_DEV_SERVER_URL,
          },
          {
            role: 'appMenu',
          },
          {
            role: 'about',
          },
        ],
      },
      {
        label: 'Connect',
        submenu: [
          {
            label: 'New Connection',
            accelerator: 'CmdOrCtrl+N',
            click: createWindow,
          },
          {
            label: 'Disconnect',
            click: () => {
              mainWin?.webContents.send('disconnect', '');
            },
          },
        ],
      },
      {
        label: 'Edit',
        submenu: [
          {
            role: 'copy',
          },
          {
            role: 'paste',
          },
          {
            role: 'cut',
          },
          {
            role: 'delete',
          },
          {
            role: 'redo',
          },
          {
            role: 'selectAll',
          },
          {
            role: 'selectNextTab',
          },
          {
            role: 'selectPreviousTab',
          },
        ],
      },
    ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  if (process.env.VITE_DEV_SERVER_URL) {
    // electron-vite-vue#298
    mainWin.loadURL(url);
    // Open devTool if the app is not packaged
    mainWin.webContents.openDevTools();
  } else {
    mainWin.loadFile(indexHtml);
  }

  mainWin.webContents.on('did-finish-load', () => {
    mainWin?.webContents.send(
      'main-process-message',
      new Date().toLocaleString()
    );
  });

  // Make all links open with the browser, not with the application
  mainWin.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(createWindow);

app.on('will-quit', () => {});
app.on('window-all-closed', () => {
  mainWin = null;
  if (process.platform !== 'darwin') app.quit();
});

app.on('second-instance', () => {
  if (mainWin) {
    // Focus on the main window if the user tried to open another
    if (mainWin.isMinimized()) mainWin.restore();
    mainWin.focus();
  }
});

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

// new window example arg: new windows url
ipcMain.handle('open-win', (event, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`);
  } else {
    childWindow.loadFile(indexHtml, { hash: arg });
  }
});
