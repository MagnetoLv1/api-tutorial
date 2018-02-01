// ./main.js
const { app, BrowserWindow, net } = require('electron');
const path = require('path');
const url = require('url');
require('dotenv').config();


function initialize() {
  let win = null;
  app.on('ready', function () {
    createWindow()
  });

  app.on('activate', () => {
    if (win === null) {
      createWindow()
    }
  })

  app.on('window-all-closed', function () {
    console.log('window-all-closed')
    if (process.platform != 'darwin') {
      app.quit();
    }
  });
}


function createWindow() {

  // Initialize the window to our specified dimensions
  //webPreferences > webSecurity:false  CORS 무시
  win = new BrowserWindow({
    width: 1000, height: 600,
    icon: path.join(__dirname, 'assets/heart.ico'),
    webPreferences: { webSecurity: false }
  });
  // Specify entry point
  if (process.env.APP_ENV === 'true') {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'src/index.html'),
      protocol: 'file:',
      slashes: true
    }));
    win.setMenu(null);
  } else {
    win.loadURL(process.env.HOST);
    win.webContents.openDevTools();
  }
  win.on('closed', function () {
    win = null;
  });
}



switch (process.argv[1]) {
  default:
    initialize()
}