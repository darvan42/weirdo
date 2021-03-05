/*
 * Copyright 2021 Darvan42
 *
 *  Licensed under the EUPL, Version 1.2 or – as soon they
 * will be approved by the European Commission - subsequent
 * versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the
 * Licence.
 *  You may obtain a copy of the Licence at:
 *
 * https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12
 * or the LICENSE folder in this project
 *
 *  Unless required by applicable law or agreed to in
 * writing, software distributed under the Licence is
 * distributed on an "AS IS" basis,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied.
 *  See the Licence for the specific language governing
 * permissions and limitations under the Licence.
 */

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
