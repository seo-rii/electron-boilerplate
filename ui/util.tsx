import * as React from 'react'

declare global {
    interface Window {
        context: {
            send: any
            on: any
            once: any
        }
        windowId: string
    }
}

export function getTheme() {
    return new Promise<string>((resolve, reject) => {
        window.context.once('theme', (data: string) => {
            resolve(data)
        })
        window.context.send('theme', window.windowId)
    })
}
