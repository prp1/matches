const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('../webpack.config');
const compiler = webpack(config);
const app = express();
const port = process.env.PORT || 8000;

app.use(webpackDevMiddleware(compiler, { publicPath: config.output.publicPath }));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/', require('./routes/home'));

const server = app.listen(port, function () {
    console.log('App listening at localhost:%s', port);
});
