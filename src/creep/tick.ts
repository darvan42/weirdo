import { getFunctionForRole, getRoleFromName } from './role'

export default function tick (creep: Creep) {
  const role = getRoleFromName(creep.name)
  const roleFunction = getFunctionForRole(role)
  if (roleFunction == null) throw new Error(`Role ${role} doesn't exists`)
  roleFunction(creep)
}
