import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { TitleBar } from './window'

function App() {
    return (
        <>
            <TitleBar title='Test' />
        </>
    )
}

function init() {
    window.windowId = new URLSearchParams(location.search).get('windowId')
    ReactDOM.render(<App />, document.getElementById('app') as HTMLElement)
}

document.addEventListener('DOMContentLoaded', init)

export default App
