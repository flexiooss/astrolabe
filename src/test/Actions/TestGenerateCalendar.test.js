/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {ComponentAstrolabe} from '../../js/component/ComponentAstrolabe'
import {Dispatcher, HotBalloonApplication} from '@flexio-oss/hotballoon'
import {FakeLogger} from '@flexio-oss/js-logger'
import {DaysEnum} from '../../js/types/DaysEnum'
import {DayList} from '../../js/types/week/DayList'
import {DateExtended} from '@flexio-oss/extended-flex-types'
import {Year} from '../../js/types/Year'
import {Month} from '../../js/types/Month'
import {isNull, isObject} from '@flexio-oss/assert'

const assert = require('assert')

export class TestGenerateCalendar extends TestCase {
  setUp() {
    this.__APP = new HotBalloonApplication('CalendarModule', new Dispatcher(), new FakeLogger())
    this.__component = new ComponentAstrolabe(
      this.__APP.addComponentContext(),
      DaysEnum.MON
    )
  }

  testWeekbetweenToYearsStructure() {
    // week 1 ~ 2019 is between 2018 and 2019
    this.__component.addWeek(2019, 1)
    assert.deepEqual(2, this.__component.publicStoreHandler().state().data.years().size)
    assert.deepEqual(1, this.__component.getYear(2018).months().size)
    assert.deepEqual(1, this.__component.getYear(2019).months().size)
    assert.deepEqual(6, this.__component.getMonth(2018, 11).weeks().size)
    assert.deepEqual(5, this.__component.getMonth(2019, 0).weeks().size)
  }

  testWeekbetweenToYearsContent() {
    this.__component.addWeek(2019, 1)
    let expected = new DayList()
      .set(0, new DateExtended(2018, 12, 31))
      .set(1, new DateExtended(2019, 1, 1))
      .set(2, new DateExtended(2019, 1, 2))
      .set(3, new DateExtended(2019, 1, 3))
      .set(4, new DateExtended(2019, 1, 4))
      .set(5, new DateExtended(2019, 1, 5))
      .set(6, new DateExtended(2019, 1, 6))
    let actual = this.__component.getWeek(2019, 2)
    assert.deepEqual(expected, actual)
  }

  testWeekCutInHalf() {
    // week 1 ~ 2019 is between december 2018 and january 2019
    this.__component.addWeek(2019, 1)
    assert.deepEqual(1, this.__component.getMonth(2018, 11).weeks().get(5).days().size)
    assert.deepEqual(6, this.__component.getMonth(2019, 0).weeks().get(0).days().size)
  }

  testAddYear() {
    this.__component.addYear(2019)
    assert.deepEqual(this.__component.getYear(2019).months().size, 12)
    assert.deepEqual(this.__component.getYear(2019).year(), 2019)
  }

  testAddMonth() {
    this.__component.addMonth(2019,2)
    assert.deepEqual(this.__component.getMonth(2019, 2).month(), 2)
    assert.deepEqual(this.__component.getMonth(2019, 2).year(), 2019)
    assert.deepEqual(this.__component.getMonth(2019, 2).weeks().size, 5)
  }

  testResultYear() {
    assert(isNull(this.__component.getYear(2019)))
    this.__component.addYear(2019)
    assert(this.__component.getYear(2019) instanceof Year)
    assert(isObject(this.__component.getYear(2019)))
  }

  testResultMonth() {
    assert(isNull(this.__component.getMonth(2019, 8)))
    this.__component.addMonth(2019, 8)
    assert(this.__component.getMonth(2019, 8) instanceof Month)
    assert(isObject(this.__component.getMonth(2019, 8)))
  }

  testResultWeek() {
    assert(isNull(this.__component.getWeek(2019, 40)))
    this.__component.addWeek(2019, 40)
    assert(this.__component.getWeek(2019, 40) instanceof DayList)
    assert(isObject(this.__component.getWeek(2019, 40)))
  }

  testWeekOverflow() {
    // 2019 has 52 weeks
    this.__component.addWeek(2019, 60)
    assert.deepEqual(this.__component.getYear(2019), null)
    assert(this.__component.getWeek(2020, 8) instanceof DayList)
  }
}
runTest(TestGenerateCalendar)
