import * as esbuild from 'esbuild'
import browserslist from 'browserslist';
import { esbuildPluginBrowserslist } from 'esbuild-plugin-browserslist';
import { sassPlugin } from 'esbuild-sass-plugin'

const builder = await esbuild.context({
  entryPoints: ['sources/app.ts', 'sources/index.scss'],
  bundle: true,
  treeShaking: true,
  minify: false,
  sourcemap: true,
  outdir: './dist',
  plugins: [
    esbuildPluginBrowserslist(browserslist('last 2 chrome versions'), {
      printUnknownTargets: false,
    }),
    sassPlugin({
      loadPaths: ['./sources']
    })
  ],
  logLevel: 'info'
});

await builder.watch();

await builder.serve({
  servedir: '.',
  port: 8000
})
