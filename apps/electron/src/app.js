const { app, BrowserWindow } = require('electron');
const path = require('path');
const URL = require('url').URL;

let INDEX_PATH;
if (app.isPackaged) INDEX_PATH = 'index.html';
else INDEX_PATH = path.join(__dirname, `../../../dist/apps/electron/index.html`);

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
  });

  win.loadFile(INDEX_PATH);
  win.webContents.openDevTools();

  const filter = { urls: ['*://localhost/*'] };

  win.webContents.session.webRequest.onBeforeRequest(filter, (details, callback) => {
    const requestURL = new URL(details.url);

    if (requestURL.hash.startsWith('#/login-confirmed')) {
      const loginConfirmedURL = new URL(INDEX_PATH);
      loginConfirmedURL.protocol = 'file:';
      loginConfirmedURL.hash = requestURL.hash;
      win.loadURL(loginConfirmedURL.toString());
    } else {
      callback(details);
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
