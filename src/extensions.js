'use strict'

function extendClass (base, extra) {
  const descs = Object.getOwnPropertyDescriptors(extra.prototype)
  delete descs.constructor
  Object.defineProperties(base.prototype, descs)
}

const ExtendsSpawn = require('./ExtendsSpawn')

// eslint-disable-next-line no-undef
extendClass(Spawn, ExtendsSpawn)
