import { expect } from 'chai'
import { serializeRoomPosition, deserializeRoomPosition } from '../../src/room/utils'

class MockRoomPosition {
  x: number
  y: number
  roomName: string

  constructor (x: number, y: number, roomName: string) {
    this.x = x
    this.y = y
    this.roomName = roomName
  }
}

describe('room utils', function () {
  describe('serializeRoomPosition', function () {
    it('should serialize correctly', function () {
      const serialized = serializeRoomPosition(new MockRoomPosition(2, 42, 'E323D') as RoomPosition)
      expect(serialized).to.equal('0242E323D')
    })
  })

  describe('deserializeRoomPosition', function () {
    beforeEach(function () {
      // @ts-expect-error
      global.RoomPosition = MockRoomPosition
    })
    it('should deserialize correctly', function () {
      const position = deserializeRoomPosition('0242E323D')
      expect(position).to.deep.equal(new MockRoomPosition(2, 42, 'E323D'))
    })
  })
})
