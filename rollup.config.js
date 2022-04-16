import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import screeps from 'rollup-plugin-screeps'

const dest = process.env.DEST
let dryRun = true
if (dest) dryRun = false
export default {
  input: 'src/main.ts',
  external: ['weirdo_architect_bg.wasm'],
  output: {
    file: 'dist/main.js',
    sourcemap: true,
    format: 'cjs'
  },
  plugins: [
    replace({
      preventAssignment: true,
      delimiters: ['', ''],
      values: {
        "const path = require('path').join(__dirname, 'weirdo_architect_bg.wasm');": '',
        "require('fs').readFileSync(path);": "require('weirdo_architect_bg.wasm');"
      }
    }),
    typescript(),
    resolve(),
    commonjs(),
    screeps({
      configFile: './screeps.json',
      dryRun: dryRun
    })
  ]
}
