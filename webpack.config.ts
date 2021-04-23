import path from 'path'
import nodeExternals from 'webpack-node-externals'
import CopyPlugin from 'copy-webpack-plugin'
import webpack from 'webpack'
import { version } from './package.json'

export default (env: any, argv: any) => {
    const devMode = argv.mode === 'development'

    return [
        {
            entry: {
                index: './electron/index.ts',
                preload: './electron/preload.ts',
            },
            devtool: 'source-map',
            target: 'node',
            output: {
                path: path.resolve(__dirname, 'build', 'electron'),
                filename: '[name].js',
            },
            resolve: {
                extensions: ['.ts'],
            },
            externals: [nodeExternals()],
            module: {
                rules: [
                    {
                        test: /\.ts?$/,
                        loader: 'babel-loader',
                    },
                ],
            },
            plugins: [
                new webpack.DefinePlugin({
                    DEV_MODE: devMode,
                }),
            ],
        },
        {
            entry: {
                index: './ui/index.tsx',
            },
            ...(devMode && { devtool: 'source-map' }),
            target: 'es6',
            output: {
                path: path.resolve(__dirname, 'build', 'ui'),
                filename: '[name].js',
            },
            resolve: {
                extensions: ['.ts', '.tsx', '.js', '.jsx'],
                fallback: {
                    stream: require.resolve('stream-browserify'),
                    domain: false,
                },
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        loader: 'babel-loader',
                    },
                ],
            },
            plugins: [
                new webpack.DefinePlugin({
                    DEV_MODE: devMode,
                    VERSION: version,
                }),
                new CopyPlugin({
                    patterns: [
                        {
                            from: './index.html',
                            to: './index.html',
                        },
                    ],
                }),
            ],
        },
    ]
}
