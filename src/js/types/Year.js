import {assert, isNull, isNumber} from '@flexio-oss/assert'
import {deepFreezeSeal} from '@flexio-oss/js-generator-helpers'
import {MonthBuilder} from './Month'
import {MonthList} from './year/MonthList'

class Year {
  /**
   * @param {number} year
   * @param {MonthList} months
   * @private
   */
  constructor(year, months) {
    this._months = months
    this._year = year
  }

  /**
   * @returns {MonthList}
   */
  months() {
    return this._months
  }

  /**
   *
   * @return {number}
   */
  year() {
    return this._year
  }

  /**
   * @param { MonthList } months
   */
  withMonths(months) {
    let builder = YearBuilder.from(this)
    builder.months(months)
    return builder.build()
  }

  /**
   * @param { number } year
   */
  withYear(year) {
    let builder = YearBuilder.from(this)
    builder.year(year)
    return builder.build()
  }

  toObject() {
    let jsonObject = {}
    if (this._months != null) {
      jsonObject['months'] = this._months.mapToArray(x => x.toObject())
    }
    if (this._year != null) {
      jsonObject['year'] = this._year
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

export {Year}

class YearBuilder {
  /**
   * @constructor
   */
  constructor() {
    this._year = null
    this._months = null
  }

  /**
   * @param { MonthList } months
   * @returns {YearBuilder}
   */
  months(months) {
    if (!isNull(months)) {
      assert(months instanceof MonthList, 'months should be a YearList')
    }
    this._months = months
    return this
  }

  /**
   * @param { number } year
   * @returns {YearBuilder}
   */
  year(year) {
    if (!isNull(year)) {
      assert(isNumber(year), 'year should be a number')
    }
    this._year = year
    return this
  }

  /**
   * @returns {Year}
   */
  build() {
    return new Year(this._year, this._months)
  }

  /**
   * @param {object} jsonObject
   * @returns {YearBuilder}
   */
  static fromObject(jsonObject) {
    let builder = new YearBuilder()
    if (jsonObject['months'] !== undefined) {
      builder.months(new MonthList(...jsonObject['months'].map(a => MonthBuilder.fromObject(a).build())))
    }
    if( jsonObject['year'] !== undefined ){
      builder.year( jsonObject['year']);
    }
    return builder
  }

  /**
   * @param {string} json
   * @returns {YearBuilder}
   */
  static fromJson(json) {
    let jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {Year} instance
   * @returns {YearBuilder}
   */
  static from(instance) {
    let builder = new YearBuilder()
    builder.months(instance.months())
    builder.year(instance.year())
    return builder
  }
}

export {YearBuilder}
