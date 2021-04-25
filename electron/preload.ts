const { contextBridge, ipcRenderer } = require('electron')

let validSendChannels = ['minimize', 'maximize', 'unmaximize', 'theme']
let validReceiveChannels = ['winMaximizeStatChange', 'theme']

contextBridge.exposeInMainWorld('context', {
    send: (channel: string, data: any) => {
        if (validSendChannels.includes(channel)) {
            ipcRenderer.send(channel, data)
        }
    },
    on: (channel: string, func: any) => {
        if (validReceiveChannels.includes(channel)) {
            ipcRenderer.on(channel, (event: Event, ...args: any) =>
                func(...args)
            )
        }
    },
    once: (channel: string, func: any) => {
        if (validReceiveChannels.includes(channel)) {
            ipcRenderer.once(channel, (event: Event, ...args: any) =>
                func(...args)
            )
        }
    },
})
