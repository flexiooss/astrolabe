import {ComponentAstrolabe} from './component/ComponentAstrolabe'
import {ComponentAstrolabePublic} from './component/ComponentAstrolabePublic'

export class ComponentAstrolabeBuilder {
  /**
   *
   * @param {HotBalloonApplication} APP
   * @return {ComponentAstrolabePublic}
   */
  static build(APP) {
    return new ComponentAstrolabePublic(
      new ComponentAstrolabe(
        APP.addComponentContext()
      )
    )
  }
}
