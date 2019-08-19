import {StoreBuilder, InMemoryStoreParams, StoreTypeParam, TypeCheck, PublicStoreHandler} from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType} from '@flexio-oss/assert'
import {YearList} from '../../types/calendar/YearList'

const StoreCalendar = globalFlexioImport.io.flexio.astrolabe.stores.StoreCalendar
const StoreCalendarBuilder = globalFlexioImport.io.flexio.astrolabe.stores.StoreCalendarBuilder

export class StoreCalendarUtils {
  constructor() {
    this.__store = null
    this.__storePublic = null
  }

  /**
   *
   * @returns {StoreCalendarUtils}
   */
  build(componentContext) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'StoreCalendarUtils:constructor: `componentContext` should be a ComponentContext'
    )
    this.__store = componentContext.addStore(StoreBuilder.InMemory(
      new InMemoryStoreParams(
        new StoreTypeParam(
          StoreCalendar,
          /**
           *
           * @param {StoreCalendar} data
           * @return {StoreCalendar}
           */
          (data) => {
            return data
          },
          /**
           *
           * @param {StoreCalendar} data
           * @return {boolean}
           */
          (data) => {
            return true
          },
          /**
           *
           * @param {Object} obj
           * @return {StoreCalendar}
           */
          (obj) => StoreCalendarBuilder.fromObject(obj).build()
        ),
        new StoreCalendarBuilder().years(new YearList()).build()
      )
    ))
    this.__storePublic = new PublicStoreHandler(this.__store)
    return this
  }

  /**
   *
   * @returns {Store<StoreCalendar>}
   */
  store() {
    return this.__store
  }

  /**
   *
   * @returns {PublicStoreHandler}
   */
  storePublic() {
    return this.__storePublic
  }
}
