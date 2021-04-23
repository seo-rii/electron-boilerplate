const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('context', {
    send: (channel: string, data: any) => {
        let validChannels = ['minimize', 'maximize', 'unmaximize']
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data)
        }
    },
    receive: (channel: string, func: any) => {
        let validChannels = ['winMaximizeStatChange']
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event: Event, ...args: any) =>
                func(...args)
            )
        }
    },
})
