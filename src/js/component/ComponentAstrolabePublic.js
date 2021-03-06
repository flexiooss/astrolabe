import {assertType} from '@flexio-oss/assert'
import {ComponentAstrolabe} from './ComponentAstrolabe'

const __component = Symbol('__componentCalendarPublic')

export class ComponentAstrolabePublic {
  /**
   *
   * @param {ComponentAstrolabe} component
   */
  constructor(component) {
    assertType(component instanceof ComponentAstrolabe,
      'ComponentAstrolabePublic:constructor: `component` should be a ComponentAstrolabe'
    )
    /**
     * @private
     * @property {ComponentAstrolabe} ComponentAstrolabe.__component
     */
    this[__component] = component
  }

  /**
   *
   * @param {number} year
   */
  addYear(year) {
    this[__component].addYear(year)
  }

  /**
   *
   * @param {number} year
   * @param {number} month
   */
  addMonth(year, month) {
    this[__component].addMonth(year, month)
  }

  /**
   *
   * @param {number} year
   * @param {number} weekNumber
   */
  addWeek(year, weekNumber) {
    return this[__component].addWeek(year, weekNumber)
  }

  /**
   *
   * @param {number} year
   * @param {number} month
   * @return Month
   */
  getMonth(year, month) {
    return this[__component].getMonth(year, month)
  }

  /**
   *
   * @param {number} year
   * @return Year
   */
  getYear(year) {
    return this[__component].getYear(year)
  }

  /**
   *
   * @param {number} year
   * @param {number} weekNumber
   * @return DayList
   */
  getWeek(year, weekNumber) {
    return this[__component].getWeek(year, weekNumber)
  }
}
