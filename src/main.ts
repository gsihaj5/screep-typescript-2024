import Harvester from "./Roles/Harvester";
import ICreepRole from "./Roles/ICreepRole";
import Spawner from "./Spawner";

export function loop() {
  const spawner = new Spawner(Game.spawns.Spawn1)
  spawner.spawn()

  for (const creepName in Game.creeps) {
    const creep: Creep = Game.creeps[creepName]
    const role: string = (creep.memory as ICustomCreepMemory).role
    runCreep(role, creep);
  }

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
}

function runCreep(role: string, creep: Creep) {
  switch (role) {
    case "harvester": (new Harvester(creep)).run();
      break;
  }
}

