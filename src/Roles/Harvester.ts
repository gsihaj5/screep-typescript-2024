import BodyGenerator from "../BodyGenerator"
import ICreepRole from "./ICreepRole"

export default class Harvester implements ICreepRole {
  private memory: ICreepHarvesterMemory
  private source?: Source
  constructor(
    private creep: Creep
  ) {
    this.memory = creep.memory as ICreepHarvesterMemory
    if (!this.memory.sourceId) return
    this.source = Game.getObjectById(this.memory.sourceId) as Source
  }

  run() {
    if (!this.source) return

    if (this.creep.harvest(this.source) == ERR_NOT_IN_RANGE)
      if (!this.memory.serializedPath) this.findPathToResource()
      else this.creep.moveByPath(this.memory.serializedPath)

  }

  findPathToResource() {
    if (!this.source) return
    const path = this.creep.pos.findPathTo(this.source)
    this.memory.serializedPath = Room.serializePath(path)
    console.log(this.memory)
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

