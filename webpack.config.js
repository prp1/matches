const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: __dirname,
    // devtool: 'cheap-module-eval-source-map',
    devtool: 'source-map',
    entry: {
        app: './src/app/entries/app.tsx',
        // TODO: review if needed
        fetch: 'whatwg-fetch'
    },
    output: {
        // path: path.join(__dirname, '..'),
        path: __dirname + "/dist",
        publicPath: '/bundle/',
        // TODO: add hash
        filename: '[name].js'
    },
    resolve: {
        // root: path.resolve(__dirname + '/../src/app'),
        extensions: ['.ts', '.tsx', '.js', '.css', '.scss']
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoErrorsPlugin()
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
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
};
