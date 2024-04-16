interface roomSourceAvaliability {
  maxSpot: number
  availableSpot: number
}

interface ICustomRoomMemory {
  allSourcesIdentified: boolean
  sources: {
    [sourceId: string]: roomSourceAvaliability
  }
}
