import { ipcMain, Notification } from 'electron';

ipcMain.on('notification', (event, arg) => {
  new Notification({
    ...arg,
  }).show();
});
