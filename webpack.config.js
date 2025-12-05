import webpack from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import denv from 'dotenv';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const localPublicFolder = path.join(__dirname, 'public');
const publicFolder = path.join(__dirname, '../m-days-public/');
const fontsFolder = path.join(__dirname, '../m-days-core/src/assets/fonts/');

const dotenv = denv.config({ path: __dirname + '/.env' });

export default (env = {}, argv) => {
  const webpackMode = argv.mode;
  const { mobile, sb, standalone } = env;
  const isProd = webpackMode === 'production';
  const processEnv = dotenv.parsed;

  const plugins = [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash].css',
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(processEnv),
      'isSbMode': JSON.stringify(sb),
      'isStandalone': JSON.stringify(standalone),
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/index.ejs',
      scriptLoading: 'blocking',
      filename: 'index.html',
      isMobile: !!mobile,
      isProd,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${localPublicFolder}/`,
          to: './',
        },
        {
          from: `${fontsFolder}/`,
          to: './fonts',
        },
      ],
    })
  ];

  const rules = [
    {
      test: /\.m?js/,
      resolve: {
        fullySpecified: false,
      },
    },
    {
      test: /\.(ts|js)$/,
      use: ['babel-loader', {
        loader: 'ifdef-loader',
        options: {
          standalone: standalone,
        },
      }],
      exclude: (modulePath) => {
        return /node_modules/.test(modulePath)
          && !/node_modules\/axios/.test(modulePath)
          && !/node_modules\/bluebird/.test(modulePath)
          && !/node_modules\/lodash-es/.test(modulePath)
          && !/node_modules\/moment/.test(modulePath)
          && !/node_modules\/query-string/.test(modulePath)
          && !/node_modules\/reset-css/.test(modulePath)
          && !/node_modules\/url-search-params-polyfill/.test(modulePath);
      },
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            url: false,
            modules: false,
          },
        },
      ],
    },
    {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            url: false,
            modules: false,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                'autoprefixer'
              ]
            },
          },
        },
        {
          loader: 'sass-loader',
          options: {
            api: 'modern',
            sassOptions: {
              loadPaths: [path.resolve(__dirname, 'src')],
            },
          }
        }
      ],
    },
    {
      test: /\.svg$/,
      oneOf: [
        {
          resourceQuery: /sprite/,
          type: 'asset/inline',
        },
        {
          use: ['@svgr/webpack'],
        },
      ],
    },
    {
      test: /\.(jpe?g|png|docx)$/i,
      type: 'asset/inline',
    },
    {
      test: /\.(woff2?|eot|ttf|otf)$/i,
      type: 'asset/inline',
    },
    {
      test: /\.ejs$/,
      use: [
        {
          loader: 'ejs-loader',
          options: {
            esModule: false,
          }
        }
      ]
    },
  ];

  if (mobile) {
    rules.push({
      test: /\.(ts?|js?|json)$/,
      loader: 'string-replace-loader',
      options: {
        search: '/assets',
        replace: 'file:///android_asset/www/assets',
        flags: 'g',
      },
    });
  }

  const buildDir = path.join(__dirname, 'dist');
  const imgBgDir = path.join(__dirname, '../m-days-public-images');

  return {
    entry: ['./src/index.ts'],
    mode: webpackMode,
    devtool: !isProd ? 'eval-source-map' : false,
    devServer: {
      static: [
        buildDir,
        imgBgDir,
      ],
      port: 3001,
      historyApiFallback: true,
      allowedHosts: 'all',
      liveReload: true,
      client: {
        overlay: {
          warnings: false,
          errors: false,
        }
      },
      proxy: [
        {
          context: ['/api'],
          target: 'http://localhost:3000',
          // secure: false,
        },
      ],
      devMiddleware: {
        writeToDisk: true, // без этого почему-то ошибка: cannot get /
      },
    },
    output: {
      publicPath: './',
      path: buildDir,
      filename: '[name]_[contenthash].js',
      clean: true,
    },
    target: !isProd ? 'web' : ['web', 'es5'],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.scss'],
      modules: [
        path.resolve(__dirname, './src'),
        path.resolve(__dirname, './node_modules'),
        path.resolve(localPublicFolder),
        path.resolve(publicFolder),
      ],
      alias: {
        '@src': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@assets': path.resolve(__dirname, './assets'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
      fallback: {
        crypto: false,
      },
    },
    module: {
      rules: rules,
    },
    plugins: plugins,
    optimization: {
      minimizer: [new TerserPlugin({ extractComments: false })],
    },
  };
};
