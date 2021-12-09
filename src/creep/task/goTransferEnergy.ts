export default function (creep: Creep, target: AnyCreep | AnyStoreStructure) {
  if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(target)
  }
}
