import * as starter from './role/starter'
import * as miner from './role/miner'
import * as upgrader from './role/upgrader'

interface Role {
  name: string
  tick: (creep: Creep) => void
}

export function getFunctionForRoleName (roleName: string) {
  const roles: Role[] = [{
    name: starter.ROLENAME,
    tick: starter.eachTick
  }, {
    name: miner.ROLENAME,
    tick: miner.eachTick
  }, {
    name: upgrader.ROLENAME,
    tick: upgrader.eachTick
  }]
  for (const role of roles) {
    if (role.name === roleName) return role.tick
  }
}
