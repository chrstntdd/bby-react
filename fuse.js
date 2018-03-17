const {
  FuseBox,
  CSSPlugin,
  SVGPlugin,
  SassPlugin,
  PostCSSPlugin,
  QuantumPlugin,
  WebIndexPlugin,
  UglifyJSPlugin,
  CSSResourcePlugin,
  Sparky
} = require('fuse-box');
const { src, task, exec, context } = require('fuse-box/sparky');
const { join } = require('path');
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

const outDir = join(__dirname, '/dist');
const CLIENT_OUT = join(__dirname, 'dist/static');
const TEMPLATE = join(__dirname, 'src/public/index.html');

context(
  class {
    build() {
      return FuseBox.init({
        homeDir: './src',
        output: `${outDir}/static/$name.js`,
        log: true,
        hash: this.isProduction,
        sourceMaps: !this.isProduction,
        target: 'browser@es5',
        cache: true,
        plugins: [
          [
            SassPlugin({ importer: true }),
            PostCSSPlugin(POSTCSS_PLUGINS),
            CSSResourcePlugin({
              inline: true
            }),
            CSSPlugin()
          ],
          SVGPlugin(),
          WebIndexPlugin({
            template: TEMPLATE,
            title: 'Quantified | By Christian Todd',
            path: '/'
          }),
          this.isProduction &&
            QuantumPlugin({
              removeExportsInterop: false,
              bakeApiIntoBundle: 'app',
              uglify: true,
              treeshake: true,
              polyfills: ['Promise'],
              css: true
            })
        ]
      });
    }
  }
);

task('dev-build', async context => {
  const fuse = context.build();

  fuse.dev({ root: false }, server => {
    const app = server.httpServer.app;
    app.use(express.static(CLIENT_OUT));
    app.get('*', (req, res) => {
      res.sendFile(join(CLIENT_OUT, 'index.html'));
    });
  });

  fuse
    .bundle('app')
    .hmr({ reload: true })
    .watch()
    .instructions('> index.tsx');

  await fuse.run();
});

task('prod-build', async context => {
  context.isProduction = true;

  const fuse = context.build();

  fuse.bundle('app').instructions('!> index.tsx');

  await fuse.run();
});

// COPY FILES TO BUILD FOLDER
task('copy-redirect', () =>
  Sparky.src('./netlify/**', { base: './config' }).dest('./dist')
);

task('copy-favicons', () =>
  Sparky.src('./favicons/**', { base: './config' }).dest('./dist/static')
);

task('clean', () => Sparky.src('./dist/*').clean('./dist/'));

/* MAIN BUILD TASK CHAINS  */
task('dev', ['clean', 'dev-build'], () => {
  console.info('GET TO WORK');
});

task('prod', ['clean', 'prod-build', 'copy-redirect', 'copy-favicons'], () => {
  console.info('READY FOR PROD');
});
