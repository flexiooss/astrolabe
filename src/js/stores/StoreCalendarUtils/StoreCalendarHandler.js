import {GetDate} from '../../utils/GetDate'
import {DateExtended} from '@flexio-oss/extended-flex-types'
import {MonthList} from '../../types/year/MonthList'
import {Year} from '../../types/Year'
import {DayList} from '../../types/week/DayList'

export class StoreCalendarHandler {
  /**
   *
   * @param {Store<StoreCalendar>} store
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
    return this.__store.state().data
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
    return  firstDayOfWeek
  }

  /**
   *
   * @param {Number} year
   * @param {Number} month
   */
  addMonth(year, month) {
    let res = null
    let yearList = this.__calendar().years()
    if (!this.__calendar().years().has(year)) {
      yearList.set(year, new Year(year, new MonthList()))
    }
    if (!yearList.get(year).months().has(month)) {
      yearList.get(year).withMonths(new MonthList())
      res = GetDate.getMonth(year, month, this.__startingDay)
      yearList.get(year)
        .months().set(month, res)
      this.__store.set(this.__store.state().data.withYears(yearList))
    }
    return res
  }

  /**
   *
   * @param {Number} year
   * @return {Year}
   */
  addYear(year) {
    let yearList = this.__calendar().years()
    if (!(yearList.has(year) && yearList.months().size === 12)) {
      for (let i = 0; i < 12; i++) {
        this.addMonth(year, i)
      }
    }
    return this.getYear(year)
  }

  /**
   *
   * @param {Number} year
   * @param {Number} weekNumber
   * @return {DayList}
   */
  addWeek(year, weekNumber) {
    let firstDayOfWeek = this.__firstDayOfWeek(year, weekNumber)

    let monthSize = firstDayOfWeek.getDaysInMonth()
    this.addMonth(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth())
    if ((firstDayOfWeek.getDate() + 6) > monthSize) {
      firstDayOfWeek.setMonth(firstDayOfWeek.getMonth() + 1, 1)

      this.addMonth(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth())
    }
    return this.getWeek(year, weekNumber)
  }


  /**
   *
   * @param {number} year
   * @return {Year}
   */
  getYear(year) {
    return this.__calendar().years().get(year)
  }

  /**
   *
   * @param {number} year
   * @param {number} month
   * @return {Month}
   */
  getMonth(year, month) {
    return this.__calendar().years().get(year).months().get(month)
  }


  /**
   *
   * @param {number} year
   * @param {number} weekNumber
   * @return {DayList}
   */
  getWeek(year, weekNumber) {
    let yearList = this.__calendar().years()
    /**
     *
     * @type {DayList}
     */
    let res = new DayList()
    let firstDayOfWeek = this.__firstDayOfWeek(year, weekNumber)

    let monthSize = firstDayOfWeek.getDaysInMonth()
    if (yearList.has(firstDayOfWeek.getFullYear())
      && yearList.get(firstDayOfWeek.getFullYear()).months().has(firstDayOfWeek.getMonth())) {
        res = yearList.get(firstDayOfWeek.getFullYear())
            .months().get(firstDayOfWeek.getMonth())
            .weeks().get(GetDate.getWeekIdInMonth(firstDayOfWeek, this.__startingDay)).days()
    }
    if ((firstDayOfWeek.getDate() + 6) > monthSize) {
      firstDayOfWeek.setMonth(firstDayOfWeek.getMonth() + 1, 1)
      if (yearList.has(firstDayOfWeek.getFullYear())
        && yearList.get(firstDayOfWeek.getFullYear()).months().has(firstDayOfWeek.getMonth())) {
        res = new DayList([...res, ...yearList.get(firstDayOfWeek.getFullYear())
            .months().get(firstDayOfWeek.getMonth())
            .weeks().get(0).days()]
        )
      }
    }
    return res
  }
}