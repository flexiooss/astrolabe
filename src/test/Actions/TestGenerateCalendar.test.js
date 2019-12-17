import '../../../index'
import {TestCase} from 'code-altimeter-js'
import {DayList} from '../../js/types/week/DayList'
import {isObject} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {DaysEnum} from '../../js/types/DaysEnum'
import {ApplicationWithFakeStyleFakeDocument} from '@flexio-oss/hotballoon-test-dummies'
import {ComponentAstrolabe} from '../../js/component/ComponentAstrolabe'
import {FlexDate} from '@flexio-oss/flex-types'

const Month = globalFlexioImport.io.flexio.astrolabe.types.Month
const Year = globalFlexioImport.io.flexio.astrolabe.types.Year

const assert = require('assert')

export class TestGenerateCalendar extends TestCase {
  setUp() {
    const fakeApplication = ApplicationWithFakeStyleFakeDocument.withoutLogger()
    this.astrolabe = new ComponentAstrolabe(fakeApplication.application().addComponentContext(), DaysEnum.MON)
  }

  testWeekBetweenToYearsStructure() {
    // week 1 ~ 2019 is between 2018 and 2019
    this.astrolabe.addWeek(2019, 1)
    assert.deepEqual(1, this.astrolabe.getYear(2018).months().size)
    assert.deepEqual(1, this.astrolabe.getYear(2019).months().size)
    assert.deepEqual(6, this.astrolabe.getMonth(2018, 11).weeks().size)
    assert.deepEqual(5, this.astrolabe.getMonth(2019, 0).weeks().size)
  }

  testWeekBetweenToYearsContent() {
    let expected = new DayList()
      .set(0, new FlexDate('2018-12-31'))
      .set(1, new FlexDate('2019-01-01'))
      .set(2, new FlexDate('2019-01-02'))
      .set(3, new FlexDate('2019-01-03'))
      .set(4, new FlexDate('2019-01-04'))
      .set(5, new FlexDate('2019-01-05'))
      .set(6, new FlexDate('2019-01-06'))
    let actual = this.astrolabe.getWeek(2019, 1)
    assert.deepEqual(actual, expected)
  }

  testWeekCutInHalf() {
    // week 1 ~ 2019 is between december 2018 and january 2019
    this.astrolabe.addWeek(2019, 1)
    assert.deepEqual(1, this.astrolabe.getMonth(2018, 11).weeks().get(5).days().size)
    assert.deepEqual(6, this.astrolabe.getMonth(2019, 0).weeks().get(0).days().size)
  }

  testAddYear() {
    this.astrolabe.addYear(2019)
    assert.deepEqual(this.astrolabe.getYear(2019).months().size, 12)
    assert.deepEqual(this.astrolabe.getYear(2019).year(), 2019)
  }

  testAddMonth() {
    this.astrolabe.addMonth(2019,2)
    assert.deepEqual(this.astrolabe.getMonth(2019, 2).month(), 2)
    assert.deepEqual(this.astrolabe.getMonth(2019, 2).year(), 2019)
    assert.deepEqual(this.astrolabe.getMonth(2019, 2).weeks().size, 5)
  }

  testResultYear() {
    this.astrolabe.addYear(2019)
    assert(this.astrolabe.getYear(2019) instanceof Year)
    assert(isObject(this.astrolabe.getYear(2019)))
  }

  testResultMonth() {
    this.astrolabe.addMonth(2019, 8)
    assert(this.astrolabe.getMonth(2019, 8) instanceof Month)
    assert(isObject(this.astrolabe.getMonth(2019, 8)))
  }

  testResultWeek() {
    this.astrolabe.addWeek(2019, 40)
    assert(this.astrolabe.getWeek(2019, 40) instanceof DayList)
    assert(isObject(this.astrolabe.getWeek(2019, 40)))
  }

  testWeekOverflow() {
    // 2019 has 52 weeks
    this.astrolabe.addWeek(2019, 60)
    assert.deepEqual(this.astrolabe.__storeCalendar.store().state().data().years().get(2019), null)
    assert(this.astrolabe.getWeek(2020, 8) instanceof DayList)
  }
}
runTest(TestGenerateCalendar)
