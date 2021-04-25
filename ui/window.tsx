import * as React from 'react'
import { useEffect, useState } from 'react'
import * as CSS from 'csstype'
import { getTheme } from './util'

function TitleBarButton(props: {
    icon: string
    show?: boolean
    red?: boolean
    onClick?: any
}) {
    const [isHover, setHover] = useState(false)
    return !('show' in props) || props.show ? (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={props.onClick}
            style={
                {
                    gridRow: '1 / span 1',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    fontFamily: '"Segoe Fluent Icons", "Segoe MDL2 Assets"',
                    fontSize: '10px',
                    userSelect: 'none',
                    cursor: 'default',
                    transition: 'background .5s',
                    ...(isHover && {
                        background: props.red
                            ? '#E81123'
                            : 'rgba(255, 255, 255, 0.1)',
                    }),
                } as CSS.Properties
            }>
            {props.icon}
        </div>
    ) : (
        <></>
    )
}

export function TitleBar(props: { title: string }) {
    const [isMaxmized, setMaxmized] = useState(false)
    const [theme, setTheme] = useState('')
    useEffect(() => {
        window.context.on('winMaximizeStatChange', (maximized: boolean) => {
            setMaxmized(maximized)
        })
        getTheme().then((currentTheme) => {
            setTheme(currentTheme)
        })
    }, [])
    return (
        <header
            style={{
                display: 'block',
                position: 'fixed',
                height: '32px',
                zIndex: 9999,
                width: '100%',
                top: 0,
                color: theme === 'dark' ? '#ffffff' : '#000000',
            }}>
            <div
                style={
                    {
                        width: '100%',
                        height: '100%',
                        webkitAppRegion: 'drag',
                    } as CSS.Properties
                }>
                <div
                    style={{
                        gridColumn: 1,
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: '8px',
                        overflowX: 'hidden',
                        fontFamily: 'Segoe UI',
                        fontSize: '12px',
                        padding: '4px',
                    }}>
                    <span
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            lineHeight: 1.5,
                        }}>
                        {props.title}
                    </span>
                </div>
                <div
                    style={
                        {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 46px)',
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            height: '100%',
                            webkitAppRegion: 'no-drag',
                        } as CSS.Properties
                    }>
                    <TitleBarButton
                        icon=''
                        onClick={() =>
                            window.context.send('minimize', window.windowId)
                        }
                    />
                    <TitleBarButton
                        icon=''
                        show={!isMaxmized}
                        onClick={() =>
                            window.context.send('maximize', window.windowId)
                        }
                    />
                    <TitleBarButton
                        icon=''
                        show={isMaxmized}
                        onClick={() =>
                            window.context.send('unmaximize', window.windowId)
                        }
                    />
                    <TitleBarButton
                        icon=''
                        red
                        onClick={() => window.close()}
                    />
                </div>
            </div>
        </header>
    )
}
