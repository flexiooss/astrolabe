import {DaysEnum} from '../types/DaysEnum'
import {DayList} from '../types/week/DayList'
import {DateExtended} from '@flexio-oss/extended-flex-types'
import {WeekList} from '../types/month/WeekList'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'


const WeekBuilder = globalFlexioImport.io.flexio.astrolabe.types.WeekBuilder
const MonthBuilder = globalFlexioImport.io.flexio.astrolabe.types.MonthBuilder

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
   * @param {number} weekNumber
   * @param {DaysEnum} startingDay
   * @return {Date}
   */
  static firstDayOfWeek(year, weekNumber, startingDay) {
    let firstDayOfWeek = new DateExtended(year, 0, 1)
    let w = 7 * (weekNumber - 1) - (((firstDayOfWeek.getDay() - startingDay) + 7) % 7)
    firstDayOfWeek.setDate(w + 1)
    return firstDayOfWeek
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
        dayList.set(currentDayId, currentDate.toLocaleFlexDate())
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
