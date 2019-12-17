import {deepKeyAssigner} from '@flexio-oss/js-generator-helpers'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {YearList, YearListBuilder} from './calendar/YearList'
import {MonthList, MonthListBuilder} from './year/MonthList'
import {WeekList, WeekListBuilder} from './month/WeekList'
import {DayList, DayListBuilder} from './week/DayList'

/**
 * @property {YearList}  YearList
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.astrolabe.types.YearList', YearList)

/**
 * @property {YearListBuilder}  YearListBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.astrolabe.types.YearListBuilder', YearListBuilder)

/**
 * @property {MonthList}  MonthList
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.astrolabe.types.MonthList', MonthList)


/**
 * @property {MonthListBuilder}  MonthListBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.astrolabe.types.MonthListBuilder', MonthListBuilder)

/**
 * @property {WeekList}  WeekList
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.astrolabe.types.WeekList', WeekList)

/**
 * @property {WeekListBuilder}  WeekListBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.astrolabe.types.WeekListBuilder', WeekListBuilder)

/**
 * @property {DayList}  DayList
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.astrolabe.types.DayList', DayList)

/**
 * @property {DayListBuilder}  DayListBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.astrolabe.types.DayListBuilder', DayListBuilder)
