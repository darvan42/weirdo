export function serializeRoomPosition (pos: RoomPosition): string {
  return pos.x.toString().padStart(2, '0').concat(pos.y.toString().padStart(2, '0')).concat(pos.roomName)
}

export function deserializeRoomPosition (data: string): RoomPosition {
  const x = data.substring(0, 2)
  const y = data.substring(2, 4)
  const roomName = data.substring(4)
  return new RoomPosition(parseInt(x), parseInt(y), roomName)
}
