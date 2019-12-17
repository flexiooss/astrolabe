import {assertType, assert, isNumber} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {ActionDispatcherBuilder, TypeCheck} from '@flexio-oss/hotballoon'

export class ActionGetYear {
  /**
   * @private
   * @param {ActionDispatcher<GetYear, GetYearBuilder>} action
   */
  constructor(action) {
    this.__action = action
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionGetYear}
   */
  static create(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionGetYear:create: `dispatcher` should be a Dispatcher'
    )
    return new ActionGetYear(
      new ActionDispatcherBuilder()
        .type(globalFlexioImport.io.flexio.astrolabe.actions.GetYear)
        .dispatcher(dispatcher)
        .build()
    )
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Store<Calendar>} storeCalendar
   * @param {ActionDispatcher<GetMonth, GetMonthBuilder>} actionGetMonth
   * @returns {ActionGetYear}
   */
  listen(componentContext, storeCalendar, actionGetMonth) {
    this.__action.listenWithCallback(
      /**
       *
       * @param {GetYear} payload
       */
      (payload) => {
        let yearList = storeCalendar.state().data().years()
        if (!yearList.has(payload.year()) || yearList.months().size !== 12) {
          for (let i = 0; i < 12; i++) {
            actionGetMonth.dispatch(
              actionGetMonth.payloadBuilder()
                .year(payload.year())
                .month(i)
                .build())
          }
        }
      },
      componentContext
    )
    return this
  }

  /**
   *
   * @param {Number} year
   * @param storeCalendar
   * @param {ActionDispatcher<GetMonth, GetMonthBuilder>}actionGetMonth
   */
  addYear(year, storeCalendar, actionGetMonth) {

  }

  /**
   *
   * @returns {ActionDispatcher<GetYear, GetYearBuilder>}
   */
  action() {
    return this.__action
  }
}
