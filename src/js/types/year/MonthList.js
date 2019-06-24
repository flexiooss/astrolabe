import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assert, assertType, isNull, isNumber} from '@flexio-oss/assert'
import {FlexMap} from '@flexio-oss/flex-types'

/**
 * @extends {FlexMap<?Month>}
 */
export class MonthList extends FlexMap {
  _validate(element) {
    if (!isNull(element)) {
      assert(element instanceof globalFlexioImport.io.flexio.astrolabe.types.Month, 'element should be a Month')
    }
  }

  toObject() {
    const obj = {}
    this.forEach((value, key) => { obj[key] = value.toObject() })
    return obj
  }
}

export class MonthListBuilder {
  constructor() {
    this._values = []
  }

  /**
   * @param {MonthList} monthList
   * @returns {MonthListBuilder}
   */
  values(monthList) {
    this._values = Array.from(monthList)
    return this
  }

  /**
   * @param {number} key
   * @param { Month } month
   * @returns {MonthListBuilder}
   */
  pushValue(key, month) {
    assertType(isNumber(key), 'monthListBuilder:pushValue: key should be a number')
    assertType(month instanceof globalFlexioImport.io.flexio.astrolabe.types.Month, 'monthListBuilder:pushValue: month should be an instance of month')
    this._values.push([key, month])
    return this
  }

  /**
   * @returns {MonthList}
   */
  build() {
    let res = new MonthList()
    this._values.forEach(([key, value]) => {
      res.set(key, value)
    })
    return res
  }

  /**
   * @param {object} jsonObject
   * @returns {MonthListBuilder}
   */
  static fromObject(jsonObject) {
    const builder = new MonthListBuilder()
    Object.keys(jsonObject).forEach(key => {
      builder.pushValue(Number.parseInt(key), globalFlexioImport.io.flexio.astrolabe.types.MonthBuilder.fromObject(jsonObject[key]).build())
    })
    return builder
  }

  /**
   * @param {string} json
   * @returns {MonthListBuilder}
   */
  static fromJson(json) {
    const jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {MonthList} instance
   * @returns {MonthListBuilder}
   */
  static from(instance) {
    const builder = new MonthListBuilder()
    Array.from(instance).forEach(([key, value]) => {
      builder.pushValue(key, globalFlexioImport.io.flexio.astrolabe.types.MonthBuilder.from(value).build())
    })
    return builder
  }
}
