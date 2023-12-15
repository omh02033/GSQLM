import { ipcMain, dialog } from 'electron';

ipcMain.on('error', (_, args: {
  title: string;
  message: string;
}) => {
  dialog.showErrorBox(args.title, args.message);
});
