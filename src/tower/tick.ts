export default function tick(tower: StructureTower) {
  const intruders = tower.room.find(FIND_HOSTILE_CREEPS)
  const target = tower.pos.findClosestByPath(intruders)
  if (target != null) {
    tower.attack(target)
  }
}
