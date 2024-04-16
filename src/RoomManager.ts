export default function manageRoom() {
  console.log("Managing Rooms")

  for (const roomName in Game.rooms) {
    const room: Room = Game.rooms[roomName]
    const sources: Source[] = room.find(FIND_SOURCES)
    const memory = room.memory as ICustomRoomMemory

    if (memory.sources == undefined) memory.sources = {}
    if (memory.allSourcesIdentified == undefined) memory.allSourcesIdentified = false

    identifySources(sources, memory)
  }
}

function identifySources(sources: Source[], memory: ICustomRoomMemory) {
  console.log("IdentifyingResources")

  sources.forEach(source => {
    console.log(`${source.room.name} -> ${source.id}`)
    if (memory.sources[source.id]) return // all sources already identifed

    console.log("sources is not identified")
    console.log(source.pos)

    let availableSlot = 0

    const surroundingPosition = getSuroundingPosition(source.pos)

    surroundingPosition.forEach(position => {
      const terrain = source.room.getTerrain().get(position.x, position.y)
      console.log(terrain)
      if (terrain == TERRAIN_MASK_SWAMP || terrain == 0) availableSlot++;
    })

    console.log("Total Available Slot", availableSlot)
    memory.sources[source.id] = {
      availableSpot: availableSlot,
      maxSpot: availableSlot
    }
  })
}
function getSuroundingPosition(position: RoomPosition): RoomPosition[] {
  const grid: RoomPosition[] = [];

  // Iterate through a 3x3 grid relative to the current position
  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      // Skip the current position
      if (xOffset === 0 && yOffset === 0) {
        continue;
      }

      const x = position.x + xOffset;
      const y = position.y + yOffset;

      // Push the point into the grid
      grid.push(new RoomPosition(x, y, position.roomName));
    }
  }

  return grid;
}

