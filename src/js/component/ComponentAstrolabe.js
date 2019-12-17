'use strict'
import {TypeCheck} from '@flexio-oss/hotballoon'
import {assert, isNumber} from '@flexio-oss/assert'
import {StoreCalendar} from '../stores/StoreCalendarUtils/StoreCalendar'
import {ActionGetYear} from '../actions/ActionGetYear'
import {ActionGetMonth} from '../actions/ActionGetMonth'
import {ActionGetWeek} from '../actions/ActionGetWeek'
import {DateExtended} from '@flexio-oss/extended-flex-types'
import {DayList} from '../types/week/DayList'
import {GetDate} from '../utils/GetDate'

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
     * @type {StoreCalendar}
     * @private
     */
    this.__storeCalendar = StoreCalendar.create(this.__componentContext)

    this.__actionGetYear = ActionGetYear.create(this.__componentContext.dispatcher())
    this.__actionGetMonth = ActionGetMonth.create(this.__componentContext.dispatcher())
    this.__actionGetWeek = ActionGetWeek.create(this.__componentContext.dispatcher())

    this.__actionGetYear.listen(this.__componentContext, this.__storeCalendar.store(), this.__actionGetMonth.action())
    this.__actionGetMonth.listen(this.__componentContext, this.__storeCalendar.store(), this.__startingDay)
    this.__actionGetWeek.listen(this.__componentContext, this.__storeCalendar.store(), this.__actionGetMonth.action(), this.__startingDay)
  }

  /**
   *
   * @param {number} year
   * @return {Year}
   */
  getYear(year) {
    assert(
      isNumber(year), 'StoreCalendarHandler:getYear: year should be a number, `%s` given',
      typeof (year)
    )
    if (!this.__storeCalendar.store().state().data().years().has(year)) {
      this.addYear(year)
    }
    return this.__storeCalendar.store().state().data().years().get(year)
  }

  addYear(year) {
    this.__actionGetYear.action().dispatch(
      this.__actionGetYear.action().payloadBuilder().year(year).build()
    )
  }

  /**
   *
   * @param {number} year
   * @param {number} month
   * @return {Month}
   */
  getMonth(year, month) {
    assert(
      isNumber(year), 'StoreCalendarHandler:getMonth: year should be a number, `%s` given',
      typeof (year)
    )
    assert(
      isNumber(month), 'StoreCalendarHandler:getMonth: month should be a number, `%s` given',
      typeof (month)
    )
    let MonthDate = new DateExtended(year, month)
    year = MonthDate.getFullYear()
    month = MonthDate.getMonth()
    if (!this.__storeCalendar.store().state().data().years().has(year) ||
      !this.__storeCalendar.store().state().data().years().get(year).months().has(month)) {
      this.addMonth(year, month)
    }
    return this.__storeCalendar.store().state().data().years().get(year).months().get(month)
  }

  /**
   *
   * @param {number} year
   * @param {number} month
   */
  addMonth(year, month) {
    this.__actionGetMonth.action().dispatch(
      this.__actionGetMonth.action().payloadBuilder().year(year).month(month).build()
    )
  }

  /**
   *
   * @param {number} year
   * @param {number} weekNumber
   * @return {DayList}
   */
  getWeek(year, weekNumber) {
    assert(
      isNumber(year), 'StoreCalendarHandler:getWeek: year should be a number, `%s` given',
      typeof (year)
    )
    assert(
      isNumber(weekNumber), 'StoreCalendarHandler:getWeek: weekNumber should be a number, `%s` given',
      typeof (weekNumber)
    )
    this.addWeek(year, weekNumber)

    let yearList = this.__storeCalendar.store().state().data().years()
    let res = new DayList()
    let firstDayOfWeek = GetDate.firstDayOfWeek(year, weekNumber, this.__startingDay)

    let monthSize = firstDayOfWeek.getDaysInMonth()
    if (yearList.has(firstDayOfWeek.getFullYear()) && yearList.get(firstDayOfWeek.getFullYear()).months().has(firstDayOfWeek.getMonth())) {
      res = yearList.get(firstDayOfWeek.getFullYear())
        .months().get(firstDayOfWeek.getMonth())
        .weeks().get(GetDate.getWeekIdInMonth(firstDayOfWeek, this.__startingDay)).days()
    }
    if ((firstDayOfWeek.getDate() + 6) > monthSize) {
      firstDayOfWeek.setMonth(firstDayOfWeek.getMonth() + 1, 1)
      if (yearList.has(firstDayOfWeek.getFullYear()) && yearList.get(firstDayOfWeek.getFullYear()).months().has(firstDayOfWeek.getMonth())) {
        res = new DayList([...res, ...yearList.get(firstDayOfWeek.getFullYear())
          .months().get(firstDayOfWeek.getMonth())
          .weeks().get(0).days()]
        )
      }
    }
    return res
  }

  /**
   *
   * @param {number} year
   * @param {number} weekNumber
   */
  addWeek(year, weekNumber) {
    this.__actionGetWeek.action().dispatch(
      this.__actionGetWeek.action().payloadBuilder().year(year).week(weekNumber).build()
    )
  }
}
