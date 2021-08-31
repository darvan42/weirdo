import typescript from '@rollup/plugin-typescript'
import screeps from 'rollup-plugin-screeps'

const dest = process.env.DEST
let dryRun = true
if (dest) dryRun = false
export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/main.js',
    sourcemap: true,
    format: 'cjs'
  },
  plugins: [
    typescript(),
    screeps({ configFile: './screeps.json', dryRun: dryRun })
  ]
}
