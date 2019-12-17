import {assertType} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {ActionDispatcherBuilder, TypeCheck} from '@flexio-oss/hotballoon'
import {DateExtended} from '@flexio-oss/extended-flex-types'
import {GetDate} from '../utils/GetDate'

export class ActionGetWeek {
  /**
   * @private
   * @param {ActionDispatcher<GetWeek, GetWeekBuilder>} action
   */
  constructor(action) {
    this.__action = action
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionGetWeek}
   */
  static create(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionLoadLogsMaker:init: `dispatcher` should be a Dispatcher'
    )
    return new ActionGetWeek(
      new ActionDispatcherBuilder()
        .type(globalFlexioImport.io.flexio.astrolabe.actions.GetWeek)
        .dispatcher(dispatcher)
        .build()
    )
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Store<Calendar>} storeCalendar
   * @param {ActionDispatcher<GetMonth, GetMonthBuilder>} actionGetMonth
   * @param {DaysEnum} startingDay
   * @returns {ActionGetWeek}
   */
  listen(componentContext, storeCalendar, actionGetMonth, startingDay) {
    this.__action.listenWithCallback(
      /**
       *
       * @param {GetWeek} payload
       */
      (payload) => {
        let firstDayOfWeek = GetDate.firstDayOfWeek(payload.year(), payload.week(), startingDay)

        let monthSize = firstDayOfWeek.getDaysInMonth()
        actionGetMonth.dispatch(actionGetMonth.payloadBuilder()
          .year(firstDayOfWeek.getFullYear())
          .month(firstDayOfWeek.getMonth())
          .build())

        if ((firstDayOfWeek.getDate() + 6) > monthSize) {
          firstDayOfWeek.setMonth(firstDayOfWeek.getMonth() + 1, 1)

          actionGetMonth.dispatch(actionGetMonth.payloadBuilder()
            .year(firstDayOfWeek.getFullYear())
            .month(firstDayOfWeek.getMonth())
            .build())
        }
      },
      componentContext
    )
    return this
  }

  /**
   *
   * @returns {ActionDispatcher<GetWeek, GetWeekBuilder>}
   */
  action() {
    return this.__action
  }
}
