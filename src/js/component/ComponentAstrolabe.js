'use strict'
import '../../../index'
import {PublicStoreHandler, TypeCheck} from '@flexio-oss/hotballoon'
import {assert} from '@flexio-oss/assert'
import {StoreCalendarUtils} from '../stores/StoreCalendarUtils/StoreCalendarUtils'
import {StoreCalendarHandler} from '../stores/StoreCalendarUtils/StoreCalendarHandler'

export class ComponentAstrolabe {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {DaysEnum} startingDay
   */
  constructor(componentContext, startingDay) {
    assert(TypeCheck.isComponentContext(componentContext),
      'ComponentAstrolabe:constructor: `componentContext` argument should be ComponentContext'
    )
    this.__componentContext = componentContext
    this.__startingDay = startingDay
    /**
     *
     * @type {StoreCalendarUtils}
     * @private
     */
    this.__storeCalendar = new StoreCalendarUtils(this.__componentContext).build()

    /**
     *
     * @type {StoreCalendarHandler}
     * @private
     */
    this.__storeHandler = new StoreCalendarHandler(this.__storeCalendar.store(), this.__startingDay)

    /**
     *
     * @type {PublicStoreHandler}
     */
    this.publicStoreHandler = new PublicStoreHandler(this.__storeCalendar.store())
  }

  /**
   *
   * @param {number} year
   * @return {Year}
   */
  addYear(year) {
    return this.__storeHandler.addYear(year)
  }

  /**
   *
   * @param {number} year
   * @param {number} month
   */
  addMonth(year, month) {
    return this.__storeHandler.addMonth(year, month)
  }

  /**
   *
   * @param {number} year
   * @param {number} weekNumber
   * @return {DayList}
   */
  addWeek(year, weekNumber) {
    return this.__storeHandler.addWeek(year, weekNumber)
  }

  /**
   *
   * @param {number} year
   * @param {number} month
   * @return Month
   */
  getMonth(year, month) {
    return this.__storeHandler.getMonth(year,  month)
  }

  /**
   *
   * @param {number} year
   * @return Year
   */
  getYear(year) {
    return this.__storeHandler.getYear(year)
  }

  /**
   *
   * @param {number} year
   * @param {number} weekNumber
   * @return Array<Week>
   */
  getWeek(year, weekNumber) {
    return this.__storeHandler.getWeek(year,  weekNumber)
  }
}
