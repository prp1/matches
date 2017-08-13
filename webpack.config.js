const webpack = require('webpack');

module.exports = {
    context: __dirname,
    devtool: 'source-map',
    entry: {
        app: './src/app/entries/app.tsx',
        fetch: 'whatwg-fetch',
        promise: 'es6-promise',
    },
    output: {
        path: __dirname + "/dist",
        publicPath: '/bundle/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.css', '.scss']
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.js$/,
                enforce: "pre",
                loader: "source-map-loader"
            },
            {
                test: /\.s?css$/,
                loaders: [
                    'style-loader',
                    'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                    'sass-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer'),
                                require('precss'),
                            ]
                        }
                    }
                ]
            }
        ]
    },
    stats: { colors: true },
};
