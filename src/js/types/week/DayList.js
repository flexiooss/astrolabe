import {assert, assertType, isNull, isNumber} from '@flexio-oss/assert'
import {FlexDate, FlexMap} from '@flexio-oss/flex-types'
/**
* @extends {FlexArray<FlexDate>}
*/
export class DayList extends FlexMap {
  _validate(element) {
    if (!isNull(element)) {
      assert(element instanceof FlexDate, 'element should be a FlexDate')
    }
  }

  toObject() {
    const obj = {}
    this.forEach((value, key) => { obj[key] = value.toJSON() })
    return obj
  }
}

export class DayListBuilder {
  constructor() {
    this._values = []
  }

  /**
   * @param {DayList} dayList
   * @returns {DayListBuilder}
   */
  values(dayList) {
    Array.from(dayList).forEach(([key, value]) => {this.pushValue(key, value)})
    return this
  }

  /**
   * @param {number} key
   * @param { FlexDate } flexDate
   * @returns {DayListBuilder}
   */
  pushValue(key, flexDate) {
    assertType(isNumber(key), 'DayListBuilder:pushValue: key should be a number')
    assertType(flexDate instanceof FlexDate, 'DayListBuilder:pushValue: layer should be an instance of FlexDate')
    this._values.push([key, flexDate])
    return this
  }

  /**
   * @returns {DayList}
   */
  build() {
    let res = new DayList()
    this._values.forEach(([key, value]) => {
      res.set(key, value)
    })
    return res
  }

  /**
   * @param {object} jsonObject
   * @returns {DayListBuilder}
   */
  static fromObject(jsonObject) {
    const builder = new DayListBuilder()
    Object.keys(jsonObject).forEach(key => {
      builder.pushValue(Number.parseInt(key), new FlexDate(jsonObject[key]))
    })
    return builder
  }

  /**
   * @param {string} json
   * @returns {DayListBuilder}
   */
  static fromJson(json) {
    const jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {DayList} instance
   * @returns {DayListBuilder}
   */
  static from(instance) {
    const builder = new DayListBuilder()
    Array.from(instance).forEach(([key, value]) => {
      builder.pushValue(key, value)
    })
    return builder
  }
}
