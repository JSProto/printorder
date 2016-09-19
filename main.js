const path = require('path');

const {app, shell, dialog, Menu, ipcMain, BrowserWindow} = require('electron');

let mainWindow;
let adminWindow;

function createMenu() {
    // Create default menu.

    const template = [{
        label: 'Edit',
        submenu: [{
            role: 'undo'
        }, {
            role: 'redo'
        }]
    }, {
        label: 'View',
        submenu: [{
            label: 'Reload',
            accelerator: 'CmdOrCtrl+R',
            click(item, focusedWindow) {
                if (focusedWindow) focusedWindow.reload()
            }
        }, {
            label: 'Toggle Developer Tools',
            accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
            click(item, focusedWindow) {
                if (focusedWindow) focusedWindow.toggleDevTools()
            }
        }, {
            type: 'separator'
        }, {
            role: 'togglefullscreen'
        }]
    }, {
        role: 'window',
        submenu: [{
            role: 'minimize'
        }, {
            role: 'close'
        }]
    }, {
        role: 'help',
        submenu: [{
            label: 'Learn More',
            click() {
                shell.openExternal('http://electron.atom.io')
            }
        }, {
            label: 'Documentation',
            click() {
                shell.openExternal(
                    `https://github.com/electron/electron/tree/v${process.versions.electron}/docs#readme`
                )
            }
        }, {
            label: 'Community Discussions',
            click() {
                shell.openExternal('https://discuss.atom.io/c/electron')
            }
        }, {
            label: 'Search Issues',
            click() {
                shell.openExternal('https://github.com/electron/electron/issues')
            }
        }]
    }]

    if (process.platform === 'darwin') {
        template.unshift({
            label: 'Electron',
            submenu: [{
                role: 'about'
            }, {
                type: 'separator'
            }, {
                role: 'services',
                submenu: []
            }, {
                type: 'separator'
            }, {
                role: 'hide'
            }, {
                role: 'hideothers'
            }, {
                role: 'unhide'
            }, {
                type: 'separator'
            }, {
                role: 'quit'
            }]
        })
        template[1].submenu.push({
            type: 'separator'
        }, {
            label: 'Speech',
            submenu: [{
                role: 'startspeaking'
            }, {
                role: 'stopspeaking'
            }]
        })
        template[3].submenu = [{
            role: 'close'
        }, {
            role: 'minimize'
        }, {
            role: 'zoom'
        }, {
            type: 'separator'
        }, {
            role: 'front'
        }]
    } else {
        template.unshift({
            label: 'File',
            submenu: [{
                role: 'quit'
            }]
        })
    }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}


function createMainWindow() {

    let indexFile = 'file://' + __dirname + '/app/index.html';

    const options = {
        width: 9300,
        height: 800,
        autoHideMenuBar: true,
        backgroundColor: '#FFFFFF',
        useContentSize: true
    }

    // Create the browser window.
    mainWindow = new BrowserWindow(options);

    mainWindow.loadURL(indexFile);

    // mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
}

function createAdminWindow(){

    let adminFile = 'file://' + __dirname + '/app/admin.html';

    const options = {
        parent: mainWindow,
        width: 9300,
        height: 800,
        autoHideMenuBar: true,
        backgroundColor: '#FFFFFF',
        useContentSize: true
    }

    adminWindow = new BrowserWindow(options);

    adminWindow.loadURL(adminFile);

    adminWindow.on('closed', function() {
        adminWindow = null;
    });
}

// app.once('ready', createMenu);

app.on('ready', createMainWindow);

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    if (mainWindow === null) {
        createMainWindow();
    }
});


ipcMain.on('open-admin-page', (event, arg) => {
  console.log("createAdminWindow: ", arg)  // prints "ping"
  createAdminWindow();
});

// app.on('login', (event, webContents, request, authInfo, callback) => {
//     event.preventDefault();
//     callback('username', 'secret');
// });

