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
     * @property {ComponentAstrolabe} ComponentFilterPublic.__component
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
    this[__component].addWeek(year, weekNumber)
  }

  /**
   *
   * @param {number} year
   * @param {number} month
   * @return Month
   */
  getMonth(year, month) {
    return tthis[__component].getMonth(year,  month)
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
   * @return Array<Week>
   */
  getWeek(year, weekNumber) {
    return  this[__component].getWeek(year,  weekNumber)
  }
}
