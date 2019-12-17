import {assertType} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {ActionDispatcherBuilder, TypeCheck} from '@flexio-oss/hotballoon'
import {DateExtended} from '@flexio-oss/extended-flex-types'
import {MonthList} from '../types/year/MonthList'
import {GetDate} from '../utils/GetDate'

export class ActionGetMonth {
  /**
   * @private
   * @param {ActionDispatcher<GetMonth, GetMonthBuilder>} action
   */
  constructor(action) {
    this.__action = action
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionGetMonth}
   */
  static create(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionLoadLogsMaker:init: `dispatcher` should be a Dispatcher'
    )
    return new ActionGetMonth(
      new ActionDispatcherBuilder()
        .type(globalFlexioImport.io.flexio.astrolabe.actions.GetMonth)
        .dispatcher(dispatcher)
        .build()
    )
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Store<Calendar>} storeCalendar
   * @param {DaysEnum} startingDay
   * @returns {ActionGetMonth}
   */
  listen(componentContext, storeCalendar, startingDay) {
    this.__action.listenWithCallback(
      /**
       *
       * @param {GetMonth} payload
       */
      (payload) => {
        let MonthDate = new DateExtended(payload.year(), payload.month())
        let year = MonthDate.getFullYear()
        let month = MonthDate.getMonth()
        let res = null
        let yearList = storeCalendar.state().data().years()
        if (!storeCalendar.state().data().years().has(year)) {
          yearList = yearList.with(year,
            new globalFlexioImport.io.flexio.astrolabe.types
              .YearBuilder()
              .year(year)
              .months(new MonthList())
              .build())
        }

        if (!yearList.get(year).months().has(month)) {
          yearList.get(year).withMonths(new MonthList())
          res = GetDate.getMonth(year, month, startingDay)
          let monthList = yearList.get(year).months().with(month, res)
          let currentYear = yearList.get(year).withMonths(monthList)
          yearList = yearList.with(year, currentYear)
          storeCalendar.set(storeCalendar.state().data().withYears(yearList))
        }
      },
      componentContext
    )
    return this
  }

  /**
   *
   * @returns {ActionDispatcher<GetMonth, GetMonthBuilder>}
   */
  action() {
    return this.__action
  }
}
