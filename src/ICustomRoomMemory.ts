interface RoomSourceAvaliability {
  maxSpot: number
  availableSpot: number
  haulerSpot: number
}

interface ICustomRoomMemory {
  allSourcesIdentified: boolean
  sources: {
    [sourceId: string]: RoomSourceAvaliability
  }
}
