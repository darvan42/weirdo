export default function (creep: Creep) {
  const target = creep.pos.findClosestByPath(FIND_SOURCES) as Source
  if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
    creep.moveTo(target)
  }
}
