const {
  FuseBox,
  CSSPlugin,
  CSSModules,
  BabelPlugin,
  QuantumPlugin,
  WebIndexPlugin,
  UglifyJSPlugin,
  Sparky
} = require('fuse-box');

let fuse,
  app,
  vendor,
  isProduction = false;

Sparky.task('config', () => {
  fuse = new FuseBox({
    homeDir: 'client/src',
    output: 'client/dist/$name.js',
    hash: isProduction,
    sourceMaps: !isProduction,
    plugins: [
      [CSSModules(), CSSPlugin()],
      BabelPlugin(),
      WebIndexPlugin({ template: 'client/src/index.html' }),
      isProduction &&
        QuantumPlugin({
          removeExportsInterop: false,
          uglify: true
        })
    ]
  });
  // VENDOR BUNDLE (FOR REACT)
  vendor = fuse.bundle('vendor').instructions('~ index.js');

  // MAIN BUNDLE
  app = fuse.bundle('app').instructions('> [index.js]');
});

// RUN WITH YARN START
Sparky.task('default', ['clean', 'config'], () => {
  fuse.dev();
  // add dev instructions
  app.watch().hmr();
  return fuse.run();
});

// RUN WITH YARN DIST
Sparky.task('dist', ['prod-env', 'config'], () => {
  return fuse.run();
});

// SPARKY TASKS
Sparky.task('clean', () => Sparky.src('dist/').clean('dist/'));
Sparky.task('prod-env', ['clean'], () => {
  isProduction = true;
});
