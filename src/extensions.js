'use strict'

require('./ExtendsCreep')
function extendClass (base, extra) {
  const descs = Object.getOwnPropertyDescriptors(extra.prototype)
  delete descs.constructor
  Object.defineProperties(base.prototype, descs)
}

const ExtendsSpawn = require('./ExtendsSpawn')

extendClass(Spawn, ExtendsSpawn)
