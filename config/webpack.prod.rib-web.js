
var path = require('path');
var webpack = require('webpack');
const helpers = require('./helpers');



const AssetsPlugin = require('assets-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
// for prod builds, we have already done AoT and AoT writes to disk
// so read the JS file from disk
// for dev buids, we actually want to pass in .ts files since we
// don't have .js files on disk, they're exclusively in memory
const ENV = process.env.ENV = process.env.NODE_ENV = 'production';
var BUILD_NUMBER;
const METADATA = {
  title: 'RIB PRODUCTION',
  baseUrl: '/',
  ENV: ENV,
  isDevServer: helpers.isWebpackDevServer()
};


function getPlugins() {

  return [
    new AssetsPlugin({
      path: helpers.root('dist'),
      filename: 'webpack-assets.json',
      prettyPrint: true
    }),

    new DefinePlugin({
      'ENV': JSON.stringify(METADATA.ENV),
      'BUILD_NUM': JSON.stringify(BUILD_NUMBER),
      'process.env': {
        'ENV': JSON.stringify(METADATA.ENV),
        'NODE_ENV': JSON.stringify(METADATA.ENV),


      }
    }),

    //    new WebpackMd5Hash(),
    new ForkCheckerPlugin(),

    new CommonsChunkPlugin({
      name: ['polyfills','jQassets', 'kkpesclient' ,'vendor', 'main'].reverse()
      //name: ['main', 'jQassets', 'ibmmfpfanalytics', 'ibmmfpf', 'polyfills']
    }),

    /**
     * Config for production 
     *  */
    new webpack.optimize.UglifyJsPlugin(
      {
        comments: false,
        mangle: true,
        compress: {
          // remove warnings
          warnings: false,
          // Drop console statements
          drop_console: true
        }
      }


      /**
       * Config for dev
      
           new webpack.optimize.UglifyJsPlugin(
                              {
                        comments: false,
                        mangle: true,
                        compress: {
                          // remove warnings
                          warnings: false,
                          // Drop console statements
                          drop_console: false
                        }
                    }
       */

    ),
    new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('src') // location of your src
    ),

    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),


    new CopyWebpackPlugin([
	
	{
      from: 'src/assets',
      to: 'assets'
    },
	
	{
      from: 'node_modules/ionicons/dist/fonts/',
      to: 'assets/fonts/'
    },
	
	{
      from: 'src/browsernotsupport.html',
      to: 'browsernotsupport.html'
    },
     

    ]),


    new HtmlWebpackPlugin({
      template: 'src/index_prod.html',
      title: "PIB",
      chunksSortMode: 'dependency',
      metadata: METADATA,
      inject: 'head'
    }),



    new webpack.LoaderOptionsPlugin({
      options: {
        sassLoader: {
          includePaths: [
            'node_modules/ionic-angular/themes',
            'node_modules/ionicons/dist/scss'
          ]
        }
      }
    })



  ];
}

module.exports = function (env) {
  BUILD_NUMBER = env.BUILD_NUMBER;


  var path = './src/app/main.prod.ts';
  path = './src/app/web/rib/rib-web.main.dev.ts';

  return {
    entry: {


      'polyfills': './src/polyfills.browser.ts',
      'kkpesclient': './src/assets/edge-service-web-sdk/src/js/index.js',
      'jQassets': './src/assets/jQassets/jQassets.ts',
      'vendor': './src/vendor.browser.ts',
      'intl': './src/assets/intl/intl.ts',
      'main': './src/app/web/rib/rib-web.main.dev.ts',

    },
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
      //  sourceMapFilename: '[name].[chunkhash].bundle.map',

      /**
       * The filename of non-entry chunks as relative path
       * inside the output.path directory.
       *
       * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
       */
      chunkFilename: '[id].chunk.js'



    },
    //  devtool: 'source-map',

    resolve: {
      extensions: ['.ts', '.js', '.json', '.scss', '.css'],
      modules: [helpers.root('src'), 'node_modules'],
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
          loaders: ['style-loader', 'css-loader', 'sass-loader'],


        },

        /* Raw loader support for *.html
        * Returns file content as string
        *
        * See: https://github.com/webpack/raw-loader
        */
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: [helpers.root('src/index_prod.html')]
        },

        /* File loader for supporting images, for example, in CSS files.
        */
        {
          test: /\.(jpg|png|gif)$/,
          loader: 'file'
        },

      ],
    },



    plugins: getPlugins(),

    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }

  }

};