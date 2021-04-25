import { ipcMain, BrowserWindow } from 'electron'
import { getTheme } from './theme'

export function initWindowIpcHandler(
    win: BrowserWindow,
    currentWindowId: string
) {
    ipcMain.on('minimize', (e, windowId: string) => {
        if (windowId === currentWindowId) win.minimize()
    })
    ipcMain.on('maximize', (e, windowId: string) => {
        if (windowId === currentWindowId) win.maximize()
    })
    ipcMain.on('unmaximize', (e, windowId: string) => {
        if (windowId === currentWindowId) win.unmaximize()
    })

    ipcMain.on('theme', (e, windowId: string) => {
        if (windowId === currentWindowId)
            win.webContents.send('theme', getTheme())
    })

    win.on('maximize', () => {
        win.webContents.send('winMaximizeStatChange', true)
    })

    win.on('unmaximize', () => {
        win.webContents.send('winMaximizeStatChange', false)
    })
}
