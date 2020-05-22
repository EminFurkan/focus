const { app, BrowserWindow } = require('electron');
const path = require('path');

let willExitApp = false;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 800,
    height: 600,
    title: 'Focus',
    icon: __dirname + '/assets/clock.ico'
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  
  
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  
  mainWindow.on('close', (e) => {
    if (!willExitApp) {
      e.preventDefault();
      mainWindow.hide();
    }
  });
  mainWindow.on('ready-to-show', () => {
    if (!willExitApp){
      mainWindow.show();
    }
  })

  app.dock.setIcon(__dirname + '/assets/clock.ico');
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => (willExitApp = true));

app.on('activate', () => {
  mainWindow.show();
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
