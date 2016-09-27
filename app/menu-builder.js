const {app, shell, Menu} = require('electron');

function openGitHub () {
    shell.openExternal('https://github.com/JSProto/printorder');
}
function searchIssues () {
    shell.openExternal('https://github.com/JSProto/printorder/issues');
}

let MenuBuilder = {

    build: function(window) {
        if (process.platform === 'darwin') {
            let template = this.templateForDarwin(window);
            let menu = Menu.buildFromTemplate(template);
            Menu.setApplicationMenu(menu);
        } else {
            let template = this.templateForOthers(window);
            let menu = Menu.buildFromTemplate(template);
            window.setMenu(menu);
        }
    },

    templateForDarwin: function(window) {

        return [{
                label: 'PrintOrder',
                submenu: [{
                    label: 'About PrintOrder',
                    role: 'about'
                }, {
                    type: 'separator'
                }, {
                    label: 'Open GitHub',
                    click: openGitHub
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
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click() {
                        app.quit();
                    }
                }, ],
            }, {
                label: 'Edit',
                submenu: [{
                    label: 'Undo',
                    accelerator: 'Command+Z',
                    selector: 'undo:'
                }, {
                    label: 'Redo',
                    accelerator: 'Shift+Command+Z',
                    selector: 'redo:'
                }, {
                    type: 'separator'
                }, {
                    label: 'Cut',
                    accelerator: 'Command+X',
                    selector: 'cut:'
                }, {
                    label: 'Copy',
                    accelerator: 'Command+C',
                    selector: 'copy:'
                }, {
                    label: 'Paste',
                    accelerator: 'Command+V',
                    selector: 'paste:'
                }, {
                    label: 'Select All',
                    accelerator: 'Command+A',
                    selector: 'selectAll:'
                }, ],
            }, {
                label: 'View',
                submenu: (process.env.NODE_ENV === 'development') ? [{
                    label: 'Toggle Full Screen',
                    accelerator: 'Ctrl+Command+F',
                    click() {
                        window.setFullScreen(!window.isFullScreen());
                    }
                }, {
                    label: 'Toggle Developer Tools',
                    accelerator: 'Alt+Command+I',
                    click() {
                        window.toggleDevTools();
                    }
                }, ] : [{
                    label: 'Toggle Full Screen',
                    accelerator: 'Ctrl+Command+F',
                    click() {
                        window.setFullScreen(!window.isFullScreen());
                    }
                }, ]
            }, {
                label: 'Window',
                submenu: [{
                    label: 'Minimize',
                    accelerator: 'Command+M',
                    selector: 'performMiniaturize:'
                }, {
                    label: 'Close',
                    accelerator: 'Command+W',
                    selector: 'performClose:'
                }, {
                    type: 'separator'
                }, {
                    label: 'Bring All to Front',
                    selector: 'arrangeInFront:'
                }, ]
            },
            this.helpMenu()
        ];
    },

    templateForOthers: function(window) {
        return [{
                label: 'PrintOrder',
                submenu: [{
                    label: 'Open GitHub',
                    click: openGitHub
                }, {
                    type: 'separator'
                }, {
                    label: 'Quit',
                    accelerator: 'Ctrl+W',
                    click() {
                        window.close();
                    }
                }, ],
            }, {
                label: 'View',
                submenu: (process.env.NODE_ENV === 'development') ? [{
                    label: '&Reload',
                    accelerator: 'Ctrl+R',
                    click() {
                        window.reload();
                    }
                }, {
                    label: 'Toggle Full Screen',
                    accelerator: 'F11',
                    click() {
                        window.setFullScreen(!window.isFullScreen());
                    }
                }, {
                    label: 'Toggle Developer Tools',
                    accelerator: 'Alt+Ctrl+I',
                    click() {
                        window.toggleDevTools();
                    }
                }, ] : [{
                    label: 'Toggle Full Screen',
                    accelerator: 'F11',
                    click() {
                        window.setFullScreen(!window.isFullScreen());
                    }
                }, ]
            },
            this.helpMenu()
        ];
    },

    helpMenu: function() {
        return {
            label: 'Help',
            submenu: [{
                label: 'Search Issues',
                click: searchIssues
            }]
        };
    }
};

module.exports = MenuBuilder;