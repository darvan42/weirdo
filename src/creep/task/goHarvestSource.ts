export default function (creep: Creep, source?: Source | null) {
  let target = source
  if (target == null) {
    target = creep.pos.findClosestByPath(FIND_SOURCES) as Source
  }
  if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
    creep.moveTo(target)
  }
}
