import * as esbuild from 'esbuild'
import browserslist from 'browserslist';
import { esbuildPluginBrowserslist } from 'esbuild-plugin-browserslist';
import { sassPlugin } from 'esbuild-sass-plugin'

await esbuild.build({
  entryPoints: ['sources/app.ts', 'sources/index.scss'],
  bundle: true,
  treeShaking: true,
  minify: true,
  sourcemap: false,
  outdir: './dist',
  plugins: [
    esbuildPluginBrowserslist(browserslist('last 2 chrome versions'), {
      printUnknownTargets: false,
    }),
    sassPlugin({
      loadPaths: ['./sources']
    })
  ]
});
