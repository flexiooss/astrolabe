import {assert, isNull, isNumber} from '@flexio-oss/assert'
import {deepFreezeSeal} from '@flexio-oss/js-generator-helpers'
import {DayList} from './week/DayList'
import {DateExtendedBuilder} from '@flexio-oss/extended-flex-types'

class Week {
  /**
    * @param {number} year
    * @param {number} month
   * @param {number} week
    * @param {DayList} days
    * @private
    */
  constructor(year, month, week, days) {
    this._year = year
    this._month = month
    this._week = week
    this._days = days
  }
  /**
    * @returns {DayList}
    */
  days() {
    return this._days
  }

  /**
   *
   * @return {number}
   */
  year() {
    return this._year
  }

  /**
   *
   * @return {number}
   */
  month() {
    return this._month
  }

  /**
   *
   * @return {number}
   */
  week() {
    return this._week
  }

  /**
    * @param { DayList } days
    */
  withDays(days) {
    let builder = WeekBuilder.from(this)
    builder.days(days)
    return builder.build()
  }

  /**
   * @param { number } year
   */
  withYear(year) {
    let builder = WeekBuilder.from(this)
    builder.year(year)
    return builder.build()
  }

  withMonth(month) {
    let builder = WeekBuilder.from(this)
    builder.month(month)
    return builder.build()
  }

  withWeek(week) {
    let builder = WeekBuilder.from(this)
    builder.month(week)
    return builder.build()
  }

  toObject() {
    let jsonObject = {}
    if (this._days != null) {
      jsonObject['days'] = this._days.mapToArray(x => x.toObject())
    }
    if (this._year != null) {
      jsonObject['year'] = this._year
    }
    if (this._month != null) {
      jsonObject['month'] = this._month
    }
    if (this._week != null) {
      jsonObject['week'] = this._week
    }
    return jsonObject
  }
  /**
    * @returns {object}
    */
  toJSON() {
    return this.toObject()
  }
}

export {Week}

class WeekBuilder {
  /**
    * @constructor
    */
  constructor() {
    this._year = null
    this._month = null
    this._week = null
    this._days = null
  }
  /**
    * @param { DayList } days
    * @returns {WeekBuilder}
    */
  days(days) {
    if (!isNull(days)) {
      assert(days instanceof DayList, 'days should be a DayList')
    }
    let res = new DayList()
    Array.from(days).forEach(([key, value]) => {
      res.set(key, DateExtendedBuilder.from(value).build())
    })
    this._days = res
    return this
  }

  /**
   * @param { number } year
   * @returns {WeekBuilder}
   */
  year(year) {
    if (!isNull(year)) {
      assert(isNumber(year), 'year should be a number')
    }
    this._year = year
    return this
  }


  /**
   * @param { number } month
   * @returns {WeekBuilder}
   */
  month(month) {
    if (!isNull(month)) {
      assert(isNumber(month), 'year should be a number')
    }
    this._month = month
    return this
  }

  /**
   * @param { number } week
   * @returns {WeekBuilder}
   */
  week(week) {
    if (!isNull(week)) {
      assert(isNumber(week), 'year should be a number')
    }
    this._week = week
    return this
  }

  /**
    * @returns {Week}
    */
  build() {
    return new Week(this._year, this._month, this._week, this._days)
  }
  /**
    * @param {object} jsonObject
    * @returns {WeekBuilder}
    */
  static fromObject(jsonObject) {
    let builder = new WeekBuilder()
    if (jsonObject['days'] !== undefined) {
      builder.days(new DayList(...jsonObject['days'].map(a => DateExtendedBuilder.fromObject(a).build())))
    }
    if( jsonObject['year'] !== undefined ){
      builder.year( jsonObject['year']);
    }
    if( jsonObject['month'] !== undefined ){
      builder.month( jsonObject['month']);
    }
    if( jsonObject['week'] !== undefined ){
      builder.week( jsonObject['week']);
    }
    return builder
  }
  /**
    * @param {string} json
    * @returns {WeekBuilder}
    */
  static fromJson(json) {
    let jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }
  /**
    * @param {Week} instance
    * @returns {WeekBuilder}
    */
  static from(instance) {
    let builder = new WeekBuilder()
    builder.days(instance.days())
    builder.year(instance.year())
    builder.month(instance.month())
    builder.week(instance.week())
    return builder
  }
}
export {WeekBuilder}
