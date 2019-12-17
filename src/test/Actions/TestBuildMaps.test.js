import '../../../index'
import {TestCase} from 'code-altimeter-js'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {DayList, DayListBuilder} from '../../js/types/week/DayList'
import {FlexDate} from '@flexio-oss/flex-types'
import {WeekList, WeekListBuilder} from '../../js/types/month/WeekList'
import {MonthList, MonthListBuilder} from '../../js/types/year/MonthList'
import {YearList, YearListBuilder} from '../../js/types/calendar/YearList'

const Week = globalFlexioImport.io.flexio.astrolabe.types.Week
const Month = globalFlexioImport.io.flexio.astrolabe.types.Month
const Year = globalFlexioImport.io.flexio.astrolabe.types.Year

const assert = require('assert')

export class TestBuildMaps extends TestCase {
  testBuildMapDays() {
    let daylist = new DayList()
      .set(0, new FlexDate('2019-01-05'))
      .set(1, new FlexDate('2019-01-06'))
      .set(2, new FlexDate('2019-01-07'))
    assert.deepEqual(new DayListBuilder().values(daylist).build(), daylist)
    assert.deepEqual(DayListBuilder.from(daylist).build(), daylist)
    assert.deepEqual(DayListBuilder.fromObject(daylist.toObject()).build(), daylist)
  }

  testBuildMapWeeks() {
    let weekList = new WeekList()
      .set(0, new Week(2019, 0, 1, new DayList()
        .set(0, new FlexDate('2019-01-05'))
        .set(1, new FlexDate('2019-01-06'))
        .set(2, new FlexDate('2019-01-07'))))
    assert.deepEqual(new WeekListBuilder().values(weekList).build(), weekList)
    assert.deepEqual(WeekListBuilder.from(weekList).build(), weekList)
    assert.deepEqual(WeekListBuilder.fromObject(weekList.toObject()).build(), weekList)
  }

  testBuildMapMonths() {
    let monthList = new MonthList()
      .set(0, new Month(2019, 0, new WeekList()
        .set(0, new Week(2019, 0, 1, new DayList()
          .set(0, new FlexDate('2019-01-05'))
          .set(1, new FlexDate('2019-01-06'))
          .set(2, new FlexDate('2019-01-07'))))))
      .set(1, new Month(2019, 1, new WeekList()
        .set(0, new Week(2019, 1, 2, new DayList()
          .set(0, new FlexDate('2019-02-08'))
          .set(1, new FlexDate('2019-02-09'))
          .set(2, new FlexDate('2019-02-10'))))))

    assert.deepEqual(new MonthListBuilder().values(monthList).build(), monthList)
    assert.deepEqual(MonthListBuilder.from(monthList).build(), monthList)
    assert.deepEqual(MonthListBuilder.fromObject(monthList.toObject()).build(), monthList)
  }

  testBuildMapYears() {
    let yearList = new YearList()
      .set(0, new Year(2019, new MonthList()
        .set(0, new Month(2019, 0, new WeekList()
          .set(0, new Week(2019, 0, 1, new DayList()
            .set(0, new FlexDate('2019-01-05'))
            .set(1, new FlexDate('2019-01-06'))
            .set(2, new FlexDate('2019-01-07'))))))
        .set(1, new Month(2019, 1, new WeekList()
          .set(0, new Week(2019, 1, 2, new DayList()
            .set(0, new FlexDate('2019-02-08'))
            .set(1, new FlexDate('2019-02-09'))
            .set(2, new FlexDate('2019-02-10'))))))))
      .set(1, new Year(2020, new MonthList()
        .set(0, new Month(2019, 0, new WeekList()
          .set(0, new Week(2019, 0, 1, new DayList()
            .set(0, new FlexDate('2020-01-05'))
            .set(1, new FlexDate('2020-01-06'))
            .set(2, new FlexDate('2020-01-07'))))))
        .set(1, new Month(2019, 1, new WeekList()
          .set(0, new Week(2019, 1, 2, new DayList()
            .set(0, new FlexDate('2020-02-08'))
            .set(1, new FlexDate('2020-02-09'))
            .set(2, new FlexDate('2020-02-10'))))))))

    assert.deepEqual(new YearListBuilder().values(yearList).build(), yearList)
    assert.deepEqual(YearListBuilder.from(yearList).build(), yearList)
    assert.deepEqual(YearListBuilder.fromObject(yearList.toObject()).build(), yearList)
  }
}

runTest(TestBuildMaps)
