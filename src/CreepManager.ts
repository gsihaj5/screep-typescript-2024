import Harvester from "./Roles/Harvester";

export default function manageCreep() {
  console.log("Managing Creeps")
  runCreep()
  clearCreepMemory();
}

function clearCreepMemory() {
  for (const name in Memory.creeps) {

    if (!(name in Game.creeps)) {
      const creepMemory = Memory.creeps[name] as ICustomCreepMemory
      if (creepMemory.roomId) {
        const roomMemory = Game.rooms[creepMemory.roomId].memory as ICustomRoomMemory
        if (creepMemory.sourceId) {
          roomMemory.sources[creepMemory.sourceId].availableSpot++
        }
      }

      delete Memory.creeps[name];
    }
  }
}

function runCreep() {
  for (const creepName in Game.creeps) {
    const creep: Creep = Game.creeps[creepName]
    const role: string = (creep.memory as ICustomCreepMemory).role
    runCreepByRole(role, creep);
  }
}

function runCreepByRole(role: string, creep: Creep) {
  switch (role) {
    case "harvester": (new Harvester(creep)).run();
      break;
  }
}

