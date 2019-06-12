import {DaysEnum} from '../types/DaysEnum'
import {MonthBuilder} from '../types/Month'
import {DayList} from '../types/week/DayList'
import {DateExtended} from '@flexio-oss/extended-flex-types'
import {WeekBuilder} from '../types/Week'
import {WeekList} from '../types/month/WeekList'

export class GetDate {
  /**
   *
   * @param {Date} date
   * @param {DaysEnum} dayEnum
   * @return {number}
   */
  static getWeekIdInMonth(date, dayEnum = DaysEnum.SUN) {
    let firstDayId = ((new DateExtended(date.getFullYear(), date.getMonth()).getDay() - dayEnum) + 7) % 7
    let rank = date.getDate() + firstDayId
    return Math.floor(rank / 7)
  }

  /**
   *
   * @param {number} year
   * @param {number} month
   * @param {DaysEnum} dayEnum
   * @return {Month}
   */
  static getMonth(year, month, dayEnum = DaysEnum.SUN) {
    let currentWeek = new WeekBuilder()
    let monthStorage = new MonthBuilder()
    let weekList = new WeekList()

    let selectedDate = new DateExtended(year, month)
    let monthSize = selectedDate.getDaysInMonth()

    let currentDay = 1
    let currentDate = new DateExtended()
    let currentDayId = ((selectedDate.getDay() - dayEnum) + 7) % 7
    let currentWeekId = 0
    while (currentDay <= monthSize) {
      let dayList = new DayList()
      while (currentDayId < 7 && currentDay <= monthSize) {
        currentDate = new DateExtended(year, month, currentDay)
        dayList.set(currentDayId, currentDate)
        currentDayId++
        currentDay++
      }
      currentWeek.days(dayList)
        .year(currentDate.getFullYear())
        .month(currentDate.getMonth())
        .week(currentWeekId)
      weekList.set(currentWeekId, currentWeek.build())
      currentDayId = 0
      currentWeekId++
    }
    return monthStorage.weeks(weekList).year(year).month(month).build()
  }
}
