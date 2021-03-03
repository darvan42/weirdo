'use strict'

function getTargetFromIDOrNull (targetID) {
  return Game.getObjectById(targetID) || null
}

function getTargetIDFromMemoryOrNull (creepName, targetKey) {
  return Memory.creeps[creepName][targetKey] || null
}

function deleteIDFromMemory (creepName, targetKey) {
  delete Memory.creeps[creepName][targetKey]
}

function saveIDToMemory (creepName, targetKey, target) {
  Memory.creeps[creepName][targetKey] = target.id
}

function onNewTarget (creepName, targetKey, getNewTarget) {
  const target = getNewTarget()
  if (!target) {
    deleteIDFromMemory(creepName, targetKey)
    return null
  } else {
    saveIDToMemory(creepName, targetKey, target)
    return target
  }
}

function getTarget (creepName, targetKey, getNewTarget, isValidTarget) {
  const id = getTargetIDFromMemoryOrNull(creepName, targetKey)
  if (!id) {
    return onNewTarget(creepName, targetKey, getNewTarget)
  }
  const target = getTargetFromIDOrNull(id)

  if (isValidTarget) {
    if (isValidTarget(target)) {
      return target
    } else {
      return onNewTarget(creepName, targetKey, getNewTarget)
    }
  }

  if (!target) {
    return onNewTarget(creepName, targetKey, getNewTarget)
  } else {
    return target
  }
}

function actionAssemble (creepName, targetKey, newTarget, getAction, isValidTarget) {
  const target = getTarget(creepName, targetKey, newTarget, isValidTarget)
  if (target) {
    return getAction(target)
  } else {
    return null
  }
}

module.exports = actionAssemble
