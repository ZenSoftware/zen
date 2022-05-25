const { app, BrowserWindow } = require('electron');
const URL = require('url').URL;
const path = require('path');

let appWindow;

function initWindow() {
  appWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const url = new URL(path.join(__dirname, `/dist/apps/electron/index.html`));
  url.protocol = 'file:';

  appWindow.loadURL(url.toString()); // Electron Build Path
  appWindow.webContents.openDevTools(); // Initialize the DevTools.
  appWindow.on('closed', function () {
    appWindow = null;
  });
}

app.on('ready', initWindow);

app.on('window-all-closed', function () {
  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (win === null) {
    initWindow();
  }
});
