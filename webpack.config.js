/* global require, module, __dirname */

var _ = require('lodash');
var path = require('path');
var argv = require('yargs').argv;
var colors = require('colors/safe');
var webpack = require('webpack');
var bourbon = require('node-bourbon').includePaths;

var env = argv.env || 'development';
var proj = argv.proj;
var supportedProjects = ['user', 'admin'];

// Validations

if (!_.includes(supportedProjects, proj)) {
  if (_.isEmpty(proj)) {
    throw colors.red('proj option is required. ex) --proj user');
  }

  throw colors.red(`${proj} is not support project name, use one of ${supportedProjects.join(', ')}.`);
}

if (!_.includes(['production', 'development'], env)) {
  throw colors.red(`${env} is not available mode, it support production or development only.`);
}

var startMessage = `${_.toUpper(proj)} PROJECT BUILD NOW AS A ${_.toUpper(env)} MODE!! MAKE TO SEXY PLEASE!!!`;
console.log(colors[_.isEqual(env, 'production') ? 'cyan' : 'yellow'].bold(startMessage));

// Config

module.exports = {
  devtool: _.isEqual(env, 'production') ? 'source-map' : '#cheap-module-eval-source-map',
  entry: `./src/${proj}`,
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: `${proj}.bundle.js`,
    publicPath: '/public/'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /(node_modules)/, loaders: ['babel'] },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass?includePaths[]=' + bourbon]
      }
    ]
  },
  externals: {
    lodash: '_',
    react: 'React',
    jquery: 'jQuery',
    moment: 'moment',
    superagent: 'superagent',
    'js-cookie': 'Cookies',
    'react-dom': 'ReactDOM',
    'react-intl': 'ReactIntl',
    'react-bootstrap': 'ReactBootstrap',
    'underscore.string': 's'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      contrib: path.join(__dirname, 'src/contrib'),
      middleware: path.join(__dirname, 'src/middleware'),
      store: path.join(__dirname, `src/${proj}/store`),
      styles: path.join(__dirname, `src/${proj}/styles`),
      actions: path.join(__dirname, `src/${proj}/actions`),
      reducers: path.join(__dirname, `src/${proj}/reducers`),
      components: path.join(__dirname, `src/${proj}/components`),
      containers: path.join(__dirname, `src/${proj}/containers`)
    }
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ].concat(_.isEqual(env, 'production') ?
    [
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      new webpack.optimize.DedupePlugin()
    ] : []
  )
};
