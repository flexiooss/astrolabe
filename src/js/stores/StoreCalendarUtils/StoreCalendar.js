import {InMemoryStoreBuilder, TypeCheck} from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType} from '@flexio-oss/assert'
import {StoreCalendarHandler} from './StoreCalendarHandler'


export class StoreCalendar {
  /**
   * @private
   * @param {Store<Calendar>} store
   */
  constructor(store) {
    this.__store = store
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @returns {StoreCalendar}
   */
  static create(componentContext) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'StoreSelectedFilters:build: `componentContext` should be a ComponentContext'
    )
    return new StoreCalendar(
      componentContext.addStore(
        new InMemoryStoreBuilder()
          .type(globalFlexioImport.io.flexio.astrolabe.stores.Calendar)
          .initialData(
            new globalFlexioImport.io.flexio.astrolabe.stores.CalendarBuilder()
              .years(new globalFlexioImport.io.flexio.astrolabe.types.YearList()).build()
          )
          .build()
      )
    )
  }

  /**
   *
   * @returns {Store<Calendar>}
   */
  store() {
    return this.__store
  }

  /**
   *
   * @param {DaysEnum} firstDay
   * @returns {StoreCalendarHandler<Calendar>}
   */
  storePublic(firstDay) {
    return new StoreCalendarHandler(this.__store, firstDay)
  }
}
