import {ComponentAstrolabe} from './component/ComponentAstrolabe'
import {ComponentAstrolabePublic} from './component/ComponentAstrolabePublic'

export class ComponentAstrolabeBuilder {
  /**
   *
   * @param {HotBalloonApplication} APP
   * @param {DaysEnum} startingDay
   * @return {ComponentAstrolabePublic}
   */
  static build(APP, startingDay) {
    return new ComponentAstrolabePublic(
      new ComponentAstrolabe(
        APP.addComponentContext(),
        startingDay
      )
    )
  }
}
