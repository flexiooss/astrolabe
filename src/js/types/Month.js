import {assert, isNull, isNumber} from '@flexio-oss/assert'
import {deepFreezeSeal} from '@flexio-oss/js-generator-helpers'
import {WeekBuilder} from './Week'
import {WeekList} from './month/WeekList'

class Month {
  /**
   * @param {number} year
   * @param {number} month
   * @param {WeekList} weeks
   * @private
   */
  constructor(year, month, weeks) {
    this._year = year
    this._month = month
    this._weeks = weeks
  }

  /**
   * @returns {WeekList}
   */
  weeks() {
    return this._weeks
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
   * @param { WeekList } weeks
   */
  withWeeks(weeks) {
    this._weeks = weeks
  }

  /**
   * @param { number } year
   */
  withYear(year) {
    let builder = MonthBuilder.from(this)
    builder.year(year)
    return builder.build()
  }

  withMonth(month) {
    let builder = MonthBuilder.from(this)
    builder.month(month)
    return builder.build()
  }

  toObject() {
    let jsonObject = {}
    if (this._weeks != null) {
      jsonObject['weeks'] = this._weeks.mapToArray(x => x.toObject())
    }
    if (this._year != null) {
      jsonObject['year'] = this._year
    }
    if (this._month != null) {
      jsonObject['month'] = this._month
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

export {Month}

class MonthBuilder {
  /**
   * @constructor
   */
  constructor() {
    this._year = null
    this._month = null
    this._weeks = null
  }

  /**
   * @param { WeekList } weeks
   * @returns {MonthBuilder}
   */
  weeks(weeks) {
    if (!isNull(weeks)) {
      assert(weeks instanceof WeekList, 'weeks should be a WeekList')
    }
    this._weeks = weeks
    return this
  }

  /**
   * @param { number } year
   * @returns {MonthBuilder}
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
   * @returns {MonthBuilder}
   */
  month(month) {
    if (!isNull(month)) {
      assert(isNumber(month), 'year should be a number')
    }
    this._month = month
    return this
  }

  /**
   * @returns {Month}
   */
  build() {
    return new Month(this._year, this._month, this._weeks)
  }

  /**
   * @param {object} jsonObject
   * @returns {MonthBuilder}
   */
  static fromObject(jsonObject) {
    let builder = new MonthBuilder()
    if (jsonObject['weeks'] !== undefined) {
      builder.weeks(new WeekList(...jsonObject['weeks'].map(a => WeekBuilder.fromObject(a).build())))
    }
    if( jsonObject['year'] !== undefined ){
      builder.year( jsonObject['year']);
    }
    if( jsonObject['month'] !== undefined ){
      builder.month( jsonObject['month']);
    }
    return builder
  }

  /**
   * @param {string} json
   * @returns {MonthBuilder}
   */
  static fromJson(json) {
    let jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {Month} instance
   * @returns {MonthBuilder}
   */
  static from(instance) {
    let builder = new MonthBuilder()
    builder.weeks(instance.weeks())
    builder.year(instance.year())
    builder.month(instance.month())
    return builder
  }
}

export {MonthBuilder}
