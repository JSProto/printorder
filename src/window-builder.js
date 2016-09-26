
const electron = require('electron');
const MenuBuilder = require('./menu-builder');

let windows = [];

let WindowBuilder = {
    workAreaSize: function (options = {}){
        let {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;

        width = Math.max(width * 6 / 7, 880) | 0;
        height = Math.max(height * 0.8, 600) | 0;

        return Object.assign({
            width: width,
            height: height,
            minWidth: 855,
            minHeight: 460,
            autoHideMenuBar: true,
            backgroundColor: '#FFFFFF',
            useContentSize: true
        }, options);
    },

    build: function (file, options = {}) {
        win = new electron.BrowserWindow(this.workAreaSize(options));

        let index = windows.push(win) - 1;

        win.loadURL('file://' + __dirname + '/../app/' + file);

        MenuBuilder.build(win);

        // Emitted when the window is closed.
        win.on('closed', function() {
            windows[index] = null;
            windows.splice(index, 1);
        });

        return win;
    }
};

module.exports = WindowBuilder;
