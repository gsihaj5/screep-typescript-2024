import BodyGenerator from "../BodyGenerator"
import ICreepRole from "./ICreepRole"

export default class Harvester implements ICreepRole {
  private memory: ICustomCreepMemory
  constructor(
    private creep: Creep
  ) {
    this.memory = creep.memory as ICustomCreepMemory
  }

  run() {


  }

  findPathToResource() {

  }

  harvest() {

  }
}

export function spawnHauler(
  spawner: StructureSpawn,
  name: string,
  room: Room
) {
  console.log("spawning Hauler")
  const roomMemory = room.memory as ICustomRoomMemory
  for (const sourceId in roomMemory.sources) {
    const availability = roomMemory.sources[sourceId];
    if (!availability) continue

    if (availability.haulerSpot > 0) {
      spawner.spawnCreep(BodyGenerator.hauler(), name, {
        memory: {
          role: "hauler",
          sourceId: sourceId,
          roomId: room.name
        }
      })
      availability.haulerSpot--;
      break;
    }
  }
  console.log("No more Hauler Spot")
}

