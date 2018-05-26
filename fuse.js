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
const Purgecss = require('purgecss');
const { unlinkSync, writeFileSync } = require('fs');
const { src, task, exec, context } = require('fuse-box/sparky');
const { join } = require('path');
const { info } = console;
const tailwindcss = require('tailwindcss');
const express = require('express');
const autoprefixer = require('autoprefixer');

const POSTCSS_PLUGINS = [
  require('postcss-flexbugs-fixes'),
  tailwindcss('./config/tailwind.js'),
  autoprefixer({
    browsers: ['>0.25%', 'Explorer 11'],
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
        output: `${CLIENT_OUT}/$name.js`,
        sourceMaps: { inline: false, vendor: false }, //Not needed as we are debugging with vscode,
        target: this.isProduction ? 'browser@es5' : 'browser@es2017',
        cache: true,
        allowSyntheticDefaultImports: true,
        hash: this.isProduction,
        alias: {
          '@': '~'
        },
        plugins: [
          [SassPlugin({ importer: true }), PostCSSPlugin(POSTCSS_PLUGINS), CSSPlugin()],
          SVGPlugin(),
          WebIndexPlugin({
            template: TEMPLATE,
            title: this.isProduction ? 'Quantified | By Christian Todd' : 'DEV Quantified',
            path: '/'
          }),
          this.isProduction &&
            QuantumPlugin({
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
task('copy-redirect', () => src('./**', { base: './config/netlify' }).dest('./dist'));

task('copy-favicons', () => src('./favicons/**', { base: './config' }).dest('./dist/static'));

task('copy-images', () =>
  src('./**', { base: './src/public/images' }).dest('./dist/static/images')
);

task('clean', () => src('./dist/*').clean('./dist/'));

/* CUSTOM BUILD TASKS */
task('purge', () => {
  class TailwindExtractor {
    static extract(content) {
      return content.match(/[A-z0-9-:\/]+/g) || [];
    }
  }

  const purged = new Purgecss({
    content: ['dist/**/*.js', 'dist/**/*.html'],
    css: [`${CLIENT_OUT}/styles.css`],
    extractors: [
      {
        extractor: TailwindExtractor,
        extensions: ['html', 'js']
      }
    ]
  });

  const [result] = purged.purge();

  unlinkSync(`${CLIENT_OUT}/styles.css`);

  writeFileSync(result.file, result.css, 'UTF-8');

  info('💎  THE CSS HAS BEEN PURGED 💎');
});

/* PARALLEL EXECUTING BUILD TASKS */
task('copy-files', ['&copy-images', '&copy-redirect', 'copy-favicons']);

/* MAIN BUILD TASK CHAINS  */
task('dev', ['clean', 'dev-build', 'copy-files'], () => {
  info('GET TO WORK');
});

task('prod', ['clean', 'prod-build', 'copy-files', 'purge'], () => {
  info('READY FOR PROD');
});
