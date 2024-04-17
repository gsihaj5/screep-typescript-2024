
export default class BodyGenerator {
  static harvester(): BodyPartConstant[] {

    return [WORK, MOVE]
  }

  static hauler(): BodyPartConstant[] {

    return [MOVE, MOVE, CARRY, CARRY]

  }
}
