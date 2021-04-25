import { app } from 'electron'
import { BrowserWindow } from 'electron-acrylic-window'
import path from 'path'
import { initWindowIpcHandler } from './window'
import { v4 as uuid } from 'uuid'
import { getTheme } from './theme'

let win: BrowserWindow

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        vibrancy: getTheme(),
    })

    let windowId = uuid()

    win.loadURL(
        'file://' +
            path.join(__dirname, '..', 'ui', 'index.html') +
            '?windowId=' +
            windowId
    )

    //win.webContents.openDevTools({ mode: 'detach' })

    initWindowIpcHandler(win, windowId)

    win.on('closed', () => {
        win = null
    })
}

function init() {
    createWindow()
}

app.on('ready', init)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})
