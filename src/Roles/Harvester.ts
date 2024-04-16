import BodyGenerator from "../BodyGenerator"
import ICreepRole from "./ICreepRole"

export default class Harvester implements ICreepRole {
  constructor(
    private creep: Creep
  ) { }

  run() {
    console.log("Harvester running")

  }

  harvest() {

  }
}

export function spawnHarvester(
  spawner: StructureSpawn,
  name: string,
  room: Room
) {
  console.log("spawning harvester")
  const roomMemory = room.memory as ICustomRoomMemory
  for (const sourceId in roomMemory.sources) {
    const availability = roomMemory.sources[sourceId];
    if (!availability) continue

    if (availability.availableSpot > 0) {
      spawner.spawnCreep(BodyGenerator.harvester(), name, {
        memory: {
          role: "harvester",
          sourceId: sourceId,
          roomId: room.name
        }
      })
      availability.availableSpot--;
      break;
    }
  }
  console.log("no more available spot in this room")
}

