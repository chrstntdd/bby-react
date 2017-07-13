const {
  FuseBox,
  EnvPlugin,
  CSSPlugin,
  CSSModules,
  BabelPlugin,
  QuantumPlugin,
  WebIndexPlugin,
  UglifyJSPlugin,
  Sparky
} = require('fuse-box');
const path = require('path');
const express = require('express');

let producer;
let isProduction = false;

Sparky.task('build', () => {
  const fuse = FuseBox.init({
    homeDir: 'client/src',
    output: 'client/dist/static/$name.js',
    hash: isProduction,
    sourceMaps: !isProduction,
    target: 'browser',
    experimentalFeatures: true,
    cache: !isProduction,
    plugins: [
      EnvPlugin({ NODE_ENV: isProduction ? 'production' : 'development' }),
      [CSSModules(), CSSPlugin()],
      BabelPlugin(),
      WebIndexPlugin({
        template: 'client/src/index.html',
        title: 'Best Buy Tools | By Christian Todd',
        path: '/static/'
      }),
      isProduction &&
        QuantumPlugin({
          removeExportsInterop: false,
          uglify: true,
          treeshake: true
        })
    ]
  });

  // IF NOT IN PRODUCTION
  // CONFIG DEV SERVER
  fuse.dev({ root: false }, server => {
    const dist = path.resolve('./client/dist');
    const app = server.httpServer.app;
    app.use('/static/', express.static(path.join(dist, 'static')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(dist, '/static/index.html'));
    });
  });

  // EXTRACT VENDOR DEPENDENCIES
  const vendor = fuse.bundle('vendor').instructions('~ index.js');
  if (!isProduction) {
    vendor.hmr().watch();
  }

  // MAIN BUNDLE
  const app = fuse.bundle('app').instructions('!> [index.js]');
  if (!isProduction) {
    app.hmr().watch();
  }

  return fuse.run();
});

// YARN START
Sparky.task('default', ['clean', 'build'], () => {});

// YARN DIST
Sparky.task('dist', ['clean', 'set-production-env', 'build'], () => {});

// TASKS FOR BUILD
Sparky.task('clean', () => Sparky.src('dist/*').clean('dist/'));
Sparky.task('set-production-env', () => (isProduction = true));
