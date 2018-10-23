const express = require('express');
const webpack = require('webpack');
const path = require('path');

const webpackConfig = require('../utility-webpack/dev.webpack')(__dirname);
// const DashboardPlugin = require('webpack-dashboard/plugin');

const compiler = webpack(webpackConfig);
// compiler.apply(new DashboardPlugin());

const expressApp = express();
const port = 8090;

expressApp.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true, // display info to console (only warnings and errors)
  quiet: true, // do not show all files
  stats: { // remove all under colors to show the changed files list
    colors: true,
    // hash: false,
    // version: false,
    // timings: false,
    // assets: false,
    // chunks: false,
    // modules: false,
    // reasons: false,
    // children: false,
    // source: false,
    // errors: false,
    // errorDetails: false,
    // warnings: false,
    // publicPath: false,
  },
  lazy: false, // lazy will split into many files and load a few times
  watchOptions: { // reloading every request (but only main js)
    aggregateTimeout: 300, // Combine changes in 300ms
    poll: 1000, // Check every second
  },
  publicPath: webpackConfig.output.publicPath, // in root
}));

expressApp.use(require('webpack-hot-middleware')(compiler)); // this for HMR

expressApp.use(express.static(path.join(__dirname, 'resource')));
expressApp.use('/sw.js', express.static(path.join(__dirname, 'sw.js')));
expressApp.set('view engine', 'pug');
expressApp.set('views', `${__dirname}/src`);

// expressApp.get('/.well-known/', (req, res) => {
//   res.render(path.join(ROUTE, './.well-known'));
// });

require('http').Server(expressApp).listen(port);
