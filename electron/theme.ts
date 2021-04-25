import { nativeTheme } from 'electron'

export function getTheme() {
    if (nativeTheme.shouldUseDarkColors) return 'dark'
    return 'light'
}
