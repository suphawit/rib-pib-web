/**
 * @author: @AngularClass
 */


const helpers = require('./helpers');
//const webpackMerge = require('webpack-merge'); // used to merge webpack configs
//const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3200;
const HMR = helpers.hasProcessFlag('hot');
var BUILD_NUMBER;
const METADATA = {
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: HMR
};


/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function (options) {
  BUILD_NUMBER = options.BUILD_NUMBER;
  return {

    entry: {

      'polyfills': './src/polyfills.browser.ts',
      'kkpesclient': './src/assets/edge-service-web-sdk/src/js/index.js',
      'jQassets': './src/assets/jQassets/jQassets.ts',
      'vendor': './src/vendor.browser.ts',
      'intl': './src/assets/intl/intl.ts',
      'main': './src/app/web/rib/rib-web.main.dev.ts',


    },


    /**
     * Developer tool to enhance debugging
     *
     * See: http://webpack.github.io/docs/configuration.html#devtool
     * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
     */
    devtool: 'cheap-module-source-map',

    /**
     * Options affecting the output of the compilation.
     *
     * See: http://webpack.github.io/docs/configuration.html#output
     */
    output: {

      /**
       * The output directory as absolute path (required).
       *
       * See: http://webpack.github.io/docs/configuration.html#output-path
       */
      path: helpers.root('dist'),

      /**
       * Specifies the name of each output file on disk.
       * IMPORTANT: You must not specify an absolute path here!
       *
       * See: http://webpack.github.io/docs/configuration.html#output-filename
       */
      filename: '[name].js',

      /**
       * The filename of the SourceMaps for the JavaScript files.
       * They are inside the output.path directory.
       *
       * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
       */
      sourceMapFilename: '[name].map',

      /** The filename of non-entry chunks as relative path
       * inside the output.path directory.
       *
       * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
       */
      chunkFilename: '[id].chunk.js',

      library: 'ac_[name]',
      libraryTarget: 'var',
    },

    resolve: {
      extensions: ['.ts', '.js', '.json', '.scss', '.css'],
      modules: [helpers.root('src'), 'node_modules']
    },


    module: {

      rules: [

        /*
        * Typescript loader support for .ts and Angular 2 async routes via .async.ts
        * Replace templateUrl and stylesUrl with require()
        *
        * See: https://github.com/s-panferov/awesome-typescript-loader
        * See: https://github.com/TheLarkInn/angular2-template-loader
        */
        {
          test: /\.ts$/,
          loaders: [

            'awesome-typescript-loader',
            'angular2-template-loader'
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },



        /*
        * Json loader support for *.json files.
        *
        * See: https://github.com/webpack/json-loader
        */
        {
          test: /\.json$/,
          loader: 'json-loader'
        },


        // {
        //   test: /\.js$/,
        //   loader: 'ibm-mfp-web-sdk'
        // },

        /*
        * to string and css loader support for *.css files
        * Returns file content as string
        *
        */
        {
          test: /\.css$/,
          loaders: ['to-string-loader', 'css-loader']
        },

        {
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader']


        },

        /* Raw loader support for *.html
        * Returns file content as string
        *
        * See: https://github.com/webpack/raw-loader
        */
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: [helpers.root('src/index_dev_web.html')]
        },

        /* File loader for supporting images, for example, in CSS files.
        */
        {
          test: /\.(jpg|png|gif)$/,
          loader: 'file'
        },

      ],
    },

    plugins: [

      /**
       * Plugin: DefinePlugin
       * Description: Define free variables.
       * Useful for having development builds with debug logging or adding global constants.
       *
       * Environment helpers
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
       */
      // NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
      new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
        'APP_VERSION': JSON.stringify('Version 2.0.0'),
        'BUILD_NUM': JSON.stringify(BUILD_NUMBER),
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV),
          'HMR': METADATA.HMR,
        }
      }),


      new CommonsChunkPlugin({
        name: ['polyfills','jQassets', 'kkpesclient' ,'vendor', 'main'].reverse()
      }),


      /**
       * Plugin: NamedModulesPlugin (experimental)
       * Description: Uses file names as module name.
       *
       * See: https://github.com/webpack/webpack/commit/a04ffb928365b19feb75087c63f13cadfc08e1eb
       */
      new NamedModulesPlugin(),

      /**
       * Plugin LoaderOptionsPlugin (experimental)
       *
       * See: https://gist.github.com/sokra/27b24881210b56bbaff7
       */

      /*
       * Plugin: HtmlWebpackPlugin
       * Description: Simplifies creation of HTML files to serve your webpack bundles.
       * This is especially useful for webpack bundles that include a hash in the filename
       * which changes every compilation.
       *
       * See: https://github.com/ampedandwired/html-webpack-plugin
       */
      new HtmlWebpackPlugin({
        template: 'src/index_dev_rib_web.html',
        title: METADATA.title,
        chunksSortMode: 'dependency',
        metadata: METADATA,
        inject: 'head'
      }),

      /*
       * Plugin: ScriptExtHtmlWebpackPlugin
       * Description: Enhances html-webpack-plugin functionality
       * with different deployment options for your scripts including:
       *
       * See: https://github.com/numical/script-ext-html-webpack-plugin
       */
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      }),



      new LoaderOptionsPlugin({
        debug: true,
        options: {

          /**
           * Static analysis linter for TypeScript advanced options configuration
           * Description: An extensible linter for the TypeScript language.
           *
           * See: https://github.com/wbuchwalter/tslint-loader
           */
          tslint: {
            emitErrors: false,
            failOnHint: false,
            resourcePath: 'src'
          },

        }
      }),

    ],

    /**
     * Webpack Development Server configuration
     * Description: The webpack-dev-server is a little node.js Express server.
     * The server emits information about the compilation state to the client,
     * which reacts to those events.
     *
     * See: https://webpack.github.io/docs/webpack-dev-server.html
     */
    devServer: {
      port: METADATA.port,
      host: METADATA.host,
      historyApiFallback: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      },
      proxy: {
        '/mfp': {
          target: 'http://10.202.192.126:9080',
          // target: 'http://10.208.11.141:9080',
          changeOrigin: true,
          secure: false
        },

        '/webapi': {
          target: 'http://10.202.105.72:80',
          // target: 'http://10.208.11.141:9080',
          changeOrigin: true,
          secure: false
        }

      },
    },

    /*
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  }
}
