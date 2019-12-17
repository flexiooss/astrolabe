import {ComponentAstrolabe} from './ComponentAstrolabe'
import {ComponentAstrolabePublic} from './ComponentAstrolabePublic'
import {TypeCheck} from '@flexio-oss/hotballoon/src/js/Types/TypeCheck'
import {assertType} from '@flexio-oss/assert'

export class AstrolabeBuilder {
  constructor() {
    this.__application = null
    this.__firstDay = null
  }

  /**
   *
   * @param {HotBalloonApplication} application
   * @return {AstrolabeBuilder}
   */
  application(application) {
    assertType(
      TypeCheck.isHotballoonApplication(application),
      'AstrolabeBuilder:constructor: `APP` argument should be an instanceof HotballoonApplication, %s given',
      typeof application)
    this.__application = application
    return this
  }

  /**
   *
   * @param {DaysEnum} firstDay
   * @return {AstrolabeBuilder}
   */
  firstDay(firstDay) {
    this.__firstDay = firstDay
    return this
  }

  /**
   *
   * @return {ComponentAstrolabePublic}
   */
  build() {
    return new ComponentAstrolabePublic(
      new ComponentAstrolabe(
        this.__application.addComponentContext(),
        this.__firstDay
      )
    )
  }
}
