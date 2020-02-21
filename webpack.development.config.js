let webPackSettings = require('./webpack.settings.js');
const path = require('path');
const webpack = require("webpack");
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const plugins = [
  new SpriteLoaderPlugin({ plainSprite: true }),
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
  })
];

module.exports = {
  mode: 'development',
  entry: {
    'js/main.dist': './src/js/main.js'
  },
  output: {
    path : path.resolve(__dirname),
    filename: '[name].js'
  },
  devtool: 'source-map',
  module : {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    },{
      test: /\.scss$/,
      include: [
        path.resolve('./src/sass/critical.scss'),
        path.resolve('./src/sass/main.scss')
      ],
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }]
    }, {
      test: /\.svg$/i,
      include: path.resolve('./src/assets/images/svg'),
      use:[{
        loader: 'svg-sprite-loader'
      }, {
        loader: 'svgo-loader',
        options: {
          plugins: [{
            removeAttrs: { attrs: '(fill|stroke|fill-opacity)' }
          }]
        }
      }]
    }, {
      test: /\.(jpe?g|png|gif|svg|ico)$/i,
      exclude: path.resolve('./src/assets/images/svg'),
      include: [
        path.resolve('./node_modules'),
        path.resolve('./src/assets/images/')
      ],
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: '../assets/images/',
          outputPath: './assets/images/'
        }
      }]
    }, {
      test: /\.handlebars$/,
      use: [{
        loader: 'webpack-handlebars-loader',
        options: {
          //Note: use partials without trailing slash
          partials: path.resolve(__dirname, 'src/templates/partials/**/*.handlebars'),
          relativePathTo: path.resolve(__dirname, 'src/templates/pages'),
          outputpath: '.',
          data: path.resolve(__dirname,'data/**/*.json'),
          rootData: webPackSettings.config.defaultLanguage
        }
      }]
    }, {
      test: /\.pdf/i,
      include: [
        path.resolve('./src/assets/pdfs/')
      ],
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: '../assets/pdfs/',
          outputPath: './assets/pdfs/'
        }
      }]
    }, {
      test: /\.(otf|eot|ttf|woff2?)$/i,
      loader: 'file-loader',
      include: [
        path.resolve('./node_modules'),
        path.resolve('./src/assets/fonts/')
      ],
      options: {
        name: '[name].[ext]',
        publicPath: '../assets/fonts/',
        outputPath: './assets/fonts/',
      }
    }]
  },
  plugins: plugins
};
