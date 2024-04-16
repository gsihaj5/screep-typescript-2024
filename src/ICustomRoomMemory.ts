interface roomSourceAvaliability {
  availableSpot: number
}

interface ICustomRoomMemory {
  allSourcesIdentified: boolean
  sources: {
    [sourceId: string]: roomSourceAvaliability
  }
}
