import express from 'express';
import path from 'path';
import cors from 'cors';


const app = express();
app.use(cors());

// enable hot reload
if (NODE_ENV === 'development') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const config = require('../../webpack.config');
    const compiler = webpack(config[0]);
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true, publicPath: config[0].output.publicPath
    }));
    app.use(webpackHotMiddleware(compiler));
}

// We're going to serve up the public
// folder since that's where our
// client bundle.js file will end up.
app.use(express.static('public'));

app.get('*', (req, res, next) => {
    res.sendFile(`${path.resolve(__dirname)}/public/index.html`);
});

app.listen(3000, () => {
    console.log('Server is listening on port: 3000');
});
