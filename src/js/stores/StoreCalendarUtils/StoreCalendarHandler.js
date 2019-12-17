import {GetDate} from '../../utils/GetDate'
import {MonthList} from '../../types/year/MonthList'
import {DayList} from '../../types/week/DayList'
import {DateExtended} from '@flexio-oss/extended-flex-types'
import {assert, isNumber} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

const YearBuilder = globalFlexioImport.io.flexio.astrolabe.types.YearBuilder

export class StoreCalendarHandler {
  /**
   *
   * @param {Store<Calendar>} store
   * @param {DaysEnum} startingDay
   */
  constructor(store, startingDay) {
    this.__store = store
    this.__startingDay = startingDay
  }

  /**
   * @return {StoreCalendar}
   * @private
   */
  __calendar() {
    return this.__store.state().data()
  }

  /**
   *
   * @param {number} year
   * @param {number} weekNumber
   * @return {Date}
   * @private
   */
  __firstDayOfWeek(year, weekNumber) {
    let firstDayOfWeek = new DateExtended(year, 0, 1)
    let w = 7 * (weekNumber - 1) - (((firstDayOfWeek.getDay() - this.__startingDay) + 7) % 7)
    firstDayOfWeek.setDate(w + 1)
    return firstDayOfWeek
  }

  /**
   *
   * @param {Number} year
   */
  addYear(year) {
    assert(
      isNumber(year), 'StoreCalendarHandler:addYear: year should be a number, `%s` given',
      typeof (year)
    )
    let yearList = this.__calendar().years()
    if (!yearList.has(year) || yearList.months().size !== 12) {
      for (let i = 0; i < 12; i++) {
        this.addMonth(year, i)
      }
    }
  }

  /**
   *
   * @param {Number} year
   * @param {Number} month
   */
  addMonth(year, month) {
    assert(
      isNumber(year), 'StoreCalendarHandler:addMonth: year should be a number, `%s` given',
      typeof (year)
    )
    assert(
      isNumber(month), 'StoreCalendarHandler:addMonth: month should be a number, `%s` given',
      typeof (month)
    )
    let MonthDate = new DateExtended(year, month)
    year = MonthDate.getFullYear()
    month = MonthDate.getMonth()
    let res = null
    let yearList = this.__calendar().years()
    if (!this.__calendar().years().has(year)) {
      yearList = yearList.with(year, new YearBuilder().year(year).months(new MonthList()).build())
    }

    if (!yearList.get(year).months().has(month)) {
      yearList.get(year).withMonths(new MonthList())
      res = GetDate.getMonth(year, month, this.__startingDay)
      let monthList = yearList.get(year).months().with(month, res)
      let currentYear = yearList.get(year).withMonths(monthList)
      yearList = yearList.with(year, currentYear)
      this.__store.set(this.__store.state().data().withYears(yearList))
    }
  }

  /**
   *
   * @param {Number} year
   * @param {Number} weekNumber
   */
  addWeek(year, weekNumber) {
    assert(
      isNumber(year), 'StoreCalendarHandler:addWeek: year should be a number, `%s` given',
      typeof (year)
    )
    assert(
      isNumber(weekNumber), 'StoreCalendarHandler:addWeek: weekNumber should be a number, `%s` given',
      typeof (weekNumber)
    )
    let firstDayOfWeek = this.__firstDayOfWeek(year, weekNumber)

    let monthSize = firstDayOfWeek.getDaysInMonth()
    this.addMonth(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth())
    if ((firstDayOfWeek.getDate() + 6) > monthSize) {
      firstDayOfWeek.setMonth(firstDayOfWeek.getMonth() + 1, 1)

      this.addMonth(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth())
    }
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
    if (this.__calendar().years().has(year)) {
      return this.__calendar().years().get(year)
    }
    return null
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
    if (this.__calendar().years().has(year) &&
      this.__calendar().years().get(year).months().has(month)) {
      return this.__calendar().years().get(year).months().get(month)
    }
    return null
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
    let yearList = this.__calendar().years()
    /**
     *
     * @type {DayList}
     */
    let res = new DayList()
    let firstDayOfWeek = this.__firstDayOfWeek(year, weekNumber)

    let monthSize = firstDayOfWeek.getDaysInMonth()
    if (yearList.has(firstDayOfWeek.getFullYear()) &&
      yearList.get(firstDayOfWeek.getFullYear()).months().has(firstDayOfWeek.getMonth())) {
      res = yearList.get(firstDayOfWeek.getFullYear())
        .months().get(firstDayOfWeek.getMonth())
        .weeks().get(GetDate.getWeekIdInMonth(firstDayOfWeek, this.__startingDay)).days()
    }
    if ((firstDayOfWeek.getDate() + 6) > monthSize) {
      firstDayOfWeek.setMonth(firstDayOfWeek.getMonth() + 1, 1)
      if (yearList.has(firstDayOfWeek.getFullYear()) &&
        yearList.get(firstDayOfWeek.getFullYear()).months().has(firstDayOfWeek.getMonth())) {
        res = new DayList([...res, ...yearList.get(firstDayOfWeek.getFullYear())
          .months().get(firstDayOfWeek.getMonth())
          .weeks().get(0).days()]
        )
      }
    }
    if (res.size) {
      return res
    }
    return null
  }
}
