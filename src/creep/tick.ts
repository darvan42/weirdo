import { getFunctionForRoleName } from './role'
import { getRoleFromName } from './role/utils'

export default function tick (creep: Creep) {
  const role = getRoleFromName(creep.name)
  const roleFunction = getFunctionForRoleName(role)
  if (roleFunction == null) throw new Error(`Role ${role} doesn't exists`)
  roleFunction(creep)
}
