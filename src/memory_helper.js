const constants = require('./constants')
module.exports = {
  saveTarget (creep, key, target) {
    creep.memory[this.getTargetKey(key)] = target.id
  },
  loadTarget (creep, key) {
    const targetID = creep.memory[this.getTargetKey(key)]
    if (targetID) {
      const target = Game.getObjectById(targetID)
      if (target) {
        return target
      } else {
        this.deleteTarget(this.getTargetKey(key))
        return null
      }
    }
  },
  deleteTarget (creep, key) {
    delete creep.memory[this.getTargetKey(key)]
  },
  getTargetKey (key) {
    return constants.memory.TARGET + '-' + key
  }
}
