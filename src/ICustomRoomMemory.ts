interface RoomSourceAvaliability {
  maxSpot: number
  availableSpot: number
}

interface ICustomRoomMemory {
  allSourcesIdentified: boolean
  sources: {
    [sourceId: string]: RoomSourceAvaliability
  }
}
