const {
  FuseBox,
  EnvPlugin,
  CSSPlugin,
  SVGPlugin,
  SassPlugin,
  BabelPlugin,
  PostCSSPlugin,
  QuantumPlugin,
  WebIndexPlugin,
  UglifyJSPlugin,
  CSSResourcePlugin,
  Sparky
} = require('fuse-box');
const path = require('path');
const express = require('express');
const autoprefixer = require('autoprefixer');

const POSTCSS_PLUGINS = [
  require('postcss-flexibility'),
  autoprefixer({
    browsers: [
      'Chrome >= 52',
      'FireFox >= 44',
      'Safari >= 7',
      'Explorer 11',
      'last 4 Edge versions'
    ],
    grid: true
  })
];

let producer;
let isProduction = false;

Sparky.task('build', () => {
  const fuse = FuseBox.init({
    homeDir: './src',
    output: './dist/static/$name.js',
    log: true,
    hash: isProduction,
    sourceMaps: !isProduction,
    target: 'browser@es5',
    experimentalFeatures: true,
    cache: !isProduction,
    plugins: [
      EnvPlugin({ NODE_ENV: isProduction ? 'production' : 'development' }),
      [
        SassPlugin({
          outputStyle: 'compressed'
        }),
        PostCSSPlugin(POSTCSS_PLUGINS),
        CSSResourcePlugin({
          inline: true
        }),
        CSSPlugin({
          group: 'bundle.css',
          outFile: `./dist/static/bundle.css`
        })
      ],
      SVGPlugin(),
      BabelPlugin(),
      WebIndexPlugin({
        template: './src/index.html',
        title: 'Quantified | By Christian Todd',
        path: '/static/'
      }),
      isProduction &&
        QuantumPlugin({
          removeExportsInterop: false,
          bakeApiIntoBundle: 'vendor',
          uglify: true,
          treeshake: true
        })
    ]
  });

  // IF NOT IN PRODUCTION
  // CONFIG DEV SERVER

  if (isProduction === false) {
    fuse.dev({ root: false }, server => {
      const dist = path.join(__dirname, './dist');
      const app = server.httpServer.app;
      app.use('/static/', express.static(path.join(dist, 'static')));
      app.get('*', (req, res) => {
        res.sendFile(path.join(dist, 'static/index.html'));
      });
    });
  }
  // EXTRACT VENDOR DEPENDENCIES
  const vendor = fuse.bundle('vendor').instructions('~ index.js');
  if (!isProduction) {
    vendor.watch();
  }

  // MAIN BUNDLE
  const app = fuse.bundle('app').instructions('!> [index.js]');
  if (!isProduction) {
    app.watch();
  }

  return fuse.run();
});

// COPY FILES TO BUILD FOLDER
Sparky.task('copy-redirect', () =>
  Sparky.src('./netlify/**', { base: './config' }).dest('./dist')
);
Sparky.task('copy-favicons', () =>
  Sparky.src('./favicons/**', { base: './config' }).dest('./dist/static')
);

// YARN START
Sparky.task('default', ['clean', 'build'], () => {});

// YARN DIST
Sparky.task(
  'dist',
  ['clean', 'set-production-env', 'build', 'copy-redirect', 'copy-favicons'],
  () => {
    console.log('READY FOR PROD');
  }
);

// TASKS FOR BUILD
Sparky.task('clean', () => Sparky.src('./dist/*').clean('./dist/'));
Sparky.task('set-production-env', () => (isProduction = true));
