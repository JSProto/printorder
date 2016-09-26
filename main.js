'use strict'

const path = require('path');
const {app, ipcMain} = require('electron');

const {WindowBuilder} = require('./src');

app.on('ready', () => {
	WindowBuilder.build('index.html');
});

ipcMain.on('open-admin-page', (event, arg) => {
    WindowBuilder.build('admin.html');
});